import { Link } from 'react-router-dom'
import Menu from './Menu'

const hours = [
  { day: 'Tuesday – Thursday', time: '11:00 AM – 2:00 PM' },
  { day: 'Sunday',             time: '11:00 AM – 2:00 PM' },
  { day: 'Monday, Friday, Saturday', time: 'Closed' },
]

function Contact() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-2xl mx-auto px-6 pt-32 pb-16 w-full flex-1">
        <Link to="/" className="text-sm text-black/40 hover:text-black transition flex items-center gap-1 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <h1 className="text-4xl font-bold text-black mb-2">Contact us</h1>
        <p className="text-black/50 mb-10 leading-relaxed">
          We'd love to hear from you — whether you're planning a visit, researching family history, or interested in volunteering.
        </p>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-6">
            <p className="text-xs font-medium text-black/40 uppercase tracking-widest mb-4">Get in touch</p>
            <div className="flex flex-col gap-4">
              <a href="mailto:contact@ww1rc.org" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-black/40 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-black group-hover:underline">contact@ww1rc.org</p>
                </div>
              </a>

              <a href="tel:02394007775" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-black/40 mb-0.5">Phone</p>
                  <p className="text-sm font-medium text-black group-hover:underline">02394 007775</p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Bastion+6+Hilsea+Lines+Portsmouth+PO3+5PJ"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-black/40 mb-0.5">Address</p>
                  <p className="text-sm font-medium text-black group-hover:underline">Bastion 6, Hilsea Lines<br />Airport Service Rd, Portsmouth PO3 5PJ</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <p className="text-xs font-medium text-black/40 uppercase tracking-widest mb-4">Opening hours</p>
            <div className="flex flex-col gap-3">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex justify-between items-center text-sm">
                  <span className="text-black/60">{day}</span>
                  <span className={`font-medium ${time === 'Closed' ? 'text-black/30' : 'text-black'}`}>{time}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-black/30 mt-4">Hours may change without notice due to volunteer staffing.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact