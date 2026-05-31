import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

const NAV_LINKS = ['Home', 'Shop', 'News', 'About' , 'Donate', 'Contact']

function Menu({ dark = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const overlayRef = useRef(null)
  const linksRef = useRef([])
  const tl = useRef(null)

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })

    tl.current
      .set(overlayRef.current, { visibility: 'visible' })
      .fromTo(
        overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' }
      )
      .fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
        '-=0.25'
      )
  }, [])

  useEffect(() => {
    if (!tl.current) return
    isOpen ? tl.current.play() : tl.current.reverse()
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed top-6 right-6 z-[100] flex flex-col justify-center gap-[6px] p-2"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <span
          className={`block w-7 h-[2px] origin-center transition-transform duration-300 ${dark && !isOpen ? 'bg-black' : 'bg-white'}`}
          style={{ transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
        />
        <span
          className={`block w-7 h-[2px] transition-opacity duration-300 ${dark && !isOpen ? 'bg-black' : 'bg-white'}`}
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className={`block w-7 h-[2px] origin-center transition-transform duration-300 ${dark && !isOpen ? 'bg-black' : 'bg-white'}`}
          style={{ transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
        />
      </button>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-gray-950 invisible flex flex-col items-center justify-center"
      >
        <nav className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              ref={el => { linksRef.current[i] = el }}
              href={`/${link.toLowerCase()}`}
              className="text-white text-5xl font-light tracking-[0.15em] uppercase hover:text-purple-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Menu
