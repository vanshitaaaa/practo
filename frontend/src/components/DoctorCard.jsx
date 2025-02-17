/*import { Star } from "lucide-react";
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

export default DoctorCard;*/
import { Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor, hideBookButton, hidePatientStories }) => {
  const navigate = useNavigate();

  const handleBookAppointment = (e) => {
    e.stopPropagation();
    if (doctor?.id) {
      navigate(`/book-appointment/${doctor.id}`);
    }
  };

  const handleCardClick = () => {
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <div className="doctor-card" onClick={handleCardClick}>
      <img src={doctor.image} alt={doctor.name} className="doctor-image" />
      
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        
        <div className="rating-container">
          <span className="rating-badge">
            {doctor.rating} <Star size={12} className="inline" />
          </span>
          <span className="patient-stories">
            {doctor.patientStories} Patient Stories
          </span>
        </div>

        <p>{doctor.specialization}</p>
        <p>{doctor.experience} years experience overall</p>
        
        <div className="clinic-info">
          <p>{doctor.clinic_name}</p>
          <p>{doctor.clinic_address}</p>
        </div>

        <p className="consultation-fee">
          ₹{doctor.consultationFee} Consultation fee at clinic
        </p>

        {doctor.availableToday && (
          <div className="available-today">
            Available Today
          </div>
        )}
      </div>

      {!hideBookButton && (
        <button className="book-button" onClick={handleBookAppointment}>
          Book Clinic Visit
        </button>
      )}

      <button className="contact-clinic" onClick={(e) => e.stopPropagation()}>
        Contact Clinic
      </button>
    </div>
  );
};

export default DoctorCard;
