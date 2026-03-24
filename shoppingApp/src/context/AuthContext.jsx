// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopwave-user') || 'null')
    } catch {
      return null
    }
  })

  /** Mock login — no real backend, just stores user in state & localStorage */
  const login = useCallback((email) => {
    const newUser = { email, name: email.split('@')[0] }
    setUser(newUser)
    try {
      localStorage.setItem('shopwave-user', JSON.stringify(newUser))
    } catch {}
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem('shopwave-user')
    } catch {}
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Hook — must be used inside <AuthProvider> */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
