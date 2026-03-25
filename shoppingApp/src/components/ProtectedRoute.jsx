import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()
  const addToast = useToast()

  useEffect(() => {
    if (!user) {
      addToast('Please login to access this page', 'warning')
    }
  }, [user, addToast])

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
