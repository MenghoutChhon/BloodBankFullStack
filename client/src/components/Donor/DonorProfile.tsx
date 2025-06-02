// src/components/Donor/DonorProfile.tsx
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import "./DonorProfile.css";

const DonorProfile: React.FC = () => {
  const { user, token } = useAuthContext();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/donors/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));
  }, [token]);

  const handleEdit = async () => {
    // Simple example; you can make this a modal with edit fields
    const name = prompt("Enter new name", profile?.name);
    if (!name) return;
    try {
      const res = await axios.put(
        "/api/donors/me",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      alert("Profile updated!");
    } catch {
      alert("Update failed");
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="donor-profile-root">
      <div className="donor-profile-card">
        <h2 className="donor-profile-title">My Profile</h2>
        <div className="donor-profile-info">
          <div>
            <span className="donor-profile-label">Name:</span>
            <span className="donor-profile-value">{user?.name || "-"}</span>
          </div>
          <div>
            <span className="donor-profile-label">Email:</span>
            <span className="donor-profile-value">{user?.email || "-"}</span>
          </div>
        </div>
        <button className="donor-profile-edit-btn" onClick={handleEdit}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default DonorProfile;
