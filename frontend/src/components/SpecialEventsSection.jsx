import API_URL from '../config/api.js'
import { useState, useEffect } from 'react'
import Menu from './Menu'

function SpecialEventsSection() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL + '/api/special-events')
      .then(r => r.json())
      .then(data => { setEvents(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#F3F0E7] flex flex-col">
      <Menu dark />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16 flex-1 w-full">

        <div className="mb-12">
          <p className="text-[10px] tracking-[0.45em] uppercase text-black/30 mb-3">
            WW1 Remembrance Centre
          </p>
          <h1 className="text-4xl font-bold text-black leading-tight">
            Special Events
          </h1>
          <p className="text-black/40 mt-2 text-sm">
            {events.length} upcoming event{events.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#2A2529]/20 border-t-[#2A2529] rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-black/30 text-sm tracking-[0.2em] uppercase">No events scheduled</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {event.image_url && (
                  <div className="h-52 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[9px] tracking-[0.4em] uppercase text-black/30 mb-1.5">
                        {formatDate(event.event_date)}
                      </p>
                      <h2 className="text-xl font-bold text-black leading-snug">
                        {event.title}
                      </h2>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 opacity-30">
                        <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="#2A2529" strokeWidth="1.2"/>
                        <circle cx="6" cy="4.5" r="1" fill="#2A2529" opacity=".5"/>
                      </svg>
                      <p className="text-xs text-black/40">{event.location}</p>
                    </div>
                  )}

                  {event.description && (
                    <p className="text-sm text-black/50 leading-relaxed line-clamp-3 flex-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SpecialEventsSection
