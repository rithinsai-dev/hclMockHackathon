import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/admin',         label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/books',   label: 'Books',     icon: '📚' },
  { to: '/admin/members', label: 'Members',   icon: '👥' },
  { to: '/admin/issues',  label: 'Issues',    icon: '📋' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">📖</div>
        <div className="sidebar-brand-text">
          LibraryMS
          <span>Management System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.name?.[0] ?? 'A'}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-role">Administrator</div>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  )
}
