import { useState, useEffect } from 'react'
import MemeCoin from './MemeCoin'

const AnimatedFooter = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [mascotEmotion, setMascotEmotion] = useState('😈')
  const [showSparkles, setShowSparkles] = useState(false)

  const phrases = [
    "Этот сайт — шуточный мемный проект для веселья и креатива.",
    "Все персонажи и контракты вымышлены и не несут юридической силы.",
    "Играйте и улыбайтесь! Жизнь слишком коротка для серьёзности.",
    "Маскот напоминает: всё это ради смеха и хорошего настроения!",
    "Death Meme Bank работает только с валютой веселья! 💰😄"
  ]

  const mascotEmotions = ['😈', '🎭', '👹', '😄', '🤔', '😉', '🌟']

  useEffect(() => {
    // Phrase rotation
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 4000)

    // Mascot emotion changes
    const emotionTimer = setInterval(() => {
      const randomEmotion = mascotEmotions[Math.floor(Math.random() * mascotEmotions.length)]
      setMascotEmotion(randomEmotion)
    }, 3000)

    // Sparkles effect
    const sparkleTimer = setInterval(() => {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 1000)
    }, 5000)

    return () => {
      clearInterval(phraseTimer)
      clearInterval(emotionTimer)
      clearInterval(sparkleTimer)
    }
  }, [])

  const handleMascotClick = () => {
    const newEmotion = mascotEmotions[Math.floor(Math.random() * mascotEmotions.length)]
    setMascotEmotion(newEmotion)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 1000)
  }

  return (
    <footer className="relative bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border-t border-purple-400/30 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Animated Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="min-h-[4rem] flex items-center justify-center lg:justify-start">
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl animate-fade-in">
                {phrases[currentPhrase]}
              </p>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="flex items-center space-x-8">
            {/* Meme Coin */}
            <div className="relative">
              <MemeCoin size="medium" />
              {showSparkles && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + (i % 3) * 30}%`,
                        animationDelay: `${i * 200}ms`,
                        animationDuration: '1.5s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Animated Mascot */}
            <button
              onClick={handleMascotClick}
              className="group relative"
              title="Кликни на маскота!"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110 border-2 border-purple-400/50">
                <span className="text-4xl animate-bounce group-hover:animate-ping">
                  {mascotEmotion}
                </span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Floating effects */}
              {showSparkles && (
                <div className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-bounce">
                  ✨
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent relative">
          <div className="absolute left-0 w-full h-px bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse opacity-60" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2024 Death Meme Bank</span>
            <span>•</span>
            <span>Сделано с 💜 и мемами</span>
            <span>•</span>
            <span>Powered by React & Магия</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Маскот онлайн</span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-red-400 animate-pulse">💀</span>
              <span>100% мемов</span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-purple-400 animate-bounce">🎭</span>
              <span>Веселье гарантировано</span>
            </div>
          </div>
        </div>

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-30"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 500}ms`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        {/* Extra magical effects */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="text-2xl animate-spin-slow">⚡</div>
        </div>
        
        <div className="absolute bottom-4 left-4 opacity-20">
          <div className="text-2xl animate-bounce">🌟</div>
        </div>
      </div>

      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-50">
        <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
      </div>
    </footer>
  )
}

export default AnimatedFooter