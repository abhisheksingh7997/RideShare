 import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function PassengerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 py-4 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-500 tracking-tight hover:text-white transition"
        >
          Ride<span className="text-white">Share</span>
        </Link>

        <ul className="hidden md:flex gap-8 text-base font-medium text-white">
          <li>
            <Link to="/features" className="hover:text-blue-500 transition">
              Features
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-blue-500 transition">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/feedback" className="hover:text-blue-500 transition">
              Feedbacks
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="hover:text-blue-500 transition">
              Contacts
            </Link>
          </li>
          <li>
            <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full overflow-hidden bg-gray-400 flex items-center justify-center shadow hover:bg-blue-500">
              <img src="https://cdn-icons-png.flaticon.com/128/3641/3641419.png" alt="profile" className="w-12 h-12 object-cover" />
            </button>

          </li>
        </ul>

        {pathname === "/" && (
          <Link
            to="https://www.bing.com/ck/a?!&&p=9119a021e352b2c07a7d9cf509a2c19aa290d0ea7c0ae6dc0d61714739a8fb95JmltdHM9MTc1MTQxNDQwMA&ptn=3&ver=2&hsh=4&fclid=30d86302-60d1-6634-24a8-76fd61bf6774&psq=play+store&u=a1aHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20v&ntb=1" // playstore link
            className="hidden md:block text-blue-400 hover:bg-blue-200 hover:text-blue-900 font-semibold px-6 py-2 rounded-full text-sm transition duration-300 border-2"
          >
            Download Now
          </Link>
        )}

        {pathname === "/passengerdashboard" && (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-500 text-white font-semibold px-6 py-2 rounded-full text-sm transition duration-300 hover:bg-red-900"
          >
            Logout
          </button>
        )}
        {pathname === "/driverdashboard" && (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-500 text-white font-semibold px-6 py-2 rounded-full text-sm transition duration-300 hover:bg-red-900"
          >
            Logout
          </button>
        )}

        <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 text-white px-6 py-4 space-y-4 shadow-inner">
          <Link
            to="/features"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-500"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-500"
          >
            Pricing
          </Link>
          <Link
            to="/feedback"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-500"
          >
            Feedbacks
          </Link>
          <Link
            to="/contacts"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-500"
          >
            Contacts
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-500"
          >
            Profile
          </Link>

          {pathname === "/" && (
            <Link
              to="/download"
              onClick={() => setIsOpen(false)}
              className="block bg-blue-500 text-black px-4 py-2 rounded-full text-center font-medium hover:bg-blue-900 transition"
            >
              Download Now
            </Link>
          )}
          {pathname === "/driverdashboard" && (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-red-500 text-white font-semibold px-6 py-2 rounded-full text-sm transition duration-300 hover:bg-red-900"
            >
              Logout
            </button>
          )}

          {pathname === "/profile" && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-center bg-red-500 text-white px-4 py-2 rounded-full font-medium transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default PassengerNavbar;