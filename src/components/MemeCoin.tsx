import { useState, useEffect } from 'react'

interface MemeCoineProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

const MemeCoin = ({ className = '', size = 'medium', onClick }: MemeCoineProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [runicSymbols, setRunicSymbols] = useState<Array<{ id: number; symbol: string; x: number; y: number; rotation: number }>>([])

  const runic = ['⚡', '☠', '†', '◊', '★', '⚔', '🔥', '💀', '⚖️', '🌟']
  
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  }

  useEffect(() => {
    if (isHovered || isClicked) {
      const symbols = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        symbol: runic[Math.floor(Math.random() * runic.length)],
        x: Math.cos((i * 45) * Math.PI / 180) * 60,
        y: Math.sin((i * 45) * Math.PI / 180) * 60,
        rotation: Math.random() * 360
      }))
      setRunicSymbols(symbols)
    } else {
      setRunicSymbols([])
    }
  }, [isHovered, isClicked])

  const handleClick = () => {
    setIsClicked(true)
    onClick?.()
    setTimeout(() => setIsClicked(false), 1000)
  }

  const coinSize = size === 'small' ? 48 : size === 'medium' ? 80 : 128

  return (
    <div 
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: coinSize + 120, height: coinSize + 120 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Runic symbols */}
      {runicSymbols.map((rune) => (
        <div
          key={rune.id}
          className={`absolute text-purple-400 transition-all duration-500 ${
            isClicked ? 'animate-ping text-white' : 'animate-pulse'
          }`}
          style={{
            left: `calc(50% + ${rune.x}px)`,
            top: `calc(50% + ${rune.y}px)`,
            transform: `translate(-50%, -50%) rotate(${rune.rotation}deg)`,
            fontSize: size === 'small' ? '16px' : size === 'medium' ? '20px' : '28px'
          }}
        >
          {rune.symbol}
        </div>
      ))}
      
      {/* Main coin */}
      <div className="relative">
        {/* Glow effects */}
        {(isHovered || isClicked) && (
          <>
            <div className={`absolute inset-0 rounded-full bg-purple-500 animate-pulse opacity-30 ${sizeClasses[size]}`} 
                 style={{ filter: 'blur(20px)', transform: 'scale(1.5)' }} />
            <div className={`absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20 ${sizeClasses[size]}`} 
                 style={{ filter: 'blur(15px)', transform: 'scale(1.3)' }} />
          </>
        )}
        
        {/* Click explosion effect */}
        {isClicked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white opacity-60 animate-ping" />
            <div className="absolute w-full h-full rounded-full bg-purple-400 opacity-40 animate-pulse" />
          </div>
        )}
        
        {/* Coin body */}
        <div className={`
          relative ${sizeClasses[size]} rounded-full
          bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900
          border-4 border-purple-400
          shadow-2xl shadow-purple-500/50
          transform transition-all duration-300
          ${isHovered ? 'scale-110 rotate-12' : 'rotate-0'}
          ${isClicked ? 'scale-125 rotate-180' : ''}
          animate-spin-slow
        `}>
          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-900/30 to-blue-900/30" />
          
          {/* Skull design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Skull emoji with effects */}
              <span 
                className={`
                  block text-center leading-none
                  ${size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-4xl' : 'text-6xl'}
                  ${isClicked ? 'animate-bounce text-white' : 'text-purple-300'}
                  transition-all duration-300
                  filter drop-shadow-lg
                `}
                style={{ 
                  textShadow: isHovered || isClicked ? '0 0 20px #8B5CF6, 0 0 40px #A855F7' : '0 0 10px #8B5CF6',
                  transform: isClicked ? 'scale(1.2)' : 'scale(1)'
                }}
              >
                💀
              </span>
              
              {/* Gothic patterns */}
              <div className={`absolute inset-0 ${isHovered ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}>
                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 text-purple-400 text-xs">⚜</div>
                <div className="absolute -top-1 -right-1 text-purple-400 text-xs">⚜</div>
                <div className="absolute -bottom-1 -left-1 text-purple-400 text-xs">⚜</div>
                <div className="absolute -bottom-1 -right-1 text-purple-400 text-xs">⚜</div>
              </div>
            </div>
          </div>
          
          {/* Rim details */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-300/20" />
          <div className="absolute inset-2 rounded-full border border-purple-400/30" />
        </div>
        
        {/* Floating particles */}
        {(isHovered || isClicked) && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MemeCoin