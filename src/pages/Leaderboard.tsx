import { useState } from 'react'
import MemeCoin from '@/components/MemeCoin'
import Icon from '@/components/ui/icon'

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'contracts' | 'coins' | 'achievements'>('contracts')

  const contractLeaders = [
    { rank: 1, name: "MemeKiller666", score: 1337, avatar: "💀", title: "Повелитель Контрактов", streak: 42 },
    { rank: 2, name: "DeathNoteFan", score: 1024, avatar: "📔", title: "Тёмный Писарь", streak: 28 },
    { rank: 3, name: "RyukLover", score: 888, avatar: "🍎", title: "Друг Шинигами", streak: 19 },
    { rank: 4, name: "LightYagami", score: 777, avatar: "⚡", title: "Кира-претендент", streak: 15 },
    { rank: 5, name: "NearMaster", score: 666, avatar: "🎲", title: "Детектив Судьбы", streak: 12 },
    { rank: 6, name: "MisaAmane", score: 555, avatar: "💖", title: "Готическая Принцесса", streak: 8 },
    { rank: 7, name: "LLawliet", score: 444, avatar: "🍰", title: "Сладкий Аналитик", streak: 6 },
    { rank: 8, name: "WatariSan", score: 333, avatar: "👴", title: "Мудрый Наставник", streak: 4 },
    { rank: 9, name: "MelloBoy", score: 222, avatar: "🍫", title: "Шоколадный Бунтарь", streak: 3 },
    { rank: 10, name: "SidohFriend", score: 111, avatar: "👹", title: "Демонический Новичок", streak: 1 }
  ]

  const coinLeaders = [
    { rank: 1, name: "CoinMaster3000", score: 99999, avatar: "💰", title: "Магнат Мем-Монет", total: 150000 },
    { rank: 2, name: "RichShinigami", score: 88888, avatar: "💎", title: "Алмазный Коллектор", total: 120000 },
    { rank: 3, name: "GoldDigger", score: 77777, avatar: "🏆", title: "Золотоискатель", total: 95000 },
    { rank: 4, name: "MoneyMagic", score: 66666, avatar: "🎰", title: "Денежный Маг", total: 85000 },
    { rank: 5, name: "CryptoKing", score: 55555, avatar: "👑", title: "Король Крипты", total: 75000 },
    { rank: 6, name: "FortuneHunter", score: 44444, avatar: "🔮", title: "Охотник за Удачей", total: 65000 },
    { rank: 7, name: "LuckyGamer", score: 33333, avatar: "🍀", title: "Счастливчик", total: 55000 },
    { rank: 8, name: "CoinCollector", score: 22222, avatar: "🗃️", title: "Коллекционер", total: 45000 },
    { rank: 9, name: "WealthSeeker", score: 11111, avatar: "🔍", title: "Искатель Богатства", total: 35000 },
    { rank: 10, name: "StartingRich", score: 10000, avatar: "🌱", title: "Начинающий Богач", total: 25000 }
  ]

  const achievementLeaders = [
    { rank: 1, name: "AchieveKing", score: 45, avatar: "👑", title: "Король Достижений", completion: 95 },
    { rank: 2, name: "TrophyHunter", score: 42, avatar: "🏆", title: "Охотник за Трофеями", completion: 89 },
    { rank: 3, name: "BadgeCollector", score: 38, avatar: "🎖️", title: "Собиратель Значков", completion: 80 },
    { rank: 4, name: "EmotionMaster", score: 35, avatar: "🎭", title: "Мастер Эмоций", completion: 74 },
    { rank: 5, name: "QuestLord", score: 32, avatar: "⚔️", title: "Повелитель Квестов", completion: 68 },
    { rank: 6, name: "ProgressPro", score: 29, avatar: "📈", title: "Профи Прогресса", completion: 61 },
    { rank: 7, name: "UnlockGuru", score: 26, avatar: "🗝️", title: "Гуру Разблокировок", completion: 55 },
    { rank: 8, name: "ChallengeAce", score: 23, avatar: "🎯", title: "Ас Вызовов", completion: 49 },
    { rank: 9, name: "MilestoneMan", score: 20, avatar: "🚩", title: "Человек-Веха", completion: 42 },
    { rank: 10, name: "NewbieWinner", score: 15, avatar: "🌟", title: "Победитель-Новичок", completion: 32 }
  ]

  const getCurrentLeaders = () => {
    switch (activeTab) {
      case 'contracts': return contractLeaders
      case 'coins': return coinLeaders
      case 'achievements': return achievementLeaders
      default: return contractLeaders
    }
  }

  const getScoreLabel = () => {
    switch (activeTab) {
      case 'contracts': return 'Контрактов'
      case 'coins': return 'Монет'
      case 'achievements': return 'Ачивок'
      default: return 'Очков'
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600 text-yellow-900'
      case 2: return 'from-gray-300 to-gray-500 text-gray-900'
      case 3: return 'from-orange-400 to-orange-600 text-orange-900'
      default: return 'from-purple-400 to-purple-600 text-purple-900'
    }
  }

  const tabs = [
    { id: 'contracts' as const, label: 'Мем-Контракты', icon: 'FileText' },
    { id: 'coins' as const, label: 'Мем-Монеты', icon: 'Coins' },
    { id: 'achievements' as const, label: 'Достижения', icon: 'Trophy' }
  ]

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <MemeCoin size="large" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            🏆 Рейтинг Игроков
          </h1>
          <p className="text-purple-300 text-lg">
            Лучшие мастера мем-контрактов, монет и достижений!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-xl p-2 backdrop-blur-sm">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2
                    ${activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
                    }
                  `}
                >
                  <Icon name={tab.icon as any} size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {getCurrentLeaders().slice(0, 3).map((leader, index) => {
            const positions = [2, 1, 3] // Silver, Gold, Bronze positions
            const actualRank = positions[index]
            const heights = ['h-32', 'h-40', 'h-28']
            
            return (
              <div key={leader.rank} className={`relative ${heights[index]} flex items-end`}>
                <div className={`
                  w-full bg-gradient-to-t ${getRankColor(actualRank)} rounded-t-xl p-4 text-center border-2 border-opacity-50
                  ${actualRank === 1 ? 'border-yellow-400 shadow-2xl shadow-yellow-500/25' : 
                    actualRank === 2 ? 'border-gray-400 shadow-xl shadow-gray-400/20' : 
                    'border-orange-400 shadow-lg shadow-orange-400/15'}
                `}>
                  <div className="text-4xl mb-2">{leader.avatar}</div>
                  <h3 className="font-bold text-sm mb-1">{leader.name}</h3>
                  <p className="text-xs mb-2">{leader.title}</p>
                  <p className="font-bold text-lg">{leader.score.toLocaleString()}</p>
                  <p className="text-xs">{getScoreLabel()}</p>
                  
                  {/* Crown for first place */}
                  {actualRank === 1 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
                      👑
                    </div>
                  )}
                </div>
                
                {/* Rank number */}
                <div className={`
                  absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full 
                  bg-gradient-to-br ${getRankColor(actualRank)} flex items-center justify-center font-bold text-lg
                  border-2 ${actualRank === 1 ? 'border-yellow-300' : actualRank === 2 ? 'border-gray-300' : 'border-orange-300'}
                `}>
                  {actualRank}
                </div>
              </div>
            )
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-xl backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-purple-400/30">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Icon name="BarChart3" size={24} className="mr-3 text-purple-400" />
              Полная таблица лидеров
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-800/30">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-bold">Место</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Игрок</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Титул</th>
                  <th className="px-6 py-4 text-right text-white font-bold">{getScoreLabel()}</th>
                  <th className="px-6 py-4 text-right text-white font-bold">
                    {activeTab === 'contracts' ? 'Серия' : activeTab === 'coins' ? 'Всего' : 'Процент'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCurrentLeaders().map((leader, index) => (
                  <tr 
                    key={leader.rank}
                    className={`
                      border-b border-purple-400/20 transition-all duration-300 hover:bg-purple-700/20
                      ${index < 3 ? 'bg-gradient-to-r from-purple-600/10 to-transparent' : ''}
                    `}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                          ${index < 3 ? `bg-gradient-to-br ${getRankColor(leader.rank)}` : 'bg-gray-600 text-white'}
                        `}>
                          {leader.rank}
                        </div>
                        {index < 3 && (
                          <div className="text-xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{leader.avatar}</div>
                        <span className="text-white font-medium">{leader.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-purple-300 text-sm">{leader.title}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white font-bold text-lg">{leader.score.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-purple-300">
                        {activeTab === 'contracts' ? `${(leader as any).streak} подряд` :
                         activeTab === 'coins' ? `${(leader as any).total?.toLocaleString()}` :
                         `${(leader as any).completion}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Season Info */}
        <div className="mt-8 bg-gradient-to-br from-gray-900/30 to-slate-900/30 border border-gray-400/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
              <Icon name="Calendar" size={24} className="mr-3 text-blue-400" />
              Сезон "Мистические Тени" 
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl mb-2">⏰</div>
                <p className="text-white font-bold">23 дня</p>
                <p className="text-gray-300 text-sm">до конца сезона</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🎁</div>
                <p className="text-white font-bold">Эксклюзивные награды</p>
                <p className="text-gray-300 text-sm">для топ-игроков</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🌟</div>
                <p className="text-white font-bold">Легендарный статус</p>
                <p className="text-gray-300 text-sm">навсегда в истории</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard