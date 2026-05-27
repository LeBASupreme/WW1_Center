import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 32
const FRAMES_PATH = '/frames'

const getFramePath = (index) =>
  `${FRAMES_PATH}/frame_${String(index).padStart(4, '0')}.jpg`

function MuseumScroll() {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const frameRef  = useRef({ current: 0 })
  const [showTitle, setShowTitle] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // précharge toutes les images en mémoire
    // comme ça pendant le scroll il n'y a aucun lag réseau
    const images = []
    let loaded = 0

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = () => {
        loaded++
        // dès que la première frame est chargée on l'affiche
        if (loaded === 1) drawFrame(0)
      }
      images.push(img)
    }
    imagesRef.current = images

    // dessine une frame sur le canvas en couvrant tout l'écran (object-fit: cover)
    function drawFrame(index) {
      const img = images[index]
      if (!img || !img.complete) return

      const scale = Math.max(
        canvas.width  / img.naturalWidth,
        canvas.height / img.naturalHeight
      )
      const w = img.naturalWidth  * scale
      const h = img.naturalHeight * scale
      const x = (canvas.width  - w) / 2
      const y = (canvas.height - h) / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(img, x, y, w, h)
      if (index === 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // ScrollTrigger — mappe le scroll à l'index de frame
    // scrub: true = le scroll contrôle directement la timeline
    gsap.to(frameRef.current, {
      current: FRAME_COUNT - 1,
      snap: 1,           // arrondit à l'entier le plus proche
      ease: 'none',      // pas d'easing — le scroll est linéaire
      scrollTrigger: {
        trigger: '#museum-scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,        // légère inertie pour un mouvement fluide
      },
      onUpdate: () => {
        const idx = Math.round(frameRef.current.current)
        drawFrame(idx)
        if (idx > 0) setShowTitle(false)
        else setShowTitle(true)
      }
    })

    return () => {
      window.removeEventListener('resize', resize)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    // le container est haut pour donner de la place au scroll
    // 100vh * (FRAME_COUNT / 10) = 1200vh pour 120 frames
    <div id="museum-scroll-container" style={{ height: `${FRAME_COUNT * 10}vh` }}>
      {/* le canvas est fixed — il reste à l'écran pendant le scroll */}
      <div className="sticky top-0 h-screen w-full">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* titre HTML — net, par-dessus le canvas flou */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700"
          style={{ opacity: showTitle ? 1 : 0 }}
        >
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1 }}>
            WWI Centre
          </h1>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-white/60 text-xs tracking-[0.3em] uppercase">Scroll to explore</p>
          <span className="block w-[1px] h-6 bg-white/30 mx-auto mt-2"></span>
        </div>
      </div>
    </div>
  )
}

export default MuseumScroll
