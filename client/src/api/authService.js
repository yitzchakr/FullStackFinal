// refreshToken.js
import axios from 'axios';

const rawAxios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

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
