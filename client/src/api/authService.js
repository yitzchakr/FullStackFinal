import axios from './axios';

export const refreshToken = async () => {
  const res = await axios.post('/auth/refresh'); // assumes refresh token is in cookie
  return res.data.accessToken;
};
