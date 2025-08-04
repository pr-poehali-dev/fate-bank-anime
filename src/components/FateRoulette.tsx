import { useState, useEffect } from 'react'
import Icon from '@/components/ui/icon'

interface FateRouletteProps {
  isOpen: boolean
  onClose: () => void
}

interface RouletteSegment {
  id: string
  icon: string
  text: string
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const FateRoulette = ({ isOpen, onClose }: FateRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<RouletteSegment | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showCharacters, setShowCharacters] = useState(false)
  const [timeUntilReset, setTimeUntilReset] = useState(0)

  const segments: RouletteSegment[] = [
    { id: '1', icon: '💀', text: 'Мем-Череп Обычный', color: 'from-gray-600 to-black', rarity: 'common' },
    { id: '2', icon: '📜', text: 'Мем-Череп Магический', color: 'from-amber-600 to-yellow-800', rarity: 'rare' },
    { id: '3', icon: '🖤', text: 'Мем-Череп Тёмный', color: 'from-red-900 to-black', rarity: 'common' },
    { id: '4', icon: '👁️', text: 'Мем-Череп Провидца', color: 'from-purple-600 to-indigo-900', rarity: 'epic' },
    { id: '5', icon: '⚡', text: 'Мем-Череп Молнии', color: 'from-yellow-500 to-orange-700', rarity: 'legendary' },
    { id: '6', icon: '🕯️', text: 'Мем-Череп Мудрости', color: 'from-blue-600 to-indigo-900', rarity: 'rare' },
    { id: '7', icon: '🗝️', text: 'Мем-Череп Ключа', color: 'from-gray-500 to-gray-800', rarity: 'common' },
    { id: '8', icon: '💎', text: 'Мем-Череп Алмазный', color: 'from-cyan-500 to-blue-800', rarity: 'legendary' }
  ]

  const ryukPhrases = [
    "Хе-хе... Отличная мем-монета-череп! 👹",
    "ФиФи Банк одобряет твой выбор... 😈",
    "Хм, эта монета редкая! 🤔",
    "Мем-черепа лучше яблок! 🍎",
    "Твоя коллекция пополняется... 🎭"
  ]

  const lPhrases = [
    "Вероятность получить эту монету была 23.6%... 🤓",
    "Мем-экономика ФиФи Банка работает прекрасно. 📊",
    "Логично... Редкость определяет ценность. 🧠",
    "Интересный результат рулетки... 📈",
    "Коллекционирование - это искусство. ⚖️"
  ]

  const handleSpin = () => {
    if (isSpinning || timeUntilReset > 0) return

    setIsSpinning(true)
    setResult(null)
    setShowResult(false)
    setShowCharacters(false)

    // Calculate random result
    const randomIndex = Math.floor(Math.random() * segments.length)
    const finalRotation = rotation + 1440 + (360 / segments.length) * randomIndex // 4 full spins + final position
    
    setRotation(finalRotation)

    // Show result after animation
    setTimeout(() => {
      const selectedSegment = segments[randomIndex]
      setResult(selectedSegment)
      setIsSpinning(false)
      setShowResult(true)
      setShowCharacters(true)
      
      // Start 24h cooldown (demo: 30 seconds)
      setTimeUntilReset(30)
    }, 3000)
  }

