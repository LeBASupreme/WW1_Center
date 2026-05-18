import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import FooterHome from './FooterHome'

function NewsSection() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [footerOpen, setFooterOpen] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(r => r.json())
      .then(data => { setArticles(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-12 flex-1 w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black">News</h1>
          <p className="text-black/50 mt-1">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-black/40 text-lg">No news yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <p className="text-xs text-black/40 mb-2">{formatDate(article.created_at)}</p>
                <h2 className="text-xl font-bold text-black group-hover:text-black/70 transition mb-2">{article.title}</h2>
                {article.content && (
                  <p className="text-black/50 text-sm line-clamp-3 leading-relaxed">{article.content}</p>
                )}
                <span className="inline-block mt-4 text-sm font-medium text-black bg-black/5 px-4 py-2 rounded-full group-hover:bg-black group-hover:text-white transition">
                  Read more
                </span>
              </Link>
            ))}
          </div>
        )}
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

export default NewsSection
