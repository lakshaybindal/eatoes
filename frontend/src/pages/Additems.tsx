import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Additems() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const navigate = useNavigate();
  async function additem() {
    try {
      await axios.post("http://localhost:3000/admin/additem", {
        name,
        description,
        price,
        imageUrl,
        category,
        isAvailable,
      });

      navigate("/menu");
    } catch (err) {
      alert("Invalid data");
      console.error("Error adding item:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white flex justify-center items-center px-4 py-10">
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#34D399]">
          Add New Item
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
            className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white placeholder-gray-400 border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#34D399]"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white placeholder-gray-400 border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#34D399]"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (₹)"
            className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white placeholder-gray-400 border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#34D399]"
          />

          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white placeholder-gray-400 border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#34D399]"
          />

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (e.g. Pizza, Drinks)"
            className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white placeholder-gray-400 border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#34D399]"
          />

          <div className="flex items-center space-x-2">
            <input
              id="available"
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
            />
            <label htmlFor="available" className="text-sm text-gray-300">
              Available
            </label>
          </div>

          <button
            onClick={additem}
            className="w-full bg-[#34D399] text-white py-3 rounded-lg font-semibold hover:bg-[#10b981] transition"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default Additems;
