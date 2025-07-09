
function Earnings() {
  // Sample earnings data
  const earnings = {
    total: 2450,
    rides: 12,
    averageFare: 204,
    recent: [
      {
        pickup: "Sector 21",
        dropoff: "DLF Cyber Hub",
        fare: 250,
        date: "2025-07-08T09:45:00Z",
      },
      {
        pickup: "MG Road",
        dropoff: "Airport T3",
        fare: 450,
        date: "2025-07-07T18:10:00Z",
      },
      {
        pickup: "Connaught Place",
        dropoff: "Rajiv Chowk",
        fare: 120,
        date: "2025-07-06T14:30:00Z",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Driver Earnings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-gray-300 text-sm">Total Earnings</p>
          <p className="text-2xl font-bold text-green-300">₹{earnings.total}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-gray-300 text-sm">Rides Completed</p>
          <p className="text-2xl font-bold text-blue-300">{earnings.rides}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-gray-300 text-sm">Average Fare</p>
          <p className="text-2xl font-bold text-yellow-300">₹{earnings.averageFare}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4">Recent Rides</h2>
      <div className="space-y-3">
        {earnings.recent.map((ride, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {ride.pickup} ➝ {ride.dropoff}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(ride.date).toLocaleString()}
                </p>
              </div>
              <p className="text-lg font-bold text-green-300">₹{ride.fare}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Earnings;
