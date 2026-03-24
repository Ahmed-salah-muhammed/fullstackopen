// src/pages/Home.jsx — Stitch "ATELIER" home, light + dark parity
import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: 'local_shipping',
    title: 'Fast Shipping',
    desc: 'Global delivery in under 72 hours, fully insured and tracked to your door.',
  },
  {
    icon: 'verified',
    title: 'Premium Quality',
    desc: 'Every piece is hand-inspected at our Atelier to ensure textile excellence.',
  },
  {
    icon: 'eco',
    title: 'Sustainable Soul',
    desc: 'Committed to low-impact production and ethical sourcing practices.',
  },
]

const COLLECTIONS = [
  { label: 'Sonatics', title: 'The Linen Edit',      bg: 'from-stone-300 to-stone-400' },
  { label: 'Couture',  title: 'Essential Tailoring', bg: 'from-slate-300 to-slate-500' },
  { label: 'Archive',  title: 'Accessories',         bg: 'from-amber-200 to-amber-400' },
  { label: 'Archive',  title: 'Footwear',            bg: 'from-orange-200 to-orange-400' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>

      {/* ── Hero ── */}
      <section
        className="relative min-h-[600px] flex items-center overflow-hidden px-8 py-20"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 20% 60%, rgba(42,20,180,0.05), transparent 55%)' }}
        />

        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Copy */}
          <div className="animate-fadeUp">
            <p
              className="text-[10px] tracking-[0.3em] font-semibold uppercase mb-6"
              style={{ color: 'var(--color-primary)' }}
            >
              New Arrival · S524
            </p>
            <h1
              className="text-[clamp(2.8rem,7vw,5rem)] font-black leading-[0.92] tracking-tighter mb-8"
              style={{ color: 'var(--color-on-surface)' }}
            >
              The Art of<br />
              <span
                className="italic font-black"
                style={{ color: 'var(--color-primary)' }}
              >
                Curated
              </span>{' '}
              Living
            </h1>
            <p
              className="text-base font-light leading-relaxed max-w-md mb-10"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              Discover a collection where architectural precision meets artisanal
              craftsmanship. Designed for the modern observer.
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <button
                onClick={() => navigate('/shop')}
                className="signature-gradient text-white px-8 py-4 rounded-lg
                           font-bold tracking-widest uppercase text-xs
                           transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: '0 8px 24px rgba(42,20,180,0.2)' }}
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="flex items-center gap-2 text-sm font-medium
                           transition-colors duration-200"
                style={{ color: 'var(--color-on-surface-variant)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-on-surface)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-on-surface-variant)'}
              >
                View Lookbook
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Hero image placeholder — styled editorial block */}
          <div
            className="hidden md:block aspect-[4/5] rounded-xl overflow-hidden relative"
            style={{ backgroundColor: 'var(--color-surface-container-high)' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, var(--color-surface-container-high) 0%, var(--color-surface-container-highest) 100%)' }}
            />
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <p className="text-xs uppercase tracking-widest mb-2 font-medium"
                   style={{ color: 'var(--color-on-surface-variant)' }}>Editorial</p>
                <p className="text-2xl font-black tracking-tight"
                   style={{ color: 'var(--color-on-surface)' }}>S/S 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section
        className="py-16 px-8"
        style={{ backgroundColor: 'var(--color-surface-container)' }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURES.map(f => (
            <div key={f.title} className="flex flex-col gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary-fixed)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-on-primary-fixed-variant)' }}>
                  {f.icon}
                </span>
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--color-on-surface)' }}>{f.title}</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Collections grid ── */}
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-2" style={{ color: 'var(--color-on-surface)' }}>
              Explore the Collections
            </h2>
            <p className="text-sm font-light" style={{ color: 'var(--color-on-surface-variant)' }}>
              Signature silhouettes and seasonal essentials curated for the discerning wardrobe.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COLLECTIONS.map(c => (
              <button
                key={c.title}
                onClick={() => navigate('/shop')}
                className={`group relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${c.bg}`}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-5 text-left">
                  <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">{c.label}</p>
                  <h4 className="font-bold text-white text-sm leading-tight">{c.title}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section
        className="py-20 px-8"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-on-surface)' }}>
              Our Story
            </h2>
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-1 text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-primary)' }}
            >
              Explore All
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="aspect-[4/3] rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface-container-high)' }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(135deg, var(--color-surface-container) 0%, var(--color-surface-container-high) 100%)',
                }}
              />
            </div>
            <div>
              <p
                className="text-base font-light leading-loose mb-6"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                ATELIER was born from a passion for meticulous craftsmanship and timeless
                elegance. Each piece is a testament to dedication, using the finest materials
                to embody a lifestyle that transcends. Discover the story behind our curated
                collections.
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-primary)' }}
              >
                Read More
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-12 px-8"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-black tracking-tighter text-lg mb-1" style={{ color: 'var(--color-on-surface)' }}>ATELIER</p>
            <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
              © 2025 ATELIER DIGITAL. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex gap-8 text-[11px] uppercase tracking-widest font-medium"
               style={{ color: 'var(--color-on-surface-variant)' }}>
            {['Terms', 'Privacy', 'Shipping', 'Contact'].map(l => (
              <span key={l} className="cursor-pointer hover:text-[var(--color-on-surface)] transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
