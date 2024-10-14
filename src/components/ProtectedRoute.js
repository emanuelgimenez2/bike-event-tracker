// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asumimos que tienes un contexto de autenticación

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    // Si no hay usuario, redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Si la ruta es solo para admin y el usuario no es admin, redirigir a una página de acceso denegado
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children;
};

export default ProtectedRoute;