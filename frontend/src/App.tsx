import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Mycart from "./pages/Mycart";
import OrderDone from "./pages/OrderDone";
import Profile from "./pages/profile";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Additems from "./pages/Additems";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Dashboard />} />
        <Route path="/mycart" element={<Mycart />} />
        <Route path="/orderdone" element={<OrderDone />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/additems" element={<Additems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
