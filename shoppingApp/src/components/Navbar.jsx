// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart }  from '../context/CartContext'
import { useAuth }  from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { totalCount } = useCart()
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const linkCls = ({ isActive }) =>
    `text-sm tracking-tight transition-colors duration-200 ${
      isActive
        ? 'text-[var(--color-primary)] font-semibold border-b-2 border-[var(--color-primary)]'
        : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
    }`

  return (
    <>
      {/* Announcement bar */}
      <div className="w-full py-2.5 px-8 text-center"
        style={{ backgroundColor: 'var(--color-surface-container-highest)' }}>
        <p className="text-[10px] tracking-[0.2em] font-medium uppercase"
           style={{ color: 'var(--color-on-surface-variant)' }}>
          Free shipping on orders over $200 · Use code ATELIER10
        </p>
      </div>

      {/* Main nav */}
      <header
        className="sticky top-0 w-full z-50 glass-nav border-b"
        style={{
          backgroundColor: dark ? 'rgba(6,14,32,0.75)' : 'rgba(250,248,255,0.80)',
          borderColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          boxShadow: dark
            ? '0 20px 50px rgba(192,193,255,0.06)'
            : '0 1px 24px rgba(19,27,46,0.06)',
        }}
      >
        <div className="flex justify-between items-center px-8 h-16 max-w-screen-xl mx-auto">
          {/* Logo + links */}
          <div className="flex items-center gap-10">
            <NavLink
              to="/"
              className="text-xl font-black tracking-tighter"
              style={{ color: 'var(--color-on-surface)' }}
            >
              ATELIER
            </NavLink>
            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="/"   end className={linkCls}>Home</NavLink>
              <NavLink to="/shop"   className={linkCls}>Shop</NavLink>
              <NavLink to="/cart"   className={linkCls}>Cart</NavLink>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Cart icon with badge */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-1 transition-transform active:scale-95"
              style={{ color: 'var(--color-primary)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>shopping_bag</span>
              {totalCount > 0 && (
                <span
                  key={totalCount}
                  className="animate-pop absolute -top-1 -right-1 flex h-4 w-4 items-center
                             justify-content-center justify-center rounded-full
                             text-[10px] font-bold text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="transition-colors duration-200 active:scale-95"
              style={{ color: 'var(--color-on-surface-variant)' }}
              title="Toggle theme"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                {dark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {user.name}
                </span>
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 active:scale-95"
                  style={{
                    backgroundColor: 'var(--color-surface-container)',
                    color: 'var(--color-on-surface)',
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <NavLink to="/login">
                <button
                  className="signature-gradient text-white text-xs font-bold px-5 py-2.5
                             rounded-lg tracking-wide transition-all duration-200
                             hover:opacity-90 active:scale-[0.98]"
                >
                  Sign In
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
