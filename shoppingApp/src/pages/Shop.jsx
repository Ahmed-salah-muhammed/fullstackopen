// src/pages/Shop.jsx — Stitch ATELIER: sidebar filters + product grid
import { useState, useMemo } from 'react'
import { useFetchProducts } from '../hooks/useFetchProducts'
import ProductCard from '../components/ProductCard'

const PRICE_RANGES = [
  { label: 'Any price',  max: 9999 },
  { label: 'Under $25',  max: 25   },
  { label: 'Under $50',  max: 50   },
  { label: 'Under $100', max: 100  },
  { label: 'Under $200', max: 200  },
  { label: 'Under $500', max: 500  },
]

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured'          },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated'          },
]

export default function Shop() {
  const { products, loading, error, refetch } = useFetchProducts()

  const [search,      setSearch]      = useState('')
  const [categories,  setCategories]  = useState([])   // multi-select checkboxes
  const [sortBy,      setSortBy]      = useState('default')
  const [priceMax,    setPriceMax]    = useState(9999)
  const [priceSlider, setPriceSlider] = useState(100)  // 0-100 slider %

  // All unique categories from API
  const allCategories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))),
    [products]
  )

  // Max product price (used to scale slider)
  const maxProductPrice = useMemo(
    () => Math.ceil(Math.max(...products.map(p => p.price), 0)),
    [products]
  )

  const handleCategoryToggle = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handleSlider = (e) => {
    const pct = Number(e.target.value)
    setPriceSlider(pct)
    setPriceMax(Math.round((pct / 100) * maxProductPrice) || 9999)
  }

  const filtered = useMemo(() => {
    return products
      .filter(p => {
        if (categories.length > 0 && !categories.includes(p.category)) return false
        if (p.price > priceMax) return false
        if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc')  return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating')     return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
        return 0
      })
  }, [products, categories, priceMax, search, sortBy])

  // ── Loading ──────────────────────────────────
  if (loading) return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-5"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div
        className="animate-spin w-10 h-10 rounded-full border-[3px]"
        style={{
          borderColor: 'var(--color-surface-container-high)',
          borderTopColor: 'var(--color-primary)',
        }}
      />
      <p className="text-sm tracking-widest uppercase font-medium"
         style={{ color: 'var(--color-on-surface-variant)' }}>
        Loading collection…
      </p>
    </div>
  )

  // ── Error ────────────────────────────────────
  if (error) return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div
        className="p-8 rounded-xl text-center max-w-sm"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <span className="material-symbols-outlined mb-3 block"
              style={{ fontSize: 36, color: 'var(--color-error)' }}>
          error_outline
        </span>
        <p className="text-sm mb-5" style={{ color: 'var(--color-on-surface-variant)' }}>
          Failed to load collection: {error}
        </p>
        <button
          onClick={refetch}
          className="signature-gradient text-white px-6 py-2.5 rounded-lg
                     text-sm font-bold tracking-wide transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-screen-xl mx-auto px-8 py-14">
        <div className="flex flex-col lg:flex-row gap-14">

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-60 shrink-0 space-y-10">

            {/* Search */}
            <div>
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-lg"
                style={{ backgroundColor: 'var(--color-surface-container-low)' }}
              >
                <span className="material-symbols-outlined shrink-0"
                      style={{ fontSize: 18, color: 'var(--color-outline)' }}>
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search pieces…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full"
                  style={{ color: 'var(--color-on-surface)' }}
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3
                className="text-base font-bold mb-5 tracking-tight"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Categories
              </h3>
              <div className="flex flex-col gap-3">
                {allCategories.map(cat => {
                  const active = categories.includes(cat)
                  return (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => handleCategoryToggle(cat)}
                        className="rounded transition-all"
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <span
                        className="text-sm transition-colors duration-200"
                        style={{
                          color: active
                            ? 'var(--color-primary)'
                            : 'var(--color-on-surface-variant)',
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                    </label>
                  )
                })}
                {categories.length > 0 && (
                  <button
                    onClick={() => setCategories([])}
                    className="text-xs mt-1 text-left transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-outline)' }}
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>

            {/* Price range */}
            <div
              className="pt-8"
              style={{ borderTop: '1px solid var(--color-surface-container-high)' }}
            >
              <h3
                className="text-base font-bold mb-5 tracking-tight"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Price Range
              </h3>
              <input
                type="range"
                min={0}
                max={100}
                value={priceSlider}
                onChange={handleSlider}
                className="w-full h-1 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <div
                className="flex justify-between mt-3 text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <span>$0</span>
                <span>{priceMax >= 9999 ? '$1000+' : `$${priceMax}`}</span>
              </div>
            </div>

            {/* Member exclusive promo */}
            <div
              className="p-5 rounded-xl"
              style={{ backgroundColor: 'var(--color-primary-fixed)' }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: 'var(--color-on-primary-fixed-variant)' }}
              >
                Member Exclusive
              </p>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: 'var(--color-on-primary-fixed)' }}
              >
                Get free shipping on all orders over $150.
              </p>
              <button
                className="flex items-center gap-1.5 text-sm font-bold group transition-opacity hover:opacity-75"
                style={{ color: 'var(--color-primary)' }}
              >
                Join Now
                <span
                  className="material-symbols-outlined transition-transform group-hover:translate-x-1"
                  style={{ fontSize: 16 }}
                >
                  arrow_forward
                </span>
              </button>
            </div>
          </aside>

          {/* ── Main content ── */}
          <section className="flex-1 min-w-0">
            {/* Header + sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
              <div>
                <h1
                  className="text-4xl font-extrabold tracking-tighter mb-1"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  New Arrivals
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {filtered.length} piece{filtered.length !== 1 ? 's' : ''} from our digital atelier.
                </p>
              </div>

              {/* Sort */}
              <div
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-transparent border-none py-0 focus:ring-0 cursor-pointer font-bold text-sm"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid or empty */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <span
                  className="material-symbols-outlined mb-4 block"
                  style={{ fontSize: 48, color: 'var(--color-outline)' }}
                >
                  search_off
                </span>
                <p
                  className="font-bold text-xl tracking-tight mb-2"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  No pieces found
                </p>
                <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Adjust your filters or search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="mt-24 py-10 px-8"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <p className="font-black tracking-tighter" style={{ color: 'var(--color-on-surface)' }}>ATELIER</p>
          <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            © 2025 ATELIER DIGITAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[11px] uppercase tracking-widest"
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
