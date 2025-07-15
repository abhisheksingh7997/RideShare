import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 py-4 shadow-lg backdrop-blur-md scroll-smooth">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-500 tracking-tight hover:text-white transition"
        >
          Ride<span className="text-white">Share</span>
        </Link>

        <ul className="hidden md:flex gap-8 text-base font-medium text-white items-center">
          {pathname === "/" ? (
            <>
              <li>
                <a href="#pricing" className="hover:text-blue-500 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-500 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-blue-500 transition">
                  Feedbacks
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-blue-500 transition">
                  Contacts
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/#phone" className="hover:text-blue-500 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="hover:text-blue-500 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/#feedback" className="hover:text-blue-500 transition">
                  Feedbacks
                </Link>
              </li>
              <li>
                <Link to="/#contacts" className="hover:text-blue-500 transition">
                  Contacts
                </Link>
              </li>
            </>
          )}
        </ul>

        {pathname === "/" && (
          <a
            href="https://play.google.com/store"
            className="hidden md:block text-blue-400 hover:bg-blue-200 hover:text-blue-900 font-semibold px-6 py-2 rounded-full text-sm transition duration-300 border-2"
          >
            Download Now
          </a>
        )}

        {(pathname === "/passengerdashboard" || pathname === "/driverdashboard") && (
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

      {isOpen && (
        <div className="md:hidden bg-slate-800 text-white px-6 py-4 space-y-4 shadow-inner">
          {pathname === "/" ? (
            <>
              <a href="#phone" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Features
              </a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Pricing
              </a>
              <a href="#feedback" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Feedbacks
              </a>
              <a href="#contacts" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Contacts
              </a>
            </>
          ) : (
            <>
              <Link to="/#phone" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Features
              </Link>
              <Link to="/#pricing" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Pricing
              </Link>
              <Link to="/#feedback" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Feedbacks
              </Link>
              <Link to="/#contacts" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">
                Contacts
              </Link>
            </>
          )}

          {pathname === "/" && (
            <a
              href="https://play.google.com/store"
              onClick={() => setIsOpen(false)}
              className="block bg-blue-500 text-black px-4 py-2 rounded-full text-center font-medium hover:bg-blue-900 transition"
            >
              Download Now
            </a>
          )}

          {["/passengerdashboard", "/driverdashboard", "/profile"].includes(pathname) && (
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

export default Navbar;
