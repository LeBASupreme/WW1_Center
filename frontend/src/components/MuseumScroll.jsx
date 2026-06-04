import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_SCROLL_HEIGHT = 2000


const STOPS = [
  {
    at: 12.5,
    hold: 1.5,
    type: 'room',
    label: 'The Storeroom',
    href: '/visits/room-1',
  },
  {
    at: 42.9,
    hold: 1.5,
    type: 'room',
    label: 'The Gallery',
    href: '/visits/room-2',
  },
  {
    at: 29.3,
    hold: 1.5,
    type: 'info',
    x: 50,
    y: 50,
    title: 'Info Title',
    text: 'Your description here.',
  },
  {
    at: 35,
    hold: 1.5,
    type: 'info',
    x: 50,
    y: 50,
    title: 'Info Title',
    text: 'Your description here.',
  },
  {
    at: 40.8,
    hold: 1.5,
    type: 'info',
    x: 50,
    y: 50,
    title: 'Info Title',
    text: 'Your description here.',
  },
  
  {
    at: 61.5,
    hold: 1.5,
    type: 'info',
    x: 50,
    y: 50,
    title: 'Info Title',
    text: 'Your description here.',
  },
  {
    at: 80,
    hold: 1.5 ,
    type: 'info',
    x: 50,
    y: 50,
    title: 'Info Title',
    text: 'Your description here.',
  },
  {
    at: 68.5,
    hold: 3,
    type: 'info',
    x: 50,
    y: 50,
    title: 'Info Title',
    text: 'Your description here.',
  },
  {
    at: 55,
    hold: 3,
    type: 'info',
    x: 50,
    y: 50,
    title: 'Info Title',
    text: 'Your description here.',
  },
]

