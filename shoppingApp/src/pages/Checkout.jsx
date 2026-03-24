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

  const inputStyle = {
    backgroundColor: 'var(--color-surface-container-lowest)',
    borderColor: 'var(--color-outline-variant)',
    color: 'var(--color-on-surface)'
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-4xl mx-auto px-8 py-14">
        <h1 className="text-4xl font-black tracking-tighter mb-10" style={{ color: 'var(--color-on-surface)' }}>Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Shipping Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2" style={{ borderColor: 'var(--color-outline-variant)' }}>Shipping Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Full Name</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Shipping Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Zip Code</label>
                  <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2" style={{ borderColor: 'var(--color-outline-variant)' }}>Payment Method</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Card Number</label>
                <input required type="text" name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Expiry Date</label>
                  <input required type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>CVV</label>
                  <input required type="text" name="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none transition-all" style={inputStyle} />
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-xl space-y-4" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
              <div className="flex justify-between font-bold">
                <span>Total Amount Due</span>
                <span className="text-xl" style={{ color: 'var(--color-primary)' }}>${(totalPrice * 1.08 + (totalPrice >= 150 ? 0 : 9.99)).toFixed(2)}</span>
              </div>

              <button
                disabled={isProcessing}
                type="submit"
                className="w-full signature-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
              </button>

              <p className="text-[10px] text-center uppercase tracking-widest" style={{ color: 'var(--color-on-surface-variant)' }}>
                Your transaction is secured with 256-bit encryption
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
