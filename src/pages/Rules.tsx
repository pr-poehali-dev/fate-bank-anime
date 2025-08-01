import { useEffect, useState } from 'react'
import Icon from '@/components/ui/icon'
import InteractiveBackground from '@/components/InteractiveBackground'
import RandomMascot from '@/components/RandomMascot'

const Rules = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const [mascotTrigger, setMascotTrigger] = useState(false)

  const rules = [
    {
      title: "📜 Основные принципы Банка Судьбы",
      content: [
        "• Все контракты заключаются исключительно ради веселья и мемов",
        "• Никакие соглашения не имеют юридической силы в реальном мире",
        "• Маскот может появиться в любой момент с мудрыми шутками",
        "• Яблоки знаний падают только после успешных действий"
      ],
      icon: "ScrollText"
    },
    {
      title: "🎮 Правила мини-игр",
      content: [
        "• В 'Угадай пророчество!' нужно разгадать загадки маскота",
        "• 'Яблочный баттл' — собирай светящиеся символы на время",
        "• 'Тёмные сделки' — стратегическая игра с мемными выборами",
        "• Все игры сохраняют прогресс и начисляют мем-очки"
      ],
      icon: "Gamepad2"
    },
    {
      title: "💫 Магическая система",
      content: [
        "• Каждый клик активирует звуковые эффекты",
        "• Неоновые руны реагируют на движения мыши",
        "• Чернильные всплески появляются при важных действиях",
        "• Мем-монета крутится и светится при взаимодействии"
      ],
      icon: "Sparkles"
    },
    {
      title: "🎭 Этика и веселье",
      content: [
        "• Относись к сайту как к развлечению, а не серьёзному делу",
        "• Маскот всегда напомнит, что это всё для смеха",
        "• Не стоит воспринимать 'контракты' буквально",
        "• Главная цель — получить удовольствие и улыбнуться"
      ],
      icon: "Heart"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSections(prev => {
        if (prev.length < rules.length) {
          return [...prev, prev.length]
        }
        return prev
      })
    }, 500)

    const mascotTimer = setTimeout(() => setMascotTrigger(true), 2000)

    return () => {
      clearInterval(timer)
      clearTimeout(mascotTimer)
    }
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <InteractiveBackground />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
            Правила Банка Судьбы
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Добро пожаловать в мир мемов, контрактов и безграничного веселья! 
            Изучи правила нашего мистического банка.
          </p>
        </div>

        {/* Rules Sections */}
        <div className="space-y-8">
          {rules.map((rule, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                visibleSections.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-death-gray/20 backdrop-blur-sm border border-neon-purple/30 rounded-2xl p-8 hover:border-neon-purple/50 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={rule.icon as any} size={24} className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-purple transition-colors">
                      {rule.title}
                    </h2>
                    
                    <div className="space-y-3">
                      {rule.content.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-start space-x-3 text-gray-300 group-hover:text-white transition-colors"
                        >
                          <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0" />
                          <p className="leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-purple/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-neon-purple/10 border border-neon-purple/30 rounded-full px-8 py-4">
            <Icon name="AlertCircle" size={24} className="text-neon-purple" />
            <p className="text-white font-medium">
              Помни: это всё ради веселья и творчества! 
            </p>
            <Icon name="Smile" size={24} className="text-neon-pink" />
          </div>
        </div>

        {/* Interactive elements */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setMascotTrigger(true)}
            className="w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-neon-purple/25"
          >
            <Icon name="HelpCircle" size={28} className="text-white" />
          </button>
        </div>
      </div>

      <RandomMascot 
        trigger={mascotTrigger}
        onComplete={() => setMascotTrigger(false)}
      />
    </div>
  )
}

export default Rules