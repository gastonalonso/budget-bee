import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="h-full bg-base-200 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Welcome to Budget Bee</h1>
        <p className="py-6 text-lg">
          Budget Bee helps you manage your home expenses effortlessly. Track
          your spending, set budgets, and save more.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
