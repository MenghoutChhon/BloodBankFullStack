import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import "./DonorRegister.css";
import axios from "axios";

const DonorRegister: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      form.password !== form.confirmPassword
    ) {
      alert("Please complete all fields and ensure passwords match.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/api/donors/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      login(res.data.user, res.data.token);
      navigate("/donor/survey");
    } catch (error) {
      alert("Registration failed");
    }
    setIsLoading(false);
  };
  
  return (
    <div className="donor-page-container">
      <div className="donor-register-card">
        <h2 className="donor-register-title">Register as a Donor 🩸</h2>
        <form onSubmit={handleRegister} className="donor-register-form">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
          <button type="submit" className="donor-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegister;
