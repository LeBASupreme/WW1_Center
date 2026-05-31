import API_URL from '../../config/api.js'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NAV = [
  { label: 'Dashboard',        path: '/admin/dashboard' },
  { label: 'Products',         path: '/admin/products' },
  { label: 'Special Events',   path: '/admin/events' },
  { label: 'Battlefield Trips',path: '/admin/trips' },
  { label: 'News',             path: '/admin/news' },
  { label: 'Volunteers',       path: '/admin/volunteers' },
  { label: 'Settings',         path: '/admin/settings' },
]

function AdminLayout({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch(API_URL + '/api/auth/me', { credentials: 'include' })
      .then(r => { if (!r.ok) throw new Error() })
      .catch(() => navigate('/admin/login', { replace: true }))
      .finally(() => setChecking(false))
  }, [])

  if (checking) return null

  const handleLogout = async () => {
    await fetch(API_URL + '/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-60 bg-white border-r border-black/5 flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-black/5">
          <Link to="/" className="text-lg font-bold tracking-tight">WW1 Centre.</Link>
          <p className="text-xs text-black/40 mt-0.5">Admin</p>
        </div>

        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                pathname === path
                  ? 'bg-black text-white'
                  : 'text-black/60 hover:bg-black/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-black/5">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition text-left"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
