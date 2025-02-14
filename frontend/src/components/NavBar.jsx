/*import React, { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/"); // Redirect to homepage
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
      
        <div className="logo">Practo</div>
       
        <button className="login-btn">Login / Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;*/
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">Practo</div>

        {/* Login / Logout Button */}
        {isLoggedIn ? (
          <button className="login-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login / Sign Up</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

