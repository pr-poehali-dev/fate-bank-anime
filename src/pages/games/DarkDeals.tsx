import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/icon'
import InteractiveBackground from '@/components/InteractiveBackground'
import RandomMascot from '@/components/RandomMascot'
import { useSoundEffects } from '@/components/SoundEffects'

interface GameChoice {
  id: string
  text: string
  consequence: string
  points: number
  nextSituation?: string
}

interface GameSituation {
  id: string
  title: string
  description: string
  mascotComment: string
  choices: GameChoice[]
}

const DarkDeals = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu')
  const [currentSituation, setCurrentSituation] = useState(0)
  const [score, setScore] = useState(0)
  const [choices, setChoices] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [lastChoice, setLastChoice] = useState<GameChoice | null>(null)
  const [mascotTrigger, setMascotTrigger] = useState(false)
  const sounds = useSoundEffects()

  const situations: GameSituation[] = [
    {
      id: 'start',
      title: '💀 Первая встреча с маскотом',
      description: 'Ты впервые встречаешь мистического маскота Банка Судьбы. Он протягивает тебе светящийся контракт и хитро улыбается.',
      mascotComment: 'Добро пожаловать! Я здесь, чтобы напомнить: всё это — игра! 😈',
      choices: [
        {
          id: 'sign_immediately',
          text: '📝 Подписать контракт не читая',
          consequence: 'Маскот смеется: "Смелость похвальна, но всегда читай мелкий шрифт... хотя здесь его нет! 😄"',
          points: 15,
          nextSituation: 'coins'
        },
        {
          id: 'read_carefully',
          text: '🔍 Внимательно изучить условия',
          consequence: 'Маскот кивает: "Мудро! Хотя тут написано только: \'Веселись и не воспринимай всерьёз!\' 🎭"',
          points: 25,
          nextSituation: 'coins'
        },
        {
          id: 'ask_questions',
          text: '❓ Задать каверзные вопросы',
          consequence: 'Маскот хохочет: "Вопросы? Отлично! Вопрос первый: готов ли ты смеяться? 🎪"',
          points: 30,
          nextSituation: 'coins'
        }
      ]
    },
    {
      id: 'coins',
      title: '🪙 Магические монеты судьбы',
      description: 'Маскот показывает тебе сверкающие мем-монеты. Они крутятся в воздухе, издавая мелодичные звуки.',
      mascotComment: 'Эти монеты стоят ровно столько, сколько твоя улыбка! 💰😊',
      choices: [
        {
          id: 'grab_all',
          text: '🤲 Схватить все монеты',
          consequence: 'Монеты превращаются в конфетти! Маскот: "Жадность — не порок, а повод для смеха! 🎉"',
          points: 10,
          nextSituation: 'prophecy'
        },
        {
          id: 'take_one',
          text: '☝️ Взять только одну монету',
          consequence: 'Маскот аплодирует: "Умеренность — добродетель! За это ты получаешь... ещё одну! 🎁"',
          points: 35,
          nextSituation: 'prophecy'
        },
        {
          id: 'refuse_coins',
          text: '🙅‍♂️ Отказаться от монет',
          consequence: 'Маскот поражён: "Бескорыстность! Но в нашем банке даже отказ — это валюта! 💎"',
          points: 50,
          nextSituation: 'prophecy'
        }
      ]
    },
    {
      id: 'prophecy',
      title: '🔮 Пророчество о будущем',
      description: 'Маскот достает хрустальный шар, в котором вместо будущего крутится... мем с котиком.',
      mascotComment: 'Будущее туманно... но котики вечны! 🐱✨',
      choices: [
        {
          id: 'trust_prophecy',
          text: '🙏 Поверить в пророчество',
          consequence: 'Маскот: "Вера важна! И да, котики действительно захватят интернет... опять! 😹"',
          points: 20,
          nextSituation: 'final'
        },
        {
          id: 'laugh_at_prophecy',
          text: '😂 Рассмеяться над пророчеством',
          consequence: 'Маскот присоединяется к смеху: "Смех — лучшее пророчество! Будущее будет смешным! 🤣"',
          points: 40,
          nextSituation: 'final'
        },
        {
          id: 'make_own_prophecy',
          text: '🎯 Сделать своё пророчество',
          consequence: 'Маскот восхищён: "Creativity level: OVER 9000! Твоё пророчество засчитано! 🚀"',
          points: 60,
          nextSituation: 'final'
        }
      ]
    },
    {
      id: 'final',
      title: '🎭 Финальная сделка',
      description: 'Маскот предлагает тебе последний выбор: стать частью Банка Судьбы или вернуться в обычный мир.',
      mascotComment: 'Время решающего выбора! Но помни — правильный ответ тот, который заставляет тебя улыбаться! 😊',
      choices: [
        {
          id: 'join_bank',
          text: '🏛️ Стать сотрудником банка',
          consequence: 'Маскот: "Добро пожаловать в команду! Твоя должность: Главный по улыбкам! 😄"',
          points: 25,
        },
        {
          id: 'stay_customer',
          text: '🤝 Остаться постоянным клиентом',
          consequence: 'Маскот: "Мудрый выбор! Лучшие отношения — это дружба без обязательств! 👫"',
          points: 35,
        },
        {
          id: 'create_own_bank',
          text: '🏗️ Создать свой мем-банк',
          consequence: 'Маскот в восторге: "Предпринимательский дух! Я буду твоим первым клиентом! 🎪💰"',
          points: 50,
        }
      ]
    }
  ]

  const makeChoice = (choice: GameChoice) => {
    setLastChoice(choice)
    setChoices(prev => [...prev, choice.id])
    setScore(prev => prev + choice.points)
    setShowResult(true)
    setMascotTrigger(true)
    
    if (choice.points >= 40) {
      sounds.magic()
    } else if (choice.points >= 25) {
      sounds.success()
    } else {
      sounds.coin()
    }
  }

  const nextSituation = () => {
    if (lastChoice?.nextSituation) {
      const nextIndex = situations.findIndex(s => s.id === lastChoice.nextSituation)
      if (nextIndex !== -1) {
        setCurrentSituation(nextIndex)
      }
    } else if (currentSituation < situations.length - 1) {
      setCurrentSituation(prev => prev + 1)
    } else {
      endGame()
    }
    
    setShowResult(false)
    setLastChoice(null)
  }

  const endGame = () => {
    setGameState('finished')
    sounds.success()
  }

  const startGame = () => {
    setGameState('playing')
    setCurrentSituation(0)
    setScore(0)
    setChoices([])
    setShowResult(false)
    setLastChoice(null)
  }

  const getScoreRating = () => {
    if (score >= 150) return { rating: '🏆 Мастер мемных сделок', description: 'Ты постиг искусство веселья!', color: 'text-yellow-400' }
    if (score >= 120) return { rating: '🌟 Эксперт по юмору', description: 'Твоя мудрость восхищает!', color: 'text-purple-400' }
    if (score >= 90) return { rating: '✨ Знаток веселья', description: 'Отличное чувство юмора!', color: 'text-blue-400' }
    if (score >= 60) return { rating: '🎭 Начинающий комик', description: 'Ты на правильном пути!', color: 'text-green-400' }
    return { rating: '😊 Весёлый новичок', description: 'Главное — удовольствие от игры!', color: 'text-gray-400' }
  }

  if (gameState === 'finished') {
    const rating = getScoreRating()
    return (
      <div className="min-h-screen pt-20 pb-16 px-4">
        <InteractiveBackground />
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-blue/30 rounded-2xl p-12">
            <div className="w-24 h-24 bg-gradient-to-br from-neon-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon name="Scroll" size={48} className="text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Сделка завершена!
            </h1>
            
            <p className="text-2xl text-neon-blue mb-6">
              Финальный счёт: {score}
            </p>
            
            <div className="mb-8">
              <p className={`text-xl font-semibold mb-2 ${rating.color}`}>
                {rating.rating}
              </p>
              <p className="text-gray-300">
                {rating.description}
              </p>
            </div>
            
            <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">🎯 Итоги путешествия:</h3>
              <div className="text-left space-y-2 text-gray-300">
                <p>• Принято решений: {choices.length}</p>
                <p>• Средний балл за выбор: {Math.round(score / choices.length)}</p>
                <p>• Уровень креативности: {score >= 120 ? 'Максимальный' : score >= 80 ? 'Высокий' : 'Хороший'}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-neon-blue to-blue-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
              >
                Новая сделка
              </button>
              <Link
                to="/games"
                className="px-8 py-3 border border-neon-blue/50 rounded-lg font-semibold text-white hover:bg-neon-blue/10 transition-colors"
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
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-blue-400 transition-colors mb-6"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Назад к играм</span>
            </Link>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Тёмные сделки
            </h1>
            <p className="text-xl text-gray-300">
              Стратегическая мем-игра с выбором ходов и мистическими поворотами!
            </p>
          </div>

          <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-blue/30 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">🎭 Как играть</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Встреться с маскотом</h3>
                  <p className="text-gray-300 text-sm">Познакомься с мистическим проводником Банка Судьбы</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Делай выборы</h3>
                  <p className="text-gray-300 text-sm">Каждое решение влияет на итоговый счёт и историю</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Получай баллы</h3>
                  <p className="text-gray-300 text-sm">Креативные и смешные решения дают больше очков</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Узнай свой рейтинг</h3>
                  <p className="text-gray-300 text-sm">В конце получи оценку своего мастерства мемных сделок</p>
                </div>
              </div>
            </div>

            <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">💡 Подсказка:</h3>
              <p className="text-gray-300 text-sm">
                Нет правильных или неправильных ответов! Главное — веселиться и проявлять креативность. 
                Маскот всегда напомнит, что это всё — игра! 🎪
              </p>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-neon-blue to-blue-600 rounded-lg font-bold text-white text-xl hover:scale-105 transition-transform"
            >
              Начать сделку! 📜
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentSit = situations[currentSituation]

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <InteractiveBackground />
      
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Scroll" size={20} className="text-neon-blue" />
              <span className="text-white">Ситуация {currentSituation + 1} из {situations.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-neon-purple" />
              <span className="text-white">Счёт: {score}</span>
            </div>
          </div>
        </div>

        {/* Situation Card */}
        <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-blue/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            {currentSit.title}
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed text-center">
            {currentSit.description}
          </p>

          <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="MessageCircle" size={16} className="text-white" />
              </div>
              <p className="text-neon-purple font-medium italic">
                {currentSit.mascotComment}
              </p>
            </div>
          </div>

          {!showResult && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                Что ты выберешь?
              </h3>
              {currentSit.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => makeChoice(choice)}
                  className="w-full p-4 bg-gray-700/30 border border-gray-600 rounded-lg text-left hover:border-neon-blue/50 hover:bg-neon-blue/10 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-neon-blue/20 border border-neon-blue/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-neon-blue/30">
                      <span className="text-neon-blue text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium group-hover:text-neon-blue transition-colors">
                        {choice.text}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        +{choice.points} очков
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showResult && lastChoice && (
            <div className="text-center">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  Результат твоего выбора:
                </h3>
                <p className="text-white mb-4">
                  {lastChoice.consequence}
                </p>
                <div className="text-green-400 font-bold">
                  +{lastChoice.points} очков!
                </div>
              </div>
              
              <button
                onClick={nextSituation}
                className="px-8 py-3 bg-gradient-to-r from-neon-blue to-blue-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
              >
                {currentSituation < situations.length - 1 ? 'Продолжить историю' : 'Завершить сделку'}
              </button>
            </div>
          )}
        </div>
      </div>

      <RandomMascot 
        trigger={mascotTrigger}
        onComplete={() => setMascotTrigger(false)}
      />
    </div>
  )
}

export default DarkDeals