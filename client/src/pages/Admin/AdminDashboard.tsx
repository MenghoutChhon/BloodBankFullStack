// src/pages/Admin/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import axios from "axios";

type Stats = {
  totalDonors: number;
  hospitals: number;
  bloodUnits: number;
  pendingRequests: number;
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    axios.get("/api/admin/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  const cards: { label: string; value: number; icon: string; color: "red" | "blue" | "green" | "orange" }[] = [
    { label: "Total Donors", value: stats.totalDonors, icon: "🩸", color: "red" },
    { label: "Hospitals", value: stats.hospitals, icon: "🏥", color: "blue" },
    { label: "Blood Units", value: stats.bloodUnits, icon: "🧃", color: "green" },
    { label: "Pending Requests", value: stats.pendingRequests, icon: "📋", color: "orange" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-7">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-6 mb-10">
        {cards.map((s, i) => (
          <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
        ))}
      </div>
      {/* Add analytics here */}
    </div>
  );
};

export default AdminDashboard;
