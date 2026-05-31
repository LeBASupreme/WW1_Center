import API_URL from '../../config/api.js'
import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

function AdminTrips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', trip_date: '', max_capacity: '' })
  const [saving, setSaving] = useState(false)

  const fetchTrips = () => {
    fetch(API_URL + '/api/battlefields', { credentials: 'include' })
      .then(r => r.json())
      .then(data => { setTrips(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchTrips() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', description: '', trip_date: '', max_capacity: '' })
    setShowModal(true)
  }

  const openEdit = (t) => {
    setEditing(t)
    setForm({ title: t.title, description: t.description || '', trip_date: t.trip_date?.slice(0, 10) || '', max_capacity: t.max_capacity })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const url = editing
      ? `${API_URL}/api/battlefields/${editing.id}`
      : API_URL + '/api/battlefields'
    await fetch(url, {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...form, max_capacity: parseInt(form.max_capacity) })
    })
    setShowModal(false)
    fetchTrips()
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this trip?')) return
    await fetch(`${API_URL}/api/battlefields/${id}`, { method: 'DELETE', credentials: 'include' })
    fetchTrips()
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">Battlefield Trips</h1>
        <button onClick={openCreate} className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Trip
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-black/40 text-lg">No trips yet.</p>
          <button onClick={openCreate} className="mt-4 text-black font-medium hover:underline">Add your first trip</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5">
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Trip</th>
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Date</th>
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Capacity</th>
                <th className="text-right text-xs font-medium text-black/40 uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-sm text-black">{t.title}</p>
                    {t.description && <p className="text-xs text-black/40 mt-0.5 truncate max-w-xs">{t.description}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-black/60">{formatDate(t.trip_date)}</td>
                  <td className="px-6 py-4 text-sm text-black/60">{t.max_capacity} spots</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(t)} className="p-2 hover:bg-black/5 rounded-lg transition">
                        <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-2 hover:bg-red-50 rounded-lg transition">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">{editing ? 'Edit Trip' : 'New Trip'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-black/50 mb-1 block">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition" placeholder="Somme Battlefield Tour" />
              </div>
              <div>
                <label className="text-sm text-black/50 mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition resize-none" placeholder="Trip description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-black/50 mb-1 block">Date</label>
                  <input type="date" value={form.trip_date} onChange={e => setForm({ ...form, trip_date: e.target.value })} required
                    className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition" />
                </div>
                <div>
                  <label className="text-sm text-black/50 mb-1 block">Max Capacity</label>
                  <input type="number" value={form.max_capacity} onChange={e => setForm({ ...form, max_capacity: e.target.value })} required min="1"
                    className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition" placeholder="20" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-black/10 text-sm font-medium hover:bg-black/5 transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminTrips
