import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import {verifyToken}  from "./middleware/verifyToken.js";
import dotenv from "dotenv";
import driverRoutes from "./routes/driver.js";
import rideRoutes from "./routes/bookRide.js";
import pastRidesRoutes from "./routes/rides.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin: "http://localhost:5173",
    methods:["GET","POST","PUT"]
  }
});
global.io = io ;
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", (req, res, next) => {
  console.log("Reached /api/auth route");
  next();
});
app.use("/api/auth", authRoutes);


app.get("/api/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});
io.on("connection",(socket)=>{
  console.log("New Client Connected:",socket.id);
  socket.on("rideRequest",(data)=>{
    console.log("Ride request from passenger:",data);
    io.emit("newRideRequest",data);
  });
  socket.on("acceptRide",({driver,passengerId})=>{
    console.log("Driver accepted:",driver);
    io.emit("driverAccepted",{driver,passengerId});
  });
  socket.on("declineRide",({driverId,passengerId})=>{
    io.emit("driverDeclined",{driverId,passengerId});
  });
  socket.on("driverLocationUpdate",({driverId , coords})=>{
    io.emit("driverLocation",{driverId,coords});
  });
  socket.on("disconnect",()=>{
    console.log("Client Disconnected:",socket.id);
  }
  )
})
app.use("/api",driverRoutes);
 app.use("/api",rideRoutes);
 app.use("/api",pastRidesRoutes);
server.listen(process.env.port, () =>
  console.log(`Server running on http://localhost:${process.env.port}`)

);
