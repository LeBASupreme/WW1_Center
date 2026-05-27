import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Menu from './Menu'
function ShopDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetch(`http://localhost:5000/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id))
        setProduct(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center">
        <p className="text-black/40 text-lg mb-4">Product not found.</p>
        <Link to="/shop" className="text-black font-medium hover:underline">Back to shop</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <Menu dark />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-12 w-full flex-1">
        <Link to="/shop" className="text-sm text-black/40 hover:text-black transition flex items-center gap-1 mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-96 rounded-2xl overflow-hidden bg-black/5">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-black/20">No image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-black mb-3">{product.name}</h1>
            <p className="text-3xl font-bold text-black mb-6">£{parseFloat(product.price).toFixed(2)}</p>

            {product.description && (
              <p className="text-black/60 leading-relaxed mb-8">{product.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-black/40 mb-1">Availability</p>
                <p className="font-medium text-sm">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-black/40 mb-1">Price</p>
                <p className="font-medium text-sm">£{parseFloat(product.price).toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <p className="text-sm text-black/50 mb-4">Available for purchase in person at the centre.</p>

              <div className="flex items-center gap-3 mb-4">
                <label className="text-sm text-black/50">Quantity</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5 transition">−</button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5 transition">+</button>
                </div>
              </div>

              <div className="flex justify-between text-sm py-3 border-t border-black/10 mb-4">
                <span className="text-black/50">Total</span>
                <span className="font-bold">£{(parseFloat(product.price) * quantity).toFixed(2)}</span>
              </div>

              <a
                href="mailto:contact@ww1rc.org"
                className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition flex items-center justify-center"
              >
                Enquire by email
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShopDetail
