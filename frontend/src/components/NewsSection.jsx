import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'

function NewsSection() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

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
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex"
              >
                {article.image_url && (
                  <div className="w-48 shrink-0 overflow-hidden">
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-black/40 mb-2">{formatDate(article.created_at)}</p>
                    <h2 className="text-xl font-bold text-black group-hover:text-black/70 transition mb-2">{article.title}</h2>
                    {article.content && (
                      <p className="text-black/50 text-sm line-clamp-3 leading-relaxed">{article.content}</p>
                    )}
                  </div>
                  <span className="inline-block mt-4 text-sm font-medium text-black bg-black/5 px-4 py-2 rounded-full group-hover:bg-black group-hover:text-white transition w-fit">
                    Read more
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default NewsSection
