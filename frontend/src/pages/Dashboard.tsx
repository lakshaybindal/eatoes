import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/item";

function Dashboard() {
  const [menu, setMenu] = useState<object>({});
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<{
    cart: {
      itemId: string;
      quantity: number;
      itemName: string;
      price: number;
    }[];
  }>({ cart: [] });

  const navigate = useNavigate();

  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/user/menu?filter=${filter}`,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      );
      setLoading(false);
      setMenu(res.data);
    } catch (error) {
      alert("You are not logged in");
      console.error("Error fetching menu:", error);
    }
  };

  async function getcart() {
    try {
      const res = await axios.get("http://localhost:3000/user/cart", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      });
      setCart(res.data);
    } catch (error) {
      setLoading(false);
      alert("You are not logged in");
      console.error("Error fetching cart:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
    getcart();
  }, [filter]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="p-6 bg-[#111827] min-h-screen">
      {/* Header with Cart Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/additems")}
            className="bg-[#f97316] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#fb923c] transition shadow-md"
          >
            Add Items
          </button>
          <button
            onClick={() => navigate("/mycart")}
            className="bg-[#f97316] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#fb923c] transition shadow-md"
          >
            My Cart
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-[#f97316] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#fb923c] transition shadow-md"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-64 px-4 py-3 rounded-xl border-none bg-[#1f2937] text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#f97316]"
        />
        <button
          onClick={fetchMenu}
          className="px-6 py-3 bg-[#f97316] text-white rounded-xl font-medium hover:bg-[#fb923c] transition"
        >
          Search
        </button>
      </div>

      {/* Menu Display */}
      <div className="bg-[#0f172a] p-8 rounded-3xl shadow-2xl">
        {Object.keys(menu).map((category) => (
          <div key={category} className="mb-8">
            <h1 className="text-3xl font-bold text-[#f97316] mb-4">
              {category}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* @ts-expect-error menu is an object */}
              {menu[category].map((item) => (
                <ItemCard key={item._id} item={item} cart={cart.cart} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10"></div>
    </div>
  );
}

export default Dashboard;
