import { useEffect, useState } from 'react'

interface MascotAppearance {
  id: string
  x: number
  y: number
  message: string
  emoji: string
  isVisible: boolean
}

interface RandomMascotProps {
  trigger: boolean
  onComplete: () => void
}

const RandomMascot = ({ trigger, onComplete }: RandomMascotProps) => {
  const [mascot, setMascot] = useState<MascotAppearance | null>(null)

  const mascotMessages = [
    { message: "Не забывай - это всё шутка! 😄", emoji: "🎭" },
    { message: "Мемы правят миром! 🌍", emoji: "👑" },
    { message: "Судьба любит веселье! ✨", emoji: "🎪" },
    { message: "Яблоки знаний падают! 🍎", emoji: "📚" },
    { message: "Контракты на смех работают! 😂", emoji: "📜" },
    { message: "Неон - это новая магия! ⚡", emoji: "🔮" },
    { message: "Банк принимает улыбки! 😊", emoji: "🏦" },
    { message: "Криптовалюта веселья! 💰", emoji: "🎉" }
  ]

  useEffect(() => {
    if (!trigger) return

    const corners = [
      { x: 50, y: 50 }, // Top left
      { x: window.innerWidth - 200, y: 50 }, // Top right
      { x: 50, y: window.innerHeight - 200 }, // Bottom left
      { x: window.innerWidth - 200, y: window.innerHeight - 200 }, // Bottom right
      { x: window.innerWidth / 2 - 100, y: 100 }, // Top center
    ]

    const randomCorner = corners[Math.floor(Math.random() * corners.length)]
    const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)]

    const newMascot: MascotAppearance = {
      id: Date.now().toString(),
      x: randomCorner.x,
      y: randomCorner.y,
      message: randomMessage.message,
      emoji: randomMessage.emoji,
      isVisible: true
    }

    setMascot(newMascot)

    // Hide after 3 seconds
    const hideTimer = setTimeout(() => {
      setMascot(prev => prev ? { ...prev, isVisible: false } : null)
      setTimeout(() => {
        setMascot(null)
        onComplete()
      }, 500)
    }, 3000)

    return () => clearTimeout(hideTimer)
  }, [trigger, onComplete])

  if (!mascot) return null

  return (
    <div 
      className={`fixed z-50 pointer-events-none transition-all duration-500 ${
        mascot.isVisible ? 'animate-scale-in opacity-100' : 'animate-scale-out opacity-0'
      }`}
      style={{
        left: `${mascot.x}px`,
        top: `${mascot.y}px`,
      }}
    >
      {/* Mascot bubble */}
      <div className="relative">
        {/* Speech bubble */}
        <div className="bg-neon-purple/90 text-white px-4 py-2 rounded-lg backdrop-blur border border-neon-purple/50 relative mb-2 animate-bounce">
          <div className="flex items-center gap-2">
            <span className="text-lg">{mascot.emoji}</span>
            <span className="text-sm font-medium whitespace-nowrap">{mascot.message}</span>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neon-purple/90"></div>
          </div>
        </div>

        {/* Mini mascot icon */}
        <div className="w-16 h-16 mx-auto">
          <img 
            src="/img/bb2cf523-ae57-4a84-8fbd-7584e096e610.jpg"
            alt="Mini Mascot"
            className="w-full h-full object-cover rounded-full neon-glow animate-bounce border-2 border-neon-purple/50"
            style={{ animationDelay: '0.2s' }}
          />
        </div>

        {/* Magical particles around mascot */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            >
              <div className="w-2 h-2 bg-neon-purple rounded-full opacity-60"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RandomMascot