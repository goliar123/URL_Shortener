import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Authentication APIs
export const registerUser = async (username, password) => {
    
    const response = await api.post('/user/register', { username, password });
    return response.data;
};

export const loginUser = async (username, password) => {
  const response = await api.post('/user/login', { username, password });
  return response.data;
};

// URL Management APIs
export const createShortUrl = async (shortCode, longCode) => {
  const response = await api.post('/url/url', { shortCode, longCode });
  return response.data;
};

export const fetchUrls = async () => {
  const response = await api.get('/url/url');
  return response.data;
};

export const deleteUrl = async (shortCode) => {
  const response = await api.delete('/url/delete', { data: { shortCode } });
  return response.data;
};

export const redirectToUrl = (shortCode) => {
  return `${API_BASE_URL}/url/redirect/${shortCode}`;
};

export default api;
