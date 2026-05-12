import { useEffect, useState } from 'react'
import { getAllIssues, getMembers, getAvailableBooks, issueBook, returnBook } from '../../api/api'
import Modal from '../../components/Modal'

export default function IssuesPage() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [members, setMembers] = useState([])
  const [books, setBooks] = useState([])
  const [form, setForm] = useState({ memberId: '', bookId: '' })
  const [formErr, setFormErr] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try { setIssues(await getAllIssues()) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openIssueModal = async () => {
    setShowIssueModal(true)
    try {
      const [m, b] = await Promise.all([getMembers(), getAvailableBooks()])
      setMembers(m); setBooks(b)
    } catch (e) { setFormErr('Failed to load members or books.') }
  }

  const handleIssue = async e => {
    e.preventDefault()
    if (!form.memberId || !form.bookId) { setFormErr('Please select a member and a book.'); return }
    setSaving(true); setFormErr('')
    try {
      await issueBook(form.bookId, form.memberId)
      setShowIssueModal(false); setForm({ memberId: '', bookId: '' }); load()
    } catch (e) { setFormErr(e.message) }
    finally { setSaving(false) }
  }

  const handleReturn = async (issueId) => {
    if (!confirm('Are you sure you want to mark this book as returned?')) return
    try {
      await returnBook(issueId)
      load()
    } catch (e) { alert(e.message) }
  }

  return (
    <>
      <div className="page-header">
        <h1>📋 Issues</h1>
        <p>Manage book issues and returns.</p>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <h2>All Issue Records</h2>
            <span className="badge badge-primary">{issues.length}</span>
          </div>
          <button id="issue-book-btn" className="btn btn-warning" style={{ background: 'var(--warning)', color: '#fff', border: 'none' }} onClick={openIssueModal}>
            📤 Issue Book
          </button>
        </div>
        <div className="table-wrapper">
          {loading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
            <table>
              <thead><tr><th>#</th><th>Book</th><th>Member</th><th>Issue Date</th><th>Return Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {issues.length === 0
                  ? <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: '#64748b' }}>No issue records found.</td></tr>
                  : issues.map(i => (
                    <tr key={i.issueId}>
                      <td>#{i.issueId}</td>
                      <td><strong>{i.bookTitle}</strong><br /><small style={{color:'#64748b'}}>{i.bookAuthor}</small></td>
                      <td>{i.memberName}</td>
                      <td>{new Date(i.issueDate).toLocaleDateString()}</td>
                      <td>{i.returnDate ? new Date(i.returnDate).toLocaleDateString() : '—'}</td>
                      <td><span className={`badge ${i.active ? 'badge-warning' : 'badge-success'}`}>{i.active ? '📤 Active' : '✅ Returned'}</span></td>
                      <td>
                        {i.active && (
                          <button className="btn btn-success btn-sm" onClick={() => handleReturn(i.issueId)}>
                            📥 Return
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showIssueModal && (
        <Modal
          title="Issue a Book"
          onClose={() => { setShowIssueModal(false); setFormErr('') }}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowIssueModal(false)}>Cancel</button>
              <button id="save-issue-btn" className="btn btn-warning" style={{ background: 'var(--warning)', color: '#fff', border: 'none' }} onClick={handleIssue} disabled={saving}>{saving ? 'Processing…' : 'Issue Book'}</button>
            </>
          }
        >
          {formErr && <div className="alert alert-error">⚠️ {formErr}</div>}
          <div className="form-group">
            <label className="form-label">Member</label>
            <select id="issue-member" className="form-select" value={form.memberId} onChange={e => setForm({ ...form, memberId: e.target.value })}>
              <option value="">-- Select Member --</option>
              {members.map(m => <option key={m.memberId} value={m.memberId}>{m.name} ({m.email})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Available Book</label>
            <select id="issue-book" className="form-select" value={form.bookId} onChange={e => setForm({ ...form, bookId: e.target.value })}>
              <option value="">-- Select Book --</option>
              {books.map(b => <option key={b.bookId} value={b.bookId}>#{b.bookId} - {b.title} by {b.author}</option>)}
            </select>
            <small style={{ color: '#64748b', display: 'block', marginTop: 4 }}>Note: Maximum 3 active issues allowed per member.</small>
          </div>
        </Modal>
      )}
    </>
  )
}
