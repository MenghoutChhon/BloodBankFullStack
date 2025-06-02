import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import "./DonorLogin.css";
import axios from "axios";

const DonorLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter valid credentials.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/api/donors/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/donor/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="donor-login-root">
      <div className="donor-login-card">
        <h2 className="donor-login-title">
          Welcome Back Donor! <span role="img" aria-label="blood">🩸</span>
        </h2>
        <form onSubmit={handleSubmit} className="donor-login-form">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="donor-login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="donor-login-bottom">
          <button
            className="donor-login-link donor-login-forgot-btn"
            type="button"
            onClick={() => navigate("/donor/forgot-password")}
          >
            Forgot password?
          </button>
          {/* Optional: If you want to add a register link, do it subtly below */}
          {/* <div style={{ marginTop: 10, fontSize: 14 }}>
            New donor?{" "}
            <span
              className="donor-login-link"
              style={{ color: "#d6002f", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/donor/register")}
            >
              Register
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;
