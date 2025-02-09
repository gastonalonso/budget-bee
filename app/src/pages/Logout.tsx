import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (isAuthenticated: boolean) => void
}) {
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setIsAuthenticated(false)
      navigate('/')
    }
    logout()
  }, [navigate, setIsAuthenticated])

  return null
}

export default Logout
