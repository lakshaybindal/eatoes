import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Item } from "./db";
const router = express.Router();
router.post("/additem", async (req: Request, res: Response) => {
  const item = await Item.create(req.body);
  res.status(200).json({ item });
});

export default router;
