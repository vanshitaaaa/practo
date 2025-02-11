import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { generateToken, protect } from "../utils/auth.js";
import dotenv from "dotenv";


dotenv.config();
const router = express.Router();

// **User Signup**
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert User
    await pool.query("INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)", [
      name,
      email,
      hashedPassword,
      phone,
    ]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// **User Login**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log("=====");
    // Generate JWT Token
    const token = generateToken(res, user[0].id);
    console.log("11111");

    res.json({ message: "Login successful" , token});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// **User Logout**
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});



// Check if user is authenticated and return user info

router.get("/me", protect, async (req, res) => {
    res.json(req.user); // The protect middleware already fetched user data
  });
  

export default router;
