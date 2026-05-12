import { useEffect, useState } from 'react'
import { getMembers, registerMember, getMemberIssues } from '../../api/api'
import Modal from '../../components/Modal'

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showIssues, setShowIssues] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [memberIssues, setMemberIssues] = useState([])
  const [issuesLoading, setIssuesLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [formErr, setFormErr] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try { setMembers(await getMembers()) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const viewIssues = async m => {
    setSelectedMember(m); setShowIssues(true); setIssuesLoading(true)
    try { setMemberIssues(await getMemberIssues(m.memberId)) }
    catch (e) { setMemberIssues([]) }
    finally { setIssuesLoading(false) }
  }

  const handleRegister = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { setFormErr('All fields required.'); return }
    setSaving(true); setFormErr('')
    try {
      await registerMember(form)
      setShowAdd(false); setForm({ name: '', email: '', password: '' }); load()
    } catch (e) { setFormErr(e.message) }
    finally { setSaving(false) }
  }

  return (
    <>
      <div className="page-header">
        <h1>👥 Members</h1>
        <p>View and manage library members.</p>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <h2>Members</h2>
            <span className="badge badge-primary">{members.length}</span>
          </div>
          <button id="add-member-btn" className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Register Member</button>
        </div>
        <div className="table-wrapper">
          {loading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
              <tbody>
                {members.length === 0
                  ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32, color: '#64748b' }}>No members yet.</td></tr>
                  : members.map(m => (
                    <tr key={m.memberId}>
                      <td>#{m.memberId}</td>
                      <td><strong>{m.name}</strong></td>
                      <td>{m.email}</td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => viewIssues(m)}>📋 View Issues</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Register member modal */}
      {showAdd && (
        <Modal
          title="Register New Member"
          onClose={() => { setShowAdd(false); setFormErr('') }}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
              <button id="save-member-btn" className="btn btn-primary" onClick={handleRegister} disabled={saving}>{saving ? 'Saving…' : 'Register'}</button>
            </>
          }
        >
          {formErr && <div className="alert alert-error">⚠️ {formErr}</div>}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input id="member-name" className="form-input" placeholder="e.g. John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input id="member-email" type="email" className="form-input" placeholder="e.g. john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input id="member-password" type="password" className="form-input" placeholder="Member login password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
        </Modal>
      )}

      {/* Member issues modal */}
      {showIssues && selectedMember && (
        <Modal title={`📋 Issues — ${selectedMember.name}`} onClose={() => setShowIssues(false)}>
          {issuesLoading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
            memberIssues.length === 0
              ? <div className="empty-state"><div className="empty-state-icon">📭</div><p>No issues for this member.</p></div>
              : <div className="table-wrapper">
                  <table>
                    <thead><tr><th>#</th><th>Book</th><th>Issued</th><th>Returned</th><th>Status</th></tr></thead>
                    <tbody>
                      {memberIssues.map(i => (
                        <tr key={i.issueId}>
                          <td>{i.issueId}</td>
                          <td><strong>{i.bookTitle}</strong></td>
                          <td>{new Date(i.issueDate).toLocaleDateString()}</td>
                          <td>{i.returnDate ? new Date(i.returnDate).toLocaleDateString() : '—'}</td>
                          <td><span className={`badge ${i.active ? 'badge-warning' : 'badge-success'}`}>{i.active ? '📤 Issued' : '✅ Returned'}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          )}
        </Modal>
      )}
    </>
  )
}
