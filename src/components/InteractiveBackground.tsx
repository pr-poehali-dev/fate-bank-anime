import { useEffect, useRef, useState } from 'react'

interface FloatingRune {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  symbol: string
  color: string
  rotation: number
  rotationSpeed: number
}

const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [runes, setRunes] = useState<FloatingRune[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const runeSymbols = ['⚡', '🔮', '📜', '💀', '🍎', '✨', '⭐', '🌟', '💫', '🔯', '⚔️', '🗡️', '🛡️', '👁️', '🎭']
  const colors = ['#8B5CF6', '#3B52F6', '#D946EF', '#EF4444', '#10B981', '#F59E0B']

  useEffect(() => {
    const createRune = (id: number): FloatingRune => ({
      id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 15,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      symbol: runeSymbols[Math.floor(Math.random() * runeSymbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2
    })

    // Create initial runes
    const initialRunes = Array.from({ length: 15 }, (_, i) => createRune(i))
    setRunes(initialRunes)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Animation loop
    const animateRunes = () => {
      setRunes(currentRunes => 
        currentRunes.map(rune => {
          const distanceToMouse = Math.sqrt(
            Math.pow(rune.x - mousePosition.x, 2) + Math.pow(rune.y - mousePosition.y, 2)
          )
          
          let newX = rune.x
          let newY = rune.y - rune.speed
          let newOpacity = rune.opacity
          
          // Mouse interaction - runes scatter away from cursor
          if (distanceToMouse < 100) {
            const angle = Math.atan2(rune.y - mousePosition.y, rune.x - mousePosition.x)
            const pushForce = (100 - distanceToMouse) / 100 * 2
            newX += Math.cos(angle) * pushForce
            newY += Math.sin(angle) * pushForce
            newOpacity = Math.min(0.8, rune.opacity + 0.3)
          }
          
          // Reset rune if it goes off screen
          if (newY < -50) {
            newY = window.innerHeight + 50
            newX = Math.random() * window.innerWidth
          }
          
          if (newX < -50) newX = window.innerWidth + 50
          if (newX > window.innerWidth + 50) newX = -50
          
          return {
            ...rune,
            x: newX,
            y: newY,
            opacity: Math.max(0.1, newOpacity - 0.002),
            rotation: rune.rotation + rune.rotationSpeed
          }
        })
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animationInterval = setInterval(animateRunes, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(animationInterval)
    }
  }, [mousePosition.x, mousePosition.y])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {runes.map(rune => (
        <div
          key={rune.id}
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: `${rune.x}px`,
            top: `${rune.y}px`,
            fontSize: `${rune.size}px`,
            opacity: rune.opacity,
            color: rune.color,
            transform: `rotate(${rune.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px currentColor)',
            textShadow: '0 0 20px currentColor'
          }}
        >
          {rune.symbol}
        </div>
      ))}
      
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none animate-pulse"></div>
    </div>
  )
}

export default InteractiveBackground