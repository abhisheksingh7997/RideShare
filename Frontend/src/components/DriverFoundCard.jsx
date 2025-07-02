import { PhoneIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

export default function DriverFoundCard({ driver }) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
         Driver Found ✌️
      </h2>

      <div className="flex items-center mb-4">
        <img
          src={driver?.photo || "https://cdn-icons-png.flaticon.com/512/8847/8847419.png"}
          alt="Driver"
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">{driver?.name || "Unknown"}</h3>
          <p className="text-sm text-gray-600">Rating: ⭐ {driver?.rating || 4.8}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <p className="text-gray-700 text-sm">
          <strong>Car:</strong> {driver?.car || "Hyundai i20"}<br />
          <strong>Plate:</strong> {driver?.plate || "MP09 AB 1234"}<br />
          <strong>ETA:</strong> {driver?.eta || "4 min"}
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
          <PhoneIcon className="h-5 w-5" />
          Call
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          Message
        </button>
      </div>
    </div>
  );
}
