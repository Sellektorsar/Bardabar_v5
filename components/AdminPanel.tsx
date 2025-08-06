"'use client'";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Users, Menu, Settings, Plus, Edit, Trash2, Save, Bell, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { AdminNotifications } from './AdminNotifications';
import { BookingManagement } from './BookingManagement';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './common/ImageWithFallback';

export function AdminPanel() {
  // Staff management
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Алексей Иванов',
      position: 'Шеф-повар',
      description: 'Опытный шеф-повар с 15-летним стажем.',
      image: 'https://images.unsplash.com/photo-1583394293214-28a5b42b6171?w=400',
    },
    {
      id: 2,
      name: 'Мария Петрова',
      position: 'Бариста',
      description: 'Мастер кофейного дела.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c8e3e7fa?w=400',
    },
  ]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    position: '',
    description: '',
    image: '',
  });

  const [editingStaff, setEditingStaff] = useState<any>(null);

  // Menu management
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Стейк рибай',
      description: 'Сочный стейк из мраморной говядины',
      price: '1500',
      category: 'Горячие блюда',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      isSpecial: true,
    },
    {
      id: 2,
      name: 'Паста карбонара',
      description: 'Классическая итальянская паста',
      price: '890',
      category: 'Горячие блюда',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d292?w=400',
      isSpecial: false,
    },
  ]);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Горячие блюда',
    image: '',
    isSpecial: false,
  });

  const [editingMenuItem, setEditingMenuItem] = useState<any>(null);

  // Settings
  const [settings, setSettings] = useState({
    cafeName: 'Бар-да-бар',
    phone: '+7 (495) 123-45-67',
    email: 'info@bar-da-bar.ru',
    address: 'г. Москва, ул. Центральная, 123',
    workingHours: 'Пн-Чт: 09:00-23:00, Пт-Сб: 09:00-01:00, Вс: 10:00-22:00',
    description: 'Уютное кафе в самом сердце города',
    isOpen: true,
    acceptsReservations: true,
  });

  const menuCategories = ['Горячие блюда', 'Салаты', 'Напитки', 'Десерты'];

  // Staff functions
  const addStaff = () => {
    if (newStaff.name && newStaff.position) {
      setStaff([...staff, { ...newStaff, id: Date.now() }]);
      setNewStaff({ name: '', position: '', description: '', image: '' });
      toast.success('Сотрудник добавлен');
    } else {
      toast.error('Заполните имя и должность');
    }
  };

  const updateStaff = () => {
    if (editingStaff) {
      setStaff(staff.map((s) => (s.id === editingStaff.id ? editingStaff : s)));
      setEditingStaff(null);
      toast.success('Данные сотрудника обновлены');
    }
  };

  const deleteStaff = (id: number) => {
    setStaff(staff.filter((s) => s.id !== id));
    toast.success('Сотрудник удален');
  };

  // Menu functions
  const addMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      setMenuItems([...menuItems, { ...newMenuItem, id: Date.now() }]);
      setNewMenuItem({
        name: '',
        description: '',
        price: '',
        category: 'Горячие блюда',
        image: '',
        isSpecial: false,
      });
      toast.success('Блюдо добавлено в меню');
    } else {
      toast.error('Заполните название и цену');
    }
  };

  const updateMenuItem = () => {
    if (editingMenuItem) {
      setMenuItems(
        menuItems.map((item) => (item.id === editingMenuItem.id ? editingMenuItem : item)),
      );
      setEditingMenuItem(null);
      toast.success('Блюдо обновлено');
    }
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast.success('Блюдо удалено из меню');
  };

  const saveSettings = () => {
    toast.success('Настройки сохранены!');
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Hero Section для админки в стиле Figma */}
      <div className="relative overflow-hidden mb-12">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="text-center relative">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <span className="text-white font-bold text-2xl">Б</span>
                </div>
                <h1 className="text-4xl font-bold text-white">Бар-да-бар</h1>
              </div>
              <h2 className="text-5xl font-bold text-white mb-6">Админ-панель</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Управление контентом сайта кафе "Бар-да-бар"
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-12 bg-white/80 backdrop-blur-sm border-2 border-orange-200/50 rounded-2xl p-2 shadow-xl">
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-3 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-500 font-medium text-gray-700 hover:text-orange-600"
          >
            <Bell className="w-5 h-5" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            className="flex items-center gap-3 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-500 font-medium text-gray-700 hover:text-orange-600"
          >
            <Calendar className="w-5 h-5" />
            Бронирования
          </TabsTrigger>
          <TabsTrigger
            value="staff"
            className="flex items-center gap-3 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-500 font-medium text-gray-700 hover:text-orange-600"
          >
            <Users className="w-5 h-5" />
            Персонал
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            className="flex items-center gap-3 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-500 font-medium text-gray-700 hover:text-orange-600"
          >
            <Menu className="w-5 h-5" />
            Меню
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-3 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-500 font-medium text-gray-700 hover:text-orange-600"
          >
            <Settings className="w-5 h-5" />
            Настройки
          </TabsTrigger>
        </TabsList>

        {/* Notifications Management */}
        <TabsContent value="notifications">
          <AdminNotifications />
        </TabsContent>

        {/* Bookings Management */}
        <TabsContent value="bookings">
          <BookingManagement />
        </TabsContent>

        {/* Staff Management */}
        <TabsContent value="staff" className="space-y-6">
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-t-3xl">
              <CardTitle className="flex items-center gap-3 text-white text-xl font-bold">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                Добавить сотрудника
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    placeholder="Введите имя сотрудника"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Должность</Label>
                  <Input
                    id="position"
                    value={newStaff.position}
                    onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                    placeholder="Введите должность"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image">URL изображения</Label>
                <Input
                  id="image"
                  value={newStaff.image}
                  onChange={(e) => setNewStaff({ ...newStaff, image: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={newStaff.description}
                  onChange={(e) => setNewStaff({ ...newStaff, description: e.target.value })}
                  placeholder="Краткое описание сотрудника"
                  rows={3}
                />
              </div>
              <Button
                onClick={addStaff}
                className="w-full bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 py-4 text-lg font-semibold transform hover:scale-[1.02]"
              >
                Добавить сотрудника
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-t-3xl">
              <CardTitle className="text-white text-xl font-bold">Список сотрудников</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {staff.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-6 border-0 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-6">
                    <ImageWithFallback
                      src={member.image || 'https://via.placeholder.com/60'}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 rounded-full px-3 py-1"
                      >
                        {member.position}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingStaff(member)}
                      className="border-2 border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white rounded-xl transition-all duration-500 p-3"
                    >
                      <Edit className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteStaff(member.id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-500 p-3"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {editingStaff && (
            <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="text-gray-900">Редактировать сотрудника</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Имя</Label>
                    <Input
                      value={editingStaff.name}
                      onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Должность</Label>
                    <Input
                      value={editingStaff.position}
                      onChange={(e) =>
                        setEditingStaff({ ...editingStaff, position: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={editingStaff.image}
                    onChange={(e) => setEditingStaff({ ...editingStaff, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Описание</Label>
                  <Textarea
                    value={editingStaff.description}
                    onChange={(e) =>
                      setEditingStaff({ ...editingStaff, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={updateStaff}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Сохранить изменения
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingStaff(null)}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300"
                  >
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Menu Management */}
        <TabsContent value="menu" className="space-y-6">
          <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                Добавить блюдо
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Название</Label>
                  <Input
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                    placeholder="Название блюда"
                  />
                </div>
                <div>
                  <Label>Цена</Label>
                  <Input
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select
                    value={newMenuItem.category}
                    onValueChange={(value) => setNewMenuItem({ ...newMenuItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {menuCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>URL изображения</Label>
                <Input
                  value={newMenuItem.image}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
                  placeholder="https://example.com/dish.jpg"
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                  placeholder="Описание блюда"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="special"
                  checked={newMenuItem.isSpecial}
                  onCheckedChange={(checked) =>
                    setNewMenuItem({ ...newMenuItem, isSpecial: checked })
                  }
                />
                <Label htmlFor="special">Специальное предложение</Label>
              </div>
              <Button
                onClick={addMenuItem}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Добавить блюдо
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="text-gray-900">Список блюд</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-orange-100 rounded-xl bg-gradient-to-r from-orange-50/50 to-red-50/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={item.image || 'https://via.placeholder.com/60'}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant="outline">{item.price} ₽</Badge>
                        {item.isSpecial && <Badge>Хит</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingMenuItem(item)}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMenuItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {editingMenuItem && (
            <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="text-gray-900">Редактировать блюдо</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Название</Label>
                    <Input
                      value={editingMenuItem.name}
                      onChange={(e) =>
                        setEditingMenuItem({ ...editingMenuItem, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Цена</Label>
                    <Input
                      value={editingMenuItem.price}
                      onChange={(e) =>
                        setEditingMenuItem({ ...editingMenuItem, price: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Категория</Label>
                    <Select
                      value={editingMenuItem.category}
                      onValueChange={(value) =>
                        setEditingMenuItem({ ...editingMenuItem, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {menuCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={editingMenuItem.image}
                    onChange={(e) =>
                      setEditingMenuItem({ ...editingMenuItem, image: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Описание</Label>
                  <Textarea
                    value={editingMenuItem.description}
                    onChange={(e) =>
                      setEditingMenuItem({ ...editingMenuItem, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="special-edit"
                    checked={editingMenuItem.isSpecial}
                    onCheckedChange={(checked) =>
                      setEditingMenuItem({ ...editingMenuItem, isSpecial: checked })
                    }
                  />
                  <Label htmlFor="special-edit">Специальное предложение</Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={updateMenuItem}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Сохранить изменения
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingMenuItem(null)}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300"
                  >
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                Общие настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название кафе</Label>
                  <Input
                    value={settings.cafeName}
                    onChange={(e) => setSettings({ ...settings, cafeName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Телефон</Label>
                  <Input
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Адрес</Label>
                  <Input
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Режим работы</Label>
                <Textarea
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Описание кафе</Label>
                <Textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Кафе открыто</Label>
                    <p className="text-sm text-gray-500">Отображать статус "Открыто" на сайте</p>
                  </div>
                  <Switch
                    checked={settings.isOpen}
                    onCheckedChange={(checked) => setSettings({ ...settings, isOpen: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Принимать бронирования</Label>
                    <p className="text-sm text-gray-500">
                      Разрешить пользователям бронировать столики
                    </p>
                  </div>
                  <Switch
                    checked={settings.acceptsReservations}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, acceptsReservations: checked })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={saveSettings}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
