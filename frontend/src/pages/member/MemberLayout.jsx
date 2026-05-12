import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function MemberLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="member-shell">
      <header className="member-topbar">
        <div className="member-topbar-brand">
          <div className="member-topbar-brand-icon">📖</div>
          <div className="member-topbar-brand-text">LibraryMS</div>
        </div>
        <div className="member-topbar-right">
          <div className="member-topbar-user">
            Member: <strong>{user?.name}</strong>
          </div>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </header>
      <main className="member-page">
        <Outlet />
      </main>
    </div>
  )
}
