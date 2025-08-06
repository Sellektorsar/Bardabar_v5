import React from 'react';
import { BookingManagement } from '../../components/BookingManagement';

const AdminBookingsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Админ-панель бронирований</h1>
      <BookingManagement />
    </div>
  );
};

export default AdminBookingsPage;
