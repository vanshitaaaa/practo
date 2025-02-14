import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import DoctorList from './pages/DoctorList';
import PatientStory from "./pages/PatientStory";
import BookingAppointment from './pages/BookingAppointment';
import React from "react";
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';



function App() {


  return (

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path='/doctorlist' element={<DoctorList />}/>
                <Route path="/doctors/:doctorId" element={<PatientStory />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<PrivateRoute />}></Route>
                   <Route path="/book-appointment/:doctorId" element={<BookingAppointment />} />
                <Route/>
                
                
            </Routes>

  )
}

export default App;
