import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import axios from "axios";

const PatientStory = () => {
    const { doctorId } = useParams(); // Get doctorId from URL
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorAndStories = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
                setDoctor(response.data);
            } catch (err) {
                setError("Failed to fetch doctor details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorAndStories();
    }, [doctorId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!doctor) return <p>No doctor found.</p>;

    return (
        <div>
            {/* DoctorCard Component */}
            <DoctorCard doctor={doctor} hideBookButton={true} hidePatientStories={true}/>


            <h2>Patient Stories</h2>
            {doctor.patient_stories.length > 0 ? (
                <ul>
                    {doctor.patient_stories.map((story) => (
                        <li key={story.story_id}>
                            <h4>{story.patient_name}</h4>
                            <p>{story.story}</p>
                            <p>Rating: {story.story_rating} ⭐</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No patient stories available for this doctor.</p>
            )}
        </div>
    );
};

export default PatientStory;
