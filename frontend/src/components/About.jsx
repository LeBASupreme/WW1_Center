import { Link } from 'react-router-dom'
import Menu from './Menu'

const pillars = [
  {
    title: 'Education',
    text: 'We work closely with schools to bring the history of the Great War into the classroom, offering tailored programmes and guided visits for students of all ages.',
  },
  {
    title: 'Research Library',
    text: 'Our extensive library holds personal accounts, photographs, and records from the First World War, open to researchers, historians, and families tracing their heritage.',
  },
  {
    title: 'Battlefield Trips',
    text: 'We organise expeditions to the Somme and Ypres, giving visitors the chance to walk the ground where history was made and pay their respects.',
  },
  {
    title: 'Community',
    text: 'Entirely volunteer-run, the centre relies on the dedication of local people who share a passion for remembrance and a commitment to keeping these stories alive.',
  },
]

function About() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 w-full flex-1">
        <Link to="/" className="text-sm text-black/40 hover:text-black transition flex items-center gap-1 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <h1 className="text-4xl font-bold text-black mb-4">About the Centre</h1>
        <p className="text-lg text-black/50 leading-relaxed mb-12">
          Promoting remembrance through education and commemoration to ensure present and future generations never forget the sacrifices made by past generations.
        </p>

        <div className="bg-white rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Who we are</h2>
          <p className="text-black/60 leading-relaxed mb-4">
            The WW1 Remembrance Centre is a volunteer-run museum based in Portsmouth, dedicated to honouring the men and women who served in the First World War. We are a registered charity (#1195390) driven entirely by the passion and commitment of our volunteers.
          </p>
          <p className="text-black/60 leading-relaxed">
            Located in the historic Bastion 6 of Hilsea Lines, our centre goes beyond the battlefield — we explore the full human story of the war, from soldier experiences on the front line to life on the home front, and the lasting cultural impact the conflict left on the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-black mb-2">{p.title}</h3>
              <p className="text-sm text-black/55 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-black rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Support our mission</p>
            <p className="text-white/50 text-sm">Help us keep the centre open for future generations.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/volunteer" className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition">
              Volunteer
            </Link>
            <Link to="/donate" className="bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/20 transition">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
