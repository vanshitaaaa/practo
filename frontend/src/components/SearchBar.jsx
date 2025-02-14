/*import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (!query) return;
    // Redirecting via window.location to avoid using useNavigate
    window.location.href =  `/doctorlist?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input 
          type="text"
          placeholder="Search doctors, clinics, hospitals..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="location-input-wrapper">
        <MapPin className="location-icon" />
        <input 
          type="text"
          placeholder="Location"
          className="location-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;*/
/*import React from "react";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const querySuggestions = [
    "Dentist", "Cold/Cough", "Cardiologist", "Dermatologist",
    "General Physician", "ENT Specialist", "Pediatrician", "Neurologist",
    "Gynecologist", "Psychiatrist", "Orthopedic", "Urologist",
    "Ophthalmologist", "Endocrinologist", "Nephrologist", "Gastroenterologist"
  ];

  const locationSuggestions = [
    "HSR Layout", "Indiranagar", "Jayanagar", "Koramangala", "Whitefield",
    "MG Road", "Electronic City", "Banashankari", "Marathahalli", "Rajajinagar"
  ];

  const handleSearch = () => {
    if (!query) return;
    window.location.href = `/doctorlist?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;
  };

  return (
    <div className="search-container">
 
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input 
          type="text"
          placeholder="Search doctors, clinics, hospitals..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowQuerySuggestions(true)}
          onBlur={() => setTimeout(() => setShowQuerySuggestions(false), 200)}
        />
        {showQuerySuggestions && (
          <ul className="suggestions">
            {querySuggestions.map((item) => (
              <li key={item} onClick={() => setQuery(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <div className="location-input-wrapper">
        <MapPin className="location-icon" />
        <input 
          type="text"
          placeholder="Location"
          className="location-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setShowLocationSuggestions(true)}
          onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
        />
        {showLocationSuggestions && (
          <ul className="suggestions">
            {locationSuggestions.map((loc) => (
              <li key={loc} onClick={() => setLocation(loc)}>
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;*/
import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const navigate = useNavigate();

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const querySuggestions = [
    "Dentist", "Cold/Cough", "Cardiologist", "Dermatologist",
    "General Physician", "ENT Specialist", "Pediatrician", "Neurologist",
    "Gynecologist", "Psychiatrist", "Orthopedic", "Urologist",
    "Ophthalmologist", "Endocrinologist", "Nephrologist", "Gastroenterologist"
  ];

  const locationSuggestions = [
    "HSR Layout", "Indiranagar", "Jayanagar", "Koramangala", "Whitefield",
    "MG Road", "Electronic City", "Banashankari", "Marathahalli", "Rajajinagar"
  ];

  const handleSearch = () => {
    if (!query) return;
    if (isClient) {
      navigate(`/doctorlist?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="search-container">
     
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input 
          type="text"
          placeholder="Search doctors, clinics, hospitals..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowQuerySuggestions(true)}
          onBlur={() => setTimeout(() => setShowQuerySuggestions(false), 200)}
        />
        {isClient && showQuerySuggestions && (
          <ul className="suggestions">
            {querySuggestions.map((item) => (
              <li key={item} onClick={() => setQuery(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

     
      <div className="location-input-wrapper">
        <MapPin className="location-icon" />
        <input 
          type="text"
          placeholder="Location"
          className="location-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setShowLocationSuggestions(true)}
          onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
        />
        {isClient && showLocationSuggestions && (
          <ul className="suggestions">
            {locationSuggestions.map((loc) => (
              <li key={loc} onClick={() => setLocation(loc)}>
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;

/*import React, { useState, useEffect, useContext } from "react";
import { Search, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../pages/AuthContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    if (!query) return;
    if (isClient) {
      navigate(`/doctorlist?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input 
          type="text"
          placeholder="Search doctors, clinics, hospitals..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowQuerySuggestions(true)}
          onBlur={() => setTimeout(() => setShowQuerySuggestions(false), 200)}
        />
      </div>

      <div className="location-input-wrapper">
        <MapPin className="location-icon" />
        <input 
          type="text"
          placeholder="Location"
          className="location-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setShowLocationSuggestions(true)}
          onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
        />
      </div>

      <button onClick={handleSearch} className="search-button">Search</button>
      
      {user ? (
        <button onClick={logout} className="auth-button">Logout</button>
      ) : (
        <button onClick={handleLoginClick} className="auth-button">
          <User className="auth-icon" /> Login / Signup
        </button>
      )}
    </div>
  );
};

export default SearchBar;*/
