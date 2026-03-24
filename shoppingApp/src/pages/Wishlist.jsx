import { useWishlist } from '../context/WishlistContext'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-screen-xl mx-auto px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-4" style={{ color: 'var(--color-on-surface)' }}>Your Wishlist</h1>
            <p className="text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--color-on-surface-variant)' }}>
              {wishlist.length} {wishlist.length === 1 ? 'Piece' : 'Pieces'} Saved
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg border transition-colors"
              style={{ borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface-variant)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-error)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-outline-variant)'}
            >
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center animate-fadeUp">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--color-outline)' }}>favorite_border</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-sm mb-8 max-w-xs mx-auto" style={{ color: 'var(--color-on-surface-variant)' }}>
              Save items you love to find them easily later and keep track of your favorites.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="signature-gradient text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
