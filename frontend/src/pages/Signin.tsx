import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/menu");
    } catch (err) {
      alert("Invalid credentials");
      console.error("Signin failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f3f4ed] to-[#dbe7c9] px-4">
      <div className="bg-[#1C1C2B] text-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#2a2a3b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#2a2a3b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
          />

          <button
            onClick={signin}
            className="w-full bg-[#FF7A00] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/" className="text-[#3DBE29] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
