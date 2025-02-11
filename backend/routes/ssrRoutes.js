import pool from "../config/db.js";
import express from "express";
const router = express.Router();

router.get("/listings", async (req, res) => {
    try {
      const { name, experience } = req.query;
  
      let query = "SELECT * FROM doctors WHERE 1=1";
      let params = [];
      params.push(name , experience);
  
      //if (specialty) {
       // query += " AND specialty = ?";
       // params.push(specialty);
      //}
      //if (location) {
      //  query += " AND location = ?";
       // params.push(location);
     // }
  
      const [doctors] = await pool.query(query, params);
  
      res.render("listings", { doctors, name, experience }); // Renders 'listings.ejs'
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  
  export default router;