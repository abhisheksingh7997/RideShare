import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.key;

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extract actual token

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
