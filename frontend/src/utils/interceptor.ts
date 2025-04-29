import axios from 'axios';
import Cookies from 'js-cookie';
import {refreshToken} from '@/utils/auth'

// Crea una nuova istanza di axios
const api = axios.create({
  baseURL: 'http://localhost:8000/', // Usa il tuo URL API
});

// Interceptor per gestire il rinnovo del token
api.interceptors.response.use(
  (response) => response, // Risposta ok
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Impedisce loop infiniti

      // Rinnova il token usando il refresh token
      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          const { access } = response.data;
          Cookies.set('access_token', access);

          // Riprova la richiesta originale con il nuovo access token
          originalRequest.headers['Authorization'] = `Bearer ${access}`;
          return api(originalRequest);  // Retry la richiesta originale
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Se non riesci a rinnovare, puoi fare il logout dell'utente o simili
        }
      }
    }
    return Promise.reject(error);
  }
);

setInterval(async () => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      try {
        await api.get('/api/user-info/', { headers: { Authorization: `Bearer ${accessToken}` } });
      } catch (error) {
        console.log('Access token expired, refreshing...');
        // Quando il token scade, esegui il refresh
        await refreshToken();  // Usa il metodo di rinnovo del token
      }
    }
  }, 240000); // Rinnovo ogni 4 minuti