import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const rideTypes = [
  {
    type: "Car",
    icon: "https://cdn-icons-png.flaticon.com/128/12689/12689302.png",
  },
  {
    type: "Auto",
    icon: "https://cdn-icons-png.flaticon.com/128/4781/4781286.png",
  },
  {
    type: "Bike",
    icon: "https://cdn-icons-png.flaticon.com/128/2264/2264768.png",
  },
];

function RideOptions({ selected, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(selected || "");

  const handleSelect = (type) => {
    setSelectedOption(type);
    if (onSelect) onSelect(type);
   
  };

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {rideTypes.map(({ type, icon }) => (
        <div
          key={type}
          onClick={() => handleSelect(type)}
          className={`flex flex-col items-center p-6 rounded-xl cursor-pointer transition-all border-2 ${
            selectedOption === type
              ? "border-blue-500 bg-blue-900/30"
              : "border-gray-700 hover:border-blue-400"
          }`}
        >
          <img src={icon} alt={type} className="w-16 h-16 mb-4" />
          <span className="text-lg font-medium">{type}</span>
        </div>
      ))}
    </div>
  );
}

export default RideOptions;
