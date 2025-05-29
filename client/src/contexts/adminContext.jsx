import React, { createContext, useState, useCallback } from 'react'
// Assuming you have your axios instance set up
import apiClient from '../api/axios' // your axios instance

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.get('/users')
      setUsers(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  // Add new user
  const addUser = useCallback(async (userData) => {
    setError(null)
    try {
      const response = await apiClient.post('/users', userData)
      setUsers(prev => [...prev, response.data])
      return response.data // Return for success handling
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add user'
      setError(errorMsg)
      throw new Error(errorMsg) // Throw for component error handling
    }
  }, [])

  // Update user
  const updateUser = useCallback(async (userId, userData) => {
    setError(null)
    try {
      const response = await apiClient.put(`/users/${userId}`, userData)
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? response.data : user
        )
      )
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update user'
      setError(errorMsg)
      throw new Error(errorMsg)
    }
  }, [])

  // Delete user
  const deleteUser = useCallback(async (userId) => {
    setError(null)
    try {
      await apiClient.delete(`/users/${userId}`)
      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete user'
      setError(errorMsg)
      throw new Error(errorMsg)
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    clearError
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

