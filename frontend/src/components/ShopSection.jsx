import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import FooterHome from './FooterHome'

function ShopSection() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [footerOpen, setFooterOpen] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFiltered(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!search) { setFiltered(products); return }
    const q = search.toLowerCase()
    setFiltered(products.filter(p =>
      p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    ))
  }, [search, products])

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 flex-1 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Gift Shop</h1>
            <p className="text-black/50 mt-1">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition bg-white w-56"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-black/40 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.id}`}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-black/5">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-black/20 text-sm">No image</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-bold text-black group-hover:text-black/70 transition">{product.name}</h2>
                  {product.description && (
                    <p className="text-black/50 text-sm mt-1 line-clamp-2 flex-1">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/10">
                    <span className="font-bold text-lg">£{parseFloat(product.price).toFixed(2)}</span>
                    <span className="text-xs text-black/40">{product.stock} in stock</span>
                  </div>
                </div>
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

export default ShopSection
