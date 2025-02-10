import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const Logout: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logout().finally(() => {
      navigate('/')
    })
  }, [logout, navigate])

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  )
}

export default Logout
