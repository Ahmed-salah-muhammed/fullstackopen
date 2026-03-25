import { createContext, useContext, useState, useCallback } from 'react'
import { Snackbar, Alert, Box } from '@mui/material'

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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Top-Right relocation
        sx={{ mt: 2, mr: 2 }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.type === 'default' ? 'info' : toast.type}
          variant="filled"
          sx={{
            width: '100%',
            '& .MuiAlert-message': { fontWeight: 700, fontSize: '0.95rem' }
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
