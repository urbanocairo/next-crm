import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import axios from 'axios'
import api from '@/utils/api'

export function isAuthenticated() {
  return !!Cookies.get('access_token')
}

export async function refreshToken() {
  const refreshToken = Cookies.get('refresh_token')

  if (!refreshToken) {
    return null
  }

  try {
    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refreshToken,
    })

    const { access } = response.data
    Cookies.set('access_token', access)
    return access
  } catch (error) {
    console.error('Errore durante il rinnovo del token:', error)
    toast.error('Sessione scaduta. Effettua nuovamente il login.')
    return null
  }
}

export function useAuthContext() {
    // Funzione per restituire username dello user
    const user = {
        username: Cookies.get('username') || 'Non hai un nome ehi',
    }
    return { user }
}

export function logout() {
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  window.location.href = '/goodbye' // Redirect to login page
  toast.error('Logout effettuato con successo')
}

export async function getUserInfo() {
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  if (!accessToken || !refreshToken) {
    return null;
  }
  console.log("Access token:", accessToken)

  try {
    const response = await api.get('http://localhost:8000/api/user-info/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}