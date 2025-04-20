import axios from "axios";
import { useEffect, useState } from "react";

export default function ItemCard({
  item,
  cart,
}: {
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  cart: {
    itemId: string;
    quantity: number;
    itemName: string;
    price: number;
  }[];
}) {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const itemInCart = cart.find((i) => i.itemId === item._id);
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    }
  }, [item._id, cart]);
  const addtocart = async (itemId: string) => {
    try {
      await axios.post(
        `http://localhost:3000/user/addtocart`,
        {
          itemId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const removefromcart = async (itemId: string) => {
    await axios.post(
      `http://localhost:3000/user/removefromcart`,
      {
        itemId,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <div className="bg-[#1f2937] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all max-w-sm w-full">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-white">{item.name}</h2>
        <p className="text-sm text-gray-400 mb-2">{item.description}</p>
        <p className="text-lg font-semibold text-[#f97316] mb-4">
          ₹{item.price}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => {
              if (quantity > 0) {
                removefromcart(item._id);
                setQuantity(quantity - 1);
              }
            }}
            className="bg-[#374151] text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-[#4b5563]"
          >
            -
          </button>
          <span className="text-lg font-medium text-white">{quantity}</span>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
              addtocart(item._id);
            }}
            className="bg-[#374151] text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-[#4b5563]"
          >
            +
          </button>
        </div>

        <button
          onClick={() => {
            addtocart(item._id);
            setQuantity(quantity + 1);
          }}
          className="w-full bg-[#f97316] text-white py-2 rounded-xl font-semibold hover:bg-[#fb923c] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
