import React from 'react';
import {Calendar, Phone, Star, User, Clock } from 'lucide-react';
import SearchBar from "../components/SearchBar";



const Home = () => {
  return (
    <div className="homepage">
      
      <header className="hero">
        <div className="container">
          <h1>Your health, Our Priority</h1>
          <SearchBar/>
        </div>  
      </header>

     
      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <Calendar className="service-icon" />
              <h3>Book Appointment</h3>
              <p>Book appointments with doctors instantly</p>
            </div>

            <div className="service-card">
              <Phone className="service-icon" />
              <h3>Video Consultation</h3>
              <p>Consult with doctors online via video call</p>
            </div>

            <div className="service-card">
              <User className="service-icon" />
              <h3>Health Records</h3>
              <p>Store and access your medical records securely</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="doctors">
        <div className="container">
          <h2>Top Doctors</h2>
          <div className="doctors-grid">
            {[1, 2, 3, 4].map((doctor) => (
              <div key={doctor} className="doctor-card">
                <div className="doctor-image"></div>
                <div className="doctor-info">
                  <h3>Dr. John Doe</h3>
                  <p className="specialty">Cardiologist</p>
                  <div className="rating">
                    <Star className="star-icon" />
                    <span>4.8 (240 reviews)</span>
                  </div>
                  <div className="availability">
                    <Clock className="clock-icon" />
                    <span>Available Today</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="download-app">
        <div className="container">
          <div className="app-content">
            <div className="app-info">
              <h2>Download our App</h2>
              <p>Get healthcare services at your fingertips. Book appointments, consult doctors, and manage your health records.</p>
              <div className="app-buttons">
                <button className="store-button">App Store</button>
                <button className="store-button">Play Store</button>
              </div>
            </div>
            <div className="app-mockup"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

