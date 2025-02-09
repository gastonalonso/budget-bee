import { useEffect, useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Example from './pages/Example'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      const response = await fetch('/api/check-auth', {
        credentials: 'include',
      })
      const data = await response.json()
      setIsAuthenticated(data.isAuthenticated)
    }
    checkAuth()
  }, [])

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/example">Example</Link>
        {isAuthenticated ? (
          <>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/example"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Example />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  )
}

export default App
