import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import DriverFoundCard from "../components/DriverFoundCard";
export default function DriverSearching({ onDriverFound }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    // Simulate driver found after 5 seconds
    const timeout = setTimeout(() => {
      onDriverFound && onDriverFound();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onDriverFound]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-950 rounded-xl shadow-lg p-10">
      {/* Pulsing car icon */}
      <div className="animate-pulse bg-blue-100 p-6 rounded-full mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
          alt="Car"
          className="w-16 h-16"
        />
      </div>

      {/* Searching text */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Searching for a driver{dots}
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Please wait while we find the nearest available driver for your ride.
      </p>

      {/* Optional loading spinner */}
      <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <DriverFoundCard/>
    </div>
  );
}
