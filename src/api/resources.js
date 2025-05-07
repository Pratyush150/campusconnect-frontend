import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Accepts optional params for search/filter
export const getResources = async (token, params = {}) => {
  const res = await axios.get(`${API_URL}/studyresources`, {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return res.data.resources;
};

export const uploadResource = async (formData, token) => {
  return axios.post(`${API_URL}/studyresources`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
