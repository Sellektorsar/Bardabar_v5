"use client";

import React, { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import {
  Menu as MenuIcon,
  Star,
  Clock,
  MapPin,
  Users,
  Coffee,
  Award,
  Heart,
  Phone,
  Mail,
  Settings,
  X,
  Calendar,
  Music,
  Utensils,
  Ticket,
  Plus,
  Edit,
  Trash2,
  Save,
  Filter,
  Search,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Quote,
  Camera,
  Smartphone,
  MessageCircle,
  ExternalLink,
  Send,
  Image as ImageIcon,
  Navigation,
  TrendingUp,
  Sparkles,
  Eye,
} from "lucide-react";

// Custom VK icon component
const VKIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.297.582-1.488c.593-.188 1.353 1.254 2.158 1.807.611.419 1.075.327 1.075.327l2.158-.03s1.13-.07.594-.958c-.044-.072-.31-.653-1.597-1.847-1.347-1.25-1.167-.996.456-3.051.988-1.25 1.382-2.013 1.259-2.34-.117-.312-.84-.23-.84-.23l-2.432.015s-.18-.025-.313.055c-.131.079-.215.263-.215.263s-.387.103-.759 2.42c-.789 1.807-1.105 1.904-1.235 1.792-.301-.261-.226-1.05-.226-1.61 0-1.751.265-2.48-.517-2.669-.259-.063-.45-.104-1.114-.111-.85-.009-1.569.003-1.976.202-.271.133-.48.428-.353.445.157.021.513.096.701.354.243.333.234.108.234 1.689 0 .356-.064 1.74-.41 1.996-.237.175-.56-.182-1.256-1.818-.356-.913-.625-1.923-.625-1.923s-.052-.207-.145-.318c-.113-.135-.271-.178-.271-.178l-2.316.015s-.347.01-.475.16c-.113.133-.009.409-.009.409s1.816 4.249 3.869 6.38c1.88 1.95 4.014 1.823 4.014 1.823h.968z" />
  </svg>
);

// Custom Telegram icon component
const TelegramIcon = ({
  className,
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.302 1.4-1.123 1.645-2.03 1.026l-2.608-1.956-1.257 1.237c-.139.139-.256.256-.526.256l.188-2.759 4.766-4.308c.207-.184-.045-.287-.32-.103l-5.904 3.716-2.549-.827c-.555-.184-.566-.555.115-.822l9.956-3.838c.462-.154.867.106.713.83z" />
  </svg>
);

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  isSpecial: boolean;
  allergens?: string[];
  calories?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  type: string;
  price: string;
  isFree: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  speciality: string;
}

