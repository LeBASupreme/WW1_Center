import AdminLayout from '../components/AdminLayout'

function AdminHelp() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-black mb-8">Help</h1>

      <div className="bg-white rounded-2xl p-12 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-black mb-2">Bientôt disponible</h2>
        <p className="text-sm text-black/40">Le centre d'aide sera disponible très prochainement.</p>
      </div>
    </AdminLayout>
  )
}

export default AdminHelp
