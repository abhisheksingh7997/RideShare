import { FaPhoneAlt, FaComments } from 'react-icons/fa';

export default function DriverFoundCard({ driver, distance, time ,fare}) {

  
  return (
    <div className="border p-6 rounded-xl shadow-lg bg-gray-800 w-full max-w-md text-white">
      <h2 className="text-xl font-semibold mb-4">Driver Found</h2>

      <div className="bg-gray-800 p-4 rounded-xl shadow-md mb-4">


        <img
          src="https://cdn-icons-png.flaticon.com/512/5283/5283021.png"
          alt="Driver Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500 mb-2"
        />
        <p><strong>Username:</strong> {driver.username}</p>
        <p><strong>Phone:</strong> {driver.phoneNo}</p>
        <p><strong>Vehicle:</strong> {driver.vehicleType} - {driver.vehicleNumber}</p>
      </div>
      {distance && time && (
        <div className="text-white mt-4">
          <p><strong>Estimated Distance:</strong> {distance.toFixed(2)} km</p>

          <p><strong>Estimated Time:</strong> {time}</p>
          <p><strong>Estimated Price:</strong> ₹{fare}</p>

        </div>
      )}

      <div className="mt-6 flex gap-4 " >
        <button className='flex items-center gap-2 bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition'>
          <a href={`tel:${driver.phoneNo}`}>
            <FaPhoneAlt /> Call
          </a>
        </button>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded-lg transition">
          <FaComments /> Message
        </button>
      </div>
    </div>

  )

}