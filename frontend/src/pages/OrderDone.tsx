import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderDone() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#111827] p-6 text-center text-white">
      <CheckCircle className="text-[#34D399] w-20 h-20 mb-4" />

      <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
      <p className="text-gray-300 text-lg mb-6">
        Thank you for ordering. Your delicious food is being prepared! 🍽️
      </p>

      <div className="bg-[#1f2937] p-6 rounded-xl shadow-lg w-full max-w-md border border-[#2d3748]">
        <p className="text-gray-300 mb-3">
          <span className="font-semibold text-white">Estimated Delivery:</span>{" "}
          30–40 mins
        </p>
        <p className="text-gray-300 mb-3">
          <span className="font-semibold text-white">Payment:</span> Paid
          (Online)
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-white">Track your order</span>{" "}
          from the Orders section.
        </p>
      </div>

      <button
        onClick={() => {
          navigate("/profile");
        }}
        className="mt-8 px-6 py-3 bg-[#34D399] text-white rounded-xl font-semibold hover:bg-[#10b981] transition shadow-md"
      >
        Go to Profile to track your order
      </button>
    </div>
  );
}
