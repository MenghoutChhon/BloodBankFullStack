import axios from 'axios';

// CRA requires REACT_APP_* env vars defined in client/.env
// Fallback to relative /api for development environments
const API_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export const loginHospital = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/hospitals/login`,    // <-- FIXED HERE (added 's')
    { email, password }
  );
  return response.data;
};
