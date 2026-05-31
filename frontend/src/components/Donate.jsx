import API_URL from '../config/api.js'
import { useState } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'

const PRESETS = [5, 10, 25, 50]

function Donate() {
  const [selected, setSelected] = useState(10)
  const [custom, setCustom] = useState('')
  const [paying, setPaying] = useState(false)

  const amount = custom ? parseFloat(custom) : selected

  const handleDonate = async () => {
    if (!amount || amount <= 0) return
    setPaying(true)
    try {
      const res = await fetch(API_URL + '/api/stripe/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      setPaying(false)
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

        <h1 className="text-3xl font-bold text-black mb-2">Support the Centre</h1>
        <p className="text-black/50 mb-10 leading-relaxed">
          Your donation helps us preserve the memory of those who served in the Great War and keep the centre open for future generations.
        </p>

        <div className="bg-white rounded-2xl p-6">
          <p className="text-sm font-medium text-black/50 mb-4">Select an amount</p>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {PRESETS.map(p => (
              <button
                key={p}
                onClick={() => { setSelected(p); setCustom('') }}
                className={`py-3 rounded-xl text-sm font-bold transition ${
                  selected === p && !custom
                    ? 'bg-black text-white'
                    : 'border border-black/10 text-black hover:bg-black/5'
                }`}
              >
                £{p}
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 font-medium">£</span>
            <input
              type="number"
              min="1"
              value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null) }}
              placeholder="Custom amount"
              className="w-full border border-black/10 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-black/30 transition"
            />
          </div>

          <div className="flex justify-between text-sm py-3 border-t border-black/10 mb-4">
            <span className="text-black/50">Donation amount</span>
            <span className="font-bold">£{amount ? parseFloat(amount).toFixed(2) : '0.00'}</span>
          </div>

          <button
            onClick={handleDonate}
            disabled={paying || !amount || amount <= 0}
            className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {paying ? 'Redirecting...' : `Donate £${amount ? parseFloat(amount).toFixed(2) : '0.00'}`}
          </button>

          <p className="text-xs text-black/30 text-center mt-4">Secured by Stripe. WW1 Remembrance Centre — Charity #1195390</p>
        </div>
      </div>
    </div>
  )
}

export default Donate