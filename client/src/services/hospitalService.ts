// src/services/hospitalService.ts
import axios from 'axios';

// CRA requires REACT_APP_* env vars defined in client/.env
// Fallback to relative /api for development environments
const API_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export interface HospitalRequest {
  id: number;
  hospitalName: string;
  unitsNeeded: number;
  bloodType: string;
  status: string;
}

export const getRequests = async (): Promise<HospitalRequest[]> => {
  const response = await axios.get<HospitalRequest[]>(`${API_URL}/requests`);
  return response.data;
};
