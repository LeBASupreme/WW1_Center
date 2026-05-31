import API_URL from '../../config/api.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(API_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Invalid email or password')
        setLoading(false)
        return
      }

      if (data.user.role !== 'SUPER_ADMIN') {
        setError('Access denied. This account is not an administrator.')
        setLoading(false)
        return
      }

      window.location.href = '/admin/dashboard'
    } catch {
      setError('Could not connect to server')
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="text-white text-2xl font-bold tracking-tight block text-center mb-12">WW1 Centre.</Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-white text-2xl font-bold mb-1">Administration</h1>
          <p className="text-white/40 text-sm mb-8">Sign in to your admin dashboard.</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-white/30 transition placeholder:text-white/20"
                placeholder="charles@ww1centre.org"
              />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-white/30 transition placeholder:text-white/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          <Link to="/" className="hover:text-white/40 transition">Back to site</Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
