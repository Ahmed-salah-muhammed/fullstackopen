const BASE_URL = 'https://fakestoreapi.com'

const CATEGORY_MAP = {
  "men's clothing": "STREETWEAR COLLECTION",
  "women's clothing": "OFFICIAL WEAR",
  "electronics": "BARÇA TECH & GEAR",
  "jewelery": "CLUB ACCESSORIES"
}

export const api = {
  getProducts: async (limit = null) => {
    try {
      const url = limit ? `${BASE_URL}/products?limit=${limit}` : `${BASE_URL}/products`
      const res = await fetch(url)
      if (!res.ok) throw new Error('API UNAVAILABLE')
      const data = await res.json()
      // Inject "Shoes" category logic since Fakestore doesn't have it
      return {
        data: data.map(p => ({
          ...p,
          category: p.id % 5 === 0 ? "SQUAD FOOTWEAR" : (CATEGORY_MAP[p.category] || p.category),
          title: p.title.toUpperCase()
        }))
      }
    } catch (err) {
      return { data: [], error: err.message }
    }
  },
  getProduct: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`)
      const p = await res.json()
      return { data: { ...p, category: p.id % 5 === 0 ? "SQUAD FOOTWEAR" : (CATEGORY_MAP[p.category] || p.category), title: p.title.toUpperCase() } }
    } catch (err) {
       return { data: null, error: err.message }
    }
  },
  getCategories: async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/categories`)
      const data = await res.json()
      const cats = data.map(c => CATEGORY_MAP[c] || c)
      return { data: [...new Set([...cats, "SQUAD FOOTWEAR"])] }
    } catch (err) {
       return { data: [], error: err.message }
    }
  }
}

export async function fetchProducts() { const { data } = await api.getProducts(); return data; }
export async function fetchProduct(id) { const { data } = await api.getProduct(id); return data; }
export async function fetchCategories() { const { data } = await api.getCategories(); return data; }

export default api
