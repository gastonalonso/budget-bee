import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'
// import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import BasicLayout from './layouts/BasicLayout'
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
      <Routes>
        <Route element={<BasicLayout isAuthenticated={isAuthenticated} />}>
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
        </Route>
      </Routes>
    </Router>
  )
}

export default App
