// --- Existing fakeDonorLogin (keep this!) ---
export async function fakeDonorLogin(email: string, password: string) {
  // For now, allow any login. Later, replace with real API call.
  if (email && password) return { id: "donor1", name: "Sample Donor", role: "donor" };
  return null;
}

// --- Add these for AdminDashboard ---
export interface AdminStats {
  donors: number;
  hospitals: number;
  bloodUnits: number;
}

export const fetchAdminStats = async (): Promise<AdminStats> => {
  // Simulate API delay
  await new Promise(res => setTimeout(res, 500));
  return {
    donors: 123,
    hospitals: 8,
    bloodUnits: 250
  };
};
