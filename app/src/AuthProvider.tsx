import axios from 'axios'
import { ReactNode, useEffect, useState } from 'react'

import { AuthContext } from './contexts/AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.post('/api/auth/verify', { withCredentials: true })
        setIsAuthenticated(true)
      } catch {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await axios.post(
        '/api/auth/login',
        { email, password },
        { withCredentials: true },
      )
      setIsAuthenticated(true)
    } catch {
      throw new Error('Login failed')
    }
  }

  const register = async (email: string, password: string) => {
    try {
      await axios.post('/api/auth/register', { email, password })
      setIsAuthenticated(true)
    } catch {
      throw new Error('Registration failed')
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}
