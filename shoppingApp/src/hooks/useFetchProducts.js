// src/hooks/useFetchProducts.js
import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'

/**
 * Custom hook that fetches all products from the API.
 *
 * @returns {{ products: Product[], loading: boolean, error: string|null, refetch: () => void }}
 */
export function useFetchProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [tick, setTick]         = useState(0) // increment to re-fetch

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetchProducts()
      .then(data => {
        if (!cancelled) {
          setProducts(data)
          setLoading(false)
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [tick])

  const refetch = () => setTick(t => t + 1)

  return { products, loading, error, refetch }
}
