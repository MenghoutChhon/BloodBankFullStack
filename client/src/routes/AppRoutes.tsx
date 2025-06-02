import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Publics/Home";
import Contact from "../pages/Publics/Contact";
import OurTeam from "../pages/Publics/OurTeam";
import DonorRegister from "../pages/Donor/Register";
import DonorDashboard from "../pages/Donor/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import About from "../pages/Publics/About";
import HospitalDashboard from "../pages/Hospital/HospitalDashboard";
import HospitalLogin     from "../pages/Hospital/HospitalLogin";
import DonorSurvey from "../components/Donor/DonorSurvey";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/team" element={<OurTeam />} />
    <Route path="/donor/survey" element={<DonorSurvey/>}/>
    <Route path="/donor/register" element={<DonorRegister />} />
    <Route path="/donor/dashboard" element={<DonorDashboard />} />

    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/login" element={<AdminLogin />} />

    <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
    <Route path="/hospital/login" element={<HospitalLogin />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;