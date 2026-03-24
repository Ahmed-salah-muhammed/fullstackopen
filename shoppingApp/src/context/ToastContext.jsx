import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { Snackbar, Alert, Typography } from '@mui/material'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState({ msg: '', type: 'info' })

  const addToast = useCallback((msg, type = 'info') => {
    setToast({ msg, type })
    setOpen(true)
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.type === 'default' ? 'info' : toast.type}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(19,27,46,0.15)',
            '& .MuiAlert-message': { fontWeight: 600, fontSize: '0.85rem' }
          }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
