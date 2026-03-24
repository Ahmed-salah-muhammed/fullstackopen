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
    toast(`Added "${product.title.slice(0, 20)}..." to cart`, 'success')
    setQty(1)
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
    toast(isInWishlist(product.id) ? `Removed from wishlist` : `Added to wishlist`, 'info')
  }

  const starCount = Math.round(product.rating?.rate ?? 4)

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="group flex flex-col cursor-pointer bg-white transition-all duration-300 border border-transparent hover:border-outline"
    >
      {/* Image with hover reveal actions */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container flex items-center justify-center p-8">
        {/* Badges (New/Sale) */}
        {product.id % 3 === 0 && (
           <span className="absolute top-4 left-4 bg-on-surface text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 z-20">New</span>
        )}
        {product.id % 5 === 0 && (
           <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 z-20">Sale</span>
        )}

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
           <button
             onClick={handleWishlist}
             className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
           >
             <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: isInWishlist(product.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
           </button>
           <button className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
             <span className="material-symbols-outlined" style={{ fontSize: 20 }}>sync</span>
           </button>
           <button className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
             <span className="material-symbols-outlined" style={{ fontSize: 20 }}>search</span>
           </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Add to Cart Button */}
        <div className="absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
           <button
             onClick={handleAdd}
             className="w-full bg-on-surface text-white py-4 font-bold uppercase tracking-[2px] text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2"
           >
             + Add to Cart
           </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-6 pb-2 px-1 flex flex-col gap-2">
        <h3 className="text-sm font-bold uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-xs">{'★'.repeat(starCount)}{'☆'.repeat(5 - starCount)}</span>
          <span className="text-[10px] font-bold text-on-surface-variant">(${product.rating?.count ?? 0})</span>
        </div>

        <div className="flex items-center gap-3">
           <span className="text-lg font-black text-on-surface">${product.price.toFixed(2)}</span>
           {product.id % 5 === 0 && (
              <span className="text-sm text-on-surface-variant line-through font-bold">${(product.price * 1.4).toFixed(2)}</span>
           )}
        </div>

        {/* Colors placeholder */}
        <div className="flex gap-2 mt-2">
           {['#111111', '#ebebeb', '#e53637'].map(c => (
              <div key={c} className="w-3 h-3 rounded-full border border-outline hover:border-on-surface transition-colors cursor-pointer" style={{ backgroundColor: c }} />
           ))}
        </div>
      </div>
    </article>
  )
}
