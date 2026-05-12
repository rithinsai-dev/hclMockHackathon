import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Pages
import Login from './pages/Login'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import BooksPage from './pages/admin/BooksPage'
import MembersPage from './pages/admin/MembersPage'
import IssuesPage from './pages/admin/IssuesPage'
import MemberLayout from './pages/member/MemberLayout'
import MemberDashboard from './pages/member/MemberDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="issues" element={<IssuesPage />} />
          </Route>

          {/* Member Routes */}
          <Route path="/member" element={<PrivateRoute role="MEMBER"><MemberLayout /></PrivateRoute>}>
            <Route index element={<MemberDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
