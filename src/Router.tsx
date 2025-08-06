import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import AdminBookingsPage from './pages/AdminBookingsPage';
import ProtectedRoute from './components/ProtectedRoute';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute>
            <AdminBookingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
