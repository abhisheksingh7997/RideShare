import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ArcMap from "../components/ArcMap";
import LocationInputs from "../components/LocationInputs";
import UserGreeting from "../components/UserGreeting";
import { fetchSuggestions, geocodeAddress } from "../utils/Geocode";
import socket from "../utils/socket";
import axios from "axios";
import RideOptions from "../components/RideOptions";
import DriverSearching from "../components/DriverSearching";
import Pricing from "./Pricing";
import Feedback from "./Feedback";
import Contacts from "./Contacts";
import Footer from "./Footer";
import DriverFoundCard from "../components/DriverFoundCard";

export default function PassengerDashboard() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [user, setUser] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [showDriverSearching, setShowDriverSearching] = useState(false);
  const [rideType, setRideType] = useState("");
  const [distance, setDistance] = useState(null);
  const [formattedTime, setFormattedTime] = useState("");
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [requestDeclined, setRequestDeclined] = useState(false);
  const [fare, setFare] = useState(0);
  const [rideId, setRideId] = useState(null); 

  const navigate = useNavigate();



  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Unauthorized", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!distance) return;

    let ratePerKm = 0;
    if (rideType === "car") ratePerKm = 20;
    else if (rideType === "bike") ratePerKm = 10;
    else if (rideType === "auto") ratePerKm = 15;
    else ratePerKm = 12;

    setFare(distance * ratePerKm);
  }, [rideType, distance]);

  const handleBookRide = async () => {
    if (!pickup || !dropoff) return alert("Please enter both locations");

    const pickupLoc = await geocodeAddress(pickup);
    const dropoffLoc = await geocodeAddress(dropoff);

    if (!pickupLoc || !dropoffLoc)
      return alert("Unable to find coordinates. Try different locations.");

    setPickupCoords(pickupLoc);
    setDropoffCoords(dropoffLoc);
    setShowRideOptions(true);
  };

  const handleRideTypeSelect = async (type) => {
    setRideType(type);
    setShowDriverSearching(true);

    try {
      const res = await axios.post("http://localhost:5000/api/rides/book-ride", {
        pickup,
        dropoff,
        rideType: type,
        passengerId: user.id,
        distance,
        time: formattedTime,
        fare,
        pickupCoords,
        dropoffCoords
      });

      const newRideId = res.data.rideId;
      setRideId(newRideId); 
      localStorage.setItem("rideId",newRideId);
      socket.emit("registerRequest")
      socket.emit("rideRequest", {
        rideId: newRideId,
        passengerId: user.id,
        pickup,
        dropoff,
        rideType: type,
        distance,
        time: formattedTime,
        fare,
        pickupCoords,
        dropoffCoords
      });

      console.log("Ride stored & request sent");
    } catch (err) {
      console.error("Booking failed", err,pickupCoords,dropoffCoords);
    }
  };

  // Socket listeners for driver response
  useEffect(() => {
    const handleAccept = ({ driver, passengerId }) => {
      if (passengerId === user?.id) {
        setAssignedDriver(driver);
        setShowDriverSearching(false);
      }
    };

    const handleDecline = ({ passengerId }) => {
      if (user?.id === passengerId) {
        setShowDriverSearching(false);
        setRequestDeclined(true);
      }
    };

    socket.on("driverAccepted", handleAccept);
    socket.on("driverDeclined", handleDecline);
    socket.on("driverArrivedAlert", ({ rideId, message }) => {
  alert(message,rideId); // or show toast / modal
});


    return () => {
      socket.off("driverAccepted", handleAccept);
      socket.off("driverDeclined", handleDecline);
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Navbar />
      <div className="flex flex-col items-center px-4 py-10 pt-28 max-w-7xl mx-auto">
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between">
          <div className="flex-1">
            <UserGreeting user={user} />

            {!showRideOptions ? (
              <LocationInputs
                pickup={pickup}
                setPickup={setPickup}
                dropoff={dropoff}
                setDropoff={setDropoff}
                pickupSuggestions={pickupSuggestions}
                setPickupSuggestions={setPickupSuggestions}
                dropoffSuggestions={dropoffSuggestions}
                setDropoffSuggestions={setDropoffSuggestions}
                fetchSuggestions={fetchSuggestions}
                geocodeAddress={geocodeAddress}
                setPickupCoords={setPickupCoords}
                setDropoffCoords={setDropoffCoords}
                handleBookRide={handleBookRide}
              />
            ) : showDriverSearching ? (
              rideId ? (
                <DriverSearching
                  rideType={rideType}
                  distance={distance}
                  time={formattedTime}
                  user={user}
                  rideId={rideId}
                  fare={fare}
                />
              ) : (
                <p className="text-blue-400">Creating ride request...</p>
              )
            ) : assignedDriver ? (
              <DriverFoundCard
                driver={assignedDriver}
                distance={distance}
                time={formattedTime}
                fare={fare}
              />
            ) : requestDeclined ? (
              <p className="text-red-500 mt-4">
                No drivers accepted the ride. Please try again later.
              </p>
            ) : (
              <RideOptions selected={rideType} onSelect={handleRideTypeSelect} />
            )}
          </div>

          {(pickupCoords) && (
            <div className="flex-1 flex justify-center items-center">
              <ArcMap
                pickupCoords={pickupCoords}
                dropoffCoords={dropoffCoords}
                onRouteInfo={({ distance, formattedTime }) => {
                  setDistance(distance);
                  setFormattedTime(formattedTime);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <Pricing />
      <Feedback />
      <Contacts />
      <Footer />
    </div>
  );
}
