import {db} from "../db.js"; 
import express from "express";

const router = express.Router() ;

router.get('/driver-found' , async (req, res) => {
    // it will store vehicleType from the request cominf .
    const {vehicleType} = req.query ;
    if(!vehicleType) return res.status(400).json({error : "VehilceType is required"}) ;

    try {
const [rows] = await db.query(`select * from users where role ='driver' and vehicleType = ?`, [vehicleType]) ;
res.json(rows);
    }
    catch (err) {
        console.error("DB Error: " ,err);
    res.status(500).json({error : "Database error"});
    }
});


export default router;