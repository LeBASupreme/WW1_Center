import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import ImageUpload from '../components/ImageUpload'

function AdminSettings() {
  const [form, setForm] = useState({ name: '', logo_url: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://localhost:5000/api/organization', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setForm({ name: data.data.name || '', logo_url: data.data.logo_url || '' })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('http://localhost:5000/api/organization', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Erreur lors de la mise à jour')
        setSaving(false)
        return
      }

      setSuccess(true)
    } catch {
      setError('Erreur de connexion au serveur')
    }
    setSaving(false)
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-black mb-8">Settings</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 max-w-2xl">
          <h2 className="text-lg font-bold text-black mb-6">Organisation</h2>

          {success && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl mb-6">
              Organisation mise à jour avec succès !
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm text-black/50 mb-1 block">Nom de l'organisation</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition"
                placeholder="Ma Société Events"
              />
            </div>

            <div>
              <label className="text-sm text-black/50 mb-2 block">Logo</label>
              <ImageUpload
                value={form.logo_url}
                onChange={(url) => setForm({ ...form, logo_url: url })}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 mt-2"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </form>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminSettings
