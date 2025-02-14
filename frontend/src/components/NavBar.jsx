import React, { useState } from "react";

const Navbar = () => {
  const [isCorporateOpen, setIsCorporateOpen] = useState(false);
  const [isProviderOpen, setIsProviderOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">Practo</div>

        {/* Menu Items */}
        <ul className="nav-links">
          {/* For Corporates Dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => setIsCorporateOpen(true)}
            onMouseLeave={() => setIsCorporateOpen(false)}
          >
            <span>For Corporates</span>
            {isCorporateOpen && (
              <ul className="dropdown-menu">
                <li>Health & Wellness</li>
                <li>Group Insurance</li>
              </ul>
            )}
          </li>

          {/* For Providers Dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => setIsProviderOpen(true)}
            onMouseLeave={() => setIsProviderOpen(false)}
          >
            <span>For Providers</span>
            {isProviderOpen && (
              <ul className="dropdown-menu">
                <li>Doctor Enrollment</li>
                <li>Clinic Solutions</li>
              </ul>
            )}
          </li>

          {/* Security Link */}
          <li>Security</li>
        </ul>

        {/* Login / Signup Button */}
        <button className="login-btn">Login / Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
