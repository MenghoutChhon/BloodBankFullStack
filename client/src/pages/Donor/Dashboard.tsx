import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import "./DonorDashboard.css";

const DonorDashboard: React.FC = () => {
  const { user, setUser } = useAuthContext();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <div className="dashboard-header dashboard-header-flex">
          <div>
            <h2 className="dashboard-title">
              Welcome, {user?.name || user?.email || "Donor"}
            </h2>
            <div className="dashboard-subtext">
              Ready to save more lives today?
            </div>
          </div>
          <button
            className="dashboard-logout-btn"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span className="dashboard-icon-btn">
              <LogoutIcon className="dashboard-icon-logout" />
            </span>
            Logout
          </button>
        </div>
        <section>
          <div className="dashboard-card-row">
            {/* Profile Card */}
            <div className="dashboard-card" tabIndex={0}>
              <div className="dashboard-card-body">
                <AccountCircleIcon className="dashboard-icon" color="primary" />
                <div className="dashboard-card-title">My Profile</div>
                <div className="dashboard-card-text">
                  Update your information
                </div>
                <Link to="/donor/profile" className="dashboard-card-btn" tabIndex={0}>
                  Edit Profile
                </Link>
              </div>
            </div>
            {/* Book a Donation */}
            <div className="dashboard-card" tabIndex={0}>
              <div className="dashboard-card-body">
                <EventAvailableIcon className="dashboard-icon" color="primary" />
                <div className="dashboard-card-title">Book a Donation</div>
                <div className="dashboard-card-text">
                  Reserve your next donation slot
                </div>
                <Link to="/donor/booking" className="dashboard-card-btn" tabIndex={0}>
                  Make Booking
                </Link>
              </div>
            </div>
            {/* Donation History */}
            <div className="dashboard-card" tabIndex={0}>
              <div className="dashboard-card-body">
                <HistoryEduIcon className="dashboard-icon" color="primary" />
                <div className="dashboard-card-title">Donation History</div>
                <div className="dashboard-card-text">
                  See your past donations
                </div>
                <Link to="/donor/history" className="dashboard-card-btn dashboard-btn-outline" tabIndex={0}>
                  View History
                </Link>
              </div>
            </div>
            {/* Survey */}
            <div className="dashboard-card" tabIndex={0}>
              <div className="dashboard-card-body">
                <EventAvailableIcon className="dashboard-icon dashboard-icon-secondary" />
                <div className="dashboard-card-title">Pre-Donation Survey</div>
                <div className="dashboard-card-text">
                  Complete your pre-donation survey
                </div>
                <Link to="/donor/survey" className="dashboard-card-btn dashboard-btn-outline" tabIndex={0}>
                  Take Survey
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DonorDashboard;
