import React from 'react';
// ...rest of your imports and code
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// Higher-order component to protect authenticated routes
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
