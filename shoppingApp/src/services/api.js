const BASE_URL = 'https://fakestoreapi.com'

const CATEGORY_MAP = {
  "men's clothing": "SQUAD PERFORMANCE (MEN)",
  "women's clothing": "SQUAD PERFORMANCE (WOMEN)",
  "electronics": "SMART GEAR & TECH",
  "jewelery": "SQUAD ACCESSORIES"
}

export const api = {
  getProducts: async (limit = null) => {
    try {
      const url = limit ? `${BASE_URL}/products?limit=${limit}` : `${BASE_URL}/products`
      const res = await fetch(url)
      if (!res.ok) throw new Error('API UNAVAILABLE')
      const data = await res.json()
      return { data: data.map(p => ({ ...p, category: CATEGORY_MAP[p.category] || p.category, title: p.title.toUpperCase() })) }
    } catch (err) {
      console.error('SQUAD API ERROR:', err)
      return { data: [], error: err.message }
    }
  },
  getProduct: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`)
      if (!res.ok) throw new Error('GEAR NOT FOUND')
      const p = await res.json()
      return { data: { ...p, category: CATEGORY_MAP[p.category] || p.category, title: p.title.toUpperCase() } }
    } catch (err) {
       console.error('SQUAD API ERROR:', err)
       return { data: null, error: err.message }
    }
  },
  getCategories: async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/categories`)
      if (!res.ok) throw new Error('CATEGORIES UNAVAILABLE')
      const data = await res.json()
      return { data: data.map(c => CATEGORY_MAP[c] || c) }
    } catch (err) {
       console.error('SQUAD API ERROR:', err)
       return { data: [], error: err.message }
    }
  }
}

export async function fetchProducts() { const { data } = await api.getProducts(); return data; }
export async function fetchProduct(id) { const { data } = await api.getProduct(id); return data; }
export async function fetchCategories() { const { data } = await api.getCategories(); return data; }

export default api
