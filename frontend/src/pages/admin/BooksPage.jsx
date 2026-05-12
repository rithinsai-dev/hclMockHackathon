import { useEffect, useState } from 'react'
import { getBooks, getAvailableBooks, searchBooks, addBook } from '../../api/api'
import Modal from '../../components/Modal'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all') // 'all' | 'available'
  const [search, setSearch] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [form, setForm] = useState({ title: '', author: '' })
  const [formErr, setFormErr] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try {
      const data = filter === 'available' ? await getAvailableBooks() : await getBooks()
      setBooks(data)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { setLoading(true); load() }, [filter])

  const handleSearch = async e => {
    e.preventDefault()
    if (!search.trim()) { load(); return }
    setLoading(true)
    try {
      const data = await searchBooks(search, authorFilter)
      setBooks(data)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  const handleAdd = async e => {
    e.preventDefault()
    if (!form.title || !form.author) { setFormErr('All fields required.'); return }
    setSaving(true); setFormErr('')
    try {
      await addBook(form)
      setShowModal(false); setForm({ title: '', author: '' })
      setFilter('all'); load()
    } catch (e) { setFormErr(e.message) }
    finally { setSaving(false) }
  }

  return (
    <>
      <div className="page-header">
        <h1>📚 Books</h1>
        <p>Manage the library book collection.</p>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <h2>All Books</h2>
            <span className="badge badge-primary">{books.length}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <select id="books-filter" className="form-select" style={{ width: 140 }} value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">All Books</option>
              <option value="available">Available Only</option>
            </select>
            <button id="add-book-btn" className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Book</button>
          </div>
        </div>
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input id="search-title" className="form-input" placeholder="Search by title…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <input id="search-author" className="form-input" style={{ flex: '0 0 180px' }} placeholder="Author (optional)" value={authorFilter} onChange={e => setAuthorFilter(e.target.value)} />
            <button type="submit" className="btn btn-outline">Search</button>
            <button type="button" className="btn btn-outline" onClick={() => { setSearch(''); setAuthorFilter(''); load() }}>Clear</button>
          </form>
        </div>
        <div className="table-wrapper">
          {loading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
            <table>
              <thead><tr><th>ID</th><th>Title</th><th>Author</th><th>Status</th></tr></thead>
              <tbody>
                {books.length === 0
                  ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32, color: '#64748b' }}>No books found.</td></tr>
                  : books.map(b => (
                    <tr key={b.bookId}>
                      <td>#{b.bookId}</td>
                      <td><strong>{b.title}</strong></td>
                      <td>{b.author}</td>
                      <td><span className={`badge ${b.available ? 'badge-success' : 'badge-danger'}`}>{b.available ? '✅ Available' : '📤 Issued'}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          title="Add New Book"
          onClose={() => { setShowModal(false); setFormErr('') }}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button id="save-book-btn" className="btn btn-primary" onClick={handleAdd} disabled={saving}>{saving ? 'Saving…' : 'Add Book'}</button>
            </>
          }
        >
          {formErr && <div className="alert alert-error" style={{ marginBottom: 12 }}>⚠️ {formErr}</div>}
          <div className="form-group">
            <label className="form-label">Title</label>
            <input id="book-title" className="form-input" placeholder="e.g. Clean Code" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Author</label>
            <input id="book-author" className="form-input" placeholder="e.g. Robert C. Martin" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          </div>
        </Modal>
      )}
    </>
  )
}
