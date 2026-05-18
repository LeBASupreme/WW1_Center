import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)

  const fetchVolunteers = () => {
    fetch('http://localhost:5000/api/volunteers', { credentials: 'include' })
      .then(r => r.json())
      .then(data => { setVolunteers(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchVolunteers() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Remove this volunteer?')) return
    await fetch(`http://localhost:5000/api/volunteers/${id}`, { method: 'DELETE', credentials: 'include' })
    fetchVolunteers()
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">Volunteers</h1>
        <span className="text-sm text-black/40">{volunteers.length} application{volunteers.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : volunteers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-black/40 text-lg">No volunteer applications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5">
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Name</th>
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Email</th>
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Phone</th>
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Availability</th>
                <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Applied</th>
                <th className="text-right text-xs font-medium text-black/40 uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition">
                  <td className="px-6 py-4 font-medium text-sm text-black">{v.name}</td>
                  <td className="px-6 py-4 text-sm text-black/60">
                    <a href={`mailto:${v.email}`} className="hover:underline">{v.email}</a>
                  </td>
                  <td className="px-6 py-4 text-sm text-black/60">{v.phone || '—'}</td>
                  <td className="px-6 py-4 text-sm text-black/60 max-w-xs truncate">{v.availability || '—'}</td>
                  <td className="px-6 py-4 text-sm text-black/40">{formatDate(v.created_at)}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(v.id)} className="p-2 hover:bg-red-50 rounded-lg transition">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminVolunteers
