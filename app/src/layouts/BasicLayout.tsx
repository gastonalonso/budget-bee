import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'

function BasicLayout() {
  return (
    <div>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default BasicLayout
