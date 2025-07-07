import { useEffect, useState } from "react";
import DriverFoundCard from "../components/DriverFoundCard";
import axios from "axios";
export default function DriverSearching({ rideType, onDriverFound, distance, time }) {
  const [dots, setDots] = useState("");
  const [showDriver, setShowDriver] = useState(false);
  const [matchedDriver, setMatchedDriver] = useState(null);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    // Show driver found card after few seconds
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/driver-found", {
          params: { vehicleType: rideType },
        });
        if (res.data.length > 0) {
          setMatchedDriver(res.data[Math.floor(Math.random() * res.data.length)]);
        }
        setShowDriver(true);
        onDriverFound && onDriverFound();
      }
      catch (err) {
        console.log("Failed to fetch driver", err);
      }

    }, 5000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timeout);
    };
  }, [rideType, onDriverFound]);

  return (
    <div className="w-full bg-transparent text-white rounded-xl shadow-lg p-10 min-h-[400px] flex flex-col items-center justify-center transition-all duration-500">

      {!showDriver && (
        <>
          <div className="animate-pulse bg-blue-100 p-6 rounded-full mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              alt="Car"
              className="w-16 h-16"
            />
          </div>

          {/* Searching text */}
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            Searching for a driver{dots}
          </h2>
          <p className="text-gray-500 text-sm mb-4 text-center">
            Please wait while we find the nearest available driver for your ride.
          </p>

          {/* Loading spinner */}
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </>
      )}

      {/* show  drivers if selected requireents are met  */}
      {showDriver && matchedDriver && (
        <DriverFoundCard driver={matchedDriver} distance={distance} time={time} />)}

      {/* if no matcing driver is found  */}
      {showDriver && !matchedDriver && (
        <p>No Drivers found for {rideType} .Please try again Later .</p>
      )}
    </div>
  );
}
