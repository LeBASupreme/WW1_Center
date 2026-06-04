import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ellipse from '../img/Ellipse 1.png'
import ytIcon from '../img/YouTube Logo.png'
import liIcon from '../img/LinkedIn.png'
import igIcon from '../img/Instagram.png'

const infoLinks = [
  { label: 'Help & Volunteer', href: '/volunteer' },
  { label: 'Donations',        href: '/donate' },
  { label: 'Gift Shop',        href: '/shop' },
]

function FooterHome({ isOpen, setIsOpen }) {
  const overlayRef = useRef(null)
  const colsRef = useRef([])
  const tl = useRef(null)

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })
    tl.current
      .set(overlayRef.current, { visibility: 'visible', y: '100vh' })
      .to(overlayRef.current, { y: '0', duration: 0.7, ease: 'power4.inOut' })
      .fromTo(
        colsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
  }, [])

  useEffect(() => {
    if (!tl.current) return
    isOpen ? tl.current.play() : tl.current.reverse()
  }, [isOpen])

  return (
    <div
      ref={overlayRef}
      className="invisible fixed inset-0 z-[210] bg-white"
      style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto auto' }}
    >
      {/* Ellipse background */}
      <img
        src={ellipse}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Close */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-8 text-xs tracking-[0.25em] uppercase text-black hover:opacity-50 transition-opacity z-20"
      >
        Close
      </button>

      {/* Row 1 — Address + Info */}
      <div ref={el => { colsRef.current[0] = el }} className="relative z-10 flex justify-between px-16 pt-10 pb-4 text-sm text-black">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold mb-0.5">Address</p>
            <p className="leading-5">Bastion, 6<br />Airport Service Rd,<br />Portsmouth PO3 5PJ</p>
          </div>
          <div>
            <p className="font-semibold mb-0.5">Hours</p>
            <p className="leading-5">Sunday, Tuesday – Thursday<br />11 AM – 2 PM</p>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Information</p>
          <div className="flex flex-col gap-0.5">
            {infoLinks.map(link => (
              <a key={link.label} href={link.href} className="text-black underline underline-offset-2 decoration-black hover:opacity-50 transition-opacity leading-6">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center gap-4 px-16">
        <div ref={el => { colsRef.current[1] = el }} className="text-center">
          <h2
            className="text-[clamp(3rem,7vw,6rem)] font-medium leading-none text-black tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            WWI Remembrance Centre
          </h2>
        </div>

       
      </div>

      <div ref={el => { colsRef.current[3] = el }} className="relative z-10 flex items-center justify-between px-16 py-4">
        <div className="flex items-center gap-3">
          {[{ src: ytIcon, alt: 'YouTube' }, { src: liIcon, alt: 'LinkedIn' }, { src: igIcon, alt: 'Instagram' }].map(s => (
            <a key={s.alt} href="#" aria-label={s.alt}>
              <img src={s.src} alt={s.alt} className="w-7 h-7 object-contain hover:opacity-50 transition-opacity" />
            </a>
          ))}
        </div>
        <div className="text-right text-sm text-black">
          <p className="font-semibold mb-0.5">Contact</p>
          <a href="mailto:contact@ww1rc.org" className="underline underline-offset-2 hover:opacity-50 transition-opacity">
            contact@ww1rc.org
          </a>
        </div>
      </div>

      <div ref={el => { colsRef.current[4] = el }} className="relative z-10 border-t border-black px-16 py-4 flex items-center justify-between gap-4 text-xs text-black">
        <p className="max-w-sm leading-5">
          Promoting remembrance through education and commemoration to ensure present and future generations never forget the sacrifices made by past generations.
        </p>
        <p className="whitespace-nowrap">©2025 WW1 Remembrance Centre. All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default FooterHome
