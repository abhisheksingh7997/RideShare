import express from 'express';
import {db} from '../db.js';
const router = express.Router();
router.post("/book-ride", async (req, res) => {
  const { passengerId, pickup, dropoff, rideType, distance, time, fare , pickupCoords ,dropoffCoords} = req.body;
  try {
    const [result]  = await db.execute(
      "INSERT INTO rides (passengerId, pickup, dropoff, rideType, distance, time , fare,pickupCoords,dropoffCoords) VALUES (?, ?, ?, ?, ?, ? , ? , ? , ? )",
      [passengerId, pickup, dropoff, rideType, distance, time ,fare,JSON.stringify(pickupCoords),JSON.stringify(dropoffCoords)]
    );
    const rideId = result.insertId ;
    res.json({ message: "Ride booked successfully",rideId });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to book ride" });
  }
});
export default router;