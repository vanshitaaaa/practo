
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import NavBar from "../components/NavBar";

const BookingAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        reason: ""
    });

    useEffect(() => {
        // **Redirect if not logged in**
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to be logged in to book an appointment!");
            navigate("/login");
            return;
        }

        // **Fetch doctor details**
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
                setDoctor(response.data);
            } catch (err) {
                console.error("Error fetching doctor:", err);
            }
        };
        fetchDoctor();

        // **Prefill user details**
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }));
        }
    }, [doctorId, navigate]);

    const availableSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSlot) {
            alert("Please select a time slot!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/api/appointments",
                { ...formData, doctorId, time: selectedSlot },
                { headers: { Authorization: token } }
            );

            alert("Appointment booked successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment!");
        }
    };

    if (!doctor) return <p>Loading doctor details...</p>;

    return (
        <div className="book-container">
            <NavBar />
            <div className="booking-container">
                
                <div className="doctor-card-container">
                    <DoctorCard doctor={doctor} hideBookButton={true} hidePatientStories={true} />
                </div>

           
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

                        <label>Time Slot:</label>
                        <select name="time" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
                            <option value="">Select a time slot</option>
                            {availableSlots.map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>

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


/*import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import NavBar from "../components/NavBar";

const BookingAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [slots, setSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        reason: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to be logged in to book an appointment!");
            navigate("/login");
            return;
        }

        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
                setDoctor(response.data);
            } catch (err) {
                console.error("Error fetching doctor:", err);
            }
        };

        const fetchSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/slots/${doctorId}`);
                setSlots(response.data);
            } catch (err) {
                console.error("Error fetching slots:", err);
            }
        };

        fetchDoctor();
        fetchSlots();

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }));
        }
    }, [doctorId, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSlot) {
            alert("Please select a time slot!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/api/appointments",
                { 
                    ...formData, 
                    doctorId, 
                    time: selectedSlot,
                    date: selectedDate.toISOString()
                },
                { headers: { Authorization: token } }
            );
            alert("Appointment booked successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment!");
        }
    };

    const getDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    if (!doctor) return <p>Loading doctor details...</p>;

    return (
        <div className="page-container">
            <NavBar />
            <div className="booking-main">
                <div className="booking-grid">
                    
                    <div className="doctor-info">
                        <DoctorCard doctor={doctor} hideBookButton={true} hidePatientStories={true} />
                    </div>

                   
                    <div className="booking-panel">
                        <h2 className="booking-title">Pick a time slot</h2>
                        
                       
                        <div className="date-selector">
                            <div className="date-list">
                                {getDates().map((date, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedDate(date)}
                                        className={`date-item ${
                                            selectedDate.toDateString() === date.toDateString()
                                                ? 'date-selected'
                                                : ''
                                        }`}
                                    >
                                        <div className="date-day">
                                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                        </div>
                                        <div className="date-number">
                                            {date.getDate()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                       
                        <div className="slots-section">
                            <h3 className="slots-title">Available Slots</h3>
                            <div className="slots-grid">
                                {slots.map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSlot(slot.time)}
                                        className={`slot-item ${
                                            selectedSlot === slot.time
                                                ? 'slot-selected'
                                                : ''
                                        }`}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                            </div>
                        </div>

                       
                        {selectedSlot && (
                            <form onSubmit={handleSubmit} className="booking-form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Reason for Visit</label>
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        rows="3"
                                        required
                                    />
                                </div>

                                <button type="submit" className="submit-button">
                                    Book Appointment
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingAppointment;*/