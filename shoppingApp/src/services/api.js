const BASE_URL = 'https://fakestoreapi.com'

export const api = {
  getProducts: async (limit = null) => {
    const url = limit ? `${BASE_URL}/products?limit=${limit}` : `${BASE_URL}/products`
    const res = await fetch(url)
    const data = await res.json()
    return { data }
  },
  getProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    const data = await res.json()
    return { data }
  },
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/products/categories`)
    const data = await res.json()
    return { data }
  }
}

// Named exports for compatibility
export async function fetchProducts() {
  const { data } = await api.getProducts()
  return data
}

export async function fetchProduct(id) {
  const { data } = await api.getProduct(id)
  return data
}

export async function fetchCategories() {
  const { data } = await api.getCategories()
  return data
}

export default api
