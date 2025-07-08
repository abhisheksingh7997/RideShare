import { useEffect, useState } from "react";
import axios from "axios";

function ViewPastRides({ driverId }) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/past-rides/${driverId}`);
        setRides(res.data.rides);
      } catch (err) {
        console.error("Failed to load rides", err);
      }
    };

    fetchRides();
  }, [driverId]);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Past Rides</h2>
      {rides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <ul className="space-y-4">
          {rides.map((ride) => (
            <li key={ride.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <p><strong>Pickup:</strong> {ride.pickup}</p>
              <p><strong>Dropoff:</strong> {ride.dropoff}</p>
              <p><strong>Type:</strong> {ride.rideType}</p>
              <p><strong>Distance:</strong> {ride.distance} km</p>
              <p><strong>Time:</strong> {ride.time}</p>
              <p><strong>Fare:</strong> ₹{ride.fare}</p>
              <p><strong>Status:</strong> {ride.status}</p>
              <p><strong>Date:</strong> {new Date(ride.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewPastRides;
