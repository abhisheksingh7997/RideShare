import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function DriverNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-blue-400">Driver Panel</h1>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`flex-col md:flex-row md:flex md:items-center md:justify-between ${menuOpen ? "flex" : "hidden"
          } mt-4 md:mt-0`}
      >
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
          <button
            onClick={() => navigate("/")}
            className="hover:bg-gray-700 px-4 py-2 rounded text-left"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/driverdashboard")}
            className="hover:bg-gray-700 px-4 py-2 rounded text-left"
          >
            Dashboard
          </button>
          <button onClick={() => navigate("/earnings")}
            className="hover:bg-gray-700 px-4 py-2 rounded text-left"
          >
            Earnings
          </button>
          <button onClick={() => navigate("/contacts")}
            className="hover:bg-gray-700 px-4 py-2 rounded text-left"
          >
            Contact
          </button>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleLogout}
            className="bg-green-500 text-black hover:bg-red-600 hover:text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
