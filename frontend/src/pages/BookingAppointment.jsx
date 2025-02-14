/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingAppointment = () => {
    const { doctorId } = useParams(); // Get doctor ID from URL
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
                setDoctor(response.data);
            } catch (err) {
                setError("Failed to fetch doctor details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [doctorId]);

    const availableSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"]; // Example slots

    const handleBooking = () => {
        if (!date || !selectedSlot) {
            alert("Please select a date and time slot.");
            return;
        }
        alert(`Appointment booked with Dr. ${doctor?.doctor_name} on ${date} at ${selectedSlot}`);
        // Here, you can send a request to backend for actual booking
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!doctor) return <p>No doctor found.</p>;

    return (
        <div>
            <h2>Book Appointment with Dr. {doctor.doctor_name}</h2>
            <p>Experience: {doctor.experience} years</p>
            <p>Rating: {doctor.rating} ⭐</p>
            <p>Clinic: {doctor.clinic_name}, {doctor.clinic_address}</p>
            
            <label>Select Date: </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            
            <h3>Select Time Slot</h3>
            <div>
                {availableSlots.map((slot) => (
                    <button key={slot} onClick={() => setSelectedSlot(slot)}>{slot}</button>
                ))}
            </div>
            
            <button onClick={handleBooking}>Confirm Appointment</button>
        </div>
    );
};

export default BookingAppointment;*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import NavBar from "../components/NavBar";

const BookingAppointment = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        reason: ""
    });

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
                setDoctor(response.data);
            } catch (err) {
                console.error("Error fetching doctor:", err);
            }
        };
        fetchDoctor();
    }, [doctorId]);
    const availableSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Appointment Details:", formData);
        alert("Appointment booked successfully!");
    };

    if (!doctor) return <p>Loading doctor details...</p>;

    return (
        <div className="book-container">

       <NavBar/>
        <div className="booking-container">
        
            {/* Doctor Card Section */}
            <div className="doctor-card-container">
            <DoctorCard doctor={doctor} hideBookButton={true} hidePatientStories={true}/>
            <div>
                {availableSlots.map((slot) => (
                    <button className="booking-button" key={slot} onClick={() => setSelectedSlot(slot)}>{slot}</button>
                ))}
            </div>

            </div>

            {/* Appointment Form Section */}
            <div className="appointment-form">
                <h2>Book an Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Phone:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                    <label>Time:</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />

                    <label>Reason for Visit:</label>
                    <textarea name="reason" value={formData.reason} onChange={handleChange} required />

                    <button type="submit">Confirm Appointment</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default BookingAppointment;

