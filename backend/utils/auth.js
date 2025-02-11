import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/db.js";
dotenv.config();



export const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: "7d" });

  // Set token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict",
  });
  return token;
};

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
    
      
    // const token = authHeader.split(" ")[1];
      
      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_KEY);
  
      // Get user from database (excluding password)
      const [user] = await pool.query("SELECT id, name, email, phone FROM users WHERE id = ?", [
        decoded.id,
      ]);
  
      if (!user.length) {
        return res.status(401).json({ message: "User not found" });
      }
  
      req.user = user[0]; // Attach user data to request object
      next(); // Move to next middleware/route
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
