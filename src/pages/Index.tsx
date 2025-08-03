import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MemeCoin from '@/components/MemeCoin'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [mascotMessage, setMascotMessage] = useState('')
  const [showMascotMessage, setShowMascotMessage] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const heroMessages = [
    "💀 Добро пожаловать в Death Meme Bank!",
    "🎭 Здесь мемы становятся контрактами судьбы!",
    "⚡ Заключай сделки с мистическими силами!",
    "🪙 Собирай мем-монеты и покоряй рейтинги!",
    "✨ Всё для веселья и хорошего настроения!"
  ]

  const mascotMessages = [
    "👹 Добро пожаловать в мир мемов и магии!",
    "🎪 Здесь каждый контракт — это шутка!",
    "💰 Монеты приносят удачу и смех!",
    "🌟 Разблокируй все мои эмоции!",
    "⚔️ Сражайся за славу в монетных битвах!",
    "🏆 Поднимайся в рейтинге игроков!"
  ]

  const mainFeatures = [
    {
      id: 'contracts',
      title: 'Мем-Контракты Судьбы',
      description: 'Заключай шуточные договоры с мистическими силами',
      icon: 'FileSignature',
      link: '/create-contract',
      color: 'from-purple-600 to-indigo-700',
      emoji: '📜'
    },
    {
      id: 'magic',
      title: 'Магия Мем-Монет',
      description: 'Используй силу монет для магических ритуалов',
      icon: 'Wand2',
      link: '/coin-magic',
      color: 'from-blue-600 to-cyan-700',
      emoji: '✨'
    },
    {
      id: 'emotions',
      title: 'Ачивки Эмоций',
      description: 'Собирай уникальные анимации маскота',
      icon: 'Heart',
      link: '/emotion-achievements',
      color: 'from-pink-600 to-rose-700',
      emoji: '🎭'
    },
    {
      id: 'battle',
      title: 'Монетная Битва',
      description: 'Сражайся против мистических противников',
      icon: 'Swords',
      link: '/coin-battle',
      color: 'from-red-600 to-orange-700',
      emoji: '⚔️'
    },
    {
      id: 'leaderboard',
      title: 'Рейтинг Игроков',
      description: 'Соревнуйся с другими за первые места',
      icon: 'Trophy',
      link: '/leaderboard',
      color: 'from-yellow-600 to-amber-700',
      emoji: '🏆'
    },
    {
      id: 'rules',
      title: 'Правила Игры',
      description: 'Узнай, как стать мастером мем-контрактов',
      icon: 'BookOpen',
      link: '/rules',
      color: 'from-emerald-600 to-green-700',
      emoji: '📚'
    }
  ]

  const handleCoinClick = () => {
    const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)]
    setMascotMessage(randomMessage)
    setShowMascotMessage(true)
    setClickCount(prev => prev + 1)
    setTimeout(() => setShowMascotMessage(false), 3000)
  }

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % heroMessages.length)
    }, 4000)
    
    return () => clearInterval(phraseTimer)
  }, [])

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-8">
            <MemeCoin size="large" onClick={handleCoinClick} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Death Meme Bank
            </span>
          </h1>
          
          <div className="h-20 flex items-center justify-center mb-8">
            <p className="text-2xl md:text-3xl text-purple-300 font-medium animate-pulse">
              {heroMessages[currentPhrase]}
            </p>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Интерактивный мемный проект в стиле аниме <span className="text-purple-400 font-bold">"Тетрадь смерти"</span>.
            Заключай контракты судьбы, собирай мистические монеты, сражайся в битвах 
            и соревнуйся за место в рейтинге! Всё для веселья и креатива! 🎭
          </p>
        </div>

        {/* Mascot message */}
        {showMascotMessage && (
          <div className="mb-12 animate-slide-down">
            <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 border border-purple-400 rounded-xl px-8 py-6 backdrop-blur-sm max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-4xl animate-bounce">👹</span>
                <div className="text-center">
                  <p className="text-white font-medium text-lg">{mascotMessage}</p>
                  <p className="text-purple-300 text-sm mt-1">Клики по монете: {clickCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Link
              key={feature.id}
              to={feature.link}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`
                h-full p-8 rounded-2xl border border-purple-400/30 backdrop-blur-sm
                bg-gradient-to-br ${feature.color}/10 hover:${feature.color}/20
                transition-all duration-300 hover:scale-105 hover:border-purple-400/60
                hover:shadow-2xl hover:shadow-purple-500/25 animate-fade-in
              `}>
                <div className="text-center">
                  <div className="mb-6">
                    <div className={`
                      w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${feature.color} 
                      flex items-center justify-center group-hover:scale-110 transition-transform duration-300
                      shadow-lg group-hover:shadow-xl
                    `}>
                      <span className="text-3xl">{feature.emoji}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  <div className={`
                    inline-flex items-center space-x-2 px-6 py-3 rounded-lg
                    bg-gradient-to-r ${feature.color} text-white font-medium
                    group-hover:scale-105 transition-transform duration-300
                    shadow-lg group-hover:shadow-xl
                  `}>
                    <Icon name={feature.icon as any} size={20} />
                    <span>Перейти</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-gray-900/50 to-slate-900/50 border border-gray-400/30 rounded-2xl p-8 mb-16 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            📊 Статистика мира Death Meme Bank
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl mb-2">📜</div>
              <div className="text-3xl font-bold text-purple-400 mb-1">13,370</div>
              <div className="text-gray-300">Контрактов заключено</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">💀</div>
              <div className="text-3xl font-bold text-blue-400 mb-1">999,999</div>
              <div className="text-gray-300">Мем-монет в обороте</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">666</div>
              <div className="text-gray-300">Активных игроков</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">⚔️</div>
              <div className="text-3xl font-bold text-red-400 mb-1">42,000</div>
              <div className="text-gray-300">Битв проведено</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-400/50 rounded-2xl p-12 backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <MemeCoin size="medium" onClick={handleCoinClick} />
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Готов присоединиться к магии?
            </h2>
            
            <p className="text-xl text-purple-300 mb-8 max-w-2xl mx-auto">
              Начни с создания своего первого мем-контракта судьбы или исследуй мир мистических мем-монет!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create-contract"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                🔮 Создать контракт
              </Link>
              
              <Link
                to="/coin-magic"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                ✨ Изучить магию монет
              </Link>
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="text-center pb-16">
          <div className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 border border-gray-400/30 rounded-xl p-6 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-2xl animate-bounce">🎭</span>
              <h3 className="text-xl font-bold text-white">Важное напоминание</h3>
              <span className="text-2xl animate-bounce">😄</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              <strong>Death Meme Bank</strong> — это шуточный мемный проект, созданный для веселья и креатива. 
              Все персонажи, контракты, магия и битвы полностью вымышлены и не несут никакой юридической силы в реальном мире. 
              Наслаждайтесь игрой, смейтесь и создавайте позитивные воспоминания! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index