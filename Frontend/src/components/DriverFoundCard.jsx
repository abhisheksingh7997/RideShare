import {FaPhoneAlt , FaComments} from 'react-icons/fa';

export default function DriverFoundCard({driver}){
if(!driver) return null ;
return(
 <div className="border p-6 rounded-xl shadow-lg bg-gray-800 w-full max-w-md text-white">
  <h2 className="text-xl font-semibold mb-4">Driver Found</h2>

  <div className="flex items-center gap-4 mb-4">
    <img
      className="w-20 h-20 rounded-full object-cover border border-blue-500"
      src="https://cdn-icons-png.flaticon.com/512/5283/5283021.png"
      alt="Driver"
    />
    <div>
      <p className="text-lg font-semibold">{driver.username}</p>
    </div>
  </div>

  <p><strong>Phone No:</strong> {driver.phoneNo}</p>
  <p><strong>Vehicle Type:</strong> {driver.vehicleType}</p>
  <p><strong>Vehicle Number:</strong> {driver.vehicleNumber}</p>
  <p><strong>License Number:</strong> {driver.licenseNumber}</p>

{/* contact to driver options */}
  <div className="mt-6 flex gap-4 " >
    <button className='flex items-center gap-2 bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition'>
    <a href={`tel:${driver.phoneNo}`}>
    <FaPhoneAlt/> Call
    </a>
    </button>
    <button  className="flex items-center gap-2 bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded-lg transition">
    <FaComments/> Message
    </button>
  </div>
</div>

)

}