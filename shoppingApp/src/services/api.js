const BASE_URL = 'https://fakestoreapi.com'

const CATEGORY_MAP = {
  "men's clothing": "OFFICIAL KITS (MEN)",
  "women's clothing": "OFFICIAL KITS (WOMEN)",
  "electronics": "BARÇA TECH & SQUAD GEAR",
  "jewelery": "CLUB ACCESSORIES"
}

export const api = {
  getProducts: async (limit = null) => {
    try {
      const url = limit ? `${BASE_URL}/products?limit=${limit}` : `${BASE_URL}/products`
      const res = await fetch(url)
      if (!res.ok) throw new Error('BARÇA API OFFLINE')
      const data = await res.json()
      return {
        data: data.map(p => ({
          ...p,
          category: CATEGORY_MAP[p.category] || p.category,
          title: p.title.toUpperCase(),
          image: p.id === 1 ? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop' : p.image // Simulation
        }))
      }
    } catch (err) {
      console.error('API ERROR:', err)
      return { data: [], error: err.message }
    }
  },
  getProduct: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`)
      if (!res.ok) throw new Error('KIT NOT FOUND')
      const p = await res.json()
      return {
        data: {
          ...p,
          category: CATEGORY_MAP[p.category] || p.category,
          title: p.title.toUpperCase()
        }
      }
    } catch (err) {
       return { data: null, error: err.message }
    }
  },
  getCategories: async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/categories`)
      const data = await res.json()
      return { data: data.map(c => CATEGORY_MAP[c] || c) }
    } catch (err) {
       return { data: [], error: err.message }
    }
  }
}

export async function fetchProducts() { const { data } = await api.getProducts(); return data; }
export async function fetchProduct(id) { const { data } = await api.getProduct(id); return data; }
export async function fetchCategories() { const { data } = await api.getCategories(); return data; }

export default api
