// src/pages/ProductDetail.jsx — Stitch "ATELIER" Product Detail Page
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetchProduct } from '../hooks/useFetchProduct'
import { useCart }  from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import QuantityControl from '../components/QuantityControl'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading, error, refetch } = useFetchProduct(id)
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const toast = useToast()
  const [qty, setQty] = useState(1)

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5"
         style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="animate-spin w-10 h-10 rounded-full border-[3px]"
           style={{ borderColor: 'var(--color-surface-container-high)', borderTopColor: 'var(--color-primary)' }} />
      <p className="text-sm tracking-widest uppercase font-medium"
         style={{ color: 'var(--color-on-surface-variant)' }}>Loading Piece…</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-8"
         style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="p-8 rounded-xl text-center max-w-sm"
           style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
        <span className="material-symbols-outlined mb-3 block" style={{ fontSize: 36, color: 'var(--color-error)' }}>error_outline</span>
        <p className="text-sm mb-5" style={{ color: 'var(--color-on-surface-variant)' }}>Failed to load piece: {error}</p>
        <button onClick={refetch} className="signature-gradient text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-opacity hover:opacity-90">Try Again</button>
      </div>
    </div>
  )

  if (!product) return null

  const handleAdd = () => {
    addItem(product, qty)
    toast(`Added "${product.title.slice(0, 30)}…" to your selection`, 'success')
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    const active = isInWishlist(product.id)
    toast(active ? `Removed from wishlist` : `Added to wishlist`, 'info')
  }

  const starCount = Math.round(product.rating?.rate ?? 4)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-screen-xl mx-auto px-8 py-14">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-10 text-[10px] uppercase tracking-widest font-semibold"
             style={{ color: 'var(--color-on-surface-variant)' }}>
          <button onClick={() => navigate('/')} className="hover:text-[var(--color-primary)] transition-colors">Home</button>
          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>chevron_right</span>
          <button onClick={() => navigate('/shop')} className="hover:text-[var(--color-primary)] transition-colors">Shop</button>
          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>chevron_right</span>
          <span style={{ color: 'var(--color-on-surface)' }}>{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery (Simplified for now) */}
          <div className="aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-12"
               style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
            <img src={product.image} alt={product.title} className="max-h-full object-contain hover:scale-105 transition-transform duration-700" />
          </div>

          {/* Details */}
          <div className="space-y-8 animate-fadeUp">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--color-primary)' }}>{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-[0.95]" style={{ color: 'var(--color-on-surface)' }}>{product.title}</h1>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1">
                  <span className="text-amber-400 text-sm">{'★'.repeat(starCount)}{'☆'.repeat(5 - starCount)}</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-outline)' }}>({product.rating?.count ?? 0} reviews)</span>
                </div>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-outline-variant)' }} />
                <p className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>SKU: AT-{product.id}0024</p>
              </div>
            </div>

            <div className="text-3xl font-bold" style={{ color: 'var(--color-on-surface)' }}>
              ${product.price.toFixed(2)}
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-on-surface)' }}>Description</h3>
              <p className="text-base font-light leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{product.description}</p>
            </div>

            {/* Actions */}
            <div className="pt-8 border-t space-y-6" style={{ borderColor: 'var(--color-surface-container-high)' }}>
              <div className="flex items-center gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-on-surface-variant)' }}>Quantity</label>
                  <QuantityControl value={qty} onChange={setQty} />
                </div>
                <button onClick={handleAdd} className="flex-1 signature-gradient text-white py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
                        style={{ boxShadow: '0 8px 24px rgba(42,20,180,0.2)' }}>
                  Add to Selection
                </button>
              </div>

              <button
                onClick={handleWishlist}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
                style={{
                  backgroundColor: isInWishlist(product.id) ? 'var(--color-error)' : 'var(--color-surface-container-low)',
                  color: isInWishlist(product.id) ? 'white' : 'var(--color-on-surface)'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: isInWishlist(product.id) ? "'FILL' 1" : "'FILL' 0" }}>
                  favorite
                </span>
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { icon: 'local_shipping', text: 'Complimentary Shipping' },
                { icon: 'verified_user', text: '2-Year Warranty' },
                { icon: 'sync', text: '30-Day Returns' },
                { icon: 'lock', text: 'Secure Checkout' },
              ].map(g => (
                <div key={g.text} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{g.icon}</span>
                  {g.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
