import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function LocationInputs({

  pickup,
  setPickup,
  dropoff,
  setDropoff,
  pickupSuggestions,
  setPickupSuggestions,
  dropoffSuggestions,
  setDropoffSuggestions,
  fetchSuggestions,
  geocodeAddress,
  setPickupCoords,
  setDropoffCoords,
  date,
  setDate,
  time,
  setTime,
  handleBookRide,

}) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex items-center bg-gray-100 p-3 rounded-md border-2
         focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span className="mr-2">📍</span>
          <input
            type="text"
            placeholder="Pickup location"
            value={pickup}
            onChange={async (e) => {
              const value = e.target.value;
              setPickup(value);
              setPickupSuggestions(await fetchSuggestions(value));
            }}
            className="bg-transparent outline-none w-full text-black "
          />
        </div>
        {pickupSuggestions.map((sug, i) => (
          <div
            key={i}
            className="bg-white text-black px-4 py-2 cursor-pointer border-b hover:bg-blue-600 hover:text-white"
            onClick={async () => {
              setPickup(sug.text);
              setPickupSuggestions([]);
              const coords = await geocodeAddress(sug.text, sug.magicKey);
              if (coords) setPickupCoords(coords);
            }}
          >
            {sug.text}
          </div>
        ))}
      </div>

      <div className="relative mt-4">
        <div className="flex items-center bg-gray-100 p-3 rounded-md text-black border-2 border-blue-950">
          <span className="mr-2">⬇️</span>
          <input
            type="text"
            placeholder="Dropoff location"
            value={dropoff}
            onChange={async (e) => {
              const value = e.target.value;
              setDropoff(value);
              setDropoffSuggestions(await fetchSuggestions(value));
            }}
            className="bg-transparent outline-none w-full"
          />
        </div>
        {dropoffSuggestions.map((sug, i) => (
          <div
            key={i}
            className="bg-white text-black px-4 py-2 cursor-pointer border-b hover:bg-blue-600 hover:text-white"
            onClick={async () => {
              setDropoff(sug.text);
              setDropoffSuggestions([]);
              const coords = await geocodeAddress(sug.text, sug.magicKey);
              if (coords) setDropoffCoords(coords);
            }}
          >
            {sug.text}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="flex items-center bg-gray-100 p-3 rounded-md w-full sm:w-1/2">
          <CalendarDaysIcon className="h-5 w-5 mr-2 text-gray-700" />
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent w-full outline-none text-black"
          >
            <option>Today</option>
            <option>Tomorrow</option>
          </select>
        </div>

        <div className="flex items-center bg-gray-100 p-3 rounded-md w-full sm:w-1/2">
          <ClockIcon className="h-5 w-5 mr-2 text-gray-700" />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-transparent w-full outline-none text-black"
          >
            <option>Now</option>
            <option>In 30 minutes</option>
            <option>In 1 hour</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-4 flex-wrap">


        <button
          onClick={() => handleBookRide()}
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition"
        >
          Book Ride
        </button>
      </div>
    </div>
  );
}
