import { useEffect, useState } from "react";
import DriverFoundCard from "../components/DriverFoundCard";

export default function DriverSearching({ onDriverFound }) {
  const [dots, setDots] = useState("");
  const [showDriver, setShowDriver] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    // Show driver found card after 5 seconds
    const timeout = setTimeout(() => {
      setShowDriver(true);
      onDriverFound && onDriverFound();
    }, 7000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timeout);
    };
  }, [onDriverFound]);

  return (
    <div className="w-full bg-gray-950 text-white rounded-xl shadow-lg p-10 min-h-[400px] flex flex-col items-center justify-center transition-all duration-500">
     
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

      
      {showDriver && <DriverFoundCard />}
    </div>
  );
}
