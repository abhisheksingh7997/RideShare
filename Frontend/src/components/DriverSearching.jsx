import { useEffect, useState } from "react";
import DriverFoundCard from "../components/DriverFoundCard";
import socket from "../utils/socket";
import axios from "axios";

export default function DriverSearching({ rideType, distance, time, user, rideId, fare }) {
  const [dots, setDots] = useState("");
  const [matchedDriver, setMatchedDriver] = useState(null);
  const [requestDeclined, setRequestDeclined] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  const updateRideStatus = async (status, driverId) => {
    try {
      await axios.put(`http://localhost:5000/api/update-ride-status/${rideId}`, {
        status,
        driverId,
      });
    } catch (err) {
      console.error("Failed to update ride status:", err);
      console.log(rideType);
    }
  };

  useEffect(() => {
    if (!user || !rideId) return;
    let timeout;
    const handleDriverAccepted = ({ driver, passengerId, rideId: incomingRideId }) => {
      if (passengerId === user.id && incomingRideId === rideId) {
        setMatchedDriver(driver);
        updateRideStatus("accepted", driver.id);
        clearTimeout(timeout);
      }
    };
    const handleDriverDeclined = ({ passengerId, rideId: incomingRideId }) => {
      if (passengerId === user.id && incomingRideId === rideId) {
        setRequestDeclined(true);
        updateRideStatus("rejected", null);
        clearTimeout(timeout);
      }
    };
    timeout = setTimeout(() => {
      if (!matchedDriver && !requestDeclined) {
        alert("No driver responded within 2 minutes. Please try again later.");
        setRequestDeclined(true);
        updateRideStatus("rejected", null);
      }
    }, 2 * 60 * 1000);
    socket.on("driverAccepted", handleDriverAccepted);
    socket.on("driverDeclined", handleDriverDeclined);
    return () => {
      socket.off("driverAccepted", handleDriverAccepted);
      socket.off("driverDeclined", handleDriverDeclined);
      clearTimeout(timeout);
    };
  }, [user, rideId]);

  return (
    <div className="w-full bg-transparent text-white rounded-xl shadow-lg p-10 min-h-[400px] flex flex-col items-center justify-center transition-all duration-500">
      {!matchedDriver && !requestDeclined && (
        <>
          <div className="animate-pulse bg-blue-100 p-6 rounded-full mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              alt="Car"
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            Searching for a driver{dots}
          </h2>
          <p className="text-gray-500 text-sm mb-4 text-center">
            Please wait while we find the nearest available driver for your ride.
          </p>
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </>
      )}

      {matchedDriver && (
        <DriverFoundCard driver={matchedDriver} distance={distance} time={time} price={fare} />
      )}

      {requestDeclined && !matchedDriver && (
        <p className="text-red-400 mt-4 text-center">
          All drivers declined the request or no response was received in time. Please try again later.
        </p>
      )}
    </div>
  );
}
