import axios from './axios';
 const refreshToken = async () => {
    const response = await axios.get('/auth/refresh', { withCredentials: true });
    const { accessToken } = response.data;
  

    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  };
  export default refreshToken;
  