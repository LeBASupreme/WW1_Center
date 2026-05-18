import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Menu from './Menu'
import FooterHome from './FooterHome'

function NewsDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [footerOpen, setFooterOpen] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(r => r.json())
      .then(data => {
        setArticle(data.find(a => a.id === parseInt(id)) || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  if (loading) return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
    </div>
  )

  if (!article) return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center">
      <p className="text-black/40 text-lg mb-4">Article not found.</p>
      <Link to="/news" className="text-black font-medium hover:underline">Back to news</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-12 w-full flex-1">
        <Link to="/news" className="text-sm text-black/40 hover:text-black transition flex items-center gap-1 mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to news
        </Link>

        <article className="bg-white rounded-2xl p-8">
          <p className="text-sm text-black/40 mb-3">{formatDate(article.created_at)}</p>
          <h1 className="text-3xl font-bold text-black mb-6">{article.title}</h1>
          <p className="text-black/60 leading-relaxed whitespace-pre-line">{article.content}</p>
        </article>
      </div>

      <button
        onClick={() => setFooterOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-xs tracking-[0.3em] uppercase text-gray-500 hover:text-black transition-colors duration-200"
      >
        <span className="block w-[1px] h-6 bg-gray-400"></span>
        More Info
      </button>
      <FooterHome isOpen={footerOpen} setIsOpen={setFooterOpen} />
    </div>
  )
}

export default NewsDetail
