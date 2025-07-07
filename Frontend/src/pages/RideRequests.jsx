// import { useEffect, useState } from "react"
// import socket from "../utils/socket";

// function RideRequests() {
//     const [rideRequests,setRideRequests] = useState([]);
//     useEffect(()=>{
//         socket.on("rideRequest",(request)=>{
//             setRideRequests((prev)=>[...prev,request]);
//         });
//         return ()=> socket.off("rideRequest");
//     },[]);
//     const handleAccept = (request)=>
//     {
//         socket.emit("rideAccepted" , {
//             passengerId:request.passengerId,
//             driverId:driver.id ,
//             driverInfo : driver ,
//         });
//          setRideRequests((prev) =>
//       prev.filter((r) => r.passengerId !== request.passengerId)
//     );
//     };
//     const handleDecline = (request) => {
//     socket.emit("rideDeclined", {
//       passengerId: request.passengerId,
//     });
//     setRideRequests((prev) =>
//       prev.filter((r) => r.passengerId !== request.passengerId)
//     );
//   };
//   return (
//     <div>
//        <h2 className="text-xl font-bold mb-4">Incoming Ride Requests</h2>
//       {rideRequests.map((req, i) => (
//         <div key={i} className="p-4 bg-gray-800 mb-2 rounded">
//           <p>Pickup: {req.pickup}</p>
//           <p>Dropoff: {req.dropoff}</p>
//           <p>Ride Type: {req.rideType}</p>
//           <button onClick={() => handleAccept(req)}>Accept</button>
//           <button onClick={() => handleDecline(req)}>Decline</button>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default RideRequests
