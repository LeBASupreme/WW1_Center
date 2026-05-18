import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

function Admin() {
  const [stats, setStats] = useState({ products: 0, events: 0, volunteers: 0, trips: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/products', { credentials: 'include' }).then(r => r.json()),
      fetch('http://localhost:5000/api/special-events', { credentials: 'include' }).then(r => r.json()),
      fetch('http://localhost:5000/api/volunteers', { credentials: 'include' }).then(r => r.json()),
      fetch('http://localhost:5000/api/battlefields', { credentials: 'include' }).then(r => r.json()),
    ])
      .then(([products, events, volunteers, trips]) => {
        setStats({
          products: products.length || 0,
          events: events.length || 0,
          volunteers: volunteers.length || 0,
          trips: trips.length || 0,
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Products',        value: stats.products,   bg: 'bg-emerald-50',  iconBg: 'bg-emerald-100' },
    { label: 'Special Events',  value: stats.events,     bg: 'bg-blue-50',     iconBg: 'bg-blue-100' },
    { label: 'Volunteers',      value: stats.volunteers, bg: 'bg-purple-50',   iconBg: 'bg-purple-100' },
    { label: 'Battlefield Trips', value: stats.trips,    bg: 'bg-amber-50',    iconBg: 'bg-amber-100' },
  ]

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-black mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.label} className={`${card.bg} rounded-2xl p-6`}>
              <p className="text-sm text-black/40 mb-1">{card.label}</p>
              <p className="text-4xl font-bold text-black">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default Admin
