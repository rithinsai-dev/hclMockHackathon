import { useEffect, useState } from 'react'
import { getMemberIssues, getAvailableBooks } from '../../api/api'
import { useAuth } from '../../context/AuthContext'

export default function MemberDashboard() {
  const { user } = useAuth()
  const [issues, setIssues] = useState([])
  const [availableBooks, setAvailableBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.memberId) return
    Promise.all([
      getMemberIssues(user.memberId),
      getAvailableBooks()
    ])
      .then(([iss, books]) => {
        setIssues(iss.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate)))
        setAvailableBooks(books)
      })
      .finally(() => setLoading(false))
  }, [user])

  const activeCount = issues.filter(i => i.active).length

  return (
    <>
      <div className="welcome-card">
        <div>
          <h2>Hello, {user?.name}!</h2>
          <p>You have {activeCount} active book {activeCount === 1 ? 'issue' : 'issues'}. You can issue up to 3 books at a time.</p>
        </div>
        <div className="welcome-card-emoji">👋</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Left column: My Issues */}
        <div>
          <h3 style={{ marginBottom: 16 }}>My Issues History</h3>
          {loading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
            issues.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <p>You haven't issued any books yet.</p>
              </div>
            ) : (
              issues.map(i => (
                <div key={i.issueId} className="issue-card">
                  <div className="issue-card-left">
                    <h3>{i.bookTitle}</h3>
                    <p>by {i.bookAuthor}</p>
                    <div className="issue-card-dates">
                      <strong>Issued:</strong> {new Date(i.issueDate).toLocaleDateString()}<br />
                      {i.returnDate ? <><strong>Returned:</strong> {new Date(i.returnDate).toLocaleDateString()}</> : null}
                    </div>
                  </div>
                  <div>
                    <span className={`badge ${i.active ? 'badge-warning' : 'badge-success'}`}>
                      {i.active ? '📤 Active' : '✅ Returned'}
                    </span>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {/* Right column: Available Books */}
        <div>
          <h3 style={{ marginBottom: 16 }}>Available to Borrow</h3>
          <div className="card" style={{ padding: 0 }}>
            {loading ? <div style={{ padding: 24, textAlign: 'center' }}><div className="spinner" style={{margin:'0 auto'}}/></div> : (
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {availableBooks.length === 0 ? <p style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>No books currently available.</p> : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {availableBooks.map(b => (
                      <li key={b.bookId} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{b.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{b.author}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
