import React from "react";
import { Link, useNavigate } from "react-router-dom";

// You can change this to your real logo path if you have one
const LOGO_SRC = "/logo.png";

const RoleSelector: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 items-center">
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-rose-400 rounded-xl font-semibold bg-white hover:bg-rose-50 hover:border-rose-500 text-rose-600 transition"
        onClick={() => navigate("/donor/login")}
      >
        🩸 Donor
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-sky-400 rounded-xl font-semibold bg-white hover:bg-sky-50 hover:border-sky-500 text-sky-600 transition"
        onClick={() => navigate("/hospital/login")}
      >
        🏥 Hospital
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-yellow-400 rounded-xl font-semibold bg-white hover:bg-yellow-50 hover:border-yellow-500 text-yellow-600 transition"
        onClick={() => navigate("/admin/dashboard")}
      >
        🔒 Admin
      </button>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="w-full shadow-sm bg-white/90 sticky top-0 z-20">
    <nav className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src={LOGO_SRC} alt="BloodDonate Logo" className="h-9 w-9 object-contain" />
        <span className="text-2xl font-extrabold text-rose-600 tracking-tight">BloodDonate</span>
      </Link>
      <ul className="hidden md:flex gap-8 text-base font-medium text-gray-800">
        <li><Link to="/" className="hover:text-rose-500 transition">Home</Link></li>
        <li><Link to="/about" className="hover:text-rose-500 transition">About</Link></li>
        <li><Link to="/ourteam" className="hover:text-rose-500 transition">Our Team</Link></li>
        <li><Link to="/contact" className="hover:text-rose-500 transition">Contact</Link></li>
      </ul>
      <div>
        <RoleSelector />
      </div>
    </nav>
  </header>
);

export default Header;
