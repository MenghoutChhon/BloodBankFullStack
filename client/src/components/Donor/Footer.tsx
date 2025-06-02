import React from "react";
import "./DonorShared.css";

const Footer = () => (
  <footer className="donor-footer">
    <div>
      <span className="logo-heart">🩸</span> <span className="logo-text">BloodDonate</span>
    </div>
    <div className="footer-small-links">
      <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a> | <a href="/contact">Contact</a>
    </div>
    <div className="footer-text">
      Connecting donors since 2023.<br />© {new Date().getFullYear()} BloodDonate. All rights reserved.
    </div>
  </footer>
);

export default Footer;
export {};
