import { useNavigate } from 'react-router-dom'
import { useCart }  from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import CartItem from '../components/CartItem'

export default function Cart() {
  const { items, totalCount, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const toast = useToast()

  const handleClear = () => {
    clearCart()
    toast('Cart cleared', 'info')
  }

  const shipping = totalPrice >= 150 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-8">
           <span className="material-symbols-outlined text-4xl text-on-surface-variant">shopping_cart</span>
        </div>
        <h2 className="text-3xl font-bold uppercase mb-4">Your cart is empty</h2>
        <p className="text-on-surface-variant mb-10 max-w-sm">Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary">Continue Shopping</button>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen">

      {/* Breadcrumb */}
      <section className="bg-surface-container py-12 px-8">
        <div className="max-w-screen-xl mx-auto">
           <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Shopping Cart</h1>
           <div className="flex items-center gap-2 text-sm font-bold">
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <button onClick={() => navigate('/shop')} className="hover:text-primary transition-colors">Shop</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-on-surface-variant">Shopping Cart</span>
           </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Cart Table */}
          <div className="flex-1">
             <div className="hidden md:grid grid-cols-6 border-b border-outline pb-6 mb-10 text-xs font-bold uppercase tracking-widest text-on-surface">
                <div className="col-span-3">Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Total</div>
                <div className="text-right">Action</div>
             </div>

             <div className="flex flex-col gap-10">
                {items.map(({ product, qty }) => (
                  <CartItem key={product.id} product={product} qty={qty} />
                ))}
             </div>

             <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-outline">
                <button
                  onClick={() => navigate('/shop')}
                  className="text-xs font-bold uppercase tracking-[2px] border border-outline px-10 py-4 hover:bg-on-surface hover:text-white transition-all"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleClear}
                  className="text-xs font-bold uppercase tracking-[2px] bg-on-surface text-white px-10 py-4 hover:bg-primary transition-all"
                >
                  Update Cart
                </button>
             </div>
          </div>

          {/* Cart Totals */}
          <aside className="w-full lg:w-[400px] shrink-0">
             <div className="bg-surface-container p-10">
                <h2 className="text-base font-bold uppercase tracking-widest mb-10 border-b border-outline pb-4">Cart Total</h2>

                <div className="flex flex-col gap-6 mb-10">
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold uppercase text-on-surface-variant">Subtotal</span>
                      <span className="text-lg font-bold text-on-surface">${totalPrice.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold uppercase text-on-surface-variant">Shipping</span>
                      <span className={`text-sm font-bold ${shipping === 0 ? 'text-primary' : 'text-on-surface'}`}>
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                   </div>
                   <div className="flex justify-between items-center border-t border-outline pt-6">
                      <span className="text-base font-bold uppercase text-on-surface">Total</span>
                      <span className="text-2xl font-black text-primary">${grandTotal.toFixed(2)}</span>
                   </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-on-surface text-white py-4 font-bold uppercase tracking-[2px] text-xs hover:bg-primary transition-colors"
                >
                  Proceed to Checkout
                </button>
             </div>

             <div className="mt-10">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Discount Codes</h4>
                <div className="flex gap-2">
                   <input type="text" placeholder="Coupon Code" className="flex-1 bg-transparent border border-outline p-4 text-sm outline-none focus:border-on-surface" />
                   <button className="bg-on-surface text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">Apply</button>
                </div>
             </div>
          </aside>

        </div>
      </section>

    </div>
  )
}
