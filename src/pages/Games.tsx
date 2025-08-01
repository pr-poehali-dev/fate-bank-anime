import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Icon from '@/components/ui/icon'
import InteractiveBackground from '@/components/InteractiveBackground'
import { useSoundEffects } from '@/components/SoundEffects'

const Games = () => {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sounds = useSoundEffects()

  const games = [
    {
      id: 'prophecy',
      title: 'Угадай пророчество!',
      description: 'Разгадай загадки мистического маскота и получи древние знания',
      icon: 'Crystal',
      path: '/games/prophecy',
      difficulty: 'Легко',
      players: '1 игрок',
      time: '5-10 мин',
      color: 'from-neon-purple to-purple-600',
      features: ['Загадки', 'Подсказки маскота', 'Мудрые шутки']
    },
    {
      id: 'apple-battle',
      title: 'Яблочный баттл',
      description: 'Собирай светящиеся символы на время в динамичной аркадной игре',
      icon: 'Apple',
      path: '/games/apple-battle',
      difficulty: 'Средне',
      players: '1 игрок',
      time: '3-7 мин',
      color: 'from-neon-pink to-pink-600',
      features: ['Таймер', 'Бонусы', 'Комбо-очки']
    },
    {
      id: 'dark-deals',
      title: 'Тёмные сделки',
      description: 'Стратегическая мем-игра с выбором ходов и неожиданными поворотами',
      icon: 'Scroll',
      path: '/games/dark-deals',
      difficulty: 'Сложно',
      players: '1 игрок',
      time: '10-15 мин',
      color: 'from-neon-blue to-blue-600',
      features: ['Стратегия', 'Выборы', 'Мемные задачки']
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards(prev => {
        if (prev.length < games.length) {
          return [...prev, prev.length]
        }
        return prev
      })
    }, 300)

    return () => clearInterval(timer)
  }, [])

  const handleGameClick = (gameId: string) => {
    sounds.success()
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <InteractiveBackground />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
            Мини-игры Банка Судьбы
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Три уникальные игры ждут тебя! Выбери своё приключение в мистическом мире 
            контрактов, пророчеств и мемной магии.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-neon-purple/10 border border-neon-purple/30 rounded-full px-4 py-2">
              <Icon name="Trophy" size={16} className="text-neon-purple" />
              <span className="text-white">Очки сохраняются</span>
            </div>
            <div className="flex items-center space-x-2 bg-neon-pink/10 border border-neon-pink/30 rounded-full px-4 py-2">
              <Icon name="Users" size={16} className="text-neon-pink" />
              <span className="text-white">Для всех возрастов</span>
            </div>
            <div className="flex items-center space-x-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full px-4 py-2">
              <Icon name="Zap" size={16} className="text-neon-blue" />
              <span className="text-white">Быстрый старт</span>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`transform transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <Link
                to={game.path}
                onClick={() => handleGameClick(game.id)}
                className="block group"
                onMouseEnter={() => setHoveredGame(index)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                <div className="relative bg-death-gray/20 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full hover:border-neon-purple/50 transition-all duration-300 overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Game Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={game.icon as any} size={32} className="text-white" />
                  </div>

                  {/* Game Info */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-purple transition-colors">
                    {game.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Game Stats */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                      {game.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                      {game.players}
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                      {game.time}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {game.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Play Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-neon-purple font-medium group-hover:text-neon-pink transition-colors">
                      Играть сейчас
                    </span>
                    <Icon 
                      name="ArrowRight" 
                      size={20} 
                      className={`text-neon-purple group-hover:text-neon-pink transition-all duration-300 ${
                        hoveredGame === index ? 'translate-x-1' : ''
                      }`} 
                    />
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-purple/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-neon-purple/30 rounded-2xl px-8 py-6">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-xl flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-1">
                Готов к приключениям?
              </h3>
              <p className="text-gray-300">
                Выбери игру и погрузись в мир мемной магии!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Games