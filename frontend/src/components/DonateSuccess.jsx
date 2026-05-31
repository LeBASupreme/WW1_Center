import { Link } from 'react-router-dom'
import Menu from './Menu'

function DonateSuccess() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-black mb-3">Thank you for your donation</h1>
        <p className="text-black/50 max-w-sm mb-8">Your generosity helps us preserve the memory of those who served. The WW1 Remembrance Centre is grateful for your support.</p>
        <Link to="/" className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition">
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default DonateSuccess