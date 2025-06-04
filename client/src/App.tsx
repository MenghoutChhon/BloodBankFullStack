import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import DonorLogin from "./components/Donor/DonorLogin";
import DonorRegister from "./components/Donor/DonorRegister";
import DonorDashboard from "./pages/Donor/Dashboard";
import DonorSurvey from "./components/Donor/DonorSurvey";
import DonorLanding from "./components/Donor/DonorLanding";
import DonorProfile from "./components/Donor/DonorProfile";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HospitalLogin from "./pages/Hospital/HospitalLogin";
import HospitalDashboard from "./pages/Hospital/HospitalDashboard";
import Home from "./pages/Publics/Home";
import About from "./pages/Publics/About";
import Contact from "./pages/Publics/Contact";
import Header from "./components/Header";
import AdminRouter from "./pages/Admin/AdminRouter";

function PrivateRoute({ children, role }: { children: React.ReactNode; role: string }) {
  const { user } = useAuthContext();
  if (!user || user.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
}

function AppRoutes() {
  // Get the current path
  const location = useLocation();

  // List all paths where header should NOT appear
  const hideHeaderPaths = [
    "/hospital/dashboard",
    "/admin/dashboard",
    "/admin", // Covers /admin/* (optional if your AdminRouter has its own layout)
    "/donor/dashboard",
    "/donor/survey",
  ];

  // You can also do this as a regex for more flexibility
  const hideHeader =
    hideHeaderPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Donor */}
        <Route path="/donor" element={<DonorLanding />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/register" element={<DonorRegister />} />
        <Route path="/donor/dashboard" element={
          <PrivateRoute role="donor"><DonorDashboard /></PrivateRoute>
        } />
        <Route path="/donor/survey" element={
          <PrivateRoute role="donor"><DonorSurvey /></PrivateRoute>
        } />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <PrivateRoute role="admin"><AdminRouter /></PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>
        } />

        {/* Hospital */}
        <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital/dashboard" element={
          <PrivateRoute role="hospital"><HospitalDashboard /></PrivateRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<div className="text-center p-8">404 Not Found</div>} />
      </Routes>
    </>
  );
}

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