  // Countdown timer
  useEffect(() => {
    if (timeUntilReset > 0) {
      const timer = setTimeout(() => {
        setTimeUntilReset(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeUntilReset])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400'
      case 'rare': return 'text-blue-400'
      case 'epic': return 'text-purple-400'
      case 'legendary': return 'text-yellow-400'
      default: return 'text-white'
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-500/25'
      case 'rare': return 'shadow-blue-500/25'
      case 'epic': return 'shadow-purple-500/25'
      case 'legendary': return 'shadow-yellow-500/25'
      default: return 'shadow-white/25'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Dark paper texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto animate-scale-in">
        <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl border border-red-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
          
          {/* Header */}
          <div className="relative p-6 border-b border-red-500/20">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors z-10"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold text-red-400 mb-2">
                Рулетка Мем-Черепов
              </h2>
              <p className="text-gray-400">
                Крути рулетку и получай редкие мем-монеты-черепа...
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Roulette Wheel */}
            <div className="relative w-80 h-80 mx-auto mb-8">
              {/* Outer ring decoration */}
              <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-red-600 via-purple-600 to-red-600 animate-pulse" />
              <div className="absolute inset-2 rounded-full border-2 border-gray-600" />
              
              {/* Wheel segments */}
              <div 
                className="absolute inset-4 rounded-full overflow-hidden transition-transform duration-3000 ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {segments.map((segment, index) => (
                  <div
                    key={segment.id}
                    className={`absolute w-full h-full bg-gradient-to-r ${segment.color} border border-gray-700/50`}
                    style={{
                      transform: `rotate(${index * 45}deg)`,
                      clipPath: 'polygon(50% 50%, 50% 0%, 73.5% 26.8%)'
                    }}
                  >
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-2xl mb-1">{segment.icon}</div>
                      <div className="text-xs text-white font-bold whitespace-nowrap transform -rotate-22.5">
                        {segment.text.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Center hub */}
              <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-red-500/50 flex items-center justify-center">
                <Icon name="Target" size={32} className="text-red-400" />
              </div>
              
              {/* Pointer */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500" />
              </div>
              
              {/* Spinning effect overlay */}
              {isSpinning && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-spin-fast" />
              )}
            </div>

            {/* Spin Button */}
            <div className="text-center mb-6">
              <button
                onClick={handleSpin}
                disabled={isSpinning || timeUntilReset > 0}
                className={`relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  timeUntilReset > 0
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : isSpinning
                    ? 'bg-gray-600 text-gray-300 cursor-wait'
                    : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 hover:scale-105 active:scale-95'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isSpinning ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                      <span>Судьба решает...</span>
                    </>
                  ) : timeUntilReset > 0 ? (
                    <>
                      <Icon name="Clock" size={20} />
                      <span>Перезарядка: {timeUntilReset}с</span>
                    </>
                  ) : (
                    <>
                      <Icon name="RotateCcw" size={20} />
                      <span>Крутить рулетку мем-черепов</span>
                    </>
                  )}
                </div>
                
                {/* Magical particles */}
                {!isSpinning && timeUntilReset === 0 && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75" />
                )}
              </button>
            </div>

            {/* Result Display */}
            {showResult && result && (
              <div className="animate-fade-in-up">
                <div className={`bg-gradient-to-br ${result.color} rounded-2xl p-6 border-2 border-red-500/30 ${getRarityGlow(result.rarity)} shadow-2xl mb-6`}>
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">{result.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{result.text}</h3>
                    <p className={`text-sm font-medium ${getRarityColor(result.rarity)}`}>
                      {result.rarity.toUpperCase()}
                    </p>
                  </div>
                </div>
                
                {/* Characters reactions */}
                {showCharacters && (
                  <div className="grid md:grid-cols-2 gap-4 animate-slide-up">
                    {/* Ryuk */}
                    <div className="bg-gradient-to-br from-purple-900/50 to-black/50 rounded-xl p-4 border border-purple-500/30">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl animate-bounce">👹</div>
                        <div>
                          <h4 className="text-purple-400 font-bold mb-1">Рюк</h4>
                          <p className="text-sm text-gray-300 italic">
                            {ryukPhrases[Math.floor(Math.random() * ryukPhrases.length)]}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* L */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-black/50 rounded-xl p-4 border border-blue-500/30">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl animate-pulse">🕵️</div>
                        <div>
                          <h4 className="text-blue-400 font-bold mb-1">L</h4>
                          <p className="text-sm text-gray-300 italic">
                            {lPhrases[Math.floor(Math.random() * lPhrases.length)]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Cooldown Timer */}
            {timeUntilReset > 0 && (
              <div className="text-center mt-4">
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-600/50">
                  <p className="text-gray-400 text-sm">
                    ⏰ Следующий поворот судьбы через: <span className="text-red-400 font-bold">{timeUntilReset}с</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((30 - timeUntilReset) / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-6 pb-4 border-t border-red-500/20">
            <p className="text-xs text-gray-500 text-center italic">
              "Каждая мем-монета-череп имеет свою силу и ценность" - ФиФи Банк
            </p>
          </div>
        </div>
        
        {/* Floating mystical particles */}
        <div className="absolute -top-8 -left-8 w-16 h-16 opacity-30 pointer-events-none">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-float" />
        </div>
        <div className="absolute -bottom-8 -right-8 w-12 h-12 opacity-20 pointer-events-none">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-float animation-delay-1000ms" />
        </div>
        <div className="absolute top-1/2 -right-12 w-8 h-8 opacity-25 pointer-events-none">
          <div className="w-1 h-1 bg-red-400 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  )
}

export default FateRoulette