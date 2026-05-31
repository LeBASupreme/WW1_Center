import API_URL from '../config/api.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'

function Volunteer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', availability: '' })
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch(API_URL + '/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-lg mx-auto px-6 pt-32 pb-12 w-full flex-1">
        <Link to="/" className="text-sm text-black/40 hover:text-black transition flex items-center gap-1 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {submitted ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Application received!</h2>
            <p className="text-black/50 leading-relaxed">
              Thank you for your interest. We'll be in touch with you shortly.
            </p>
            <Link to="/" className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition text-sm">
              Back to home
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-black mb-2">Volunteer with us</h1>
            <p className="text-black/50 mb-10 leading-relaxed">
              Help us preserve and share the history of the Great War. We welcome volunteers of all backgrounds to support the centre.
            </p>

            <div className="bg-white rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm text-black/50 mb-1 block">Full name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-black/50 mb-1 block">Email address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-black/50 mb-1 block">Phone number <span className="text-black/30">(optional)</span></label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+44 7700 000000"
                    className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-black/50 mb-1 block">Availability <span className="text-black/30">(optional)</span></label>
                  <textarea
                    value={form.availability}
                    onChange={e => setForm({ ...form, availability: e.target.value })}
                    placeholder="e.g. Weekends, Tuesday afternoons..."
                    rows={3}
                    className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 mt-2"
                >
                  {sending ? 'Sending...' : 'Submit application'}
                </button>

                <p className="text-xs text-black/30 text-center">WW1 Remembrance Centre — Charity #1195390</p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Volunteer