interface SiteSettings {
  cafeName: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  description: string;
  isOpen: boolean;
  acceptsReservations: boolean;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  category: "interior" | "food" | "events" | "team";
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminTab, setAdminTab] = useState("staff");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuFilter, setMenuFilter] = useState("all");
  const [menuSearch, setMenuSearch] = useState("");
  const [currentGalleryIndex, setCurrentGalleryIndex] =
    useState(0);
  const [showNewsletterModal, setShowNewsletterModal] =
    useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Menu items state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Стейк рибай",
      description:
        "Сочный стейк из мраморной говядины с картофелем гриль",
      price: "1500",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Горячие блюда",
      isSpecial: true,
      calories: 650,
      allergens: ["глютен"],
      isVegetarian: false,
      isVegan: false,
    },
    {
      id: 2,
      name: "Паста карбонара",
      description:
        "Классическая итальянская паста с беконом и пармезаном",
      price: "890",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d292?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Горячие блюда",
      isSpecial: false,
      calories: 520,
      allergens: ["глютен", "молочные продукты"],
      isVegetarian: true,
      isVegan: false,
    },
    {
      id: 3,
      name: 'Авторский коктейль "Бар-да-бар"',
      description:
        "Фирменный коктейль с ромом, фруктовыми соками и мятой",
      price: "450",
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Напитки",
      isSpecial: true,
      calories: 180,
      allergens: [],
      isVegetarian: true,
      isVegan: true,
    },
    {
      id: 4,
      name: "Салат Цезарь",
      description:
        "Свежий салат с курицей гриль, пармезаном и соусом цезарь",
      price: "650",
      image:
        "https://images.unsplash.com/photo-1512852939750-1305098529bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Салаты",
      isSpecial: false,
      calories: 380,
      allergens: ["молочные продукты"],
      isVegetarian: false,
      isVegan: false,
    },
    {
      id: 5,
      name: "Тирамису",
      description:
        "Классический итальянский десерт с маскарпоне и кофе",
      price: "420",
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Десерты",
      isSpecial: false,
      calories: 450,
      allergens: ["глютен", "молочные продукты", "яйца"],
      isVegetarian: true,
      isVegan: false,
    },
  ]);

  // Events state
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Живая музыка по пятницам",
      date: "2025-01-31",
      time: "19:00",
      description:
        "Каждую пятницу в нашем кафе выступают местные музыканты. Джаз, блюз и авторская песня в уютной атмосфере.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "Музыка",
      price: "Бесплатно",
      isFree: true,
    },
    {
      id: 2,
      title: "Мастер-класс по приготовлению коктейлей",
      date: "2025-02-05",
      time: "18:00",
      description:
        "Научитесь готовить авторские коктейли от нашего шеф-бармена.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Crect width='1000' height='600' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EМастер-класс по коктейлям%3C/text%3E%3C/svg%3E",
      type: "Мастер-класс",
      price: "1500",
      isFree: false,
    },
  ]);

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Алексей Иванов",
      position: "Шеф-повар",
      description:
        "Опытный шеф-повар с 15-летним стажем работы в лучших ресторанах Москвы.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ccircle cx='200' cy='150' r='50' fill='%23d1d5db'/%3E%3Crect x='150' y='220' width='100' height='80' rx='10' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='330' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3EАлексей Иванов%3C/text%3E%3C/svg%3E",
      speciality: "Авторская кухня",
    },
    {
      id: 2,
      name: "Мария Петрова",
      position: "Старший бариста",
      description:
        "Мастер кофейного дела, чемпион городских соревнований по латте-арт.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ccircle cx='200' cy='150' r='50' fill='%23d1d5db'/%3E%3Crect x='150' y='220' width='100' height='80' rx='10' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='330' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3EМария Петрова%3C/text%3E%3C/svg%3E",
      speciality: "Кофейные напитки",
    },
  ]);

  // Reviews state
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      name: "Анна Смирнова",
      rating: 5,
      comment:
        "Потрясающая атмосфера и невероятно вкусная еда! Стейк рибай просто тает во рту. Обязательно вернемся!",
      date: "2025-01-15",
      avatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6' rx='50'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23d1d5db'/%3E%3Cpath d='M25 75 Q25 60 50 60 Q75 60 75 75' fill='%23d1d5db'/%3E%3C/svg%3E",
    },
    {
      id: 2,
      name: "Михаил Петров",
      rating: 5,
      comment:
        "Отличный сервис и уютная обстановка. Мастер-класс по коктейлям был фантастическим! Рекомендую всем.",
      date: "2025-01-10",
      avatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6' rx='50'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23d1d5db'/%3E%3Cpath d='M25 75 Q25 60 50 60 Q75 60 75 75' fill='%23d1d5db'/%3E%3C/svg%3E",
    },
    {
      id: 3,
      name: "Елена Волкова",
      rating: 4,
      comment:
        "Прекрасное место для романтического ужина. Персонал очень внимательный, блюда подаются красиво оформленными.",
      date: "2025-01-08",
      avatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6' rx='50'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23d1d5db'/%3E%3Cpath d='M25 75 Q25 60 50 60 Q75 60 75 75' fill='%23d1d5db'/%3E%3C/svg%3E",
    },
  ]);

  // Gallery images state
  const [galleryImages, setGalleryImages] = useState<
    GalleryImage[]
  >([
    {
      id: 1,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Crect width='1000' height='600' fill='%23f3f4f6'/%3E%3Crect x='100' y='100' width='800' height='400' fill='%23e5e7eb' rx='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EИнтерьер ресторана%3C/text%3E%3C/svg%3E",
      alt: "Интерьер ресторана",
      category: "interior",
    },
    {
      id: 2,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Crect width='1000' height='600' fill='%23f3f4f6'/%3E%3Cellipse cx='500' cy='300' rx='200' ry='120' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EСтейк рибай%3C/text%3E%3C/svg%3E",
      alt: "Стейк рибай",
      category: "food",
    },
    {
      id: 3,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Crect width='1000' height='600' fill='%23f3f4f6'/%3E%3Crect x='100' y='200' width='800' height='200' fill='%23d1d5db' rx='10'/%3E%3Ccircle cx='200' cy='150' r='30' fill='%23e5e7eb'/%3E%3Ccircle cx='400' cy='150' r='30' fill='%23e5e7eb'/%3E%3Ccircle cx='600' cy='150' r='30' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='500' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EБарная стойка%3C/text%3E%3C/svg%3E",
      alt: "Барная стойка",
      category: "interior",
    },
    {
      id: 4,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Crect width='1000' height='600' fill='%23f3f4f6'/%3E%3Ccircle cx='300' cy='200' r='80' fill='%23d1d5db'/%3E%3Crect x='450' y='150' width='100' height='200' fill='%23d1d5db' rx='10'/%3E%3Cpath d='M600 200 L700 180 L700 220 Z' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='450' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EЖивая музыка%3C/text%3E%3C/svg%3E",
      alt: "Живая музыка",
      category: "events",
    },
    {
      id: 5,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Crect width='1000' height='600' fill='%23f3f4f6'/%3E%3Ccircle cx='500' cy='300' r='150' fill='%23e5e7eb'/%3E%3Cpath d='M400 250 Q450 200 500 250 Q550 200 600 250 Q550 300 500 250 Q450 300 400 250' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='480' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EПаста карбонара%3C/text%3E%3C/svg%3E",
      alt: "Паста карбонара",
      category: "food",
    },
    {
      id: 6,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Crect width='1000' height='600' fill='%23f3f4f6'/%3E%3Ccircle cx='500' cy='200' r='80' fill='%23d1d5db'/%3E%3Crect x='420' y='280' width='160' height='200' rx='20' fill='%23d1d5db'/%3E%3Crect x='450' y='150' width='100' height='40' rx='20' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='520' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EШеф-повар за работой%3C/text%3E%3C/svg%3E",
      alt: "Шеф-повар за работой",
      category: "team",
    },
  ]);

  // Site settings state
  const [siteSettings, setSiteSettings] =
    useState<SiteSettings>({
      cafeName: "Бар-да-бар",
      phone: "+7 (495) 123-45-67",
      email: "info@bar-da-bar.ru",
      address: "г. Москва, ул. Центральная, 123",
      workingHours:
        "Пн-Чт: 09:00-23:00, Пт-Сб: 09:00-01:00, Вс: 10:00-22:00",
      description:
        "Уютное кафе в самом сердце города, где встречаются традиции и современность.",
      isOpen: true,
      acceptsReservations: true,
    });

  // Edit states
  const [editingMenuItem, setEditingMenuItem] =
    useState<MenuItem | null>(null);
  const [editingEvent, setEditingEvent] =
    useState<Event | null>(null);
  const [editingTeamMember, setEditingTeamMember] =
    useState<TeamMember | null>(null);
  const [editingGalleryImage, setEditingGalleryImage] =
    useState<GalleryImage | null>(null);

  // Form states
  const [newMenuItem, setNewMenuItem] = useState<
    Omit<MenuItem, "id">
  >({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Горячие блюда",
    isSpecial: false,
    allergens: [],
    calories: 0,
    isVegetarian: false,
    isVegan: false,
  });

  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    description: "",
    image: "",
    type: "Мероприятие",
    price: "",
    isFree: false,
  });

  const [newTeamMember, setNewTeamMember] = useState<
    Omit<TeamMember, "id">
  >({
    name: "",
    position: "",
    description: "",
    image: "",
    speciality: "",
  });

  const [newGalleryImage, setNewGalleryImage] = useState<
    Omit<GalleryImage, "id">
  >({
    url: "",
    alt: "",
    category: "interior",
  });

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "menu", label: "Меню" },
    { id: "gallery", label: "Галерея" },
    { id: "events", label: "Мероприятия" },
    { id: "reviews", label: "Отзывы" },
    { id: "about", label: "О нас" },
    { id: "contact", label: "Контакты" },
    { id: "admin", label: "Админ" },
  ];

  const menuCategories = [
    "Горячие блюда",
    "Салаты",
    "Напитки",
    "Десерты",
  ];
  const eventTypes = [
    "Музыка",
    "Мастер-класс",
    "Праздник",
    "Кулинария",
    "Мероприятие",
  ];
  const galleryCategories = [
    "interior",
    "food",
    "events",
    "team",
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleBooking = () => {
    toast.success(
      "Спасибо за интерес! Свяжитесь с нами по телефону +7 (495) 123-45-67 для бронирования.",
    );
  };

  const handleNewsletterSubmit = () => {
    if (newsletterEmail) {
      toast.success(
        "Спасибо за подписку! Мы будем присылать вам новости о наших мероприятиях.",
      );
      setNewsletterEmail("");
      setShowNewsletterModal(false);
    } else {
      toast.error("Пожалуйста, введите email адрес");
    }
  };

  const handleOpenMap = () => {
    const address = encodeURIComponent(siteSettings.address);
    window.open(
      `https://yandex.ru/maps/?text=${address}`,
      "_blank",
    );
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesFilter =
      menuFilter === "all" || item.category === menuFilter;
    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(menuSearch.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(menuSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const nextGalleryImage = () => {
    setCurrentGalleryIndex(
      (prev) => (prev + 1) % galleryImages.length,
    );
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex(
      (prev) =>
        (prev - 1 + galleryImages.length) %
        galleryImages.length,
    );
  };

  // Get popular content for preview section
  const popularDishes = menuItems
    .filter((item) => item.isSpecial)
    .slice(0, 3);
  const upcomingEvents = events.slice(0, 2);
  const recentReviews = reviews.slice(0, 2);

  // Gallery management functions
  const addGalleryImage = () => {
    if (newGalleryImage.url && newGalleryImage.alt) {
      setGalleryImages([
        ...galleryImages,
        { ...newGalleryImage, id: Date.now() },
      ]);
      setNewGalleryImage({
        url: "",
        alt: "",
        category: "interior",
      });
      toast.success("Изображение добавлено в галерею");
    } else {
      toast.error("Заполните URL и описание изображения");
    }
  };

  const updateGalleryImage = () => {
    if (editingGalleryImage) {
      setGalleryImages(
        galleryImages.map((image) =>
          image.id === editingGalleryImage.id
            ? editingGalleryImage
            : image,
        ),
      );
      setEditingGalleryImage(null);
      toast.success("Изображение обновлено");
    }
  };

  const deleteGalleryImage = (id: number) => {
    setGalleryImages(
      galleryImages.filter((image) => image.id !== id),
    );
    toast.success("Изображение удалено из галереи");
  };

  // Menu management functions
  const addMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      setMenuItems([
        ...menuItems,
        { ...newMenuItem, id: Date.now() },
      ]);
      setNewMenuItem({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "Горячие блюда",
        isSpecial: false,
        allergens: [],
        calories: 0,
        isVegetarian: false,
        isVegan: false,
      });
      toast.success("Блюдо добавлено в меню");
    } else {
      toast.error("Заполните название и цену");
    }
  };

  const updateMenuItem = () => {
    if (editingMenuItem) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingMenuItem.id
            ? editingMenuItem
            : item,
        ),
      );
      setEditingMenuItem(null);
      toast.success("Блюдо обновлено");
    }
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast.success("Блюдо удалено из меню");
  };

  // Events management functions
  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({
        title: "",
        date: "",
        time: "",
        description: "",
        image: "",
        type: "Мероприятие",
        price: "",
        isFree: false,
      });
      toast.success("Мероприятие добавлено");
    } else {
      toast.error("Заполните название, дату и время");
    }
  };

  const updateEvent = () => {
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? editingEvent : event,
        ),
      );
      setEditingEvent(null);
      toast.success("Мероприятие обновлено");
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Мероприятие удалено");
  };

  // Team management functions
  const addTeamMember = () => {
    if (newTeamMember.name && newTeamMember.position) {
      setTeamMembers([
        ...teamMembers,
        { ...newTeamMember, id: Date.now() },
      ]);
      setNewTeamMember({
        name: "",
        position: "",
        description: "",
        image: "",
        speciality: "",
      });
      toast.success("Сотрудник добавлен");
    } else {
      toast.error("Заполните имя и должность");
    }
  };

  const updateTeamMember = () => {
    if (editingTeamMember) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === editingTeamMember.id
            ? editingTeamMember
            : member,
        ),
      );
      setEditingTeamMember(null);
      toast.success("Данные сотрудника обновлены");
    }
  };

  const deleteTeamMember = (id: number) => {
    setTeamMembers(
      teamMembers.filter((member) => member.id !== id),
    );
    toast.success("Сотрудник удален");
  };

  const saveSiteSettings = () => {
    toast.success("Настройки сайта сохранены");
  };

  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-orange-200 dark:border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                Б
              </span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {siteSettings.cafeName}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.slice(0, -1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-100 transition-transform duration-300" />
                )}
              </button>
            ))}

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-400"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavClick("admin")}
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Админ
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-400"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <MenuIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-orange-100 dark:border-gray-700">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
                      : "text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );

  const renderPopularContent = () => (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1">
              Популярное
            </Badge>
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Лучшее в нашем кафе
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Откройте для себя наши самые популярные блюда,
            предстоящие события и мнения гостей
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Dishes */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Хиты меню
              </h3>
            </div>
            <div className="space-y-4">
              {popularDishes.map((dish) => (
                <Card
                  key={dish.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100 dark:border-gray-700 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-24 h-24 relative overflow-hidden">
                        <ImageWithFallback
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                            ХИТ
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {dish.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                          {dish.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-orange-600">
                            {dish.price} ₽
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setActiveSection("menu")
                            }
                            className="text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Смотреть
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
              onClick={() => setActiveSection("menu")}
            >
              Все меню
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ближайшие события
              </h3>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100 dark:border-gray-700"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-purple-100 text-purple-700 text-xs">
                          <Music className="w-3 h-3 mr-1" />
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-orange-600">
                          {event.isFree
                            ? "Бесплатно"
                            : `${event.price} ₽`}
                        </span>
                        <Button
                          size="sm"
                          onClick={handleBooking}
                          className="text-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          Участвовать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
              onClick={() => setActiveSection("events")}
            >
              Все мероприятия
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Recent Reviews */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Свежие отзывы
              </h3>
            </div>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <Card
                  key={review.id}
                  className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100 dark:border-gray-700"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {review.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "text-orange-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-orange-200" />
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-3 line-clamp-3">
                        {review.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
              onClick={() => setActiveSection("reviews")}
            >
              Все отзывы
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 pt-16 border-t border-orange-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                500+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Довольных гостей
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                15+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Лет опыта
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Блюд в меню
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                100+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Мероприятий
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-tr from-red-200/30 to-orange-200/30 rounded-full blur-2xl -z-10" />
    </section>
  );

  const renderHero = () => (
    <>
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Добро пожаловать в
                  <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {siteSettings.cafeName}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {siteSettings.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
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
                  onClick={() => setActiveSection("menu")}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Посмотреть меню
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setActiveSection("contact")}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-8 py-3 rounded-xl transition-all duration-300"
                >
                  Забронировать столик
                </Button>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-4 pt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Мы в соцсетях:
                </span>
                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 dark:text-gray-400 hover:text-orange-600"
                  >
                    <VKIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 dark:text-gray-400 hover:text-orange-600"
                  >
                    <TelegramIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt={`Интерьер кафе ${siteSettings.cafeName}`}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-2xl blur-xl transform scale-105" />
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="absolute bottom-8 right-8 z-20">
          <Button
            onClick={() => setShowNewsletterModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg"
          >
            <Mail className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/50 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-200/50 to-transparent rounded-full blur-3xl -z-10" />
      </section>

      {/* Popular Content Preview Section */}
      {renderPopularContent()}
    </>
  );

  const renderMenu = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Наше меню
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Изысканные блюда, приготовленные с любовью из свежих
          продуктов
        </p>
      </div>

      {/* Menu Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск блюд..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={
              menuFilter === "all" ? "default" : "outline"
            }
            size="sm"
            onClick={() => setMenuFilter("all")}
            className="whitespace-nowrap"
          >
            Все блюда
          </Button>
          {menuCategories.map((category) => (
            <Button
              key={category}
              variant={
                menuFilter === category ? "default" : "outline"
              }
              size="sm"
              onClick={() => setMenuFilter(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenuItems.map((item) => (
          <Card
            key={item.id}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100 dark:border-gray-700"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {item.isSpecial && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      Хит
                    </Badge>
                  )}
                  {item.isVegetarian && (
                    <Badge className="bg-green-100 text-green-700">
                      🌱
                    </Badge>
                  )}
                  {item.isVegan && (
                    <Badge className="bg-green-200 text-green-800">
                      🌿
                    </Badge>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-700"
                  >
                    {item.calories} ккал
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  {item.name}
                </CardTitle>
                <span className="text-lg font-bold text-orange-600">
                  {item.price} ₽
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {item.description}
              </p>

              {item.allergens && item.allergens.length > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Аллергены: {item.allergens.join(", ")}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMenuItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Блюда не найдены. Попробуйте изменить критерии
            поиска.
          </p>
        </div>
      )}

      {/* QR Code for Mobile Menu */}
      <div className="mt-12 text-center">
        <Card className="inline-block p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <div className="flex items-center justify-center gap-4">
            <Smartphone className="w-8 h-8 text-orange-600" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Мобильное меню
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Отсканируйте QR-код для просмотра меню на
                смартфоне
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );

  const renderGallery = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Галерея
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Окунитесь в атмосферу нашего ресторана
        </p>
      </div>

      {/* Main Gallery Image */}
      <div className="relative mb-8">
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={galleryImages[currentGalleryIndex]?.url || ""}
            alt={galleryImages[currentGalleryIndex]?.alt || ""}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevGalleryImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextGalleryImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentGalleryIndex + 1} / {galleryImages.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentGalleryIndex(index)}
            className={`relative h-20 md:h-24 rounded-lg overflow-hidden transition-all duration-200 ${
              index === currentGalleryIndex
                ? "ring-2 ring-orange-500 scale-105"
                : "hover:scale-105 opacity-70 hover:opacity-100"
            }`}
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Gallery Categories */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            category: "interior",
            title: "Интерьер",
            icon: Camera,
          },
          { category: "food", title: "Блюда", icon: Utensils },
          {
            category: "events",
            title: "Мероприятия",
            icon: Calendar,
          },
          { category: "team", title: "Команда", icon: Users },
        ].map(({ category, title, icon: Icon }) => (
          <Card
            key={category}
            className="text-center p-6 hover:shadow-lg transition-shadow"
          >
            <Icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {
                galleryImages.filter(
                  (img) => img.category === category,
                ).length
              }{" "}
              фото
            </p>
          </Card>
        ))}
      </div>
    </section>
  );

  const renderReviews = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Отзывы гостей
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Узнайте, что говорят о нас наши довольные гости
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardContent className="p-0">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {review.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-orange-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(review.date).toLocaleDateString(
                      "ru-RU",
                    )}
                  </p>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-orange-200" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-4">
                  {review.comment}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Review CTA */}
      <div className="mt-12 text-center">
        <Card className="inline-block p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Поделитесь своим мнением
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ваш отзыв поможет нам стать еще лучше
          </p>
          <Button
            onClick={() =>
              toast.success(
                "Функция добавления отзывов скоро будет доступна!",
              )
            }
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Оставить отзыв
          </Button>
        </Card>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">
            4.8
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Средний рейтинг
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">
            150+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Отзывов
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">
            95%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Рекомендуют
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">
            5★
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Большинство оценок
          </div>
        </div>
      </div>
    </section>
  );

  // Newsletter Modal
  const NewsletterModal = () => {
    if (!showNewsletterModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Подписка на новости</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewsletterModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Получайте уведомления о новых мероприятиях,
              специальных предложениях и новостях ресторана
            </p>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Ваш email адрес"
                value={newsletterEmail}
                onChange={(e) =>
                  setNewsletterEmail(e.target.value)
                }
              />
              <Button
                onClick={handleNewsletterSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Подписаться
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderEvents = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Мероприятия
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Присоединяйтесь к нашим увлекательным событиям!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <Card
            key={event.id}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100 dark:border-gray-700"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    <Music className="w-3 h-3 mr-1" />
                    {event.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-lg font-bold text-orange-600">
                    {event.isFree
                      ? "Бесплатно"
                      : `${event.price} ₽`}
                  </div>
                  <Button
                    size="sm"
                    onClick={handleBooking}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    {event.isFree
                      ? "Забронировать"
                      : "Купить билет"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          О нас
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          "{siteSettings.cafeName}" — это не просто кафе, это
          место, где встречаются традиции и современность.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {teamMembers.map((member) => (
          <Card
            key={member.id}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-orange-100 dark:border-gray-700"
          >
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
              <CardTitle className="text-lg text-gray-900 dark:text-white mb-1">
                {member.name}
              </CardTitle>
              <Badge variant="secondary" className="mb-3">
                {member.position}
              </Badge>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {member.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );

  const renderContact = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Контакты
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Свяжитесь с нами для бронирования столика или по любым
          вопросам
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Card className="border-orange-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                <MapPin className="w-5 h-5 text-orange-600" />
                Адрес
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {siteSettings.address}
                <br />
                Район: Центральный
                <br />
                Ближайшее метро: Площадь Революции (5 мин
                пешком)
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                <Phone className="w-5 h-5 text-orange-600" />
                Телефон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {siteSettings.phone}
                <br />
                +7 (495) 123-45-68 (для бронирования)
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                <Mail className="w-5 h-5 text-orange-600" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {siteSettings.email}
                <br />
                booking@bar-da-bar.ru
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                <Clock className="w-5 h-5 text-orange-600" />
                Часы работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {siteSettings.workingHours}
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                <Send className="w-5 h-5 text-orange-600" />
                Мы в соцсетях
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <VKIcon className="w-4 h-4" />
                  VKontakte
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <TelegramIcon className="w-4 h-4" />
                  Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Location Card with Static Map Representation */}
          <Card className="border-orange-100 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                <MapPin className="w-5 h-5 text-orange-600" />
                Как нас найти
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 relative border border-orange-200 dark:border-gray-600">
                {/* Stylized map representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <MapPin className="w-16 h-16 text-orange-600 mx-auto animate-bounce" />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-4 h-4 bg-orange-600 rounded-full opacity-30 animate-ping"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {siteSettings.cafeName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {siteSettings.address}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Центральный район, рядом с метро
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-orange-400 rounded-full opacity-60"></div>
                <div className="absolute top-8 right-6 w-1 h-1 bg-red-400 rounded-full opacity-80"></div>
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-red-300 rounded-full opacity-70"></div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  onClick={handleOpenMap}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                >
                  <Navigation className="w-4 h-4" />
                  Открыть в Яндекс.Картах
                </Button>
                <Button
                  onClick={() => {
                    const address = encodeURIComponent(
                      siteSettings.address,
                    );
                    window.open(
                      `https://maps.google.com/maps?q=${address}`,
                      "_blank",
                    );
                  }}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Бронирование столика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Для бронирования столика свяжитесь с нами по
                  телефону или напишите на email.
                </p>
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={handleBooking}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Позвонить
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `mailto:${siteSettings.email}`,
                        "_blank",
                      )
                    }
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Написать на email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );

  const renderAdmin = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Админ-панель
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Управление контентом сайта кафе "
          {siteSettings.cafeName}"
        </p>
      </div>

      <Tabs
        value={adminTab}
        onValueChange={setAdminTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger
            value="staff"
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Персонал
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            className="flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            Меню
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Галерея
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            События
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Настройки
          </TabsTrigger>
        </TabsList>

        {/* Staff Management */}
        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Добавить сотрудника
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="staff-name">Имя</Label>
                  <Input
                    id="staff-name"
                    value={newTeamMember.name}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        name: e.target.value,
                      })
                    }
                    placeholder="Введите имя сотрудника"
                  />
                </div>
                <div>
                  <Label htmlFor="staff-position">
                    Должность
                  </Label>
                  <Input
                    id="staff-position"
                    value={newTeamMember.position}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        position: e.target.value,
                      })
                    }
                    placeholder="Введите должность"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="staff-speciality">
                  Специализация
                </Label>
                <Input
                  id="staff-speciality"
                  value={newTeamMember.speciality}
                  onChange={(e) =>
                    setNewTeamMember({
                      ...newTeamMember,
                      speciality: e.target.value,
                    })
                  }
                  placeholder="Введите специализацию"
                />
              </div>
              <div>
                <Label htmlFor="staff-image">
                  URL изображения
                </Label>
                <Input
                  id="staff-image"
                  value={newTeamMember.image}
                  onChange={(e) =>
                    setNewTeamMember({
                      ...newTeamMember,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div>
                <Label htmlFor="staff-description">
                  Описание
                </Label>
                <Textarea
                  id="staff-description"
                  value={newTeamMember.description}
                  onChange={(e) =>
                    setNewTeamMember({
                      ...newTeamMember,
                      description: e.target.value,
                    })
                  }
                  placeholder="Краткое описание сотрудника"
                  rows={3}
                />
              </div>
              <Button
                onClick={addTeamMember}
                className="w-full"
              >
                Добавить сотрудника
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Список сотрудников</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        member.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">
                        {member.name}
                      </h3>
                      <Badge variant="secondary">
                        {member.position}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingTeamMember(member)
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        deleteTeamMember(member.id)
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {editingTeamMember && (
            <Card>
              <CardHeader>
                <CardTitle>Редактировать сотрудника</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Имя</Label>
                    <Input
                      value={editingTeamMember.name}
                      onChange={(e) =>
                        setEditingTeamMember({
                          ...editingTeamMember,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Должность</Label>
                    <Input
                      value={editingTeamMember.position}
                      onChange={(e) =>
                        setEditingTeamMember({
                          ...editingTeamMember,
                          position: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Специализация</Label>
                  <Input
                    value={editingTeamMember.speciality}
                    onChange={(e) =>
                      setEditingTeamMember({
                        ...editingTeamMember,
                        speciality: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={editingTeamMember.image}
                    onChange={(e) =>
                      setEditingTeamMember({
                        ...editingTeamMember,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Описание</Label>
                  <Textarea
                    value={editingTeamMember.description}
                    onChange={(e) =>
                      setEditingTeamMember({
                        ...editingTeamMember,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={updateTeamMember}>
                    Сохранить изменения
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingTeamMember(null)}
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Добавить блюдо
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Название</Label>
                  <Input
                    value={newMenuItem.name}
                    onChange={(e) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        name: e.target.value,
                      })
                    }
                    placeholder="Название блюда"
                  />
                </div>
                <div>
                  <Label>Цена (без символа ₽)</Label>
                  <Input
                    value={newMenuItem.price}
                    onChange={(e) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        price: e.target.value,
                      })
                    }
                    placeholder="1000"
                    type="number"
                  />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select
                    value={newMenuItem.category}
                    onValueChange={(value) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        category: value,
                      })
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Калории</Label>
                  <Input
                    value={
                      newMenuItem.calories?.toString() || ""
                    }
                    onChange={(e) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        calories: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="350"
                    type="number"
                  />
                </div>
                <div>
                  <Label>Аллергены (через запятую)</Label>
                  <Input
                    value={
                      newMenuItem.allergens?.join(", ") || ""
                    }
                    onChange={(e) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        allergens: e.target.value
                          .split(", ")
                          .filter(Boolean),
                      })
                    }
                    placeholder="глютен, молочные продукты"
                  />
                </div>
              </div>
              <div>
                <Label>URL изображения</Label>
                <Input
                  value={newMenuItem.image}
                  onChange={(e) =>
                    setNewMenuItem({
                      ...newMenuItem,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://example.com/dish.jpg"
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea
                  value={newMenuItem.description}
                  onChange={(e) =>
                    setNewMenuItem({
                      ...newMenuItem,
                      description: e.target.value,
                    })
                  }
                  placeholder="Описание блюда"
                  rows={3}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="special"
                    checked={newMenuItem.isSpecial}
                    onCheckedChange={(checked) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        isSpecial: checked,
                      })
                    }
                  />
                  <Label htmlFor="special">
                    Специальное предложение
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="vegetarian"
                    checked={newMenuItem.isVegetarian}
                    onCheckedChange={(checked) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        isVegetarian: checked,
                      })
                    }
                  />
                  <Label htmlFor="vegetarian">
                    Вегетарианское
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="vegan"
                    checked={newMenuItem.isVegan}
                    onCheckedChange={(checked) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        isVegan: checked,
                      })
                    }
                  />
                  <Label htmlFor="vegan">Веганское</Label>
                </div>
              </div>
              <Button onClick={addMenuItem} className="w-full">
                Добавить блюдо
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Список блюд</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium">
                        {item.name}
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">
                          {item.category}
                        </Badge>
                        <Badge variant="outline">
                          {item.price} ₽
                        </Badge>
                        {item.isSpecial && <Badge>Хит</Badge>}
                        {item.isVegetarian && (
                          <Badge className="bg-green-100 text-green-700">
                            🌱
                          </Badge>
                        )}
                        {item.isVegan && (
                          <Badge className="bg-green-200 text-green-800">
                            🌿
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingMenuItem(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMenuItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {editingMenuItem && (
            <Card>
              <CardHeader>
                <CardTitle>Редактировать блюдо</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Название</Label>
                    <Input
                      value={editingMenuItem.name}
                      onChange={(e) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Цена</Label>
                    <Input
                      value={editingMenuItem.price}
                      onChange={(e) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          price: e.target.value,
                        })
                      }
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Категория</Label>
                    <Select
                      value={editingMenuItem.category}
                      onValueChange={(value) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          category: value,
                        })
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Калории</Label>
                    <Input
                      value={
                        editingMenuItem.calories?.toString() ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          calories:
                            parseInt(e.target.value) || 0,
                        })
                      }
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Аллергены (через запятую)</Label>
                    <Input
                      value={
                        editingMenuItem.allergens?.join(", ") ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          allergens: e.target.value
                            .split(", ")
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={editingMenuItem.image}
                    onChange={(e) =>
                      setEditingMenuItem({
                        ...editingMenuItem,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Описание</Label>
                  <Textarea
                    value={editingMenuItem.description}
                    onChange={(e) =>
                      setEditingMenuItem({
                        ...editingMenuItem,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="special-edit"
                      checked={editingMenuItem.isSpecial}
                      onCheckedChange={(checked) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          isSpecial: checked,
                        })
                      }
                    />
                    <Label htmlFor="special-edit">
                      Специальное предложение
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="vegetarian-edit"
                      checked={editingMenuItem.isVegetarian}
                      onCheckedChange={(checked) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          isVegetarian: checked,
                        })
                      }
                    />
                    <Label htmlFor="vegetarian-edit">
                      Вегетарианское
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="vegan-edit"
                      checked={editingMenuItem.isVegan}
                      onCheckedChange={(checked) =>
                        setEditingMenuItem({
                          ...editingMenuItem,
                          isVegan: checked,
                        })
                      }
                    />
                    <Label htmlFor="vegan-edit">
                      Веганское
                    </Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={updateMenuItem}>
                    Сохранить изменения
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingMenuItem(null)}
                  >
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Gallery Management */}
        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Добавить изображение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={newGalleryImage.url}
                    onChange={(e) =>
                      setNewGalleryImage({
                        ...newGalleryImage,
                        url: e.target.value,
                      })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select
                    value={newGalleryImage.category}
                    onValueChange={(value) =>
                      setNewGalleryImage({
                        ...newGalleryImage,
                        category: value as any,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interior">
                        Интерьер
                      </SelectItem>
                      <SelectItem value="food">
                        Блюда
                      </SelectItem>
                      <SelectItem value="events">
                        Мероприятия
                      </SelectItem>
                      <SelectItem value="team">
                        Команда
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Input
                  value={newGalleryImage.alt}
                  onChange={(e) =>
                    setNewGalleryImage({
                      ...newGalleryImage,
                      alt: e.target.value,
                    })
                  }
                  placeholder="Краткое описание изображения"
                />
              </div>
              <Button
                onClick={addGalleryImage}
                className="w-full"
              >
                Добавить изображение
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Галерея изображений</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditingGalleryImage(image)
                          }
                          className="bg-white text-black hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            deleteGalleryImage(image.id)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">
                        {image.alt}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {image.category === "interior"
                          ? "Интерьер"
                          : image.category === "food"
                            ? "Блюда"
                            : image.category === "events"
                              ? "Мероприятия"
                              : "Команда"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {editingGalleryImage && (
            <Card>
              <CardHeader>
                <CardTitle>Редактировать изображение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>URL изображения</Label>
                    <Input
                      value={editingGalleryImage.url}
                      onChange={(e) =>
                        setEditingGalleryImage({
                          ...editingGalleryImage,
                          url: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Категория</Label>
                    <Select
                      value={editingGalleryImage.category}
                      onValueChange={(value) =>
                        setEditingGalleryImage({
                          ...editingGalleryImage,
                          category: value as any,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interior">
                          Интерьер
                        </SelectItem>
                        <SelectItem value="food">
                          Блюда
                        </SelectItem>
                        <SelectItem value="events">
                          Мероприятия
                        </SelectItem>
                        <SelectItem value="team">
                          Команда
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Описание</Label>
                  <Input
                    value={editingGalleryImage.alt}
                    onChange={(e) =>
                      setEditingGalleryImage({
                        ...editingGalleryImage,
                        alt: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={updateGalleryImage}>
                    Сохранить изменения
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingGalleryImage(null)}
                  >
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Events Management */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Добавить мероприятие
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название</Label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        title: e.target.value,
                      })
                    }
                    placeholder="Название мероприятия"
                  />
                </div>
                <div>
                  <Label>Тип</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Дата</Label>
                  <Input
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        date: e.target.value,
                      })
                    }
                    type="date"
                  />
                </div>
                <div>
                  <Label>Время</Label>
                  <Input
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        time: e.target.value,
                      })
                    }
                    type="time"
                  />
                </div>
              </div>
              <div>
                <Label>URL изображения</Label>
                <Input
                  value={newEvent.image}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://example.com/event.jpg"
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      description: e.target.value,
                    })
                  }
                  placeholder="Описание мероприятия"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="free-event"
                    checked={newEvent.isFree}
                    onCheckedChange={(checked) =>
                      setNewEvent({
                        ...newEvent,
                        isFree: checked,
                        price: checked ? "Бесплатно" : "",
                      })
                    }
                  />
                  <Label htmlFor="free-event">
                    Бесплатное мероприятие
                  </Label>
                </div>
                {!newEvent.isFree && (
                  <div>
                    <Label>Цена</Label>
                    <Input
                      value={newEvent.price}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          price: e.target.value,
                        })
                      }
                      placeholder="1000"
                      type="number"
                    />
                  </div>
                )}
              </div>
              <Button onClick={addEvent} className="w-full">
                Добавить мероприятие
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Список мероприятий</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        event.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt={event.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium">
                        {event.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          {event.type}
                        </Badge>
                        <Badge variant="outline">
                          {event.date} {event.time}
                        </Badge>
                        {event.isFree && (
                          <Badge className="bg-green-100 text-green-700">
                            Бесплатно
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingEvent(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {editingEvent && (
            <Card>
              <CardHeader>
                <CardTitle>Редактировать мероприятие</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Название</Label>
                    <Input
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Тип</Label>
                    <Select
                      value={editingEvent.type}
                      onValueChange={(value) =>
                        setEditingEvent({
                          ...editingEvent,
                          type: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Дата</Label>
                    <Input
                      value={editingEvent.date}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          date: e.target.value,
                        })
                      }
                      type="date"
                    />
                  </div>
                  <div>
                    <Label>Время</Label>
                    <Input
                      value={editingEvent.time}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          time: e.target.value,
                        })
                      }
                      type="time"
                    />
                  </div>
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={editingEvent.image}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Описание</Label>
                  <Textarea
                    value={editingEvent.description}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="free-event-edit"
                      checked={editingEvent.isFree}
                      onCheckedChange={(checked) =>
                        setEditingEvent({
                          ...editingEvent,
                          isFree: checked,
                          price: checked ? "Бесплатно" : "",
                        })
                      }
                    />
                    <Label htmlFor="free-event-edit">
                      Бесплатное мероприятие
                    </Label>
                  </div>
                  {!editingEvent.isFree && (
                    <div>
                      <Label>Цена</Label>
                      <Input
                        value={editingEvent.price}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            price: e.target.value,
                          })
                        }
                        type="number"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={updateEvent}>
                    Сохранить изменения
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingEvent(null)}
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Общие настройки сайта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название кафе</Label>
                  <Input
                    value={siteSettings.cafeName}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        cafeName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Телефон</Label>
                  <Input
                    value={siteSettings.phone}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    value={siteSettings.email}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Адрес</Label>
                  <Input
                    value={siteSettings.address}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Режим работы</Label>
                <Textarea
                  value={siteSettings.workingHours}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      workingHours: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label>Описание кафе</Label>
                <Textarea
                  value={siteSettings.description}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Кафе открыто</Label>
                    <p className="text-sm text-gray-500">
                      Отображать статус "Открыто" на сайте
                    </p>
                  </div>
                  <Switch
                    checked={siteSettings.isOpen}
                    onCheckedChange={(checked) =>
                      setSiteSettings({
                        ...siteSettings,
                        isOpen: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Принимать бронирования</Label>
                    <p className="text-sm text-gray-500">
                      Разрешить пользователям бронировать
                      столики
                    </p>
                  </div>
                  <Switch
                    checked={siteSettings.acceptsReservations}
                    onCheckedChange={(checked) =>
                      setSiteSettings({
                        ...siteSettings,
                        acceptsReservations: checked,
                      })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={saveSiteSettings}
                className="w-full"
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

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return renderHero();
      case "menu":
        return renderMenu();
      case "gallery":
        return renderGallery();
      case "events":
        return renderEvents();
      case "reviews":
        return renderReviews();
      case "about":
        return renderAbout();
      case "contact":
        return renderContact();
      case "admin":
        return renderAdmin();
      default:
        return renderHero();
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}
    >
      {renderHeader()}
      <main className="transition-all duration-500 ease-in-out">
        {renderSection()}
      </main>
      <NewsletterModal />
      <Toaster />
    </div>
  );
}