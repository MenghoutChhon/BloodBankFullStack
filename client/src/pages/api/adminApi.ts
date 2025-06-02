import axios from "axios";

export interface Donor {
  id?: string;
  name: string;
  blood: string;
  email: string;
  phone: string;
  lastDonated: string;
}

export interface Hospital {
  id?: string;
  name: string;
  address: string;
  phone: string;
}

export type UserRole = "admin" | "staff";
export interface User {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
}

// Utility: converts backend _id to id for consistency
function normalize<T extends { _id?: string; id?: string }>(obj: T): T & { id: string } {
  return { ...obj, id: obj.id || obj._id || "" };
}

const adminApi = {
  // Donors
  getDonors: async (): Promise<Donor[]> => {
    const res = await axios.get("/api/donors");
    return res.data.map(normalize);
  },
  addDonor: async (donor: Partial<Donor>): Promise<Donor> => {
    const res = await axios.post("/api/donors", donor);
    return normalize(res.data);
  },
  editDonor: async (donor: Donor): Promise<Donor> => {
    const res = await axios.put(`/api/donors/${donor.id}`, donor);
    return normalize(res.data);
  },
  deleteDonor: async (id: string): Promise<void> => {
    await axios.delete(`/api/donors/${id}`);
  },

  // Hospitals
  getHospitals: async (): Promise<Hospital[]> => {
    const res = await axios.get("/api/hospitals");
    return res.data.map(normalize);
  },
  addHospital: async (hospital: Partial<Hospital>): Promise<Hospital> => {
    const res = await axios.post("/api/hospitals", hospital);
    return normalize(res.data);
  },
  editHospital: async (hospital: Hospital): Promise<Hospital> => {
    const res = await axios.put(`/api/hospitals/${hospital.id}`, hospital);
    return normalize(res.data);
  },
  deleteHospital: async (id: string): Promise<void> => {
    await axios.delete(`/api/hospitals/${id}`);
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    const res = await axios.get("/api/users");
    return res.data.map(normalize);
  },
  addUser: async (user: Partial<User>): Promise<User> => {
    const res = await axios.post("/api/users", user);
    return normalize(res.data);
  },
  editUser: async (user: User): Promise<User> => {
    const res = await axios.put(`/api/users/${user.id}`, user);
    return normalize(res.data);
  },
  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`/api/users/${id}`);
  }
};

export default adminApi;
