import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist()
  const navigate = useNavigate()

  return (
    <div className="bg-surface min-h-screen">

      {/* Breadcrumb */}
      <section className="bg-surface-container py-12 px-8">
        <div className="max-w-screen-xl mx-auto">
           <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Wishlist</h1>
           <div className="flex items-center gap-2 text-sm font-bold">
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <button onClick={() => navigate('/shop')} className="hover:text-primary transition-colors">Shop</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-on-surface-variant">Wishlist</span>
           </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-outline pb-10">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">My Wishlist</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-bold uppercase tracking-widest px-8 py-4 border border-outline hover:bg-on-surface hover:text-white transition-all"
            >
              Clear All Favorites
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-4xl text-outline">favorite</span>
            </div>
            <h2 className="text-2xl font-bold uppercase mb-4">Your wishlist is empty</h2>
            <p className="text-on-surface-variant mb-10 max-w-sm mx-auto">
              Save items you love to find them easily later and keep track of your favorites.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="btn-primary"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
