import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Cambialo se hai ambienti diversi
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          const { access } = response.data;
          Cookies.set('access_token', access);

          originalRequest.headers['Authorization'] = `Bearer ${access}`;
          return api(originalRequest); // Retry
        } catch (err) {
          console.error('Token refresh failed:', err);
          // Logout o redirect al login se serve
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;