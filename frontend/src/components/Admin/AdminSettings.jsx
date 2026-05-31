import API_URL from '../../config/api.js'
import { useState } from 'react'
import AdminLayout from './AdminLayout'

function AdminSettings() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.')
      return
    }
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(API_URL + '/api/auth/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Something went wrong.')
      } else {
        setSuccess(true)
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch {
      setError('Connection error.')
    }
    setSaving(false)
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-black mb-8">Settings</h1>

      <div className="bg-white rounded-2xl p-6 max-w-md">
        <h2 className="text-lg font-bold text-black mb-6">Change Password</h2>

        {success && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl mb-6">
            Password updated successfully.
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-black/50 mb-1 block">Current password</label>
            <input
              type="password"
              required
              value={form.currentPassword}
              onChange={e => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition"
            />
          </div>
          <div>
            <label className="text-sm text-black/50 mb-1 block">New password</label>
            <input
              type="password"
              required
              value={form.newPassword}
              onChange={e => setForm({ ...form, newPassword: e.target.value })}
              className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition"
            />
          </div>
          <div>
            <label className="text-sm text-black/50 mb-1 block">Confirm new password</label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 mt-2"
          >
            {saving ? 'Saving...' : 'Update password'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings
