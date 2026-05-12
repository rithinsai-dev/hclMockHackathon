import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { saveUser } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email || !password) { setError('Please enter email and password.'); return }
    setError(''); setLoading(true)
    try {
      const user = await login(email.trim(), password)
      saveUser(user)
      navigate(user.role === 'ADMIN' ? '/admin' : '/member', { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-left-icon">📖</div>
        <h1>LibraryMS</h1>
        <p>A smart library management system to track books, members, and issues effortlessly.</p>
        <div className="login-features">
          {['Manage books & inventory','Register & track members','Issue & return books','Role-based access'].map(f => (
            <div key={f} className="login-feature">
              <div className="login-feature-dot" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-form-card">
          <h2>Welcome back 👋</h2>
          <p className="subtitle">Sign in as Admin or Member to continue.</p>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email / Username</label>
              <input
                id="login-email"
                className="form-input"
                placeholder="e.g. admin or alice@library.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                id="login-password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button id="login-btn" type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? '⏳ Signing in…' : '🔐 Sign In'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}
