import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'

function BaseLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-base-200 flex justify-center">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default BaseLayout
