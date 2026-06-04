import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import FooterHome from './components/FooterHome'
import Intro from './components/Intro'
import AdminLogin from './components/Admin/LoginPage'
import Admin from './components/Admin/Admin'
 import AdminProducts from './components/Admin/AdminProducts'
import AdminTrips from './components/Admin/AdminTrips'
import AdminNews from './components/Admin/AdminNews'
import AdminVolunteers from './components/Admin/AdminVolunteers'
import AdminEvents from './components/Admin/AdminEvents'
import AdminSettings from './components/Admin/AdminSettings'
import ShopSection from './components/ShopSection'
import ShopDetail from './components/ShopDetail'
import NewsSection from './components/NewsSection'
import NewsDetail from './components/NewsDetail'
import BattlefieldSection from './components/BattlefieldSection'
import BattlefieldDetail from './components/BattlefieldDetail'
import MuseumScroll from './components/MuseumScroll'
import Donate from './components/Donate'
import DonateSuccess from './components/DonateSuccess'
import ShopSuccess from './components/ShopSuccess'
import Volunteer from './components/Volunteer'
import About from './components/About'
import Contact from './components/Contact'
import SpecialEventsSection from './components/SpecialEventsSection'
import Room1 from './components/visits/room-1'
import Room2 from './components/visits/room-2'




function Home() {
  const [footerOpen, setFooterOpen] = useState(false)
  const [introSeen, setIntroSeen] = useState(
    () => new URLSearchParams(window.location.search).has('t')
  )

  return (
    <>
      {!introSeen && <Intro onDone={() => setIntroSeen(true)} />}
      <Menu />
      <MuseumScroll />


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
      <Route path="/admin/events" element={<AdminEvents />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/shop" element={<ShopSection />} />
      <Route path="/news" element={<NewsSection />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/battlefield-trips" element={<BattlefieldSection />} />
      <Route path="/battlefield-trips/:id" element={<BattlefieldDetail />} />
      <Route path="/shop/success" element={<ShopSuccess />} />
      <Route path="/shop/:id" element={<ShopDetail />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/donate/success" element={<DonateSuccess />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/events" element={<SpecialEventsSection />} />
      <Route path="/visits/room-1" element={<Room1 />} />
      <Route path="/visits/room-2" element={<Room2 />} />
    </Routes>
  )
}

export default App
