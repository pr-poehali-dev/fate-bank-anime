import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/icon'
import InteractiveBackground from '@/components/InteractiveBackground'
import AppleRain from '@/components/AppleRain'
import { useSoundEffects } from '@/components/SoundEffects'

interface GameItem {
  id: string
  x: number
  y: number
  type: 'apple' | 'contract' | 'rune' | 'bonus'
  points: number
  icon: string
  collected: boolean
}

const AppleBattle = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'finished'>('menu')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [combo, setCombo] = useState(0)
  const [items, setItems] = useState<GameItem[]>([])
  const [level, setLevel] = useState(1)
  const [showAppleRain, setShowAppleRain] = useState(false)
  const sounds = useSoundEffects()

  const itemTypes = [
    { type: 'apple', icon: 'Apple', points: 10, weight: 40 },
    { type: 'contract', icon: 'FileText', points: 25, weight: 25 },
    { type: 'rune', icon: 'Zap', points: 50, weight: 20 },
    { type: 'bonus', icon: 'Star', points: 100, weight: 15 }
  ]

  const spawnItem = useCallback(() => {
    const totalWeight = itemTypes.reduce((sum, item) => sum + item.weight, 0)
    let random = Math.random() * totalWeight
    
    let selectedType = itemTypes[0]
    for (const itemType of itemTypes) {
      if (random < itemType.weight) {
        selectedType = itemType
        break
      }
      random -= itemType.weight
    }

    const newItem: GameItem = {
      id: Date.now().toString() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: Math.random() * 70 + 15, // 15% to 85% of screen height
      type: selectedType.type as any,
      points: selectedType.points,
      icon: selectedType.icon,
      collected: false
    }

    setItems(prev => [...prev, newItem])
  }, [])

  const collectItem = (itemId: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, collected: true } : item
      )
    )

    const item = items.find(i => i.id === itemId)
    if (item) {
      const comboBonus = Math.floor(combo / 5) * 5
      const totalPoints = item.points + comboBonus
      
      setScore(prev => prev + totalPoints)
      setCombo(prev => prev + 1)
      
      if (item.type === 'bonus') {
        sounds.magic()
        setShowAppleRain(true)
      } else {
        sounds.coin()
      }

      // Remove collected item after animation
      setTimeout(() => {
        setItems(prev => prev.filter(i => i.id !== itemId))
      }, 300)
    }
  }

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(60)
    setCombo(0)
    setItems([])
    setLevel(1)
  }

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused')
  }

  const endGame = () => {
    setGameState('finished')
    sounds.success()
  }

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameState, timeLeft])

  // Item spawning
  useEffect(() => {
    if (gameState === 'playing') {
      const spawnRate = Math.max(800 - (level - 1) * 100, 300) // Faster spawning with levels
      const spawner = setInterval(() => {
        if (items.length < 8 + level) { // More items with higher levels
          spawnItem()
        }
      }, spawnRate)
      return () => clearInterval(spawner)
    }
  }, [gameState, items.length, level, spawnItem])

  // Level progression
  useEffect(() => {
    const newLevel = Math.floor(score / 500) + 1
    if (newLevel > level) {
      setLevel(newLevel)
      sounds.success()
    }
  }, [score, level, sounds])

  // Combo reset
  useEffect(() => {
    if (combo > 0) {
      const comboTimer = setTimeout(() => {
        setCombo(0)
      }, 3000)
      return () => clearTimeout(comboTimer)
    }
  }, [combo])

  const getScoreRank = () => {
    if (score >= 2000) return { rank: '🏆 Мастер яблок', color: 'text-yellow-400' }
    if (score >= 1500) return { rank: '🌟 Эксперт сбора', color: 'text-purple-400' }
    if (score >= 1000) return { rank: '✨ Продвинутый', color: 'text-blue-400' }
    if (score >= 500) return { rank: '🍎 Новичок', color: 'text-green-400' }
    return { rank: '😊 Попробуй ещё', color: 'text-gray-400' }
  }

  if (gameState === 'finished') {
    const scoreRank = getScoreRank()
    return (
      <div className="min-h-screen pt-20 pb-16 px-4">
        <InteractiveBackground />
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-purple/30 rounded-2xl p-12">
            <div className="w-24 h-24 bg-gradient-to-br from-neon-pink to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon name="Apple" size={48} className="text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Баттл завершён!
            </h1>
            
            <p className="text-2xl text-neon-pink mb-6">
              Финальный счёт: {score}
            </p>
            
            <p className={`text-xl mb-8 ${scoreRank.color}`}>
              {scoreRank.rank}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="text-gray-400">Максимальное комбо</div>
                <div className="text-2xl font-bold text-white">{combo}</div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="text-gray-400">Достигнутый уровень</div>
                <div className="text-2xl font-bold text-white">{level}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-neon-pink to-pink-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
              >
                Играть снова
              </button>
              <Link
                to="/games"
                className="px-8 py-3 border border-neon-pink/50 rounded-lg font-semibold text-white hover:bg-neon-pink/10 transition-colors"
              >
                Другие игры
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4">
        <InteractiveBackground />
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Link 
              to="/games" 
              className="inline-flex items-center space-x-2 text-neon-pink hover:text-pink-400 transition-colors mb-6"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Назад к играм</span>
            </Link>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Яблочный баттл
            </h1>
            <p className="text-xl text-gray-300">
              Собери как можно больше светящихся предметов за 60 секунд!
            </p>
          </div>

          <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-pink/30 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Как играть</h2>
            
            <div className="grid gap-4 mb-8">
              {itemTypes.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    item.type === 'apple' ? 'from-green-500 to-red-500' :
                    item.type === 'contract' ? 'from-blue-500 to-purple-500' :
                    item.type === 'rune' ? 'from-purple-500 to-pink-500' :
                    'from-yellow-400 to-orange-500'
                  } rounded-lg flex items-center justify-center`}>
                    <Icon name={item.icon as any} size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {item.type === 'apple' ? 'Яблоки' :
                       item.type === 'contract' ? 'Контракты' :
                       item.type === 'rune' ? 'Руны' : 'Бонусы'}
                    </div>
                    <div className="text-gray-400 text-sm">{item.points} очков</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">💡 Особенности:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Комбо увеличивает очки за каждый 5-й подряд собранный предмет</li>
                <li>• Уровень повышается каждые 500 очков</li>
                <li>• Бонусные звёзды запускают яблочный дождь!</li>
                <li>• Время ограничено — действуй быстро!</li>
              </ul>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-neon-pink to-pink-600 rounded-lg font-bold text-white text-xl hover:scale-105 transition-transform"
            >
              Начать баттл! 🍎
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 select-none">
      <InteractiveBackground />
      
      {/* Game HUD */}
      <div className="fixed top-20 left-0 right-0 z-40 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between bg-death-black/80 backdrop-blur-sm border border-neon-pink/30 rounded-lg px-6 py-3">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-gray-400">Очки</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-pink">{timeLeft}</div>
              <div className="text-xs text-gray-400">Секунд</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple">{level}</div>
              <div className="text-xs text-gray-400">Уровень</div>
            </div>
            {combo > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">x{combo}</div>
                <div className="text-xs text-gray-400">Комбо</div>
              </div>
            )}
          </div>
          
          <button
            onClick={pauseGame}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            {gameState === 'paused' ? 'Продолжить' : 'Пауза'}
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative max-w-4xl mx-auto h-[calc(100vh-200px)] mt-8 border border-neon-pink/30 rounded-2xl overflow-hidden">
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-death-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <Icon name="Pause" size={64} className="text-white mb-4 mx-auto" />
              <h2 className="text-3xl font-bold text-white mb-2">Игра на паузе</h2>
              <button
                onClick={pauseGame}
                className="px-6 py-3 bg-gradient-to-r from-neon-pink to-pink-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
              >
                Продолжить
              </button>
            </div>
          </div>
        )}

        {/* Game Items */}
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.collected && collectItem(item.id)}
            className={`absolute w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
              item.collected 
                ? 'scale-150 opacity-0' 
                : 'hover:scale-110 animate-pulse'
            } ${
              item.type === 'apple' ? 'bg-gradient-to-br from-green-500 to-red-500' :
              item.type === 'contract' ? 'bg-gradient-to-br from-blue-500 to-purple-500' :
              item.type === 'rune' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
              'bg-gradient-to-br from-yellow-400 to-orange-500'
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%)`
            }}
          >
            <Icon name={item.icon as any} size={24} className="text-white" />
          </button>
        ))}

        {/* Floating score indicators */}
        {combo > 4 && (
          <div className="absolute top-4 right-4 bg-yellow-400/20 border border-yellow-400/30 rounded-lg px-4 py-2">
            <div className="text-yellow-400 font-bold">Комбо активно! +{Math.floor(combo / 5) * 5} очков</div>
          </div>
        )}
      </div>

      <AppleRain 
        isActive={showAppleRain}
        onComplete={() => setShowAppleRain(false)}
      />
    </div>
  )
}

export default AppleBattle