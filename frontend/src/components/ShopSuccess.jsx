import API_URL from '../config/api.js'
import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Menu from './Menu'

function ShopSuccess() {
  const [searchParams] = useSearchParams()
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    console.log('session_id:', sessionId)
    if (!sessionId) return
    fetch(API_URL + '/api/stripe/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId })
    })
      .then(r => r.json())
      .then(data => { console.log('confirm response:', data); setConfirmed(true) })
      .catch(err => console.error('confirm error:', err))
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-black mb-3">Order confirmed!</h1>
        <p className="text-black/50 max-w-sm mb-8">Thank you for your purchase. We will process your order and send a confirmation to your email.</p>
        <Link to="/shop" className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition">
          Back to shop
        </Link>
      </div>
    </div>
  )
}

export default ShopSuccess
