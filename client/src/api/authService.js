import axios from 'axios';
export const refreshToken = async () => {
    const response = await axios.get('/auth/refreshToken', { withCredentials: true });
    const { accessToken } = response.data;
  
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  };
  