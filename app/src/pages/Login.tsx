import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await login(email, password)
    } catch {
      return
    }

    navigate('/')
  }

  return (
    <>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Join Budget Bee and take control of your finances. Track your
          expenses, set savings goals, and watch your savings grow. Achieve your
          dream vacation and enjoy financial freedom with our easy-to-use
          budgeting app.
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
