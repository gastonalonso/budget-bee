import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'
import BaseLayout from './layouts/BaseLayout'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
