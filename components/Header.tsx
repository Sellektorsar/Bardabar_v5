'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Settings, Menu as MenuIcon, X } from 'lucide-react'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isAdminMode: boolean
  setIsAdminMode: (mode: boolean) => void
}

export function Header({ activeSection, setActiveSection, isAdminMode, setIsAdminMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'menu', label: 'Меню' },
    { id: 'events', label: 'Мероприятия' },
    { id: 'about', label: 'О нас' },
    { id: 'contact', label: 'Контакты' },
  ]

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
  }

  const handleAdminClick = () => {
    setIsAdminMode(!isAdminMode)
    if (!isAdminMode) setActiveSection('admin')
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Б</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Бар-да-бар
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-orange-600 bg-orange-100'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-100 transition-transform duration-300" />
                )}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAdminClick}
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Админ
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="border-orange-300 text-orange-600">
                  <MenuIcon className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">Б</span>
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Бар-да-бар
                    </h2>
                  </div>
                  
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'text-orange-600 bg-orange-100'
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={handleAdminClick}
                    className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 mt-4"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Админ-панель
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}