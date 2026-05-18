import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import FooterHome from './components/FooterHome'
import AdminLogin from './components/Admin/LoginPage'
import Admin from './components/Admin/Admin'
 import AdminProducts from './components/Admin/AdminProducts'
import AdminTrips from './components/Admin/AdminTrips'
import AdminNews from './components/Admin/AdminNews'
import AdminVolunteers from './components/Admin/AdminVolunteers'
import ShopSection from './components/ShopSection'
import ShopDetail from './components/ShopDetail'
import NewsSection from './components/NewsSection'
import NewsDetail from './components/NewsDetail'
import BattlefieldSection from './components/BattlefieldSection'
import BattlefieldDetail from './components/BattlefieldDetail'




function Home() {
  const [footerOpen, setFooterOpen] = useState(false)

  return (
    <>
      <Menu />
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h1 className="text-white text-4xl font-light tracking-widest uppercase">
          WW1 Centre
        </h1>
      </main>

      <button
        onClick={() => setFooterOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-xs tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors duration-200"
      >
        <span className="block w-[1px] h-6 bg-gray-600"></span>
        More Info
      </button>

      <FooterHome isOpen={footerOpen} setIsOpen={setFooterOpen} />
    </>
  )
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Admin />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/trips" element={<AdminTrips />} />
      <Route path="/admin/volunteers" element={<AdminVolunteers />} />
      <Route path="/admin/news" element={<AdminNews />} />
      <Route path="/shop" element={<ShopSection />} />
      <Route path="/news" element={<NewsSection />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/battlefield-trips" element={<BattlefieldSection />} />
      <Route path="/battlefield-trips/:id" element={<BattlefieldDetail />} />
      <Route path="/shop/:id" element={<ShopDetail />} />
    </Routes>
  )
}

export default App
