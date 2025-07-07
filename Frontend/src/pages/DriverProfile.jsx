import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function DriverProfile() {

  const [driver, setDriver] = useState(null);

  const token = localStorage.getItem("token");
  const driverId = token ? jwtDecode(token).id : null;

  // showing driver profile

  useEffect(() => {
    if (!driverId) return;

    const fetchDriver = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/driver-info/${driverId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDriver(res.data);
      } catch (error) {
        console.error("Error fetching driver info", error);
      }
    };

    fetchDriver();
  }, []);



  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen flex justify-center items-center">
      {driver ? (
        <div className="p-8 bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full text-gray-100 space-y-6">


          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5283/5283021.png"
              alt="Driver Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-400">Welcome, {driver.username}</h2>
            <p className="text-sm text-gray-400">Driver Profile</p>
          </div>
          <div className="grid grid-cols-1 gap-4 text-base">
            <p><span className="font-semibold text-gray-400">Driver ID:</span> {driver.id}</p>
            <p><span className="font-semibold text-gray-400">Email:</span> {driver.email}</p>
            <p><span className="font-semibold text-gray-400">Phone:</span> {driver.phoneNo}</p>
            <p><span className="font-semibold text-gray-400">Vehicle Type:</span> {driver.vehicleType}</p>
            <p><span className="font-semibold text-gray-400">Vehicle No:</span> {driver.vehicleNumber}</p>
            <p><span className="font-semibold text-gray-400">License No:</span> {driver.licenseNumber}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">Loading driver info...</p>
      )}
    </div>

  );
}
