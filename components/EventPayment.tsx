'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { CreditCard, Lock, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ImageWithFallback } from './common/ImageWithFallback';

interface EventPaymentProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    price: string;
    capacity: string;
    image: string;
  };
  tickets: number;
  onClose?: () => void;
  onSuccess?: () => void;
}

export function EventPayment({ event, tickets, onClose, onSuccess }: EventPaymentProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const pricePerTicket = parseInt(event.price.replace(' ₽', '').replace(/[^\d]/g, ''));
  const totalAmount = pricePerTicket * tickets;

  useEffect(() => {
    // Create payment intent when component loads
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const bookingResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c85ae302/bookings/event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            eventId: event.id,
            name: formData.name || 'Гость',
            email: formData.email || 'guest@example.com',
            phone: formData.phone || '+7 (000) 000-00-00',
            tickets,
            totalAmount,
          }),
        },
      );

      if (!bookingResponse.ok) {
        throw new Error('Failed to create booking');
      }

      const bookingResult = await bookingResponse.json();
      const bookingId = bookingResult.bookingId;

      const paymentResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c85ae302/payments/create-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            bookingId,
            amount: totalAmount,
          }),
        },
      );

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const paymentResult = await paymentResponse.json();
      setPaymentIntentId(paymentResult.paymentIntentId);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error('Ошибка при подготовке платежа');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    if (!paymentIntentId) {
      toast.error('Ошибка инициализации платежа');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c85ae302/payments/confirm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            paymentIntentId,
            paymentMethodId: `pm_${Date.now()}`,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const result = await response.json();

      if (result.success) {
        toast.success('Оплата прошла успешно! Билеты отправлены на ваш email.');
        onSuccess?.();
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Ошибка при обработке платежа. Попробуйте еще раз.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts: string[] = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return match;
    }
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D+/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle>Детали мероприятия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            <div>
              <h3 className="font-bold text-lg">{event.title}</h3>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('ru-RU')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{event.capacity}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Кафе "Бар-да-бар"</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Цена за билет:</span>
                <span>{event.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Количество билетов:</span>
                <Badge>{tickets}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Итого:</span>
                <span className="text-orange-600">{totalAmount.toLocaleString()} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Оплата
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Безопасная оплата SSL</span>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">Контактная информация</h4>

                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Данные карты</h4>

                <div>
                  <Label htmlFor="cardNumber">Номер карты *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiryDate">Срок действия *</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })
                      }
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardholderName">Имя владельца карты *</Label>
                  <Input
                    id="cardholderName"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                    placeholder="IVAN IVANOV"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isProcessing || !paymentIntentId}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  {isProcessing
                    ? 'Обработка платежа...'
                    : `Оплатить ${totalAmount.toLocaleString()} ₽`}
                </Button>
                {onClose && (
                  <Button type="button" variant="outline" onClick={onClose}>
                    Отмена
                  </Button>
                )}
              </div>

              <div className="text-xs text-gray-500 text-center">
                Нажимая "Оплатить", вы соглашаетесь с условиями использования и политикой
                конфиденциальности.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
