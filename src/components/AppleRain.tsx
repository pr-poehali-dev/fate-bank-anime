import { useEffect, useState } from 'react'

interface Apple {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  opacity: number
}

interface AppleRainProps {
  isActive: boolean
  onComplete: () => void
}

const AppleRain = ({ isActive, onComplete }: AppleRainProps) => {
  const [apples, setApples] = useState<Apple[]>([])

  useEffect(() => {
    if (!isActive) {
      setApples([])
      return
    }

    // Create initial apples
    const initialApples = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50 - Math.random() * 200,
      size: Math.random() * 30 + 20,
      rotation: Math.random() * 360,
      speed: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.6
    }))
    
    setApples(initialApples)

    const animationInterval = setInterval(() => {
      setApples(currentApples => {
        const updatedApples = currentApples.map(apple => ({
          ...apple,
          y: apple.y + apple.speed,
          rotation: apple.rotation + 2,
          opacity: apple.y > window.innerHeight - 100 ? apple.opacity - 0.02 : apple.opacity
        })).filter(apple => apple.y < window.innerHeight + 50 && apple.opacity > 0)

        // If no apples left, complete the animation
        if (updatedApples.length === 0) {
          clearInterval(animationInterval)
          setTimeout(onComplete, 500)
        }

        return updatedApples
      })
    }, 50)

    // Auto-complete after 5 seconds
    const autoComplete = setTimeout(() => {
      setApples([])
      onComplete()
    }, 5000)

    return () => {
      clearInterval(animationInterval)
      clearTimeout(autoComplete)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {apples.map(apple => (
        <div
          key={apple.id}
          className="absolute transition-opacity duration-300"
          style={{
            left: `${apple.x}px`,
            top: `${apple.y}px`,
            fontSize: `${apple.size}px`,
            opacity: apple.opacity,
            transform: `rotate(${apple.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px #10B981) drop-shadow(0 0 20px #10B981)',
            textShadow: '0 0 20px #10B981'
          }}
        >
          🍎
        </div>
      ))}
      
      {/* Success glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent animate-pulse"></div>
    </div>
  )
}

export default AppleRain