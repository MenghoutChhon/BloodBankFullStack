import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export interface Donor {
  id?: number | string;
  name?: string;         // Donor name (display)
  fullName?: string;     // Some backends use fullName instead!
  email: string;
  bloodType?: string;    // Be consistent: check backend schema
  blood?: string;        // Alternative (backend may use this)
  phone: string;
}

// --- GET ALL DONORS (Admin) ---
export const getDonors = async (token: string | null): Promise<Donor[]> => {
  if (!token) throw new Error("Token is required");
  const response = await axios.get<Donor[]>(`${API_URL}/donors`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// --- CREATE DONOR (Admin only) ---
export const createDonor = async (data: Donor, token?: string | null): Promise<Donor> => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;
  const response = await axios.post<Donor>(`${API_URL}/donors`, data, config);
  return response.data;
};

// --- REGISTER DONOR (Public) ---
export const registerDonor = async (data: Donor): Promise<any> => {
  const response = await axios.post(`${API_URL}/donors/register`, data);
  return response.data;
};

// --- GET LOGGED-IN DONOR PROFILE ---
export const getDonorProfile = async (token: string): Promise<Donor> => {
  const response = await axios.get<Donor>(`${API_URL}/donors/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// --- GET LOGGED-IN DONOR HISTORY ---
export const getDonorHistory = async (token: string): Promise<any[]> => {
  const response = await axios.get<any[]>(`${API_URL}/donors/me/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
