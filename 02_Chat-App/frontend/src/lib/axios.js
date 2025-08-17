import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true, // Sends the cookies with ever request
});
