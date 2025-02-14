/*const express = require('express');
const router = express.Router();
const pool = require("../config/db.js"); // Import your MySQL connection pool

// Get all doctors with their clinic & patient story count
/*router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT d.id, d.name, d.experience, d.rating, 
                   l.name AS location, c.name AS clinic_name, c.address AS clinic_address,
                   COUNT(ps.id) AS story_count
            FROM doctors d
            JOIN locations l ON d.location_id = l.id
            JOIN doctor_clinic dc ON d.id = dc.doctor_id
            JOIN clinics c ON dc.clinic_id = c.id
            LEFT JOIN patient_stories ps ON d.id = ps.doctor_id
            WHERE d.category_id = ?  -- Assuming '2' is the category for Cold/Cough
            GROUP BY d.id, d.name, d.experience, d.rating, 
                     l.name, c.name, c.address;
        `;

        const [rows] = await pool.query(query, [2]);  // Replace '2' with dynamic input if needed
        res.json(rows);
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;*/
/*const express = require('express');
const router = express.Router();
const pool = require("../config/db.js"); // MySQL connection pool

// Get doctors based on category_id (dynamic)
router.get('/', async (req, res) => {
    try {
        const { category_id } = req.query; // Get category from query params

        let query = `
            SELECT d.id, d.name, d.experience, d.rating, 
                   l.name AS location, c.name AS clinic_name, c.address AS clinic_address,
                   COUNT(ps.id) AS story_count
            FROM doctors d
            JOIN locations l ON d.location_id = l.id
            JOIN doctor_clinic dc ON d.id = dc.doctor_id
            JOIN clinics c ON dc.clinic_id = c.id
            LEFT JOIN patient_stories ps ON d.id = ps.doctor_id
        `;

        // Apply category filter only if category_id is provided
        let queryParams = [];
        if (category_id) {
            query += ` WHERE d.category_id = ?`;
            queryParams.push(category_id);
        }

        query += ` GROUP BY d.id, d.name, d.experience, d.rating, l.name, c.name, c.address;`;

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;*/
const express = require('express');
const router = express.Router();
const pool = require("../config/db.js"); // MySQL connection pool

// Get doctors based on category name and location
router.get('/', async (req, res) => {
    try {
        const { query, location } = req.query; // Get category and location from query params

        let sqlQuery = `
            SELECT d.id, d.name, d.experience, d.rating, 
                   l.name AS location, c.name AS clinic_name, c.address AS clinic_address,
                   COUNT(ps.id) AS story_count
            FROM doctors d
            JOIN locations l ON d.location_id = l.id
            JOIN doctor_clinic dc ON d.id = dc.doctor_id
            JOIN clinics c ON dc.clinic_id = c.id
            LEFT JOIN patient_stories ps ON d.id = ps.doctor_id
            JOIN categories cat ON d.category_id = cat.id
            WHERE 1=1
        `;

        let queryParams = [];

        // Apply category filter if provided
        if (query) {
            sqlQuery += ` AND LOWER(cat.name) = LOWER(?)`; // Case-insensitive category match
            queryParams.push(query);
        }

        // Apply location filter if provided
        if (location) {
            sqlQuery += ` AND LOWER(l.name) = LOWER(?)`; // Case-insensitive location match
            queryParams.push(location);
        }

        sqlQuery += ` GROUP BY d.id, d.name, d.experience, d.rating, l.name, c.name, c.address;`;

        const [rows] = await pool.query(sqlQuery, queryParams);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get doctor details along with patient stories
/*router.get('/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Query to fetch doctor details along with patient stories
        const query = `
            SELECT 
                d.id AS doctor_id, d.name AS doctor_name, d.experience, d.rating, 
                l.name AS location, c.name AS clinic_name, c.address AS clinic_address,
                ps.id AS story_id, ps.patient_name, ps.story, ps.rating AS story_rating
            FROM doctors d
            JOIN locations l ON d.location_id = l.id
            JOIN doctor_clinic dc ON d.id = dc.doctor_id
            JOIN clinics c ON dc.clinic_id = c.id
            LEFT JOIN patient_stories ps ON d.id = ps.doctor_id
            WHERE d.id = ?
        `;

        const [rows] = await pool.query(query, [doctorId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Doctor not found or no stories available." });
        }

        // Format the response
        const doctorDetails = {
            doctor_id: rows[0].doctor_id,
            doctor_name: rows[0].doctor_name,
            experience: rows[0].experience,
            rating: rows[0].rating,
            location: rows[0].location,
            clinic_name: rows[0].clinic_name,
            clinic_address: rows[0].clinic_address,
            patient_stories: rows
                .filter(row => row.story_id) // Exclude doctors with no patient stories
                .map(row => ({
                    story_id: row.story_id,
                    patient_name: row.patient_name,
                    story: row.story,
                    story_rating: row.story_rating
                }))
        };

        res.json(doctorDetails);
    } catch (err) {
        console.error('Error fetching doctor stories:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});*/
router.get('/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Query to fetch doctor details along with patient stories
        const query = `
            SELECT 
                d.id AS doctor_id, d.name AS doctor_name, d.experience, d.rating, 
                l.name AS location, c.name AS clinic_name, c.address AS clinic_address,
                ps.id AS story_id, ps.patient_name, ps.story, ps.rating AS story_rating
            FROM doctors d
            JOIN locations l ON d.location_id = l.id
            JOIN doctor_clinic dc ON d.id = dc.doctor_id
            JOIN clinics c ON dc.clinic_id = c.id
            LEFT JOIN patient_stories ps ON d.id = ps.doctor_id
            WHERE d.id = ?
        `;

        const [rows] = await pool.query(query, [doctorId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Doctor not found." });
        }

        // Format the response
        const doctorDetails = {
            doctor_id: rows[0].doctor_id,
            doctor_name: rows[0].doctor_name,
            experience: rows[0].experience,
            rating: rows[0].rating,
            location: rows[0].location,
            clinic_name: rows[0].clinic_name,
            clinic_address: rows[0].clinic_address,
            patient_stories: rows.some(row => row.story_id) ? // Check if any stories exist
                rows.map(row => ({
                    story_id: row.story_id,
                    patient_name: row.patient_name,
                    story: row.story,
                    story_rating: row.story_rating
                })) : [] // Return an empty array if no stories exist
        };

        res.json(doctorDetails);
    } catch (err) {
        console.error('Error fetching doctor stories:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;
