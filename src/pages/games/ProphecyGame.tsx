import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/icon'
import InteractiveBackground from '@/components/InteractiveBackground'
import RandomMascot from '@/components/RandomMascot'
import { useSoundEffects } from '@/components/SoundEffects'

interface Prophecy {
  id: number
  riddle: string
  options: string[]
  correct: number
  hint: string
  mascotReaction: string
}

const ProphecyGame = () => {
  const [currentProphecy, setCurrentProphecy] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [mascotTrigger, setMascotTrigger] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const sounds = useSoundEffects()

  const prophecies: Prophecy[] = [
    {
      id: 1,
      riddle: "🍎 Что падает с дерева знаний, но никогда не болит?",
      options: ["Листья мудрости", "Яблоки просветления", "Мемы истины", "Слёзы радости"],
      correct: 1,
      hint: "Ryuk любит их больше всего на свете! 😈",
      mascotReaction: "Правильно! Яблоки — это сила! 🍎✨"
    },
    {
      id: 2,
      riddle: "📝 Что пишется чернилами судьбы, но читается смехом?",
      options: ["Контракты банка", "Мемные пророчества", "Шутки маскота", "Все варианты"],
      correct: 3,
      hint: "В Банке Судьбы всё — это повод для улыбки! 🎭",
      mascotReaction: "Гениально! Ты понял суть нашего банка! 😄"
    },
    {
      id: 3,
      riddle: "💀 Что страшнее смерти, но веселее жизни?",
      options: ["Экзамены", "Мемы о Death Note", "Понедельник", "Забыть пароль"],
      correct: 1,
      hint: "Light Yagami был бы не против посмеяться! 💀😂",
      mascotReaction: "Ха-ха! Мемы действительно бессмертны! 🎪"
    },
    {
      id: 4,
      riddle: "🌟 Что светится неоном, но согревает душу?",
      options: ["Реклама", "Наши кнопки", "Дружба и веселье", "RGB подсветка"],
      correct: 2,
      hint: "Самое яркое — это не всегда электричество... ❤️",
      mascotReaction: "Точно! Веселье — лучший свет в темноте! 🌈"
    },
    {
      id: 5,
      riddle: "🎭 Кто носит маску улыбки, но говорит правду?",
      options: ["Клоун", "Политик", "Мемный маскот", "Интроверт на вечеринке"],
      correct: 2,
      hint: "Я всегда здесь, чтобы напомнить: это всё шутка! 😸",
      mascotReaction: "Верно! Я — твой гид в мире веселья! 🎪✨"
    }
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === prophecies[currentProphecy].correct) {
      setScore(prev => prev + 20)
      sounds.success()
      setMascotTrigger(true)
    } else {
      sounds.click()
    }
  }

  const handleNextProphecy = () => {
    if (currentProphecy < prophecies.length - 1) {
      setCurrentProphecy(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
    } else {
      setGameComplete(true)
      sounds.magic()
    }
  }

  const handleRestart = () => {
    setCurrentProphecy(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameComplete(false)
    setShowHint(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / (prophecies.length * 20)) * 100
    if (percentage === 100) return "🏆 Мастер пророчеств! Ты постиг все тайны!"
    if (percentage >= 80) return "🌟 Отлично! Ты почти всевидящий!"
    if (percentage >= 60) return "✨ Хорошо! Твоя мудрость растёт!"
    if (percentage >= 40) return "🎭 Неплохо! Ещё немного практики!"
    return "😄 Главное — веселье! Попробуй ещё раз!"
  }

  const currentQ = prophecies[currentProphecy]

  if (gameComplete) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4">
        <InteractiveBackground />
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-purple/30 rounded-2xl p-12">
            <div className="w-24 h-24 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon name="Trophy" size={48} className="text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Пророчества разгаданы!
            </h1>
            
            <p className="text-2xl text-neon-purple mb-6">
              Твой счёт: {score} из {prophecies.length * 20}
            </p>
            
            <p className="text-xl text-gray-300 mb-8">
              {getScoreMessage()}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold text-white hover:scale-105 transition-transform"
              >
                Играть снова
              </button>
              <Link
                to="/games"
                className="px-8 py-3 border border-neon-purple/50 rounded-lg font-semibold text-white hover:bg-neon-purple/10 transition-colors"
              >
                Другие игры
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <InteractiveBackground />
      
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/games" 
            className="inline-flex items-center space-x-2 text-neon-purple hover:text-neon-pink transition-colors mb-6"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Назад к играм</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Угадай пророчество!
          </h1>
          
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={16} className="text-neon-purple" />
              <span className="text-white">Вопрос {currentProphecy + 1} из {prophecies.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-neon-pink" />
              <span className="text-white">Счёт: {score}</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-purple/30 rounded-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {currentQ.riddle}
            </h2>
            
            {!showHint && !showResult && (
              <button
                onClick={() => setShowHint(true)}
                className="text-neon-purple hover:text-neon-pink transition-colors flex items-center space-x-2 mx-auto"
              >
                <Icon name="HelpCircle" size={20} />
                <span>Нужна подсказка?</span>
              </button>
            )}
            
            {showHint && (
              <div className="mt-4 p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-lg">
                <p className="text-neon-purple">{currentQ.hint}</p>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid gap-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`p-4 rounded-lg text-left transition-all duration-300 ${
                  selectedAnswer === index
                    ? index === currentQ.correct
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-red-500/20 border-red-500 text-red-400'
                    : showResult && index === currentQ.correct
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-gray-700/30 border-gray-600 text-white hover:border-neon-purple/50 hover:bg-neon-purple/10'
                } border`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-current' : 'border-gray-500'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 rounded-full bg-current" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Result & Next Button */}
          {showResult && (
            <div className="text-center">
              <div className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === currentQ.correct
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <p className={`text-lg font-medium ${
                  selectedAnswer === currentQ.correct ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedAnswer === currentQ.correct 
                    ? currentQ.mascotReaction 
                    : 'Не совсем так, но это не беда! Учимся на ошибках! 😊'
                  }
                </p>
              </div>
              
              <button
                onClick={handleNextProphecy}
                className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold text-white hover:scale-105 transition-transform"
              >
                {currentProphecy < prophecies.length - 1 ? 'Следующее пророчество' : 'Завершить игру'}
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

export default ProphecyGame