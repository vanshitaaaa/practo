import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import DoctorList from './pages/DoctorList';
import PatientStory from "./pages/PatientStory";
import BookingAppointment from './pages/BookingAppointment';
import React from "react";
//import LoginSignup from './pages/Login';



function App() {


  return (

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path='/doctorlist' element={<DoctorList />}/>
                <Route path="/doctors/:doctorId" element={<PatientStory />} /> 
                <Route path="/book-appointment/:doctorId" element={<BookingAppointment />} />

                
                
            </Routes>

  )
}

export default App;
