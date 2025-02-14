import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard"; // Component for individual doctor
import SearchBar from "../components/SearchBar";
import React from "react";


const DoctorList = () => {
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
  
  export default DoctorList;