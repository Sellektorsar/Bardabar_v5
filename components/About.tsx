"'use client'"

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Users, Coffee, Award, Heart } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface AboutProps {
  isAdminMode?: boolean
}

export function About({ isAdminMode }: AboutProps) {
  const teamMembers = [
    {
      id: 1,
      name: 'Алексей Иванов',
      position: 'Шеф-повар',
      description: 'Опытный шеф-повар с 15-летним стажем работы в лучших ресторанах Москвы. Специализируется на европейской и авторской кухне.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ccircle cx="200" cy="150" r="50" fill="%23d1d5db"/%3E%3Crect x="150" y="220" width="100" height="80" rx="10" fill="%23d1d5db"/%3E%3Ctext x="50%25" y="330" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%236b7280"%3EАлексей Иванов%3C/text%3E%3C/svg%3E',
      speciality: 'Авторская кухня'
    },
    {
      id: 2,
      name: 'Мария Петрова',
      position: 'Старший бариста',
      description: 'Мастер кофейного дела, чемпион городских соревнований по латте-арт. Знает все секреты идеального кофе.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ccircle cx="200" cy="150" r="50" fill="%23d1d5db"/%3E%3Crect x="150" y="220" width="100" height="80" rx="10" fill="%23d1d5db"/%3E%3Ctext x="50%25" y="330" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%236b7280"%3EМария Петрова%3C/text%3E%3C/svg%3E',
      speciality: 'Кофейные напитки'
    },
    {
      id: 3,
      name: 'Дмитрий Соколов',
      position: 'Су-шеф',
      description: 'Правая рука шеф-повара, отвечает за качество каждого блюда. Мастер холодных закусок и десертов.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ccircle cx="200" cy="150" r="50" fill="%23d1d5db"/%3E%3Crect x="150" y="220" width="100" height="80" rx="10" fill="%23d1d5db"/%3E%3Ctext x="50%25" y="330" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%236b7280"%3EДмитрий Соколов%3C/text%3E%3C/svg%3E',
      speciality: 'Десерты'
    },
    {
      id: 4,
      name: 'Анна Васильева',
      position: 'Управляющая',
      description: 'Обеспечивает безупречный сервис и уютную атмосферу. Всегда готова помочь с выбором и сделать ваш визит незабываемым.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ccircle cx="200" cy="150" r="50" fill="%23d1d5db"/%3E%3Crect x="150" y="220" width="100" height="80" rx="10" fill="%23d1d5db"/%3E%3Ctext x="50%25" y="330" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%236b7280"%3EАнна Васильева%3C/text%3E%3C/svg%3E',
      speciality: 'Сервис'
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: 'Лучшее кафе района 2023',
      description: 'По версии портала "Афиша"'
    },
    {
      icon: Coffee,
      title: 'Премия "Золотой турок"',
      description: 'За лучший кофе в городе'
    },
    {
      icon: Heart,
      title: '2000+ довольных гостей',
      description: 'Каждый месяц нас посещают'
    },
    {
      icon: Users,
      title: 'Команда профессионалов',
      description: 'Опыт работы более 50 лет суммарно'
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">О нас</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          "Бар-да-бар" — это не просто кафе, это место, где встречаются традиции и современность, 
          где каждая чашка кофе готовится с душой, а каждое блюдо — произведение искусства.
        </p>
      </div>

      {/* История кафе */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="order-2 lg:order-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Наша история</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Наше кафе открылось в 2018 году с простой идеей — создать место, где люди могут 
              отдохнуть от городской суеты и насладиться качественной едой и напитками.
            </p>
            <p>
              За годы работы мы собрали команду настоящих профессионалов, каждый из которых 
              вкладывает душу в свое дело. Мы тщательно отбираем продукты от лучших поставщиков 
              и постоянно совершенствуем наши рецепты.
            </p>
            <p>
              Сегодня "Бар-да-бар" — это признанное место встреч для жителей и гостей города, 
              где царит атмосфера уюта и гостеприимства.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <ImageWithFallback
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Crect x='50' y='50' width='700' height='300' fill='%23e5e7eb' rx='20'/%3E%3Crect x='100' y='100' width='200' height='150' fill='%23d1d5db' rx='10'/%3E%3Crect x='350' y='100' width='200' height='150' fill='%23d1d5db' rx='10'/%3E%3Crect x='600' y='100' width='100' height='150' fill='%23d1d5db' rx='10'/%3E%3Ctext x='50%25' y='320' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3EИнтерьер кафе Бар-да-бар%3C/text%3E%3C/svg%3E"
            alt="Интерьер кафе Бар-да-бар"
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Достижения */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Наши достижения</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-orange-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Команда */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Наша команда</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-100 text-orange-700 text-xs">
                      {member.speciality}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg text-gray-900 mb-1">{member.name}</CardTitle>
                <Badge variant="secondary" className="mb-3">{member.position}</Badge>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Философия */}
      <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Наша философия</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы верим, что хорошая еда объединяет людей. Каждое блюдо готовится с любовью, 
            каждый гость — наш почетный друг. Мы создаем не просто кафе, а пространство для 
            душевных встреч и незабываемых моментов.
          </p>
        </div>
      </div>
    </section>
  )
}