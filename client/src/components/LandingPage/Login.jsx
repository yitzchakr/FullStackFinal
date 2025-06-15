import React, { useState } from 'react'
import styles from '../../styles/Login.module.css'
import { useAuth } from '../../hooks/useAuth'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/authService' // Adjust the import path as necessary
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const{  loading,setCurrentUser}= useAuth();
  const navigate = useNavigate();
  

  const  handleSubmit = async(e) => {
    e.preventDefault()
    setError('') // Clear previous errors

    // Validation
    if (!email) {
      setError('Email is required')
      return
    }
    if (!password || password.length < 5) {
      setError('Password must be at least 5 characters long')
      return
    }

    // Submit logic here
    try {
      const accessToken = await login(email, password);
      localStorage.setItem('accessToken', accessToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      const res = await api.get('/auth/user');
      setCurrentUser(res.data.user);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }


  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {loading && <p className={styles.loadingMessage}>Loading...</p>}
        <div className={styles.forgotPassword}>
          <a href="/forgot-password" className={styles.forgotPasswordLink}>Forgot Password?</a>
        </div>

        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
    </div>
  )
}

export default Login