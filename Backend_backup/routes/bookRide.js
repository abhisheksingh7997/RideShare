import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.post("/book-ride", async (req, res) => {
  const {
    passengerId,
    pickup,
    dropoff,
    rideType,
    distance,
    time,
    fare,
    pickupCoords,
    dropoffCoords
  } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO rides (passengerId, pickup, dropoff, rideType, distance, time, fare, pickupCoords, dropoffCoords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        passengerId,
        pickup,
        dropoff,
        rideType,
        distance,
        time,
        fare,
        JSON.stringify(pickupCoords),
        JSON.stringify(dropoffCoords)
      ]
    );

    const rideId = result.insertId;
    res.json({ message: "Ride booked successfully", rideId });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to book ride" });
  }
});

router.put("/update-ride-status/:rideId", async (req, res) => {
  const { status, driverId } = req.body;
  const { rideId } = req.params;

  console.log("Updating Ride ID:", rideId);
  console.log("New Status:", status, "Driver ID:", driverId);

  try {
    const [result] = await db.execute(
      "UPDATE rides SET status = ?, driverId = ? WHERE rideId = ?",
      [status, driverId || null, rideId]
    );

    console.log("DB Result:", result);
    res.json({ message: "Ride status updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update ride status" });
  }
});

router.get("/driver/:driverId", async (req, res) => {
  const { driverId } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM rides WHERE driverId = ? ORDER BY rideId DESC", [driverId]
    );
    res.json(rows);
  }
  catch (err) {
    console.error("error fetching driver rides :", err);
    res.status(500).json({ error: "failed to fetch rides" });
  }
});


export default router;
