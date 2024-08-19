import axios from 'axios';
import { setupInterceptors } from '../interceptors';
import { ENV_VARIABLES } from 'config/config';

const api = axios.create({
  baseURL: ENV_VARIABLES.API_URL
});

setupInterceptors(api);

export default api;
