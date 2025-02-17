const express = require('express');
const router = express.Router();
const pool = require("../config/db.js");


router.get('/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    const query = `SELECT * FROM slots WHERE doctor_id = ? AND is_available = TRUE`;
     
    try {
        const [slots] = await pool.query(query, [doctorId]);
        res.json(slots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching slots" });
    }
});


module.exports = router;