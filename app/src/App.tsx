import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import BasicLayout from './layouts/BasicLayout'
import Example from './pages/Example'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/example" element={<Example />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
