"'use client'"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bell, Calendar, CreditCard, Users, Check, Loader2 } from 'lucide-react'

interface Notification {
  type: string
  message: string
  createdAt: string
  read: boolean
  reservationId?: string
  bookingId?: string
  amount?: number
}

export function AdminNotifications() {
  const [notifications, setNotifications] = useState<Array<Notification & { key: string }>>([])
  const [loading, setLoading] = useState(false)
  const [markingRead, setMarkingRead] = useState<string[]>([])

  // Mock data for demo
  const mockNotifications = [
    {
      key: 'notif_1',
      type: 'new_reservation',
      message: 'Новое бронирование столика от Иван Петров на 2025-02-01 в 19:00',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false
    },
    {
      key: 'notif_2', 
      type: 'new_event_booking',
      message: 'Новое бронирование мероприятия "Мастер-класс" от Мария Сидорова',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      read: false,
      amount: 1500
    },
    {
      key: 'notif_3',
      type: 'payment_received', 
      message: 'Получена оплата за мероприятие от Алексей Иванов',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
      amount: 2500
    }
  ]

  useEffect(() => {
    // Simulate loading mock data
    setLoading(true)
    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const markAsRead = async (notificationKey: string) => {
    setMarkingRead([...markingRead, notificationKey])
    
    // Simulate API call
    setTimeout(() => {
      setNotifications(notifications.map(n => 
        n.key === notificationKey ? { ...n, read: true } : n
      ))
      setMarkingRead(markingRead.filter(key => key !== notificationKey))
    }, 500)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_reservation':
        return <Calendar className="w-5 h-5" />
      case 'new_event_booking':
        return <Users className="w-5 h-5" />
      case 'payment_received':
        return <CreditCard className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new_reservation':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'new_event_booking':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'payment_received':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} дн. назад`
    if (hours > 0) return `${hours} ч. назад`
    if (minutes > 0) return `${minutes} мин. назад`
    return 'Только что'
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Уведомления
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} новых</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Нет уведомлений</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.key}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  notification.read 
                    ? 'bg-gray-50 border-gray-200' 
                    : getNotificationColor(notification.type)
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? 'text-gray-600' : 'font-medium'}`}>
                        {notification.message}
                      </p>
                      {notification.amount && (
                        <p className="text-xs text-gray-500 mt-1">
                          Сумма: {notification.amount} ₽
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.key)}
                      disabled={markingRead.includes(notification.key)}
                      className="ml-2"
                    >
                      {markingRead.includes(notification.key) ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()} 
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Обновление...
            </>
          ) : (
            'Обновить'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}