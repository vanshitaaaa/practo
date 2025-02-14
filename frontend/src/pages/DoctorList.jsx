import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard"; // Component for individual doctor
import SearchBar from "../components/SearchBar";
import React from "react";
import Navbar from "../components/NavBar";


/*const DoctorList = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const location = searchParams.get("location") || ""; // Default to empty if not provided
    const [doctors, setDoctors] = useState([]);
  
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          let apiUrl = `http://localhost:5000/api/doctors?query=${query}`;
          
          // Append location if it's provided
          if (location) {
            apiUrl += `&location=${location}`;
          }
  
          const response = await fetch(apiUrl);
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch doctors");
          }
  
          setDoctors(data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };
  
      fetchDoctors();
    }, [query, location]);
  
    return (
      <div>
        <div>
            <SearchBar/>
        </div>
        <h2>Doctors for "{query}" {location && `in ${location}`}</h2>
        {doctors.length > 0 ? (
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    );
  };
  
  export default DoctorList;*/
const DoctorList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const location = searchParams.get("location") || ""; // Default to empty if not provided
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filterBy, setFilterBy] = useState("");


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let apiUrl = `http://localhost:5000/api/doctors?query=${query}`;

        // Append location if it's provided
        if (location) {
          apiUrl += `&location=${location}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch doctors");
        }

        setDoctors(data);
        setFilteredDoctors(data); // Default to showing all doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [query, location]);

  // Filtering function
  const handleFilterChange = (filter) => {
    setFilterBy(filter);
    let sortedDoctors = [...doctors];

    if (filter === "experience") {
      sortedDoctors.sort((a, b) => b.experience - a.experience); // Sort by experience (high to low)
    } else if (filter === "rating") {
      sortedDoctors.sort((a, b) => b.rating - a.rating); // Sort by rating (high to low)
    }

    setFilteredDoctors(sortedDoctors);
  };

  return (
    <div>
      <div>
        <div>
          <Navbar/>
        </div>
        <SearchBar />
      </div>
      
      <h2>Doctors for "{query}" {location && `in ${location}`}</h2>

      {/* Filter Options */}
      <div className="filter-container">
        <button className={`filter-btn ${filterBy === "experience" ? "active" : ""}`} onClick={() => handleFilterChange("experience")}>
          Sort by Experience
        </button>
        <button className={`filter-btn ${filterBy === "rating" ? "active" : ""}`} onClick={() => handleFilterChange("rating")}>
          Sort by Rating
        </button>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="doctor-list">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorList;
