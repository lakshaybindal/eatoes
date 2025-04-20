import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signupVal, signinVal } from "./lib/validator/userValidator";
import { Item } from "./db";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
import userAuth from "./middleware/usermiddleware";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const userBody = req.body;
  const success = signupVal.safeParse(userBody);
  if (!success.success) {
    return res.status(403).json({ msg: "Wrong format" });
  }
  try {
    const user = await prisma.user.create({
      data: userBody,
    });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.status(200).json({ token: token });
  } catch (e) {
    return res.status(403).json({ msg: "User already exist" });
  }
});
router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  const signinBody = req.body;
  const success = signinVal.safeParse(signinBody);
  if (!success.success) {
    return res.status(403).json({ msg: "Invalid Input" });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: signinBody.email,
        password: signinBody.password,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.status(200).json({ msg: "Signin Success", token: token });
  } catch (e) {}
});
router.get("/", userAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });
  const orders = await prisma.order.findMany({
    where: { userId: user?.id },
  });
  res.status(200).json({ user, orders });
});
router.get("/menu", userAuth, async (req, res) => {
  const filter = req.query.filter || "";
  const items = await Item.find({
    name: { $regex: filter, $options: "i" },
  });
  const menu: any = {};
  items.forEach((item) => {
    if (!menu[item.category as string]) {
      menu[item.category] = [];
    }
    menu[item.category].push(item);
  });
  res.status(200).json(menu);
});

router.post(
  "/addtoCart",
  userAuth,
  async (req: Request, res: Response): Promise<any> => {
    const { itemId } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }
    const cartItem = (
      user.cart as {
        itemId: string;
        quantity: number;
        price: number;
        itemName: string;
      }[]
    ).find((item) => item.itemId === itemId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(401).json({ msg: "Item does not exist" });
      }
      user.cart.push({
        itemId,
        quantity: 1,
        price: item.price,
        itemName: item.name,
      });
    }

    await prisma.user.update({
      where: { id: req.userId },
      data: {
        cart: user.cart as {
          itemId: string;
          quantity: number;
          price: number;
          itemName: string;
        }[],
      },
    });

    res.status(200).json({ msg: "Cart updated", cart: user.cart });
  }
);
router.post(
  "/removefromCart",
  userAuth,
  async (req: Request, res: Response): Promise<any> => {
    const { itemId } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }
    let cart = user.cart as {
      itemId: string;
      quantity: number;
      price: number;
      itemName: string;
    }[];
    const cartItem = cart.find((item) => item.itemId === itemId);
    if (!cartItem) {
      return res.status(401).json({ msg: "Item does not exist" });
    }
    cartItem.quantity -= 1;
    if (cartItem.quantity === 0) {
      cart = cart.filter((item) => item.itemId !== itemId);
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { cart: cart },
    });
    res.status(200).json({ msg: "Cart updated", cart: user.cart });
  }
);
router.get(
  "/quantity",
  userAuth,
  async (req: Request, res: Response): Promise<any> => {
    const { itemId } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    const cart = user?.cart as {
      itemId: string;
      quantity: number;
      price: number;
      itemName: string;
    }[];
    const quantity = cart.find((item) => item.itemId === itemId)?.quantity;
    if (!quantity) {
      return res.status(200).json({ quantity: 0 });
    }
    return res.status(200).json({ quantity: quantity });
  }
);
router.post(
  "/order",
  userAuth,
  async (req: Request, res: Response): Promise<any> => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }
    if (user.cart.length === 0) {
      return res.status(401).json({ msg: "Cart is empty" });
    }
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        items: user.cart as {
          itemId: string;
          quantity: number;
          price: number;
          itemName: string;
        }[],
        totalPrice: (user.cart as { quantity: number; price: number }[]).reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
      },
    });
    await prisma.user.update({
      where: { id: user.id },
      data: {
        cart: [],
      },
    });
    res.status(200).json({ msg: "Order created", order: order });
  }
);
router.get(
  "/cart",
  userAuth,
  async (req: Request, res: Response): Promise<any> => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    const cart = user?.cart as {
      itemId: string;
      quantity: number;
      price: number;
      itemName: string;
    }[];
    const totalPrice = (cart as { quantity: number; price: number }[]).reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    return res.status(200).json({ cart, totalPrice: totalPrice });
  }
);
export default router;
