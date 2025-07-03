import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    phoneNo,
    licenseNumber,
    vehicleNumber,
    vehicleType,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (role === "driver") {
      await db.execute(
        `INSERT INTO users 
        (username, email, password, role, phoneNo, licenseNumber, vehicleNumber, vehicleType) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          username,
          email,
          hashedPassword,
          role,
          phoneNo,
          licenseNumber,
          vehicleNumber,
          vehicleType,
        ]
      );
    } else {
      await db.execute(
        `INSERT INTO users (username, email, password,phoneNo, role) 
         VALUES (?, ?, ?, ?, ?)`,
        [username, email, hashedPassword, phoneNo, role]
      );
    }

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "SignUp Error", error: err });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.key,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Login Error", error: err });
  }
});

export default router;
