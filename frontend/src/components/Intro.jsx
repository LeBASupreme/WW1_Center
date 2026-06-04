import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CHARCOAL = '#2A2529'
const IVORY    = '#F3F0E7'

function Intro({ onDone }) {
  const overlayRef = useRef(null)
  const taglineRef = useRef(null)
  const lineRef    = useRef(null)
  const titleRef   = useRef(null)
  const subRef     = useRef(null)
  const btnRef     = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()

    tl.set([taglineRef.current, titleRef.current, subRef.current, btnRef.current], { opacity: 0, y: 28 })
      .set(lineRef.current, { scaleX: 0 })
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.4)
      .to(lineRef.current,    { scaleX: 1, duration: 1.1, ease: 'power3.inOut' },      0.9)
      .to(titleRef.current,   { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' }, 1.2)
      .to(subRef.current,     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.7)
      .to(btnRef.current,     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 2.1)
  }, [])

  const handleEnter = () => {
    gsap.to(overlayRef.current, {
      y: '-100%',
      duration: 1.1,
      ease: 'power4.inOut',
      onComplete: onDone,
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: CHARCOAL }}
    >
      <div className="flex flex-col items-center text-center px-8 max-w-2xl">

        <p
          ref={taglineRef}
          className="text-[10px] tracking-[0.45em] uppercase mb-8"
          style={{ color: `${IVORY}45` }}
        >
          WW1 Remembrance Centre · Portsmouth
        </p>


 
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
            lineHeight: 1.1,
            color: IVORY,
            letterSpacing: '-0.01em',
          }}
        >
          What if visiting<br />a museum could be<br />done online?
        </h1>

        {/* Sous-titre */}
        <p
          ref={subRef}
          className="text-[10px] tracking-[0.4em] uppercase mt-7"
          style={{ color: `${IVORY}40` }}
        >
          Explore our collections · Anytime · Anywhere
        </p>

        {/* Bouton pill */}
        <button
          ref={btnRef}
          onClick={handleEnter}
          className="mt-14 flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 group"
          style={{
            backgroundColor: IVORY,
            color: CHARCOAL,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = `${IVORY}CC`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = IVORY
          }}
        >
          Enter the museum
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
            <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

      </div>
    </div>
  )
}

export default Intro
