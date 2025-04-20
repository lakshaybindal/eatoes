import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState<{
    user: {
      id: number;
      name: string;
      email: string;
      phoneNumber: string;
    };
    orders: {
      id: number;
      totalPrice: number;
      createdAt: string;
      items: {
        itemName: string;
        price: number;
        quantity: number;
      }[];
    }[];
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user", {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        });
        setUserData(res.data);
      } catch (err) {
        alert("You are not logged in");
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  if (!userData)
    return <div className="text-center p-6 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fbf3] to-[#edf7e2] flex items-center justify-center p-4">
      <div className="bg-[#0f1020] text-white w-full max-w-3xl rounded-2xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center">Your Profile</h1>

        {/* User Info */}
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {userData.user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {userData.user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {userData.user.phoneNumber}
          </p>
        </div>

        {/* Order History */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>

          {userData.orders.length === 0 ? (
            <p className="text-gray-400">You haven’t placed any orders yet.</p>
          ) : (
            <div className="space-y-6">
              {userData.orders.map((order) => (
                <div key={order.id} className="bg-[#1a1b2e] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-orange-400">
                      Order #{order.id}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-gray-300"
                      >
                        <span>
                          {item.itemName} × {item.quantity}
                        </span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-right mt-2 text-orange-400 font-semibold">
                    Total: ₹{order.totalPrice}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
