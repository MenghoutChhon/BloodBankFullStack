import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-bg">
      <div className="home-center-container">
        <h1 className="home-title">
          Save Lives, Donate Blood <span className="hero-drop">🩸</span>
        </h1>
        <p className="home-desc">
          Your blood donation can save up to three lives.<br />
          Join our mission to ensure blood supplies are available for those in need across all hospitals and medical centers.
        </p>
        <div className="home-roles">
          <button className="role-card donor" onClick={() => navigate("/donor")}>
            <span className="role-emoji">🩸</span>
            <span className="role-title">User</span>
          </button>
          <button className="role-card hospital" onClick={() => navigate("/hospital/login")}>
            <span className="role-emoji">🏥</span>
            <span className="role-title">Hospital Staff</span>
          </button>
        </div>
        <footer className="home-footer">
          &copy; {new Date().getFullYear()} BloodDonate. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
