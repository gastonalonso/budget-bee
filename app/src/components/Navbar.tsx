import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-primary btn-ghost normal-case text-xl text-primary"
        >
          Budget Bee
        </Link>
      </div>
      <div className="navbar-end">
        {isAuthenticated && (
          <>
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
