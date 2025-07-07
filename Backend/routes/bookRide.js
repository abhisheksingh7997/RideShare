import express from 'express';
import {db} from '../db.js';
const router = express.Router();
router.post("/book-ride", async (req, res) => {
  const { passengerId, pickup, dropoff, rideType, distance, time } = req.body;
  try {
    await db.execute(
      "INSERT INTO rides (passengerId, pickup, dropoff, rideType, distance, time) VALUES (?, ?, ?, ?, ?, ?)",
      [passengerId, pickup, dropoff, rideType, distance, time]
    );
    res.json({ message: "Ride booked successfully" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to book ride" });
  }
});
export default router;