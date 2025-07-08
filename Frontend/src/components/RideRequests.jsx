import { useEffect, useState } from "react";
import socket from "../utils/socket";
import ArcMap from "./ArcMap";

export default function RideRequests({ driver }) {
  const [rideRequests, setRideRequests] = useState([]);
  const [acceptedRide, setAcceptedRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [liveRouteInfo, setLiveRouteInfo] = useState(null); 
  useEffect(() => {
    const registerDriver = () => {
      if (driver) {
        socket.emit("registerDriver", {
          id: driver.id,
          vehicleType: driver.vehicleType.toLowerCase(),
        });
      }
    };

    if (driver && socket.connected) registerDriver();

    socket.on("connect", registerDriver);
    return () => socket.off("connect", registerDriver);
  }, [driver]);

  useEffect(() => {
    const handleNewRideRequest = (ride) => {
      setRideRequests((prev) => [...prev, ride]);
    };

    socket.on("newRideRequest", handleNewRideRequest);
    return () => socket.off("newRideRequest", handleNewRideRequest);
  }, []);

  useEffect(() => {
    if (!acceptedRide) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDriverLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("Driver location error:", err)
    );
  }, [acceptedRide]);

  const handleAccept = (ride) => {
    if (!driver?.id) return console.error("Driver not available");

    socket.emit("acceptRide", {
      driver: {
        id: driver.id,
        username: driver.username,
        vehicleType: driver.vehicleType,
        phoneNo: driver.phoneNo,
        vehicleNumber: driver.vehicleNumber,
      },
      passengerId: ride.passengerId,
      rideId: ride.rideId,
    });

    setAcceptedRide(ride);
    setRideRequests([]);
    setLiveRouteInfo(null); 
  };

  const handleDecline = (ride) => {
    if (!driver?.id) return console.error("Driver not available");

    socket.emit("declineRide", {
      driverId: driver.id,
      passengerId: ride.passengerId,
      rideId: ride.rideId,
    });

    setRideRequests((prev) => prev.filter((r) => r.rideId !== ride.rideId));
  };

  if (!driver) return <p className="text-white">Loading ride requests...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Incoming Ride Requests</h2>

      {acceptedRide && driverLocation ? (
        <div>
          <div className="bg-green-700 p-4 rounded-lg shadow text-white mb-4">
            <h3 className="text-lg font-semibold mb-2">Accepted Ride Details</h3>
            <p><strong>Pickup:</strong> {acceptedRide.pickup}</p>
            <p><strong>Dropoff:</strong> {acceptedRide.dropoff}</p>
            <p><strong>Type:</strong> {acceptedRide.rideType}</p>

            {liveRouteInfo ? (
              <>
                <p><strong>Live Distance:</strong> {liveRouteInfo.distance.toFixed(2)} km</p>
                <p><strong>Live Time:</strong> {liveRouteInfo.formattedTime}</p>
              </>
            ) : (
              <>
                <p><strong>Distance:</strong> {acceptedRide.distance.toFixed(2)} km</p>
                <p><strong>Time:</strong> {acceptedRide.time}</p>
              </>
            )}

            <p><strong>Fare:</strong> ₹{acceptedRide.fare.toFixed(2)}</p>
          </div>

          <ArcMap
            pickupCoords={acceptedRide.pickupCoords}
            currentCoords={driverLocation}
            dropoffCoords={acceptedRide.dropoffCoords}
            onRouteInfo={(info) => setLiveRouteInfo(info)}
          />
        </div>
      ) : rideRequests.length === 0 ? (
        <p className="text-gray-400">No ride requests yet.</p>
      ) : (
        rideRequests.map((ride, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-md mb-4 shadow flex justify-between items-center"
          >
            <div>
              <p><strong>Pickup:</strong> {ride.pickup}</p>
              <p><strong>Dropoff:</strong> {ride.dropoff}</p>
              <p><strong>Type:</strong> {ride.rideType}</p>
              <p><strong>Distance:</strong> {ride.distance.toFixed(2)} km</p>
              <p><strong>Time:</strong> {ride.time}</p>
              <p><strong>Fare:</strong> ₹{ride.fare.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                onClick={() => handleAccept(ride)}
              >
                Accept
              </button>
              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleDecline(ride)}
              >
                Decline
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
