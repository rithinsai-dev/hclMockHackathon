const BASE = 'http://localhost:8080'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  // 204 No Content
  if (res.status === 204) return null
  return res.json()
}

// ── Auth ──────────────────────────────────────────────────────────────────
export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })

// ── Books ─────────────────────────────────────────────────────────────────
export const getBooks         = ()             => request('/books')
export const getAvailableBooks= ()             => request('/books/available')
export const searchBooks      = (title, author)=>
  request(`/books/search?title=${encodeURIComponent(title)}${author ? `&author=${encodeURIComponent(author)}` : ''}`)
export const addBook          = (data)         => request('/books', { method: 'POST', body: JSON.stringify(data) })

// ── Members ───────────────────────────────────────────────────────────────
export const getMembers       = ()             => request('/members')  // uses findAll via /members — we'll add this endpoint
export const getMember        = (id)           => request(`/members/${id}`)
export const registerMember   = (data)         => request('/members', { method: 'POST', body: JSON.stringify(data) })
export const getMemberIssues  = (id)           => request(`/members/${id}/issues`)

// ── Issues ────────────────────────────────────────────────────────────────
export const getAllIssues  = ()           => request('/issues')
export const issueBook    = (bookId, memberId) =>
  request('/issues/issue', { method: 'POST', body: JSON.stringify({ bookId, memberId }) })
export const returnBook   = (issueId)    => request(`/issues/return/${issueId}`, { method: 'PUT' })
