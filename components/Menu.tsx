'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './common/ImageWithFallback';

export function Menu() {
  const menuCategories = [
    {
      title: 'Горячие блюда',
      items: [
        {
          name: 'Стейк рибай',
          description: 'Сочный стейк из мраморной говядины с картофелем гриль',
          price: '1500 ₽',
          image:
            'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          isSpecial: true,
        },
        {
          name: 'Паста карбонара',
          description: 'Классическая итальянская паста с беконом и пармезаном',
          price: '890 ₽',
          image:
            'https://images.unsplash.com/photo-1621996346565-e3dbc353d292?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          name: 'Ризотто с грибами',
          description: 'Кремовое ризотто с лесными грибами и трюфельным маслом',
          price: '750 ₽',
          image:
            'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
      ],
    },
    {
      title: 'Салаты',
      items: [
        {
          name: 'Цезарь с курицей',
          description: 'Классический салат с курицей гриль, пармезаном и соусом цезарь',
          price: '650 ₽',
          image:
            'https://images.unsplash.com/photo-1512852939750-1305098529bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          name: 'Греческий салат',
          description: 'Свежие овощи с сыром фета и оливковым маслом',
          price: '550 ₽',
          image:
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
      ],
    },
    {
      title: 'Напитки',
      items: [
        {
          name: 'Авторский коктейль "Бар-да-бар"',
          description: 'Фирменный коктейль с ромом, фруктовыми соками и мятой',
          price: '450 ₽',
          image:
            'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          isSpecial: true,
        },
        {
          name: 'Свежевыжатый сок',
          description: 'Апельсиновый, яблочный или морковный сок',
          price: '250 ₽',
          image:
            'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Наше меню</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Изысканные блюда, приготовленные с любовью из свежих продуктов
        </p>
      </div>

      <div className="space-y-12">
        {menuCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-200 pb-2">
              {category.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <Card
                  key={itemIndex}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {item.isSpecial && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          Хит
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg text-gray-900">{item.name}</CardTitle>
                      <span className="text-lg font-bold text-orange-600">{item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
