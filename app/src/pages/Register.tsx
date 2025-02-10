import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(username, password)
    } catch {
      return
    }

    navigate('/login')
  }

  return (
    <>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6">
          By registering, you will gain access to a personalized budget tracker,
          insightful financial reports, and the ability to set and track your
          financial goals. Join us today and take control of your financial
          future!
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              ß<span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
