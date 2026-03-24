import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (items.length === 0) {
      navigate('/shop')
    }
  }, [items.length, navigate])

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })

  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      toast('Order placed successfully! Thank you for your purchase.', 'success')
      navigate('/')
    }, 2000)
  }

  const shipping = totalPrice >= 150 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  return (
    <div className="bg-surface min-h-screen">

      {/* Breadcrumb */}
      <section className="bg-surface-container py-12 px-8">
        <div className="max-w-screen-xl mx-auto">
           <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Checkout</h1>
           <div className="flex items-center gap-2 text-sm font-bold">
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <button onClick={() => navigate('/shop')} className="hover:text-primary transition-colors">Shop</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-on-surface-variant">Checkout</span>
           </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-xl mx-auto w-full">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 border-b border-outline pb-10">Billing Details</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-24">

          {/* Billing Form */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase text-on-surface-variant">Full Name<span className="text-primary">*</span></label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase text-on-surface-variant">Email Address<span className="text-primary">*</span></label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold uppercase text-on-surface-variant">Street Address<span className="text-primary">*</span></label>
                 <input required type="text" name="address" placeholder="House number and street name" value={formData.address} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm mb-4" />
                 <input type="text" placeholder="Apartment, suite, unit etc. (optional)" className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase text-on-surface-variant">Town/City<span className="text-primary">*</span></label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase text-on-surface-variant">Postcode/ZIP<span className="text-primary">*</span></label>
                    <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
                 </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
               <h3 className="text-xl font-bold uppercase tracking-tighter">Payment Details</h3>
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase text-on-surface-variant">Card Number<span className="text-primary">*</span></label>
                  <input required type="text" name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase text-on-surface-variant">Expiry Date<span className="text-primary">*</span></label>
                    <input required type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase text-on-surface-variant">CVV<span className="text-primary">*</span></label>
                    <input required type="text" name="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} className="border border-outline p-4 outline-none focus:border-on-surface text-sm" />
                  </div>
               </div>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="w-full">
             <div className="bg-surface-container p-12">
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-8 border-b border-outline pb-4">Your Order</h3>

                <div className="flex flex-col gap-6 mb-10">
                   <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-on-surface">
                      <span>Product</span>
                      <span>Total</span>
                   </div>
                   <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                      {items.map(({ product, qty }) => (
                        <div key={product.id} className="flex justify-between items-center text-sm font-bold text-on-surface-variant">
                           <span className="truncate max-w-[200px]">{product.title} × {qty}</span>
                           <span className="text-on-surface font-black shrink-0">${(product.price * qty).toFixed(2)}</span>
                        </div>
                      ))}
                   </div>
                   <div className="flex justify-between items-center border-t border-outline pt-6">
                      <span className="text-sm font-bold uppercase text-on-surface">Subtotal</span>
                      <span className="text-lg font-black text-on-surface">${totalPrice.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold uppercase text-on-surface">Shipping</span>
                      <span className={`text-sm font-bold ${shipping === 0 ? 'text-primary' : 'text-on-surface'}`}>
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold uppercase text-on-surface">Tax (8%)</span>
                      <span className="text-sm font-bold text-on-surface">${tax.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center border-t-2 border-on-surface pt-6">
                      <span className="text-xl font-black uppercase text-on-surface">Total</span>
                      <span className="text-3xl font-black text-primary">${grandTotal.toFixed(2)}</span>
                   </div>
                </div>

                <div className="flex flex-col gap-4 mb-10">
                   <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-primary" />
                      <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Create an account?</span>
                   </label>
                   <p className="text-xs text-on-surface-variant leading-relaxed">
                      LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.
                   </p>
                </div>

                <button
                  disabled={isProcessing}
                  type="submit"
                  className="w-full bg-on-surface text-white py-5 font-bold uppercase tracking-[3px] text-sm hover:bg-primary transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
             </div>
          </aside>

        </form>
      </section>

    </div>
  )
}
