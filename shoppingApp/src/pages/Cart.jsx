// src/pages/Cart.jsx — Stitch ATELIER "Your Selection" cart page
import { useNavigate } from 'react-router-dom'
import { useCart }  from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import CartItem from '../components/CartItem'

const TAX_RATE           = 0.08
const SHIPPING_THRESHOLD = 150

export default function Cart() {
  const { items, totalCount, totalPrice, clearCart } = useCart()
  const toast    = useToast()
  const navigate = useNavigate()

  const shipping   = totalPrice >= SHIPPING_THRESHOLD ? 0 : 9.99
  const tax        = totalPrice * TAX_RATE
  const grandTotal = totalPrice + shipping + tax

  const handleClear = () => {
    clearCart()
    toast('Your selection has been cleared', 'error')
  }

  // ── Empty state ──────────────────────────────
  if (items.length === 0) return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="text-center max-w-sm">
        <span
          className="material-symbols-outlined mb-6 block"
          style={{ fontSize: 64, color: 'var(--color-outline-variant)' }}
        >
          shopping_bag
        </span>
        <h1
          className="font-black text-3xl tracking-tighter mb-3"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Your Selection is Empty
        </h1>
        <p
          className="text-sm font-light leading-relaxed mb-8"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          Begin curating your archive — discover pieces crafted for the discerning eye.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="signature-gradient text-white px-8 py-4 rounded-lg font-bold
                     uppercase tracking-widest text-xs transition-all
                     hover:opacity-90 active:scale-[0.98]"
          style={{ boxShadow: '0 8px 24px rgba(42,20,180,0.2)' }}
        >
          Explore the Atelier
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      <main className="max-w-screen-xl mx-auto w-full px-8 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* ── Items section ── */}
          <div className="flex-grow space-y-12">
            {/* Header */}
            <header>
              <h1
                className="text-5xl md:text-6xl font-extrabold tracking-tight mb-3"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Your Selection
              </h1>
              <p
                className="font-medium text-sm"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                Review your pieces before completing the acquisition.{' '}
                {totalCount > 0 && (
                  <span style={{ color: 'var(--color-primary)' }}>
                    {totalCount} item{totalCount !== 1 ? 's' : ''}
                  </span>
                )}
              </p>
            </header>

            {/* Cart rows — no dividers, vertical spacing is the separator */}
            <div className="space-y-10">
              {items.map(({ product, qty }) => (
                <CartItem key={product.id} product={product} qty={qty} />
              ))}
            </div>

            {/* Shipping message */}
            <div
              className="p-6 rounded-xl flex items-start gap-4"
              style={{ backgroundColor: 'var(--color-surface-container-low)' }}
            >
              <span
                className="material-symbols-outlined shrink-0 mt-0.5"
                style={{ fontSize: 22, color: 'var(--color-primary)' }}
              >
                local_shipping
              </span>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-on-surface)' }}>
                  {shipping === 0
                    ? 'Complimentary Global Shipping'
                    : `Add $${(SHIPPING_THRESHOLD - totalPrice).toFixed(2)} for free shipping`}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {shipping === 0
                    ? 'Your order qualifies for our Atelier White-Glove delivery service at no extra cost.'
                    : `Orders over $${SHIPPING_THRESHOLD} receive complimentary global shipping.`}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate('/shop')}
                className="flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg
                           transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--color-surface-container)',
                  color: 'var(--color-on-surface)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                Continue Shopping
              </button>
              <button
                onClick={handleClear}
                className="text-sm font-medium px-5 py-3 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--color-surface-container)',
                  color: 'var(--color-on-surface-variant)',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-error)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-on-surface-variant)'}
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* ── Summary sidebar ── */}
          <aside className="w-full lg:w-[400px] shrink-0">
            <div
              className="sticky top-28 p-8 rounded-xl"
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                border: '1px solid',
                borderColor: 'rgba(199,196,215,0.1)',
                boxShadow: '0 20px 40px rgba(19,27,46,0.06)',
              }}
            >
              <h2
                className="text-xl font-bold mb-8 tracking-tight"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Order Summary
              </h2>

              {/* Line items */}
              <div className="space-y-4 mb-8">
                {items.map(({ product, qty }) => (
                  <div
                    key={product.id}
                    className="flex justify-between text-sm"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    <span className="truncate max-w-[200px]">
                      {product.title.slice(0, 26)}… ×{qty}
                    </span>
                    <span className="shrink-0 ml-3" style={{ color: 'var(--color-on-surface)' }}>
                      ${(product.price * qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div
                className="space-y-4 pt-6"
                style={{ borderTop: '1px solid var(--color-outline-variant)', borderTopOpacity: 0.2 }}
              >
                <div className="flex justify-between text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--color-on-surface)' }}>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? 'var(--color-primary)' : 'var(--color-on-surface)' }}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <span>Estimated Tax</span>
                  <span style={{ color: 'var(--color-on-surface)' }}>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand total */}
              <div
                className="flex justify-between items-baseline mt-6 pt-6"
                style={{ borderTop: '1px solid var(--color-outline-variant)', borderTopOpacity: 0.15 }}
              >
                <span className="font-bold text-lg" style={{ color: 'var(--color-on-surface)' }}>Total</span>
                <div className="text-right">
                  <span
                    className="font-black text-3xl tracking-tight block"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    ${grandTotal.toFixed(2)}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-widest"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    Inclusive of VAT
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-8 signature-gradient text-white py-4 rounded-xl
                           font-bold tracking-wide text-sm transition-all
                           hover:opacity-90 active:scale-[0.98]"
                style={{ boxShadow: '0 8px 24px rgba(42,20,180,0.25)' }}
              >
                Proceed to Checkout
              </button>

              {/* Trust signal */}
              <p
                className="flex items-center justify-center gap-2 text-[10px] uppercase
                           tracking-widest mt-4"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span>
                Secure Encrypted Transaction
              </p>

              {/* Concierge */}
              <div
                className="mt-8 pt-6 space-y-2"
                style={{ borderTop: '1px solid var(--color-outline-variant)', borderTopOpacity: 0.1 }}
              >
                <p
                  className="text-xs font-bold mb-3"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  Need Assistance?
                </p>
                {[
                  { icon: 'phone', label: '+1 (800) ATELIER' },
                  { icon: 'mail',  label: 'concierge@atelier.digital' },
                ].map(c => (
                  <p key={c.label} className="flex items-center gap-2 text-xs"
                     style={{ color: 'var(--color-on-surface-variant)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{c.icon}</span>
                    {c.label}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-20 py-10 px-8"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div>
            <p className="font-black tracking-tighter" style={{ color: 'var(--color-on-surface)' }}>ATELIER</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>
              © 2025 ATELIER DIGITAL. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex gap-6 text-[11px] uppercase tracking-widest"
               style={{ color: 'var(--color-on-surface-variant)' }}>
            {['Terms', 'Privacy', 'Shipping', 'Contact'].map(l => (
              <span key={l} className="cursor-pointer hover:text-[var(--color-on-surface)] transition-colors">{l}</span>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            © 2025 ATELIER DIGITAL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
