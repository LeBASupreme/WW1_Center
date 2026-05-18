import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Menu from './Menu'
import FooterHome from './FooterHome'

function BattlefieldDetail() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [footerOpen, setFooterOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/battlefields')
      .then(r => r.json())
      .then(data => {
        setTrip(data.find(t => t.id === parseInt(id)) || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await fetch('http://localhost:5000/api/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, availability: `Battlefield trip: ${trip.title} (${trip.trip_date})` })
    })
    setSubmitted(true)
    setSending(false)
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  if (loading) return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
    </div>
  )

  if (!trip) return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center">
      <p className="text-black/40 text-lg mb-4">Trip not found.</p>
      <Link to="/battlefield-trips" className="text-black font-medium hover:underline">Back to trips</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-12 w-full flex-1">
        <Link to="/battlefield-trips" className="text-sm text-black/40 hover:text-black transition flex items-center gap-1 mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to trips
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-black mb-3">{trip.title}</h1>
            {trip.description && (
              <p className="text-black/60 leading-relaxed mb-8">{trip.description}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-black/40 mb-1">Date</p>
                <p className="font-medium text-sm">{formatDate(trip.trip_date)}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-black/40 mb-1">Available spots</p>
                <p className="font-medium text-sm">{trip.max_capacity}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 h-fit">
            {submitted ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-bold text-black mb-1">Request sent!</p>
                <p className="text-sm text-black/40">We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-black mb-1">Register interest</h2>
                <p className="text-sm text-black/40 mb-5">Free entry — we'll confirm your place.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    placeholder="Your name"
                    className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition" />
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                    placeholder="Email address"
                    className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition" />
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone (optional)"
                    className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition" />
                  <button type="submit" disabled={sending}
                    className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 mt-1">
                    {sending ? 'Sending...' : 'Register interest'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setFooterOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-xs tracking-[0.3em] uppercase text-gray-500 hover:text-black transition-colors duration-200"
      >
        <span className="block w-[1px] h-6 bg-gray-400"></span>
        More Info
      </button>
      <FooterHome isOpen={footerOpen} setIsOpen={setFooterOpen} />
    </div>
  )
}

export default BattlefieldDetail
