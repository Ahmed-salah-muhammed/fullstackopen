import { NavLink, useNavigate } from 'react-router-dom'
import { useCart }  from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth }  from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { totalCount, totalPrice } = useCart()
  const { wishlist } = useWishlist()
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const linkCls = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-[2px] transition-colors duration-200 ${
      isActive
        ? 'text-primary border-b-2 border-primary'
        : 'text-on-surface hover:text-primary'
    }`

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-on-surface text-white py-2.5 px-8 text-center text-[10px] font-bold uppercase tracking-[2px]">
        Free shipping, 30-day return or refund guarantee.
      </div>

      <header className="sticky top-0 w-full z-50 bg-surface border-b border-outline shadow-sm">
        <div className="flex justify-between items-center px-8 h-20 max-w-screen-xl mx-auto">

          {/* Logo */}
          <NavLink to="/" className="text-2xl font-black tracking-tighter text-on-surface">
            MALE-FASHION<span className="text-primary">.</span>
          </NavLink>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/" end className={linkCls}>Home</NavLink>
            <NavLink to="/shop" className={linkCls}>Shop</NavLink>
            <NavLink to="/pages" className={linkCls}>Pages</NavLink>
            <NavLink to="/blog" className={linkCls}>Blog</NavLink>
            <NavLink to="/contacts" className={linkCls}>Contacts</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">

            {/* Search */}
            <button className="text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* Wishlist */}
            <button onClick={() => navigate('/wishlist')} className="relative text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors group">
              <div className="relative">
                <span className="material-symbols-outlined">shopping_bag</span>
                {totalCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-on-surface text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-primary">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">${totalPrice.toFixed(2)}</span>
            </button>

            {/* Theme Toggle */}
             <button onClick={toggle} className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">
                {dark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Auth */}
            {user ? (
               <div className="flex items-center gap-4 border-l border-outline pl-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{user.name}</span>
                  <button onClick={() => { logout(); navigate('/') }} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Logout</button>
               </div>
            ) : (
              <NavLink to="/login" className="text-xs font-bold uppercase tracking-widest hover:text-primary border-l border-outline pl-6">
                Sign In
              </NavLink>
            )}

          </div>
        </div>
      </header>
    </>
  )
}
