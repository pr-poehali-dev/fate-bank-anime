import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/ui/icon'

const Navigation = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/rules', label: 'Правила', icon: 'BookOpen' },
    { path: '/games', label: 'Мини-игры', icon: 'Gamepad2' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-death-black/90 backdrop-blur-sm border-b border-neon-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="Skull" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-neon-purple transition-colors">
              Банк Судьбы
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'text-neon-purple bg-neon-purple/10 shadow-neon-purple/20 shadow-lg'
                    : 'text-white hover:text-neon-purple hover:bg-neon-purple/5'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </div>
                
                {/* Neon underline effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-pink transform transition-all duration-300 ${
                  isActive(item.path) 
                    ? 'scale-x-100 opacity-100' 
                    : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                }`} />
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neon-purple p-2 rounded-lg transition-colors"
            >
              <Icon name={isOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-death-black/95 backdrop-blur-sm border-b border-neon-purple/20 animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-neon-purple bg-neon-purple/10 shadow-neon-purple/20 shadow-lg'
                      : 'text-white hover:text-neon-purple hover:bg-neon-purple/5'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation