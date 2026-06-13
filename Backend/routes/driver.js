import { db } from "../db.js";
import express from "express";

const router = express.Router();


router.get('/driver-info/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`SELECT * FROM users WHERE id = ? AND role = 'driver'`, [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Driver not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ error: "Database error" });
    }
});
router.get('/driver-found', async (req, res) => {
    const { vehicleType } = req.query;
    if (!vehicleType) return res.status(400).json({ error: "VehilceType is required" });

    try {
        const [rows] = await db.query(`select * from users where role ='driver' and vehicleType = ?`, [vehicleType]);
        res.json(rows);
    }
    catch (err) {
        console.error("DB Error: ", err);
        res.status(500).json({ error: "Database error" });
    }
});




export default router;