import { useEffect, useState } from 'react'
import { getBooks, getMembers, getAllIssues } from '../../api/api'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ books: 0, available: 0, members: 0, activeIssues: 0 })
  const [recentIssues, setRecentIssues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getBooks(), getMembers(), getAllIssues()])
      .then(([books, members, issues]) => {
        setStats({
          books: books.length,
          available: books.filter(b => b.available).length,
          members: members.length,
          activeIssues: issues.filter(i => i.active).length,
        })
        setRecentIssues(issues.slice(-5).reverse())
      })
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { label: 'Total Books',    value: stats.books,        icon: '📚', color: '#eff6ff', iconColor: '#2563eb' },
    { label: 'Available',      value: stats.available,    icon: '✅', color: '#f0fdf4', iconColor: '#16a34a' },
    { label: 'Members',        value: stats.members,      icon: '👥', color: '#fdf4ff', iconColor: '#9333ea' },
    { label: 'Active Issues',  value: stats.activeIssues, icon: '📋', color: '#fffbeb', iconColor: '#d97706' },
  ]

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name}! Here's what's happening today.</p>
      </div>

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : (
        <>
          <div className="stats-grid">
            {statCards.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-card-icon" style={{ background: s.color }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                </div>
                <div className="stat-card-value">{s.value}</div>
                <div className="stat-card-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header"><h2>Recent Issue Activity</h2></div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>Book</th><th>Member</th><th>Issued</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIssues.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', color: '#64748b' }}>No issues yet</td></tr>
                  ) : recentIssues.map(i => (
                    <tr key={i.issueId}>
                      <td>#{i.issueId}</td>
                      <td><strong>{i.bookTitle}</strong><br /><small style={{color:'#64748b'}}>{i.bookAuthor}</small></td>
                      <td>{i.memberName}</td>
                      <td>{new Date(i.issueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${i.active ? 'badge-warning' : 'badge-success'}`}>
                          {i.active ? '📤 Issued' : '✅ Returned'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  )
}
