import { Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor , hideBookButton, hidePatientStories}) => {
  const navigate = useNavigate();

       const handleBookAppointment = () => {
        if (doctor?.id) {
            navigate(`/book-appointment/${doctor.id}`);
        }
       };
       const handleCardClick = () => {
        navigate( `/doctors/${doctor.id}`); // Redirecting to Patient Story Page
       };
  return (
    <div>

   
    <div className="doctor-card"
      onClick={handleCardClick} 
      style={{ cursor: "pointer" }}>
      <img src={doctor.image} alt={doctor.name} className="doctor-image" />
      <div className="doctor-info">
      <h3>{doctor.name}</h3>
      <p>Experience: {doctor.experience} years</p>
      <p>Rating: {doctor.rating} ⭐</p>
      <p>Location: {doctor.location}</p>
      <p>Clinic: {doctor.clinic_name}, {doctor.clinic_address}</p>
      {!hidePatientStories && (
    <a href={`/doctors/${doctor.id}`} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
        Patient Stories
    </a>
      )}
      </div>
    </div>
    {!hideBookButton && (
    <button className="book-button" onClick={handleBookAppointment}>
        Book Appointment
    </button>
     )}
    </div>

  );
};

export default DoctorCard;
