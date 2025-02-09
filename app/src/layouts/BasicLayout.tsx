import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'

function BasicLayout({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default BasicLayout
