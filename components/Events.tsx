"'use client'"

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Calendar, Clock, MapPin, Users, Music, Utensils, Heart, Ticket } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

export function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Живая музыка по пятницам',
      date: '2025-01-31',
      time: '19:00',
      description: 'Каждую пятницу в нашем кафе выступают местные музыканты. Джаз, блюз и авторская песня в уютной атмосфере.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      type: 'Музыка',
      capacity: '50 человек',
      price: 'Бесплатно',
      isRecurring: true,
      isFree: true
    },
    {
      id: 2,
      title: 'Мастер-класс по приготовлению коктейлей',
      date: '2025-02-05',
      time: '18:00',
      description: 'Научитесь готовить авторские коктейли от нашего шеф-бармена. В стоимость включены все ингредиенты.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      type: 'Мастер-класс',
      capacity: '15 человек',
      price: '1500 ₽',
      isRecurring: false,
      isFree: false
    },
    {
      id: 3,
      title: 'День святого Валентина',
      date: '2025-02-14',
      time: '18:00',
      description: 'Романтический вечер для влюбленных. Специальное меню, живая музыка и особая атмосфера.',
      image: 'https://images.unsplash.com/photo-1518136247453-74e7b5265980?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      type: 'Праздник',
      capacity: '30 пар',
      price: '2500 ₽',
      isRecurring: false,
      isFree: false
    },
    {
      id: 4,
      title: 'Кулинарный мастер-класс',
      date: '2025-02-20',
      time: '16:00',
      description: 'Готовим фирменные блюда под руководством шеф-повара. Все приготовленное можно забрать домой.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      type: 'Кулинария',
      capacity: '12 человек',
      price: '2000 ₽',
      isRecurring: false,
      isFree: false
    }
  ]

  const eventTypes = {
    'Музыка': { icon: Music, color: 'bg-purple-100 text-purple-700' },
    'Мастер-класс': { icon: Utensils, color: 'bg-blue-100 text-blue-700' },
    'Праздник': { icon: Heart, color: 'bg-red-100 text-red-700' },
    'Кулинария': { icon: Utensils, color: 'bg-green-100 text-green-700' }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleBookEvent = (event: any) => {
    toast.success(`Спасибо за интерес к мероприятию "${event.title}"! Свяжитесь с нами по телефону для бронирования.`)
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Мероприятия</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Присоединяйтесь к нашим увлекательным событиям! Мастер-классы, живая музыка, 
          тематические вечера и многое другое ждет вас в "Бар-да-бар".
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {upcomingEvents.map((event) => {
          const EventIcon = eventTypes[event.type as keyof typeof eventTypes]?.icon || Calendar
          const typeColor = eventTypes[event.type as keyof typeof eventTypes]?.color || 'bg-gray-100 text-gray-700'

          return (
            <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${typeColor} text-xs`}>
                      <EventIcon className="w-3 h-3 mr-1" />
                      {event.type}
                    </Badge>
                    {event.isRecurring && (
                      <Badge className="bg-orange-100 text-orange-700 text-xs">
                        Регулярно
                      </Badge>
                    )}
                    {event.isFree && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Бесплатно
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{event.title}</CardTitle>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>{event.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>Наше кафе</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-lg font-bold text-orange-600">
                      {event.price}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleBookEvent(event)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      {event.isFree ? 'Забронировать' : 'Купить билет'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Хотите провести свое мероприятие?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Мы организуем корпоративные мероприятия, дни рождения, свадьбы и другие торжества. 
            Индивидуальный подход к каждому событию.
          </p>
          <Button 
            size="lg"
            onClick={() => toast.success('Свяжитесь с нами по телефону +7 (495) 123-45-67 для обсуждения вашего мероприятия!')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Обсудить мероприятие
          </Button>
        </div>
      </div>
    </section>
  )
}