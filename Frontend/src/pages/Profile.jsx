import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Unauthorized:", err);
        alert("Session expired or unauthorized. Please login again.");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      {user ? (
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-md"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {user.username} 👋
          </h2>

          <div className="text-gray-600 space-y-2">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> <span className="capitalize">{user.role}</span></p>
            <p><span className="font-semibold">User ID:</span> {user.id}</p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-lg text-gray-700 animate-pulse">Loading profile...</p>
      )}
    </div>
  );
}
