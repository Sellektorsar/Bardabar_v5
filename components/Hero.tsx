'use client';

import { Button } from './ui/button';
import { ImageWithFallback } from './common/ImageWithFallback';
import { Star, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export function Hero({ setActiveSection }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Добро пожаловать в
                <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Бар-да-бар
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Уютное кафе в самом сердце города, где встречаются традиции и современность.
                Попробуйте наши фирменные блюда и насладитесь атмосферой домашнего уюта.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500" />
                <span>4.8 рейтинг</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>Работаем 09:00-23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>Центр города</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setActiveSection('menu')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Посмотреть меню
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setActiveSection('contact')}
                className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-xl transition-all duration-300"
              >
                Забронировать столик
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Интерьер кафе Бар-да-бар"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-2xl blur-xl transform scale-105" />
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/50 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-200/50 to-transparent rounded-full blur-3xl -z-10" />
    </section>
  );
}
