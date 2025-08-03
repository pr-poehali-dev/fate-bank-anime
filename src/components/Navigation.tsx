import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MemeCoin from './MemeCoin'
import Icon from '@/components/ui/icon'

const Navigation = () => {
  const location = useLocation()
  const [mascotMessage, setMascotMessage] = useState('')
  const [showMascotMessage, setShowMascotMessage] = useState(false)

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/create-contract', label: 'Создать контракт', icon: 'FileText' },
    { path: '/coin-magic', label: 'Магия монет', icon: 'Coins' },
    { path: '/emotion-achievements', label: 'Ачивки эмоций', icon: 'Award' },
    { path: '/coin-battle', label: 'Монетная битва', icon: 'Swords' },
    { path: '/leaderboard', label: 'Рейтинг', icon: 'Trophy' },
    { path: '/rules', label: 'Правила', icon: 'BookOpen' }
  ]

  const mascotMessages = [
    "💰 Блестящая монета судьбы!",
    "⚡ Сила тьмы в твоих руках!",
    "🎭 Контракт с судьбой заключён!",
    "🔥 Магия монет пробуждается!",
    "💀 Власть над destiny активирована!",
    "⚔️ Готов к битве за монеты!"
  ]

  const handleCoinClick = () => {
    const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)]
    setMascotMessage(randomMessage)
    setShowMascotMessage(true)
    setTimeout(() => setShowMascotMessage(false), 3000)
  }

  return (
    <nav className="relative z-20 bg-death-black/95 backdrop-blur-sm border-b border-purple-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Meme Coin */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <MemeCoin size="small" onClick={handleCoinClick} />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  Death Meme Bank
                </span>
                <span className="text-xs text-purple-400 opacity-70">
                  Банк Судьбы
                </span>
              </div>
            </Link>
          </div>

          {/* Mascot message */}
          {showMascotMessage && (
            <div className="absolute top-20 left-4 bg-purple-900/90 border border-purple-400 rounded-lg px-4 py-2 z-30 animate-slide-down">
              <div className="flex items-center space-x-2">
                <span className="text-2xl animate-bounce">👹</span>
                <span className="text-white font-medium">{mascotMessage}</span>
              </div>
              <div className="absolute -top-2 left-6 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-purple-400"></div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                    ink-splash relative overflow-hidden
                    ${location.pathname === item.path
                      ? 'bg-purple-600/50 text-white shadow-lg shadow-purple-500/25 border border-purple-400/50'
                      : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2 relative z-10">
                    <Icon name={item.icon as any} size={16} />
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Neon glow effect */}
                  <div className={`
                    absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20
                    ${location.pathname === item.path ? 'opacity-30' : ''}
                  `} />
                  
                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-purple-400 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-purple-400 hover:text-white p-2 rounded-md">
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
    </nav>
  )
}

export default Navigation