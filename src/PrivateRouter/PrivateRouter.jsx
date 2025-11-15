import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router'
import Loader from '../pages/Loaders/Loader'

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  if (loading) {
    return <Loader />
  }
console.log(token,"token")
  if (token) {
    return children
  }

  // Redirect unauthenticated users to login page
  return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRouter