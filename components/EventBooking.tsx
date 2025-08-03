'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Calendar, Clock, Users, Phone, Mail, CreditCard, Banknote, CheckCircle, Loader2, X } from 'lucide-react'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface Event {
  id: string
  title: string
  date: string
  time: string
  price: number
  capacity: number
  description: string
}

interface EventBookingProps {
  event: Event
  trigger?: React.ReactNode
}

export function EventBooking({ event, trigger }: EventBookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tickets: '1',
    paymentMethod: 'card'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const totalAmount = event.price * parseInt(formData.tickets || '1')

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c85ae302/event-bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          eventId: event.id,
          ...formData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при создании бронирования')
      }

      setBookingId(data.booking.id)
      
      if (event.price > 0 && formData.paymentMethod === 'card') {
        setShowPayment(true)
      } else {
        setSubmitted(true)
      }

      console.log('Бронирование создано:', data.booking)
    } catch (error) {
      console.error('Ошибка бронирования:', error)
      setError(error instanceof Error ? error.message : 'Произошла ошибка')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePayment = async (cardData: any) => {
    setIsProcessingPayment(true)
    setError('')

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c85ae302/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          bookingId,
          paymentMethod: formData.paymentMethod,
          cardData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка обработки платежа')
      }

      setShowPayment(false)
      setSubmitted(true)
      console.log('Платеж обработан:', data)
    } catch (error) {
      console.error('Ошибка платежа:', error)
      setError(error instanceof Error ? error.message : 'Ошибка обработки платежа')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      tickets: '1',
      paymentMethod: 'card'
    })
    setSubmitted(false)
    setShowPayment(false)
    setBookingId('')
    setError('')
    setOpen(false)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (submitted) {
    return (
      <DialogContent className="max-w-md">
        <div className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Бронирование подтверждено!</h3>
          <p className="text-gray-600 mb-4">
            {event.price > 0 && formData.paymentMethod === 'card' 
              ? 'Оплата прошла успешно. Ваши билеты забронированы.'
              : 'Ваши билеты забронированы. Оплата при посещении.'
            }
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm">
            <p><strong>Мероприятие:</strong> {event.title}</p>
            <p><strong>Дата:</strong> {formatDate(event.date)} в {event.time}</p>
            <p><strong>Билетов:</strong> {formData.tickets}</p>
            <p><strong>Сумма:</strong> {totalAmount} ₽</p>
          </div>
          <Button onClick={resetForm} className="w-full">
            Закрыть
          </Button>
        </div>
      </DialogContent>
    )
  }

  if (showPayment) {
    return (
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Оплата билетов</DialogTitle>
        </DialogHeader>
        <PaymentForm 
          amount={totalAmount}
          onPayment={handlePayment}
          onCancel={() => setShowPayment(false)}
          isProcessing={isProcessingPayment}
          error={error}
        />
      </DialogContent>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            Забронировать
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Бронирование мероприятия</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Информация о мероприятии */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>До {event.capacity} человек</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {event.price > 0 ? `${event.price} ₽/билет` : 'Бесплатно'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Форма бронирования */}
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 999-99-99"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Количество билетов</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.tickets}
                onChange={(e) => setFormData({ ...formData, tickets: e.target.value })}
              />
            </div>

            {event.price > 0 && (
              <div>
                <Label>Способ оплаты</Label>
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Онлайн оплата картой
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2">
                      <Banknote className="w-4 h-4" />
                      Оплата при посещении
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Итого:</span>
                <span>{totalAmount} ₽</span>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Обрабатываем...
                </>
              ) : (
                event.price > 0 && formData.paymentMethod === 'card' 
                  ? 'Перейти к оплате' 
                  : 'Забронировать'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PaymentForm({ 
  amount, 
  onPayment, 
  onCancel, 
  isProcessing, 
  error 
}: {
  amount: number
  onPayment: (cardData: any) => void
  onCancel: () => void
  isProcessing: boolean
  error: string
}) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPayment(cardData)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold">К оплате: {amount} ₽</h3>
        <p className="text-sm text-gray-600">Введите данные банковской карты</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Номер карты</Label>
          <Input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardData.number}
            onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
            maxLength={19}
            required
          />
        </div>

        <div>
          <Label>Имя держателя карты</Label>
          <Input
            type="text"
            placeholder="IVAN PETROV"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Срок действия</Label>
            <Input
              type="text"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
              maxLength={5}
              required
            />
          </div>
          <div>
            <Label>CVV</Label>
            <Input
              type="text"
              placeholder="123"
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
              maxLength={3}
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Обработка...
              </>
            ) : (
              `Оплатить ${amount} ₽`
            )}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <div className="text-xs text-gray-500 text-center">
        Это демо-форма. Реальные платежи не обрабатываются.
      </div>
    </div>
  )
}