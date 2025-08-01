import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface ToastMessage {
  id: string
  message: string
  emoji: string
  type: 'success' | 'magic' | 'coin' | 'mascot'
}

interface MemeToastProps {
  toast: ToastMessage | null
  onDismiss: () => void
}

const MemeToast = ({ toast, onDismiss }: MemeToastProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, emoji: string }>>([])

  useEffect(() => {
    if (toast) {
      setIsVisible(true)
      
      // Create particle effect
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ['✨', '⚡', '🔮', '💫', '🌟'][Math.floor(Math.random() * 5)]
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onDismiss, 300)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [toast, onDismiss])

  if (!toast) return null

  const typeColors = {
    success: 'border-green-400 bg-green-400/20 text-green-400',
    magic: 'border-neon-purple bg-neon-purple/20 text-neon-purple',
    coin: 'border-neon-blue bg-neon-blue/20 text-neon-blue',
    mascot: 'border-neon-pink bg-neon-pink/20 text-neon-pink'
  }

  return (
    <div className="fixed top-20 right-4 z-50 pointer-events-none">
      <Card className={`
        ${typeColors[toast.type]} 
        ${isVisible ? 'animate-scale-in' : 'animate-scale-out'} 
        p-4 backdrop-blur-md relative overflow-hidden
        shadow-lg shadow-current/20
      `}>
        {/* Particle effects */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute animate-bounce pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: '2s'
            }}
          >
            {particle.emoji}
          </div>
        ))}

        {/* Main content */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="text-2xl animate-bounce">
            {toast.emoji}
          </div>
          <div className="font-medium">
            {toast.message}
          </div>
        </div>

        {/* Neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-current/10 via-current/5 to-current/10 animate-pulse"></div>
      </Card>
    </div>
  )
}

export default MemeToast