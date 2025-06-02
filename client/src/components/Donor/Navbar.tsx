import React from "react";
import "./DonorShared.css";

const Navbar = () => (
  <header className="navbar">
    <div className="navbar-inner">
      <div className="navbar-logo">
        <span className="logo-heart">🩸</span>
        <span className="logo-text">BloodDonate</span>
      </div>
      <nav className="navbar-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/ourteam" className="nav-link">Our Team</a>
        <a href="/contact" className="nav-link">Contact</a>
      </nav>
    </div>
  </header>
);

export default Navbar;
export {};
