// src/context/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((msg, type = 'default') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="animate-toastIn flex items-center gap-2.5 px-5 py-3.5
                       rounded-xl text-sm font-medium max-w-xs"
            style={{
              backgroundColor:
                t.type === 'success' ? '#2a7a4a' :
                t.type === 'error'   ? '#ba1a1a' :
                                       'var(--color-inverse-surface)',
              color: 'var(--color-inverse-on-surface)',
              boxShadow: '0 8px 24px rgba(19,27,46,0.15)',
            }}
          >
            {t.type === 'success' && <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#fff' }}>check_circle</span>}
            {t.type === 'error'   && <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#fff' }}>cancel</span>}
            <span style={{ color: '#fff' }}>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
