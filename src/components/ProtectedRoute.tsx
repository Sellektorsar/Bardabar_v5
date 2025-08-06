import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Базовый компонент-заглушка для защиты роутов.
 * Сейчас проверяет наличие значения `adminToken` в localStorage.
 * В дальнейшем можно заменить на полноценную проверку Supabase auth/ролей.
 */
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = Boolean(localStorage.getItem('adminToken'));

  if (!isAdmin) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
