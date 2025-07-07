import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import {verifyToken}  from "./middleware/verifyToken.js";
import dotenv from "dotenv";
import driverRoutes from "./routes/driver.js";
import rideRoutes from "./routes/bookRide.js";

// Load environment variables
dotenv.config();


const app = express();
 
 //  Enable CORS from frontend
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true
}));

//  Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Routes mounting
app.use("/api/auth", (req, res, next) => {
  console.log("Reached /api/auth route");
  next();
});
app.use("/api/auth", authRoutes);


// Protected route test
app.get("/api/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

// fetching driver details
app.use("/api",driverRoutes);
//  // fetching ride details 
 app.use("/api",rideRoutes);
// Server start
app.listen(process.env.port, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.port}`)

);
