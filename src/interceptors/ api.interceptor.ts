import { AxiosInstance } from 'axios';
import { createLogoutAuth } from '../redux/states/auth';

export function setupInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        createLogoutAuth();
      }
      return Promise.reject(error);
    }
  );
}
