import { useState } from 'react'
import MemeCoin from '@/components/MemeCoin'
import Icon from '@/components/ui/icon'

const EmotionAchievements = () => {
  const [unlockedEmotions, setUnlockedEmotions] = useState<string[]>(['devil-laugh'])
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null)

  const emotions = [
    {
      id: 'devil-laugh',
      name: 'Дьявольский смех',
      emoji: '😈',
      animation: 'animate-bounce',
      description: 'Зловещий смех демона, когда план удаётся идеально',
      unlockCondition: 'Разблокировано по умолчанию',
      rarity: 'common',
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'wise-thinking',
      name: 'Мудрая задумчивость',
      emoji: '🤔',
      animation: 'animate-pulse',
      description: 'Глубокие размышления о смысле бытия и судьбы',
      unlockCondition: 'Создать 3 контракта судьбы',
      rarity: 'uncommon',
      color: 'from-blue-600 to-indigo-800'
    },
    {
      id: 'electric-joy',
      name: 'Электрический восторг',
      emoji: '⚡',
      animation: 'animate-ping',
      description: 'Когда магия монет работает лучше ожиданий!',
      unlockCondition: 'Потратить 1000 мем-монет на магию',
      rarity: 'rare',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'mysterious-wink',
      name: 'Загадочное подмигивание',
      emoji: '😉',
      animation: 'animate-bounce',
      description: 'Знаю секрет, который изменит всё...',
      unlockCondition: 'Победить в 5 монетных битвах',
      rarity: 'rare',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'cosmic-surprise',
      name: 'Космическое удивление',
      emoji: '🌟',
      animation: 'animate-spin',
      description: 'Когда случается что-то невероятное!',
      unlockCondition: 'Разблокировать все базовые эмоции',
      rarity: 'epic',
      color: 'from-cyan-500 to-blue-700'
    },
    {
      id: 'shadow-master',
      name: 'Повелитель теней',
      emoji: '👹',
      animation: 'animate-pulse',
      description: 'Истинная форма маскота в полной власти',
      unlockCondition: 'Стать #1 в рейтинге игроков',
      rarity: 'legendary',
      color: 'from-black to-red-900'
    },
    {
      id: 'rainbow-chaos',
      name: 'Радужный хаос',
      emoji: '🌈',
      animation: 'animate-bounce',
      description: 'Когда все эмоции смешиваются в одну!',
      unlockCondition: 'Собрать все остальные эмоции',
      rarity: 'mythic',
      color: 'from-pink-500 via-purple-500 to-indigo-500'
    },
    {
      id: 'money-love',
      name: 'Любовь к монетам',
      emoji: '💰',
      animation: 'animate-ping',
      description: 'Страсть к мем-монетам достигла максимума',
      unlockCondition: 'Накопить 10000 мем-монет',
      rarity: 'uncommon',
      color: 'from-green-600 to-emerald-700'
    },
    {
      id: 'sleepy-wisdom',
      name: 'Сонная мудрость',
      emoji: '😴',
      animation: 'animate-pulse',
      description: 'Даже во сне думаю о великих планах...',
      unlockCondition: 'Играть после полуночи 3 раза',
      rarity: 'common',
      color: 'from-indigo-800 to-purple-900'
    }
  ]

  const rarityColors = {
    common: 'border-gray-400',
    uncommon: 'border-green-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-yellow-400',
    mythic: 'border-pink-400'
  }

  const rarityLabels = {
    common: 'Обычная',
    uncommon: 'Необычная',
    rare: 'Редкая',
    epic: 'Эпическая',
    legendary: 'Легендарная',
    mythic: 'Мифическая'
  }

  const playEmotion = (emotionId: string) => {
    if (!unlockedEmotions.includes(emotionId)) return
    
    setCurrentEmotion(emotionId)
    setTimeout(() => setCurrentEmotion(null), 3000)
  }

  const unlockEmotion = (emotionId: string) => {
    if (!unlockedEmotions.includes(emotionId)) {
      setUnlockedEmotions(prev => [...prev, emotionId])
    }
  }

  const progress = (unlockedEmotions.length / emotions.length) * 100

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <MemeCoin size="large" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            🎭 Ачивки Эмоций Маскота
          </h1>
          <p className="text-purple-300 text-lg mb-6">
            Разблокируй уникальные эмоции и анимации нашего мистического маскота!
          </p>
          
          {/* Progress bar */}
          <div className="bg-gray-800 rounded-full h-4 max-w-md mx-auto mb-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-purple-300">
            Прогресс: {unlockedEmotions.length}/{emotions.length} эмоций разблокировано
          </p>
        </div>

        {/* Current emotion display */}
        {currentEmotion && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-400 rounded-xl p-8 backdrop-blur-sm text-center">
              {(() => {
                const emotion = emotions.find(e => e.id === currentEmotion)
                return emotion ? (
                  <>
                    <div className={`text-8xl mb-4 ${emotion.animation}`}>
                      {emotion.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{emotion.name}</h3>
                    <p className="text-purple-300 text-lg">{emotion.description}</p>
                  </>
                ) : null
              })()}
            </div>
          </div>
        )}

        {/* Emotions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emotions.map((emotion) => {
            const isUnlocked = unlockedEmotions.includes(emotion.id)
            
            return (
              <div
                key={emotion.id}
                className={`
                  relative p-6 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 cursor-pointer
                  ${isUnlocked 
                    ? `${rarityColors[emotion.rarity]} bg-gradient-to-br ${emotion.color}/20 hover:scale-105 hover:${emotion.color}/30` 
                    : 'border-gray-600 bg-gray-900/30 cursor-not-allowed opacity-60'
                  }
                `}
                onClick={() => playEmotion(emotion.id)}
              >
                {/* Rarity badge */}
                <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${rarityColors[emotion.rarity]} bg-gradient-to-r ${emotion.color}`}>
                  {rarityLabels[emotion.rarity]}
                </div>
                
                <div className="text-center">
                  <div className={`text-6xl mb-4 ${isUnlocked ? 'filter-none' : 'filter grayscale'}`}>
                    {emotion.emoji}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                    {emotion.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${isUnlocked ? 'text-purple-300' : 'text-gray-500'}`}>
                    {emotion.description}
                  </p>
                  
                  <div className={`text-xs p-2 rounded-lg ${isUnlocked ? 'bg-green-900/30 text-green-300' : 'bg-gray-800/50 text-gray-400'}`}>
                    {isUnlocked ? '✅ Разблокировано' : `🔒 ${emotion.unlockCondition}`}
                  </div>
                  
                  {isUnlocked && (
                    <button
                      onClick={() => playEmotion(emotion.id)}
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    >
                      Показать эмоцию
                    </button>
                  )}
                </div>
                
                {/* Unlock animation */}
                {isUnlocked && (
                  <div className="absolute inset-0 rounded-xl pointer-events-none">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${emotion.color} opacity-20 animate-pulse`} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Test unlock buttons (for demo) */}
        <div className="mt-8 text-center">
          <div className="bg-gray-900/30 border border-gray-400/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">🧪 Тестирование (только для демо)</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {emotions.map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => unlockEmotion(emotion.id)}
                  disabled={unlockedEmotions.includes(emotion.id)}
                  className={`
                    px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300
                    ${unlockedEmotions.includes(emotion.id)
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }
                  `}
                >
                  {unlockedEmotions.includes(emotion.id) ? '✅' : '🔓'} {emotion.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-lg p-6 text-center">
            <Icon name="Trophy" size={32} className="text-purple-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white">{unlockedEmotions.length}</h3>
            <p className="text-purple-300">Эмоций разблокировано</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-400/50 rounded-lg p-6 text-center">
            <Icon name="Percent" size={32} className="text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white">{Math.round(progress)}%</h3>
            <p className="text-green-300">Прогресс коллекции</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-400/50 rounded-lg p-6 text-center">
            <Icon name="Star" size={32} className="text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white">
              {unlockedEmotions.filter(id => {
                const emotion = emotions.find(e => e.id === id)
                return emotion && ['epic', 'legendary', 'mythic'].includes(emotion.rarity)
              }).length}
            </h3>
            <p className="text-yellow-300">Редких эмоций</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmotionAchievements