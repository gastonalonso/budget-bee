import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'
import Example from './pages/Example'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/example">Example</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </Router>
  )
}

export default App
