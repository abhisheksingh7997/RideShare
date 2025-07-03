import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ArcMap from "../components/ArcMap";
import LocationInputs from "../components/LocationInputs";

import UserGreeting from "../components/UserGreeting";
import { fetchSuggestions, geocodeAddress } from "../utils/Geocode";
import axios from "axios";
import RideOptions from "../components/RideOptions";
 import DriverSearching from "../components/DriverSearching";
export default function PassengerDashboard() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [user, setUser] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [showRideOptions , setShowRideOptions] = useState(false);
  const [showDriverSearching , setShowDriverSearching] = useState(false);
  const [rideType, setRideType] = useState("");



  const navigate = useNavigate();

  // ye current location ko fetch karega 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log(position);
      },
      (err) => console.error("Location access denied", err)
    );
  }, []);

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

  const handleBookRide = async () => {
    if (!pickup || !dropoff)
      return alert("Please enter both pickup and dropoff locations");
    const pickupLoc = await geocodeAddress(pickup);
    const dropoffLoc = await geocodeAddress(dropoff);
    if (!pickupLoc || !dropoffLoc)
      return alert("Unable to find coordinates. Try different locations.");
    setPickupCoords(pickupLoc);
    setDropoffCoords(dropoffLoc);
    setShowRideOptions(true);
    console.log("searching is started");
  };
const handleRideTypeSelect = (type) => {
    setRideType(type);
    setShowDriverSearching(true);
  };
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
     <div className="flex flex-col items-center px-4 py-10 pt-28 max-w-7xl mx-auto">

        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between">
             {/* left side having input details  */}
          <div className="flex-1">
            <UserGreeting user={user} />
            {!showRideOptions? (
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
              handleBookRide= {handleBookRide}
            />)
        
            :!showDriverSearching ? 
            (<RideOptions selected={rideType} onSelect={handleRideTypeSelect}/>):(
              <DriverSearching/>
            )
}
          </div>

          {/* map is in right side*/}
         
          {(pickupCoords || currentCoords) && (
          <div className="flex-1 flex justify-center items-center">
            <h2 className="text-lg font-semibold mb-4 text-center lg:text-left text-blue-500 hover:text-gray-300">
              Route Map
            </h2>
            <ArcMap
              pickupCoords={pickupCoords}
              dropoffCoords={dropoffCoords}
              currentCoords={currentCoords}
            />
          </div>
        )}
          
        </div>
</div>
    </div>
  );
} 