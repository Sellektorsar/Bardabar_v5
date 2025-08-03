'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Calendar, Clock, Users, Phone, Mail, CreditCard, Loader2, RefreshCw } from 'lucide-react'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface Booking {
  id: string
  name: string
  phone: string
  email: string
  status: string
  type: 'table' | 'event'
  createdAt: string
  date?: string
  time?: string
  guests?: number
  specialRequests?: string
  eventTitle?: string
  tickets?: number
  totalAmount?: number
  paymentStatus?: string
  paymentMethod?: string
}

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState<string[]>([])

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c85ae302/reservations`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
      }
    } catch (error) {
      console.error('Ошибка при получении бронирований:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    setUpdatingStatus([...updatingStatus, bookingId])
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c85ae302/reservations/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        ))
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error)
    } finally {
      setUpdatingStatus(updatingStatus.filter(id => id !== bookingId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      case 'completed':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'requires_payment':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const tableReservations = bookings.filter(b => b.type === 'table')
  const eventBookings = bookings.filter(b => b.type === 'event')

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Загрузка бронирований...
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Управление бронированиями</h3>
        <Button onClick={fetchBookings} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Обновить
        </Button>
      </div>

      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tables">
            Столики ({tableReservations.length})
          </TabsTrigger>
          <TabsTrigger value="events">
            Мероприятия ({eventBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4">
          {tableReservations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">Нет бронирований столиков</p>
              </CardContent>
            </Card>
          ) : (
            tableReservations.map((booking) => (
              <Card key={booking.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{booking.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status === 'pending' ? 'Ожидает' : 
                           booking.status === 'confirmed' ? 'Подтверждено' :
                           booking.status === 'cancelled' ? 'Отменено' : 'Завершено'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>Создано: {formatDate(booking.createdAt)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{booking.date} в {booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{booking.guests} гостей</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{booking.phone}</span>
                      </div>
                      {booking.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{booking.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      {booking.specialRequests && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Особые пожелания:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            {booking.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Select 
                      value={booking.status} 
                      onValueChange={(value) => updateBookingStatus(booking.id, value)}
                      disabled={updatingStatus.includes(booking.id)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Ожидает</SelectItem>
                        <SelectItem value="confirmed">Подтверждено</SelectItem>
                        <SelectItem value="completed">Завершено</SelectItem>
                        <SelectItem value="cancelled">Отменено</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {updatingStatus.includes(booking.id) && (
                      <Loader2 className="w-4 h-4 animate-spin mt-2" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {eventBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">Нет бронирований мероприятий</p>
              </CardContent>
            </Card>
          ) : (
            eventBookings.map((booking) => (
              <Card key={booking.id} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{booking.name}</CardTitle>
                      <p className="text-gray-600">{booking.eventTitle}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status === 'pending' ? 'Ожидает' : 
                           booking.status === 'confirmed' ? 'Подтверждено' :
                           booking.status === 'cancelled' ? 'Отменено' : 'Завершено'}
                        </Badge>
                        {booking.paymentStatus && (
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus === 'paid' ? 'Оплачено' :
                             booking.paymentStatus === 'pending' ? 'Ожидает оплаты' :
                             booking.paymentStatus === 'requires_payment' ? 'Требует оплаты' : booking.paymentStatus}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>Создано: {formatDate(booking.createdAt)}</p>
                      {booking.totalAmount && (
                        <p className="font-medium text-lg text-gray-900">{booking.totalAmount} ₽</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{booking.tickets} билетов</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{booking.phone}</span>
                      </div>
                      {booking.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{booking.email}</span>
                        </div>
                      )}
                      {booking.paymentMethod && (
                        <div className="flex items-center gap-2 text-sm">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span>
                            {booking.paymentMethod === 'card' ? 'Онлайн оплата' : 'Оплата при посещении'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Select 
                      value={booking.status} 
                      onValueChange={(value) => updateBookingStatus(booking.id, value)}
                      disabled={updatingStatus.includes(booking.id)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Ожидает</SelectItem>
                        <SelectItem value="confirmed">Подтверждено</SelectItem>
                        <SelectItem value="completed">Завершено</SelectItem>
                        <SelectItem value="cancelled">Отменено</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {updatingStatus.includes(booking.id) && (
                      <Loader2 className="w-4 h-4 animate-spin mt-2" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}