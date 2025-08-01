import { useState } from 'react'
import MemeCoin from '@/components/MemeCoin'
import Icon from '@/components/ui/icon'

const CoinMagic = () => {
  const [userCoins, setUserCoins] = useState(1337)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [actionResult, setActionResult] = useState<string>('')

  const magicActions = [
    {
      id: 'fortune',
      name: 'Гадание на удачу',
      cost: 50,
      icon: 'Eye',
      description: 'Узнай свою судьбу на ближайшие 24 часа',
      color: 'from-purple-600 to-blue-600'
    },
    {
      id: 'protection',
      name: 'Защитный щит',
      cost: 100,
      icon: 'Shield',
      description: 'Защита от неудач на целый день',
      color: 'from-blue-600 to-green-600'
    },
    {
      id: 'luck-boost',
      name: 'Взрыв удачи',
      cost: 200,
      icon: 'Zap',
      description: 'Увеличь шансы на успех в любом деле',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 'wisdom',
      name: 'Мудрость предков',
      cost: 150,
      icon: 'Brain',
      description: 'Получи совет от древних духов',
      color: 'from-indigo-600 to-purple-600'
    },
    {
      id: 'energy',
      name: 'Заряд энергии',
      cost: 75,
      icon: 'Battery',
      description: 'Восстанови жизненные силы',
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'mystery',
      name: 'Тайна дня',
      cost: 300,
      icon: 'Key',
      description: 'Разгадай одну важную загадку',
      color: 'from-red-600 to-pink-600'
    }
  ]

  const earnActions = [
    {
      id: 'daily',
      name: 'Ежедневный бонус',
      reward: 100,
      icon: 'Calendar',
      description: 'Получай монеты каждый день',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'contract',
      name: 'За заключение контракта',
      reward: 250,
      icon: 'FileText',
      description: 'Награда за создание контракта судьбы',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'battle',
      name: 'Победа в битве',
      reward: 500,
      icon: 'Trophy',
      description: 'Выиграй монетную битву',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 'achievement',
      name: 'За достижения',
      reward: 150,
      icon: 'Award',
      description: 'Разблокируй эмоциональные ачивки',
      color: 'from-blue-600 to-indigo-600'
    }
  ]

  const fortuneResults = [
    "🌟 Сегодня звёзды благосклонны к тебе! Удача будет сопровождать во всех начинаниях.",
    "⚡ Впереди тебя ждёт неожиданная встреча, которая изменит многое!",
    "🔥 Твоя энергия на максимуме! Время действовать решительно.",
    "💎 Сегодня найдёшь то, что давно искал. Будь внимателен к знакам.",
    "🌙 Интуиция подскажет правильный путь. Доверься внутреннему голосу.",
    "⚔️ Небольшие трудности укрепят твой характер. Не сдавайся!",
    "🎭 День полон сюрпризов! Готовься к неожиданным поворотам судьбы."
  ]

  const wisdomResults = [
    "🧙‍♂️ \"Истинная сила кроется не в монетах, а в добрых делах\" - Древний Маг",
    "👹 \"Кто смеётся последним, тот смеётся лучше всех\" - Демон Хаоса",
    "⚡ \"Молния не бьёт в одно место дважды, но удача может\" - Повелитель Грома",
    "🌟 \"Звёзды освещают путь тем, кто не боится идти в темноте\" - Звёздный Мудрец",
    "🔮 \"Будущее принадлежит тем, кто верит в магию своих мечтаний\" - Оракул Времени",
    "🗡️ \"Самый острый меч - это ум, а самый крепкий щит - доброе сердце\" - Рыцарь Света"
  ]

  const performMagic = (action: any) => {
    if (userCoins < action.cost) {
      setActionResult("❌ Недостаточно монет для этого заклинания!")
      return
    }

    setUserCoins(prev => prev - action.cost)
    setSelectedAction(action.id)

    let result = ""
    switch (action.id) {
      case 'fortune':
        result = fortuneResults[Math.floor(Math.random() * fortuneResults.length)]
        break
      case 'wisdom':
        result = wisdomResults[Math.floor(Math.random() * wisdomResults.length)]
        break
      case 'protection':
        result = "🛡️ Защитный щит активирован! Сегодня неудачи обойдут тебя стороной."
        break
      case 'luck-boost':
        result = "⚡ Магическая энергия удачи пульсирует в твоих венах! Дерзай!"
        break
      case 'energy':
        result = "🔋 Жизненная энергия восстановлена! Чувствуешь прилив сил?"
        break
      case 'mystery':
        result = "🗝️ Тайна открыта: Самое ценное сокровище - это те, кто рядом с тобой."
        break
      default:
        result = "✨ Магия сработала! Почувствуй изменения в своей ауре."
    }

    setActionResult(result)
    setTimeout(() => {
      setSelectedAction(null)
      setActionResult("")
    }, 5000)
  }

  const earnCoins = (action: any) => {
    setUserCoins(prev => prev + action.reward)
    setActionResult(`💰 Получено ${action.reward} мем-монет! ${action.description}`)
    setTimeout(() => setActionResult(""), 3000)
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <MemeCoin size="large" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            ✨ Магия Мем-Монет ✨
          </h1>
          <p className="text-purple-300 text-lg mb-6">
            Используй силу монет для магических ритуалов и заклинаний!
          </p>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/50 rounded-lg px-6 py-4 inline-block">
            <div className="flex items-center space-x-3">
              <MemeCoin size="small" />
              <span className="text-2xl font-bold text-white">{userCoins}</span>
              <span className="text-purple-300">Мем-монет в кошельке</span>
            </div>
          </div>
        </div>

        {actionResult && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-400/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">🔮 Результат магии:</h3>
                <p className="text-green-300 text-lg">{actionResult}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Потратить монеты */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Icon name="Wand2" size={24} className="mr-3 text-purple-400" />
              Магические заклинания
            </h2>
            
            <div className="space-y-4">
              {magicActions.map((action) => (
                <div
                  key={action.id}
                  className={`
                    p-4 rounded-lg border transition-all duration-300 cursor-pointer
                    ${selectedAction === action.id 
                      ? 'border-purple-400 bg-purple-600/20 scale-105' 
                      : 'border-purple-400/30 bg-gradient-to-r ' + action.color + '/10 hover:border-purple-400/50 hover:bg-' + action.color.split(' ')[0] + '/20'
                    }
                  `}
                  onClick={() => performMagic(action)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                        <Icon name={action.icon as any} size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{action.name}</h3>
                        <p className="text-purple-300 text-sm">{action.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <MemeCoin size="small" />
                        <span className="text-white font-bold">{action.cost}</span>
                      </div>
                      {userCoins < action.cost && (
                        <span className="text-red-400 text-xs">Недостаточно</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Заработать монеты */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-400/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Icon name="Coins" size={24} className="mr-3 text-green-400" />
              Способы заработка
            </h2>
            
            <div className="space-y-4">
              {earnActions.map((action) => (
                <div
                  key={action.id}
                  className={`
                    p-4 rounded-lg border border-green-400/30 transition-all duration-300 cursor-pointer
                    bg-gradient-to-r ${action.color}/10 hover:border-green-400/50 hover:${action.color.split(' ')[0]}/20 hover:scale-105
                  `}
                  onClick={() => earnCoins(action)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                        <Icon name={action.icon as any} size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{action.name}</h3>
                        <p className="text-green-300 text-sm">{action.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-bold">+{action.reward}</span>
                        <MemeCoin size="small" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Информация о монетах */}
        <div className="mt-8 bg-gradient-to-br from-gray-900/30 to-slate-900/30 border border-gray-400/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Icon name="Info" size={24} className="mr-3 text-blue-400" />
            О мем-монетах
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">💀</div>
              <h3 className="font-bold text-white mb-2">Уникальный дизайн</h3>
              <p className="text-gray-300 text-sm">
                Каждая монета украшена мистическим черепом в стиле Death Note
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-white mb-2">Магическая сила</h3>
              <p className="text-gray-300 text-sm">
                Монеты содержат реальную магическую энергию (в рамках игры!)
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="font-bold text-white mb-2">Веселье гарантировано</h3>
              <p className="text-gray-300 text-sm">
                Все эффекты созданы для развлечения и хорошего настроения
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinMagic