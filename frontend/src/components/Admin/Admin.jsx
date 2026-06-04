import API_URL from '../../config/api.js'
import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

function Admin() {
  const [stats, setStats] = useState({ products: 0, events: 0, volunteers: 0, trips: 0 })
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(API_URL + '/api/products', { credentials: 'include' }).then(r => r.json()),
      fetch(API_URL + '/api/special-events', { credentials: 'include' }).then(r => r.json()),
      fetch(API_URL + '/api/volunteers', { credentials: 'include' }).then(r => r.json()),
      fetch(API_URL + '/api/battlefields', { credentials: 'include' }).then(r => r.json()),
      fetch(API_URL + '/api/orders', { credentials: 'include' }).then(r => r.json()),
    ])
      .then(([products, events, volunteers, trips, orders]) => {
        setStats({
          products: products.length || 0,
          events: events.length || 0,
          volunteers: volunteers.length || 0,
          trips: trips.length || 0,
        })
        setOrders(Array.isArray(orders) ? orders : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Products',          value: stats.products,   bg: 'bg-emerald-50' },
    { label: 'Special Events',    value: stats.events,     bg: 'bg-blue-50' },
    { label: 'Volunteers',        value: stats.volunteers, bg: 'bg-purple-50' },
    { label: 'Battlefield Trips', value: stats.trips,      bg: 'bg-amber-50' },
  ]

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  const statusColor = (s) => ({
    PAID:      'bg-green-100 text-green-700',
    PENDING:   'bg-yellow-100 text-yellow-700',
    CANCELLED: 'bg-red-100 text-red-500',
  }[s] || 'bg-gray-100 text-gray-500')

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-black mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cards.map((card) => (
              <div key={card.label} className={`${card.bg} rounded-2xl p-6`}>
                <p className="text-sm text-black/40 mb-1">{card.label}</p>
                <p className="text-4xl font-bold text-black">{card.value}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Recent Orders</h2>
              <span className="text-sm text-black/40">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <p className="text-black/40">No orders yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/5">
                      <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Customer</th>
                      <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Product</th>
                      <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Total</th>
                      <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Status</th>
                      <th className="text-left text-xs font-medium text-black/40 uppercase px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition">
                        <td className="px-6 py-4">
                          <p className="font-medium text-sm text-black">{order.customer_name}</p>
                          <p className="text-xs text-black/40">{order.customer_email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-black/60">{order.product_name || '—'}</td>
                        <td className="px-6 py-4 text-sm font-bold text-black">£{parseFloat(order.total).toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-black/40">{formatDate(order.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default Admin