import axios from 'axios';
const API = '/api/bookings';

// All functions now require token as second argument

export const createBooking = (data: any, token: string | null) => {
  if (!token) throw new Error('Token is required');
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const cancelBooking = (id: string, token: string | null) => {
  if (!token) throw new Error('Token is required');
  return axios.post(`${API}/${id}/cancel`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateBookingStatus = (id: string, status: string, token: string | null) => {
  if (!token) throw new Error('Token is required');
  return axios.post(`${API}/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getBookings = (params: any, token: string | null) => {
  if (!token) throw new Error('Token is required');
  return axios.get(API, {
    params,
    headers: { Authorization: `Bearer ${token}` }
  });
};
