import { useState, useEffect } from 'react'
import Icon from '@/components/ui/icon'

const AnimatedFooter = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [coinRotation, setCoinRotation] = useState(0)
  const [mascotBlink, setMascotBlink] = useState(false)

  const phrases = [
    "Этот сайт — шуточный мемный проект для веселья и креатива.",
    "Все персонажи и контракты вымышлены, не имеют юридической силы.",
    "Играйте и улыбайтесь! Жизнь слишком коротка для серьёзности.",
    "Маскот напоминает: всё это ради смеха и хорошего настроения!",
    "Банк Судьбы работает только с валютой веселья! 💰😄"
  ]

  useEffect(() => {
    // Phrase rotation
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 4000)

    // Coin rotation
    const coinTimer = setInterval(() => {
      setCoinRotation(prev => prev + 360)
    }, 3000)

    // Mascot blinking
    const blinkTimer = setInterval(() => {
      setMascotBlink(true)
      setTimeout(() => setMascotBlink(false), 200)
    }, 2000)

    return () => {
      clearInterval(phraseTimer)
      clearInterval(coinTimer)
      clearInterval(blinkTimer)
    }
  }, [])

  const handleCoinClick = () => {
    setCoinRotation(prev => prev + 720) // Double spin on click
  }

  const handleMascotClick = () => {
    setMascotBlink(true)
    setTimeout(() => setMascotBlink(false), 400)
  }

  return (
    <footer className="relative bg-death-black/80 backdrop-blur-sm border-t border-neon-purple/20 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Animated Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="min-h-[3rem] flex items-center justify-center lg:justify-start">
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl animate-fade-in">
                {phrases[currentPhrase]}
              </p>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="flex items-center space-x-8">
            {/* Animated Coin */}
            <button
              onClick={handleCoinClick}
              className="group relative"
              title="Кликни на монету!"
            >
              <div 
                className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                style={{ transform: `rotate(${coinRotation}deg)` }}
              >
                <Icon name="Coins" size={32} className="text-white" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Floating sparkles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-75" />
            </button>

            {/* Animated Mascot */}
            <button
              onClick={handleMascotClick}
              className="group relative"
              title="Подмигни маскоту!"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 group-hover:scale-110">
                {mascotBlink ? (
                  <Icon name="Smile" size={32} className="text-white" />
                ) : (
                  <Icon name="Eye" size={32} className="text-white" />
                )}
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-neon-purple/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Wink indicator */}
              {mascotBlink && (
                <div className="absolute -top-1 -right-1 text-yellow-300 animate-bounce">
                  <Icon name="Sparkles" size={16} />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2024 Банк Судьбы</span>
            <span>•</span>
            <span>Сделано с 💜 и мемами</span>
            <span>•</span>
            <span>Powered by React & Смех</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Маскот онлайн</span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs">
              <Icon name="Heart" size={12} className="text-red-400 animate-pulse" />
              <span>100% мемов</span>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-neon-purple rounded-full animate-float opacity-60" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-neon-pink rounded-full animate-float opacity-40 animation-delay-1000ms" />
          <div className="absolute bottom-1/2 left-3/4 w-1 h-1 bg-neon-blue rounded-full animate-float opacity-50 animation-delay-2000ms" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue opacity-50" />
    </footer>
  )
}

export default AnimatedFooter