// ── Bouton pièce ──────────────────────────────────────────────────────────────
function RoomButton({ stop, visible }) {
  return (
    <Link
      to={stop.href}
      className="absolute left-6 top-1/2 flex items-center gap-4 backdrop-blur-sm pl-5 pr-6 py-4 rounded-2xl shadow-xl group transition-all duration-500"
      style={{
        backgroundColor: '#F3F0E7',
        transform: `translateY(-50%) translateX(${visible ? '0' : 'calc(-100% - 24px)'})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style={{ backgroundColor: '#2A2529' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="text-black/35 text-[8px] tracking-[0.35em] uppercase mb-0.5">Visit</p>
        <p className="text-black text-sm font-medium" style={{ fontFamily: 'Georgia, serif' }}>
          {stop.label}
        </p>
      </div>
    </Link>
  )
}

function InfoHotspot({ stop, visible, onOpen }) {
  const dir = stop.dir || 'right'
  return (
    <div
      className="absolute transition-opacity duration-500"
      style={{
        left: `${stop.x}%`,
        top: `${stop.y}%`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className={`flex items-center ${dir === 'left' ? 'flex-row-reverse' : ''}`}>

        {/* Dot */}
        <div className="relative flex-shrink-0 cursor-pointer w-4 h-4" onClick={() => onOpen(stop)}>
          <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: 'rgba(243,240,231,0.25)', animationDuration: '2s' }} />
          <span className="absolute inset-1 rounded-full" style={{ backgroundColor: 'rgba(243,240,231,0.4)' }} />
          <span className="absolute inset-[5px] rounded-full" style={{ backgroundColor: '#F3F0E7' }} />
        </div>

        {/* Line */}
        <div className="w-12 h-[1px] flex-shrink-0" style={{ backgroundColor: 'rgba(243,240,231,0.35)' }} />

        {/* Button */}
        <button
          onClick={() => onOpen(stop)}
          className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[10px] tracking-[0.3em] uppercase font-medium whitespace-nowrap transition-opacity duration-200 hover:opacity-75"
          style={{
            backgroundColor: '#F3F0E7',
            color: '#2A2529',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          More info
          <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 4.5v2.5M5 3v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

      </div>
    </div>
  )
}

function InfoPanel({ stop, onClose }) {
  if (!stop) return null
  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ zIndex: 50, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md px-10 py-10 rounded-3xl"
        style={{ backgroundColor: '#ffffff' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-6 h-[1px] bg-black/15 mb-6" />

        <p className="text-[9px] tracking-[0.4em] uppercase text-black/30 mb-3">Archive</p>

        <h2
          className="text-2xl font-semibold text-black mb-4 leading-snug"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {stop.title}
        </h2>

        <p className="text-sm text-black/50 leading-relaxed mb-8">
          {stop.text}
        </p>

        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase text-black/30 hover:text-black transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Close
        </button>
      </div>
    </div>
  )
}

function MuseumScroll({ src = '/videos/video-scroll.mp4', stops = STOPS, title = 'WW1 Remembrance Centre · Portsmouth', showBack = false, returnTo = null, scrollHeight = DEFAULT_SCROLL_HEIGHT }) {
  const videoRef    = useRef(null)
  const inStopRef   = useRef(false)
  const navigate    = useNavigate()
  const [ready, setReady] = useState(false)
  const [showTitle, setShowTitle] = useState(true)
  const [activeStop, setActiveStop] = useState(null)
  const [infoPanel, setInfoPanel] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [showContinue, setShowContinue] = useState(false)
  const [debugPos, setDebugPos] = useState(null)


  // Scroll vers le timestamp demandé au chargement (landing page)
  useEffect(() => {
    if (!ready || showBack) return
    const params = new URLSearchParams(window.location.search)
    const t = parseFloat(params.get('t'))
    if (!t || isNaN(t)) return
    const video = videoRef.current
    const scrollY = (t / video.duration) * (scrollHeight - 100) * window.innerHeight / 100
    window.scrollTo({ top: scrollY, behavior: 'instant' })

    window.history.replaceState({}, '', '/')
  }, [ready, showBack])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onLoaded = () => setReady(true)
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  useEffect(() => {
    if (!ready) return
    const video = videoRef.current

    const st = ScrollTrigger.create({
      trigger: '#museum-scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        if (showBack && returnTo !== null) setShowContinue(self.progress > 0.95)

        const t = self.progress * video.duration
        const stop = stops.find(s => t >= s.at && t <= s.at + s.hold)

        if (stop) {
          if (!inStopRef.current) {
            video.currentTime = stop.at
            inStopRef.current = true
          }
          setActiveStop(stop)
        } else {
          inStopRef.current = false
          video.currentTime = t
          setActiveStop(null)
          setInfoPanel(null)
        }

        setCurrentTime(t)
        setShowTitle(t < 2)
      },
    })

    return () => st.kill()
  }, [ready, returnTo, navigate])

  return (
    <div id="museum-scroll-container" style={{ height: `${scrollHeight}vh` }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        onClick={e => {
          const r = e.currentTarget.getBoundingClientRect()
          const x = Math.round((e.clientX - r.left) / r.width * 100)
          const y = Math.round((e.clientY - r.top)  / r.height * 100)
          setDebugPos({ x, y })
          console.log(`x: ${x}, y: ${y}`)
        }}
      >

        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Titre */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700"
          style={{ opacity: showTitle ? 1 : 0 }}
        >
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.15, textAlign: 'center', maxWidth: '80vw' }}>
            {title}
          </h1>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-opacity duration-500"
          style={{ opacity: showTitle ? 1 : 0 }}
        >
          <p className="text-white/60 text-xs tracking-[0.3em] uppercase">Scroll to explore</p>
          <span className="block w-[1px] h-6 bg-white/30 mx-auto mt-2" />
        </div>

        {/* Bouton back (pages room uniquement) */}
        {showBack && (
          <button
            onClick={() => window.history.back()}
            className="absolute top-6 left-6 z-50 flex items-center gap-3 text-white/40 hover:text-white transition-colors text-[10px] tracking-[0.3em] uppercase"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8l5-5M3 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        )}

        {/* Room buttons */}
        {stops.filter(s => s.type === 'room').map((stop, i) => (
          <RoomButton key={i} stop={stop} visible={activeStop === stop} />
        ))}

        {/* Info hotspots */}
        {stops.filter(s => s.type === 'info').map((stop, i) => (
          <InfoHotspot key={i} stop={stop} visible={activeStop === stop && !infoPanel} onOpen={setInfoPanel} />
        ))}

        {/* Panel info */}
        <InfoPanel stop={infoPanel} onClose={() => setInfoPanel(null)} />

        {/* Bouton continuer la visite */}
        {showBack && returnTo !== null && (
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500"
            style={{ opacity: showContinue ? 1 : 0, pointerEvents: showContinue ? 'auto' : 'none' }}
          >
            <button
              onClick={() => navigate(`/?t=${returnTo}`)}
              className="flex items-center gap-4 backdrop-blur-sm text-[10px] tracking-[0.35em] uppercase px-8 py-4 rounded-full shadow-xl transition-all duration-300 group"
              style={{ backgroundColor: '#F3F0E7', color: '#2A2529' }}
            >
              Continue the visit
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {/* ⚠️ DEBUG — supprimer avant prod */}
        <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-mono px-3 py-2 rounded pointer-events-none flex flex-col gap-1">
          <span>{currentTime.toFixed(1)}s / {videoRef.current?.duration?.toFixed(1) ?? '?'}s</span>
          {debugPos && <span style={{ color: '#F3F0E7' }}>x:{debugPos.x} y:{debugPos.y}</span>}
        </div>

      </div>
    </div>
  )
}

export default MuseumScroll
