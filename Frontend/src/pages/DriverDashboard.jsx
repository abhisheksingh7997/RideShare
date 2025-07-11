import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DriverProfile from "../pages/DriverProfile";
import RideRequests from "../components/RideRequests";
import ViewPastRides from "../components/ViewPastRides";
import DriverNavbar from "../components/DriverNavbar";

export default function DriverDashboard() {
  const [driver, setDriver] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const decoded = jwtDecode(token);
        const res = await axios.get(`http://localhost:5000/api/driver-info/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDriver(res.data);
      } catch (error) {
        console.error("Error fetching driver info", error);
      }
    };

    if (token) fetchDriver();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DriverNavbar />
      <main className="p-6">
        {driver ? (
          <>
            <DriverProfile driver={driver} />
            <h2 className="text-2xl font-bold text-blue-300 mt-6 mb-2">Pending Ride Requests</h2>
            <RideRequests driver={driver} />
            <h2 className="text-2xl font-bold text-green-300 mt-10 mb-2">Past Rides</h2>
            <ViewPastRides driverId={driver.id} />
          </>
        ) : (
          <p className="text-white text-center">Loading driver info...</p>
        )}
      </main>
    </div>
  );
}
