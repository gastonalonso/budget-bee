import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Budget Bee
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/example">Example</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated && (
          <>
            <Link to="/register" className="btn">
              Register
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
