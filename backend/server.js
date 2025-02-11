import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Import the database connection
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import ssrRoutes from "./routes/ssrRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));


app.use("/" , ssrRoutes);
app.use("/api/auth" , authRoutes);
// Test API Route
app.get("/", (req, res) => {
  res.send("Practo Clone Backend is Running 🚀");
});

// Get all doctors (Example API)
app.get("/doctors", (req, res) => {
    console.log("yoo");
  pool.query("SELECT * FROM doctors", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
