import React from "react";

const colors = {
  red: "text-red-600",
  blue: "text-blue-600",
  green: "text-green-600",
  orange: "text-yellow-600"
} as const;

type StatCardProps = {
  label: string;
  value: number;
  icon: string;
  color?: keyof typeof colors;
};

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color = "red" }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[160px]">
    <span className="text-4xl mb-2">{icon}</span>
    <span className={`text-3xl font-bold ${colors[color]}`}>{value}</span>
    <span className="text-gray-500 mt-1">{label}</span>
  </div>
);

export default StatCard;
