import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div
            className={`
        fixed top-0 left-0 
        h-screen max-h-screen w-64 
        z-50 bg-gray-800 text-white shadow-lg 
        transition-transform duration-300 
        overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
        flex-col justify-between
      `}
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-blue-400">Driver Panel</h1>
                    <button className="md:hidden" onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                </div>

                <nav className="flex flex-col space-y-4">
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
                    <button
                        onClick={() => navigate("/viewPastRides")}
                        className="hover:bg-gray-700 px-4 py-2 rounded text-left"
                    >
                        View Past Rides
                    </button>
                </nav>
            </div>

            <div className="p-6 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full bg-green-500 text-black hover:bg-red-600 hover:text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
