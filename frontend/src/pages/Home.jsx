/*import React from 'react';
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
      
      <section className="services">
         <SearchBar/>
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

export default Home;*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Instant Video Consultation",
      description: "Connect within 60 secs",
      image: "https://clone-practo.vercel.app/images/instant_video_consulation.webp",
      path: "/video-consult"
    },
    {
      id: 2,
      title: "Find Doctors Near You",
      description: "Confirmed appointments",
      image: "https://clone-practo.vercel.app/images/find_doctors.webp",
      path: "/doctors"
    },
    {
      id: 3,
      title: "Surgeries",
      description: "Safe and trusted surgery centers",
      image: "https://clone-practo.vercel.app/images/home_surgeries.webp",
      path: "/surgeries"
    }
  ];

  const specialties = [
    {
      id: 1,
      title: "Period doubts or Pregnancy",
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
      <Navbar />
      
      <div className="hero-section">
        <div className="container">
          <SearchBar />
        </div>
      </div>

      <section className="services">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="service-card"
                onClick={() => navigate(service.path)}
              >
                <img src={service.image} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="doctors">
        <div className="container">
          <h2>Consult top doctors online for any health concern</h2>
          <p>Private online consultations with verified doctors in all specialists</p>
          
          <div className="specialties-grid">
            {specialties.map((specialty) => (
              <div 
                key={specialty.id} 
                className="specialty-card"
                onClick={() => navigate(`/doctors?specialty=${specialty.title.toLowerCase()}`)}
              >
                <img 
                  src={specialty.image} 
                  alt={specialty.title} 
                  className="specialty-image" 
                />
                <p className="specialty-title">{specialty.title}</p>
                <p className="consult-now">CONSULT NOW</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="download-app">
        <div className="container">
          <div className="app-content">
            <div className="app-info">
              <h2>Download the Practo app</h2>
              <p>Access video consultation with India's top doctors on the Practo app. Connect with doctors online, available 24/7, from the comfort of your home.</p>
              <div className="app-buttons">
                <button className="store-button">Get it on Play Store</button>
                <button className="store-button">Download on App Store</button>
              </div>
            </div>
            <div className="app-image">
              <img 
                src="https://clone-practo.vercel.app/images/app.webp" 
                alt="Practo App" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

