import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
        console.log(motion);
        
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      {user ? (
        <motion.div
          className="backdrop-blur-md bg-white/5 border border-gray-700 rounded-3xl p-10 max-w-md w-full text-center space-y-6 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=000000`}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-xl"
            />
          </motion.div>

          <motion.h2
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome, {user.username}
          </motion.h2>

          <motion.div
            className="text-gray-300 space-y-2 text-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              <span className="font-semibold text-white">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold text-white">Role:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </p>
            <p>
              <span className="font-semibold text-white">User ID:</span> {user.id}
            </p>
          </motion.div>

          <motion.button
            onClick={handleLogout}
            className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-8 rounded-full shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="text-lg text-white font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Loading your profile...
        </motion.div>
      )}
    </div>
  );
}
