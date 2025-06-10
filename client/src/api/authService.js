// refreshToken.js
import axios from 'axios';

const rawAxios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
export const login = async (email, password) => {
    try {
      const response = await rawAxios.post('/auth/login', { email, password });
      const { accessToken } = response.data;
      return accessToken;
    } catch (err) {
      console.error('Login request failed:', err.response?.data || err.message);
      throw err; // Pass the error back to the calling function
    }
  };

const refreshToken = async () => {
  try {
    const response = await rawAxios.get('/auth/refresh');
    const { accessToken } = response.data;
    return accessToken;
  } catch (err) {
    console.error('Refresh token request failed:', err.response?.data || err.message);
    return null; // This will trigger redirect flow from calling site
  }
};

export default refreshToken;
