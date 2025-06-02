// src/pages/Donor/Profile.tsx
import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";

const DonorProfile: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
      <h2>My Profile</h2>
      <div>
        <strong>Name:</strong> {user?.name}<br />
        <strong>Email:</strong> {user?.email}
      </div>
      {/* You can add edit fields here */}
    </div>
  );
};

export default DonorProfile;
