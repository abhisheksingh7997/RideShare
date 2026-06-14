import { useState, useEffect } from "react";
import api from "../api/api";

export default function ViewPastRides({ driverId }) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchPastRides = async () => {
      try {
        const res = await api.get(`/rides/driver/${driverId}`);
        console.log("Fetched rides:", res.data);
        setRides(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load past rides", err);
        setRides([]);
      }
    };

    if (driverId) {
      fetchPastRides();
    }
  }, [driverId]);

  return (
    <div className="p-6 text-white">

      {rides.length === 0 ? (
        <p className="text-gray-400">No rides assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-700 bg-gray-900 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-700">Pickup</th>
                <th className="px-4 py-2 border border-gray-700">Dropoff</th>
                <th className="px-4 py-2 border border-gray-700">Type</th>
                <th className="px-4 py-2 border border-gray-700">Status</th>
                <th className="px-4 py-2 border border-gray-700">Fare (₹)</th>
                <th className="px-4 py-2 border border-gray-700">Distance (km)</th>
                <th className="px-4 py-2 border border-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.rideId} className="text-center hover:bg-gray-800 transition">
                  <td className="px-4 py-2 border border-gray-700">{ride.pickup}</td>
                  <td className="px-4 py-2 border border-gray-700">{ride.dropoff}</td>
                  <td className="px-4 py-2 border border-gray-700">{ride.rideType}</td>
                  <td className="px-4 py-2 border border-gray-700">{ride.status}</td>
                  <td className="px-4 py-2 border border-gray-700">₹{ride.fare}</td>
                  <td className="px-4 py-2 border border-gray-700">{ride.distance}</td>
                  <td className="px-4 py-2 border border-gray-700">{ride.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
