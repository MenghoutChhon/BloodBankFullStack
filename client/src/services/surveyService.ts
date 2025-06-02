import axios from "axios";

export const submitSurvey = (formData: any, token: string | null) => {
  if (!token) throw new Error("Token required");
  return axios.post("/api/surveys", formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// For dashboard - fetch logged-in donor's surveys
export const getDonorSurveys = (token: string | null) => {
  if (!token) throw new Error("Token required");
  return axios.get("/api/surveys/mine", {
    headers: { Authorization: `Bearer ${token}` }
  });
};
