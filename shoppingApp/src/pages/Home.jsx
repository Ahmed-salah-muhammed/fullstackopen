import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import useFetchProducts from '../hooks/useFetchProducts'

const CATEGORIES = [
  { id: 1, title: 'Clothing Collections', image: 'https://images.pexels.com/photos/157675/fashion-men-s-fashion-waiscoat-suit-157675.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Fashion Trend' },
  { id: 2, title: 'Accessories', image: 'https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'New Arrival' },
  { id: 3, title: 'Shoes Spring 2024', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Summer 2024' },
]

export default function Home() {
  const navigate = useNavigate()
  const { products, loading } = useFetchProducts()
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 24, minutes: 60, seconds: 60 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const bestSellers = products?.slice(0, 4) || []

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative h-[800px] flex items-center bg-[#f3f2ee] px-8 overflow-hidden">
        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
          <div className="animate-fadeIn">
            <span className="hero-label">Summer Collection</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-[-2px] leading-tight text-on-surface">
              Fall - Winter <br /> Collections 2024
            </h1>
            <p className="text-on-surface-variant text-base mb-10 max-w-md leading-relaxed">
              A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-primary text-white font-bold uppercase tracking-[4px] px-8 py-4 inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Shop Now
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </button>

            <div className="mt-12 flex gap-8">
              {['Facebook', 'Twitter', 'Pinterest', 'Instagram'].map(social => (
                <span key={social} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                  {social}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:block relative h-full">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
             <img
               src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
               alt="Hero"
               className="relative z-10 w-full h-[600px] object-cover rounded-2xl shadow-2xl"
             />
          </div>
        </div>
      </section>

      {/* ── Category Banners ── */}
      <section className="py-24 px-8 max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="group relative h-[450px] overflow-hidden cursor-pointer" onClick={() => navigate('/shop')}>
            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block">{cat.label}</span>
              <h3 className="text-3xl font-bold uppercase mb-4">{cat.title}</h3>
              <span className="text-sm font-bold uppercase tracking-[2px] border-b-2 border-primary pb-1 group-hover:border-white transition-colors">Shop Now</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Best Sellers ── */}
      <section className="py-24 px-8 bg-surface-container/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Best Sellers</span>
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Product Overview</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[3/4] bg-surface-container animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
             <button onClick={() => navigate('/shop')} className="text-on-surface font-bold uppercase tracking-[3px] border-b-2 border-on-surface pb-1 hover:text-primary hover:border-primary transition-all">
               View All Products
             </button>
          </div>
        </div>
      </section>

      {/* ── Sale Timer Section ── */}
      <section className="py-24 px-8 bg-primary">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-white">
          <div className="max-w-md">
            <span className="text-white/70 font-bold uppercase tracking-widest text-sm mb-4 block">Deal of the Week</span>
            <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">Multi-pocket Chest Bag Black</h2>
            <div className="flex gap-8 mb-10">
              {Object.entries(timeLeft).map(([label, val]) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold mb-1">{val < 10 ? `0${val}` : val}</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">{label}</div>
                </div>
              ))}
            </div>
            <button className="bg-on-surface text-surface px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-on-surface transition-colors">
              Shop Now
            </button>
          </div>
          <div className="relative group">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-on-surface rounded-full flex flex-col items-center justify-center text-center p-4 transform rotate-12 transition-transform group-hover:rotate-0">
               <span className="text-[10px] uppercase font-bold opacity-70">Sale of</span>
               <span className="text-2xl font-black">$29.99</span>
            </div>
            <img
              src="https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Sale product"
              className="w-[400px] h-[400px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── Blog Section ── */}
      <section className="py-24 px-8 max-w-screen-xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Latest News</span>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Fashion New Trends</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { date: '16 February 2024', title: 'What Curling Irons Are The Best Ones', img: 'https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=800' },
            { date: '21 February 2024', title: 'Eternity Bands Do Last Forever', img: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800' },
            { date: '28 February 2024', title: 'The Health Benefits Of Sunglasses', img: 'https://images.pexels.com/photos/1154861/pexels-photo-1154861.jpeg?auto=compress&cs=tinysrgb&w=800' },
          ].map((blog, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-video bg-surface-container">
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs mb-3">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                {blog.date}
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug">{blog.title}</h4>
              <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-on-surface pb-1 group-hover:border-primary transition-all">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Instagram Section ── */}
      <section className="grid grid-cols-2 md:grid-cols-6 h-[250px] w-full">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="relative group overflow-hidden">
             <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl mb-2">photo_camera</span>
                <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
             </div>
             <img
               src={`https://images.pexels.com/photos/${[374822, 1043471, 1043474, 1102874, 157675, 298863][i-1]}/pexels-photo-${[374822, 1043471, 1043474, 1102874, 157675, 298863][i-1]}.jpeg?auto=compress&cs=tinysrgb&w=400`}
               alt="Instagram"
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
             />
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer className="bg-on-surface text-white py-24 px-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-black tracking-tighter mb-8">MALE-FASHION.</h2>
            <p className="text-on-surface-variant text-sm mb-8 leading-loose">
              The customer is at the heart of our unique business model, which includes design.
            </p>
            <div className="flex gap-4">
               {['Visa', 'Mastercard', 'PayPal'].map(p => (
                 <div key={p} className="bg-white/5 px-3 py-1 rounded text-[10px] font-bold border border-white/10 uppercase">{p}</div>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Shopping</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li className="hover:text-primary transition-colors cursor-pointer">Clothing Store</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Trending Shoes</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Accessories</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Sale</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Shopping</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li className="hover:text-primary transition-colors cursor-pointer">Contact Us</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Payment Methods</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Delivary</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Return & Exchanges</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">NewLetter</h4>
            <p className="text-on-surface-variant text-sm mb-8 leading-loose">
              Be the first to know about new arrivals, look books, sales & promos!
            </p>
            <div className="relative border-b border-white/20 pb-2">
               <input type="text" placeholder="Your email" className="bg-transparent w-full text-sm outline-none pr-10" />
               <span className="material-symbols-outlined absolute right-0 top-0 text-white/50 cursor-pointer hover:text-primary">mail</span>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto border-t border-white/10 mt-20 pt-10 text-center text-on-surface-variant text-xs">
           Copyright © 2024 Male Fashion All rights reserved.
        </div>
      </footer>
    </div>
  )
}
