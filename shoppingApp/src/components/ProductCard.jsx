// src/components/ProductCard.jsx — Stitch "ATELIER" card style
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart }  from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import QuantityControl from './QuantityControl'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const toast = useToast()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(product, qty)
    toast(`Added "${product.title.slice(0, 30)}…" to your selection`, 'success')
    setQty(1)
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
    const active = isInWishlist(product.id)
    toast(active ? `Removed from wishlist` : `Added to wishlist`, 'info')
  }

  const handleNavigate = () => {
    navigate(`/product/${product.id}`)
  }

  const starCount = Math.round(product.rating?.rate ?? 4)

  return (
    <article
      onClick={handleNavigate}
      className="group flex flex-col rounded-xl p-4 transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: 'var(--color-surface-container-low)',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-highest)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
    >
      {/* Image area */}
      <div
        className="relative aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center p-8"
        style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
      >
        {/* Wishlist btn */}
        <button
          className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center
                     backdrop-blur transition-all duration-300 ${
                       isInWishlist(product.id)
                         ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm'
                         : 'bg-white/90 text-gray-400 hover:text-red-500'
                     }`}
          onClick={handleWishlist}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: isInWishlist(product.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
        </button>

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Body */}
      <div className="flex-1 px-2 pb-2 flex flex-col gap-4">
        {/* Name + price */}
        <div className="flex justify-between items-start gap-2">
          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 flex-1 hover:text-[var(--color-primary)] transition-colors"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {product.title}
          </h3>
          <span
            className="font-bold text-sm shrink-0 ml-2"
            style={{ color: 'var(--color-primary)' }}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Category + rating */}
        <div className="flex items-center justify-between">
          <p
            className="text-[10px] uppercase tracking-widest font-medium"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-xs">{'★'.repeat(starCount)}{'☆'.repeat(5 - starCount)}</span>
            <span className="text-[10px]" style={{ color: 'var(--color-outline)' }}>
              ({product.rating?.count ?? 0})
            </span>
          </div>
        </div>

        {/* Qty + Add to Cart */}
        <div className="flex items-center justify-between gap-3 mt-auto" onClick={e => e.stopPropagation()}>
          <QuantityControl value={qty} onChange={setQty} size="sm" />
          <button
            onClick={handleAdd}
            className="flex-1 signature-gradient text-white py-2 px-4 rounded-lg
                       text-xs font-bold transition-transform active:scale-95
                       hover:opacity-90"
            style={{ boxShadow: '0 4px 12px rgba(42,20,180,0.2)' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}
