import axios from 'axios';
import { setupInterceptors } from '../interceptors';

const api = axios.create({
  baseURL: process.env.API_URL
});

setupInterceptors(api);

export default api;
