import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  itemId: string;
  itemName: string;
  price: number;
  quantity: number;
}

function Mycart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getcart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/cart", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      });
      setCart(res.data.cart);
      setTotalPrice(res.data.totalPrice);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart", err);
      setLoading(false);
    }
  };

  const addtocart = async (itemId: string) => {
    await axios.post(
      `http://localhost:3000/user/addtocart`,
      { itemId },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    getcart();
  };

  const removefromcart = async (itemId: string) => {
    await axios.post(
      `http://localhost:3000/user/removefromcart`,
      { itemId },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    getcart();
  };

  const order = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user/order",
        {},
        { headers: { authorization: localStorage.getItem("token") || "" } }
      );
      navigate("/orderdone");
    } catch (err) {
      alert("Cart is empty");
      console.error("Error ordering", err);
    }
  };

  useEffect(() => {
    getcart();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1020] text-white text-xl">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1020] p-6">
      <div className="max-w-4xl mx-auto bg-[#1a1b2e] rounded-2xl shadow-xl p-8 space-y-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-[#f97316]">
          🛒 Your Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 text-lg">
              Your cart is empty.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.itemId}
                className="flex flex-col sm:flex-row justify-between items-center bg-[#23263a] p-5 rounded-xl"
              >
                <div className="text-left w-full sm:w-2/3">
                  <h2 className="text-xl font-bold text-white">
                    {item.itemName}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <p className="text-gray-400">₹{item.price * item.quantity}</p>

                  <button
                    onClick={() =>
                      item.quantity > 0 && removefromcart(item.itemId)
                    }
                    className="bg-[#374151] hover:bg-[#4b5563] text-white w-8 h-8 rounded-full font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="text-white text-lg">{item.quantity}</span>
                  <button
                    onClick={() => addtocart(item.itemId)}
                    className="bg-[#374151] hover:bg-[#4b5563] text-white w-8 h-8 rounded-full font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="bg-[#2d2f45] p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Summary</h2>
            <div className="text-gray-300 space-y-3">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={order}
              className="w-full mt-6 py-3 bg-[#f97316] text-white rounded-xl text-lg font-semibold hover:bg-[#fb923c] transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mycart;
