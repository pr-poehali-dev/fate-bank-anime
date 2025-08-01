import { useState, useEffect } from 'react'
import MemeCoin from '@/components/MemeCoin'
import Icon from '@/components/ui/icon'

const CoinBattle = () => {
  const [gameState, setGameState] = useState<'menu' | 'battle' | 'result'>('menu')
  const [playerCoins, setPlayerCoins] = useState(1337)
  const [enemyCoins, setEnemyCoins] = useState(1500)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player')
  const [playerAction, setPlayerAction] = useState<string | null>(null)
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null)

  const enemies = [
    {
      id: 'shadow-demon',
      name: 'Демон Теней',
      emoji: '👹',
      coins: 1200,
      difficulty: 'easy',
      reward: 300
    },
    {
      id: 'coin-wraith',
      name: 'Призрак Монет',
      emoji: '👻',
      coins: 1800,
      difficulty: 'medium',
      reward: 500
    },
    {
      id: 'death-lord',
      name: 'Повелитель Смерти',
      emoji: '💀',
      coins: 2500,
      difficulty: 'hard',
      reward: 800
    },
    {
      id: 'meme-master',
      name: 'Мем-Мастер',
      emoji: '🎭',
      coins: 3000,
      difficulty: 'legendary',
      reward: 1200
    }
  ]

  const [selectedEnemy, setSelectedEnemy] = useState(enemies[0])

  const battleActions = [
    {
      id: 'coin-throw',
      name: 'Бросок монеты',
      damage: [50, 100],
      cost: 0,
      description: 'Базовая атака монетой'
    },
    {
      id: 'coin-storm',
      name: 'Монетный шторм',
      damage: [80, 150],
      cost: 100,
      description: 'Мощная атака множеством монет'
    },
    {
      id: 'skull-curse',
      name: 'Проклятие черепа',
      damage: [120, 200],
      cost: 200,
      description: 'Тёмная магия мем-монеты'
    },
    {
      id: 'heal',
      name: 'Восстановление',
      damage: [-50, -100],
      cost: 150,
      description: 'Восстанавливает здоровье'
    }
  ]

  const startBattle = (enemy: any) => {
    setSelectedEnemy(enemy)
    setEnemyCoins(enemy.coins)
    setGameState('battle')
    setBattleLog([`⚔️ Битва против ${enemy.name} началась!`])
    setCurrentTurn('player')
    setGameResult(null)
  }

  const performAction = (action: any) => {
    if (currentTurn !== 'player' || playerCoins < action.cost) return

    setPlayerAction(action.id)
    setPlayerCoins(prev => prev - action.cost)

    const damage = Math.floor(Math.random() * (action.damage[1] - action.damage[0] + 1)) + action.damage[0]
    
    let logMessage = ""
    if (damage > 0) {
      setEnemyCoins(prev => Math.max(0, prev - damage))
      logMessage = `⚡ Ты использовал ${action.name} и нанёс ${damage} урона!`
    } else {
      setPlayerCoins(prev => prev - damage)
      logMessage = `💚 Ты восстановил ${-damage} здоровья!`
    }

    setBattleLog(prev => [...prev, logMessage])

    setTimeout(() => {
      if (enemyCoins - damage <= 0) {
        setGameResult('win')
        setGameState('result')
        setBattleLog(prev => [...prev, `🎉 Победа! Получено ${selectedEnemy.reward} монет!`])
        setPlayerCoins(prev => prev + selectedEnemy.reward)
      } else {
        setCurrentTurn('enemy')
        enemyTurn()
      }
      setPlayerAction(null)
    }, 1500)
  }

  const enemyTurn = () => {
    setTimeout(() => {
      const enemyDamage = Math.floor(Math.random() * 80) + 40
      setPlayerCoins(prev => {
        const newCoins = Math.max(0, prev - enemyDamage)
        if (newCoins <= 0) {
          setGameResult('lose')
          setGameState('result')
          setBattleLog(prev => [...prev, `💀 Поражение! ${selectedEnemy.name} победил!`])
        }
        return newCoins
      })
      
      setBattleLog(prev => [...prev, `👹 ${selectedEnemy.name} атакует и наносит ${enemyDamage} урона!`])
      setCurrentTurn('player')
    }, 1000)
  }

  const resetGame = () => {
    setGameState('menu')
    setPlayerCoins(1337)
    setBattleLog([])
    setGameResult(null)
  }

  if (gameState === 'result') {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <MemeCoin size="large" />
            </div>
            <h1 className={`text-4xl font-bold mb-4 ${gameResult === 'win' ? 'text-green-400' : 'text-red-400'}`}>
              {gameResult === 'win' ? '🎉 ПОБЕДА!' : '💀 ПОРАЖЕНИЕ!'}
            </h1>
            <p className="text-purple-300 text-lg">
              {gameResult === 'win' 
                ? `Ты победил ${selectedEnemy.name} и получил ${selectedEnemy.reward} мем-монет!`
                : `${selectedEnemy.name} оказался слишком сильным... Попробуй снова!`
              }
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-xl p-8 backdrop-blur-sm mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">📜 Журнал битвы</h2>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {battleLog.map((log, index) => (
                <p key={index} className="text-purple-300 text-left">{log}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Новая битва
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'battle') {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              ⚔️ Монетная Битва
            </h1>
            <p className="text-purple-300">Битва против {selectedEnemy.name}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Player */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-400/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-4">
                  <MemeCoin size="medium" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ты</h3>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Icon name="Heart" size={20} className="text-red-400" />
                  <span className="text-white font-bold">{playerCoins}</span>
                </div>
                {currentTurn === 'player' && (
                  <div className="text-green-400 font-medium">Твой ход!</div>
                )}
              </div>
            </div>

            {/* Enemy */}
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-400/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedEnemy.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedEnemy.name}</h3>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Icon name="Heart" size={20} className="text-red-400" />
                  <span className="text-white font-bold">{enemyCoins}</span>
                </div>
                {currentTurn === 'enemy' && (
                  <div className="text-red-400 font-medium">Ход противника...</div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          {currentTurn === 'player' && (
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-xl p-6 backdrop-blur-sm mb-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Выбери действие:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {battleActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => performAction(action)}
                    disabled={playerCoins < action.cost || playerAction !== null}
                    className={`
                      p-4 rounded-lg border transition-all duration-300
                      ${playerCoins >= action.cost && playerAction === null
                        ? 'border-purple-400 bg-purple-600/20 hover:bg-purple-600/30 text-white'
                        : 'border-gray-600 bg-gray-900/30 text-gray-400 cursor-not-allowed'
                      }
                      ${playerAction === action.id ? 'animate-pulse bg-yellow-600/30' : ''}
                    `}
                  >
                    <div className="text-center">
                      <h4 className="font-bold mb-2">{action.name}</h4>
                      <p className="text-xs mb-2">{action.description}</p>
                      {action.cost > 0 && (
                        <div className="flex items-center justify-center space-x-1">
                          <MemeCoin size="small" />
                          <span className="text-xs">{action.cost}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Battle log */}
          <div className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 border border-gray-400/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">📜 Журнал битвы</h3>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {battleLog.map((log, index) => (
                <p key={index} className="text-purple-300 text-sm">{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <MemeCoin size="large" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            ⚔️ Монетная Битва
          </h1>
          <p className="text-purple-300 text-lg mb-6">
            Сражайся против мистических противников за мем-монеты!
          </p>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/50 rounded-lg px-6 py-4 inline-block">
            <div className="flex items-center space-x-3">
              <MemeCoin size="small" />
              <span className="text-2xl font-bold text-white">{playerCoins}</span>
              <span className="text-purple-300">Твои монеты</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {enemies.map((enemy) => (
            <div
              key={enemy.id}
              className={`
                bg-gradient-to-br from-purple-900/30 to-red-900/30 border-2 border-purple-400/50 
                rounded-xl p-6 backdrop-blur-sm cursor-pointer transition-all duration-300
                hover:scale-105 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/25
              `}
              onClick={() => startBattle(enemy)}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{enemy.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{enemy.name}</h3>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Icon name="Heart" size={16} className="text-red-400" />
                  <span className="text-white font-medium">{enemy.coins}</span>
                </div>
                
                <div className={`
                  px-3 py-1 rounded-full text-xs font-bold mb-3
                  ${enemy.difficulty === 'easy' ? 'bg-green-600/30 text-green-300' :
                    enemy.difficulty === 'medium' ? 'bg-yellow-600/30 text-yellow-300' :
                    enemy.difficulty === 'hard' ? 'bg-red-600/30 text-red-300' :
                    'bg-purple-600/30 text-purple-300'
                  }
                `}>
                  {enemy.difficulty === 'easy' ? 'Легко' :
                   enemy.difficulty === 'medium' ? 'Средне' :
                   enemy.difficulty === 'hard' ? 'Сложно' : 'Легенда'}
                </div>
                
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Trophy" size={16} className="text-yellow-400" />
                  <span className="text-yellow-300 font-medium">+{enemy.reward}</span>
                </div>
                
                <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-red-700 transition-all duration-300">
                  Сразиться!
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 border border-gray-400/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Icon name="BookOpen" size={24} className="mr-3 text-blue-400" />
            Правила битвы
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-purple-300">
            <div>
              <h3 className="font-bold text-white mb-2">⚔️ Как сражаться:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Выбирай действия в свой ход</li>
                <li>• Некоторые действия требуют мем-монеты</li>
                <li>• Побеждай, когда у противника 0 здоровья</li>
                <li>• Проигрываешь, если твоё здоровье = 0</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">🏆 Награды:</h3>
              <ul className="space-y-1 text-sm">
                <li>• За победу получаешь мем-монеты</li>
                <li>• Сложность влияет на награду</li>
                <li>• Можно сражаться сколько угодно раз</li>
                <li>• Используй монеты для магии и улучшений</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinBattle