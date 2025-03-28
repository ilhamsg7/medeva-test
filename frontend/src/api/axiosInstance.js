import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: {
    'Accept': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
