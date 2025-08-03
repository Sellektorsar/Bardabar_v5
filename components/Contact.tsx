"'use client'"

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { TableBooking } from './TableBooking'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Contact() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Контакты и бронирование</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Свяжитесь с нами для бронирования столика или по любым вопросам
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <Card className="border-orange-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <MapPin className="w-5 h-5 text-orange-600" />
                Адрес
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                г. Москва, ул. Центральная, 123<br />
                Район: Центральный<br />
                Ближайшее метро: Площадь Революции (5 мин пешком)
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <Phone className="w-5 h-5 text-orange-600" />
                Телефон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                +7 (495) 123-45-67<br />
                +7 (495) 123-45-68 (для бронирования)
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <Mail className="w-5 h-5 text-orange-600" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                info@bar-da-bar.ru<br />
                booking@bar-da-bar.ru
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <Clock className="w-5 h-5 text-orange-600" />
                Часы работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-gray-600">
                <p>Понедельник - Четверг: 09:00 - 23:00</p>
                <p>Пятница - Суббота: 09:00 - 01:00</p>
                <p>Воскресенье: 10:00 - 22:00</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-3">Как нас найти:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• От метро "Площадь Революции" - 5 минут пешком</li>
                <li>• Рядом с ТЦ "Центральный"</li>
                <li>• Парковка доступна во дворе здания</li>
                <li>• Вход со стороны улицы Центральная</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <TableBooking />
        </div>
      </div>
    </section>
  )
}