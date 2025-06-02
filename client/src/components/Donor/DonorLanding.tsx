import React from "react";
import { useNavigate } from "react-router-dom";
import "./DonorShared.css";

const DonorLanding: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="donor-landing-bg">
      <main className="donor-center-wrapper">
        {/* Hero Section */}
        <section className="donor-banner">
          <h1>Welcome Donor! <span className="logo-heart">🩸</span></h1>
          <p>
            Thank you for choosing to save lives. One blood donation can help save up to <b>three lives</b>.
            Please <b>sign in</b> or <b>register</b> to start making a difference!
          </p>
          <div className="donor-cta-buttons">
            <button onClick={() => navigate("/donor/login")} className="cta-btn login-btn">🔐 Login</button>
            <button onClick={() => navigate("/donor/register")} className="cta-btn register-btn">📝 Register</button>
          </div>
        </section>
        {/* Features */}
        <section className="donor-features">
          <h2>Why Become a Donor?</h2>
          <div className="features-list">
            <div className="feature-item"><span className="feature-icon">❤️</span><span className="feature-title">Save Lives</span><span className="feature-desc">Your blood donation can save up to three lives in emergencies.</span></div>
            <div className="feature-item"><span className="feature-icon">📱</span><span className="feature-title">Track Donations</span><span className="feature-desc">See your history and the impact you’ve made over time.</span></div>
            <div className="feature-item"><span className="feature-icon">🔔</span><span className="feature-title">Donation Alerts</span><span className="feature-desc">Get notified instantly when your blood type is needed nearby.</span></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DonorLanding;
