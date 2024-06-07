import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT + '/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosClient;
