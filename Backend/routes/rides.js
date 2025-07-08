import express from 'express';
import { db } from '../db.js';
const router = express.Router();

router.get('/past-rides/:driverId', async (req, res) => {
  const { driverId } = req.params;

  try {
    const [rides] = await db.execute(
      "SELECT * FROM rides WHERE driverId = ? ORDER BY createdAt DESC",
      [driverId]
    );

    res.json({ rides });
  } catch (err) {
    console.error("Error fetching past rides:", err);
    res.status(500).json({ error: "Failed to fetch past rides" });
  }
  router.put('/update-ride-status/:rideId',async(req,res)=>{
     const { status, driverId } = req.body;
  const { rideId } = req.params;

  try {
    await db.execute(
      "UPDATE rides SET status = ?, driverId = ? WHERE id = ?",
      [status, driverId || null, rideId]
    );

    res.json({ message: "Ride status updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update ride status" });
  }
  })
});

export default router;
