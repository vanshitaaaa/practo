import React from 'react';
import {Calendar, Phone, Star, User, Clock } from 'lucide-react';
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Navbar from '../components/NavBar';




const Home = () => {
  const specialties = [
    {
      id: 1,
      title: "Period Doubts or Pregnancy",
      image: "https://clone-practo.vercel.app/images/home_irregular_painful_period.webp"
    },
    {
      id: 2,
      title: "Acne, pimple or skin issues",
      image: "https://clone-practo.vercel.app/images/home_acne.webp"
    },
    {
      id: 3,
      title: "Performance issues in bed",
      image: "https://clone-practo.vercel.app/images/home_performance_issues.svg"
    },
    {
      id: 4,
      title: "Cold, cough or fever",
      image: "https://clone-practo.vercel.app/images/home_coughing.webp"
    },
    {
      id: 5,
      title: "Child not feeling well",
      image: "https://clone-practo.vercel.app/images/home_pediatric.svg"
    },
    {
      id: 6,
      title: "Depression or anxiety",
      image: "https://clone-practo.vercel.app/images/home-mental-wellness.webp"
    }
  ];
  return (
    
    <div className="homepage">
      <Navbar/>
      
      <header className="hero">
        <div className="container">
          <h1>Your health, Our Priority</h1>
          <SearchBar/>
        </div>  
      </header>

     
      <section className="services">
        <div className="container">
          
          <div className="services-grid">
            <div className="service-card">
              <img src="https://clone-practo.vercel.app/images/instant_video_consulation.webp" alt="Video consultation" />
              <h3>Instant Video Consultation</h3>
              <p>connect within 60 sec</p>
            </div>

            <div className="service-card">
              <img src="https://clone-practo.vercel.app/images/find_doctors.webp" alt="Find doctors" />
              <h3>Find Doctors near you</h3>
              <p>confirmed appointments</p>

            </div>

            <div className="service-card">
              <img src="https://clone-practo.vercel.app/images/home_surgeries.webp" alt="Surgeries" />
              <h3>surgeries</h3>
              <p>safe and trusted</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="doctors">
        <div className="container">
        <h2>Consult top doctors online for any health concern</h2>
          <p>Private online consultations with verified doctors in all specialists</p>
          <div className="specialties-grid">
      {specialties.map((specialty) => (
        <div key={specialty.id} className="specialty-card">
          <img src={specialty.image} alt={specialty.title} className="specialty-image" />
          <p className="specialty-title">{specialty.title}</p>
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

