import { useState } from 'react'
import DeathContactModal from './DeathContactModal'
import FateRoulette from './FateRoulette'
import { useDeathSounds } from '@/hooks/useDeathSounds'
import Icon from '@/components/ui/icon'

const FateBankModule = () => {
  const [showContactModal, setShowContactModal] = useState(false)
  const [showRouletteModal, setShowRouletteModal] = useState(false)
  const sounds = useDeathSounds()

  const handleContactClick = () => {
    sounds.inkDrop()
    sounds.paperFlip()
    setShowContactModal(true)
  }

  const handleRouletteClick = () => {
    sounds.mysticalChime()
    sounds.whisper()
    setShowRouletteModal(true)
  }

  return (
    <div className="relative">
      {/* Main Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/25">
                <Icon name="Skull" size={32} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                <span className="bg-gradient-to-r from-red-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                  ФиФи Банк
                </span>
              </h2>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/25">
                <Icon name="Eye" size={32} className="text-white" />
              </div>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Добро пожаловать в ФиФи Банк - место где мем-монеты-черепа обретают магическую силу! 
              Создавай контракты, крути рулетку и собирай уникальные мем-монеты в готическом стиле...
            </p>
            
            {/* Atmospheric decoration */}
            <div className="mt-8 flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl animate-bounce animation-delay-0">📜</div>
              <div className="text-2xl animate-bounce animation-delay-500">⚡</div>
              <div className="text-2xl animate-bounce animation-delay-1000">🖤</div>
              <div className="text-2xl animate-bounce animation-delay-1500">👁️</div>
              <div className="text-2xl animate-bounce animation-delay-2000">🕯️</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Create Contact Button */}
            <div className="group cursor-pointer" onClick={handleContactClick}>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-red-500/30 rounded-2xl p-8 h-80 backdrop-blur-sm transition-all duration-500 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-105">
                
                {/* Ink drip effect */}
                <div className="absolute top-0 left-1/4 w-2 h-8 bg-gradient-to-b from-red-600 to-transparent rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-1/3 w-1 h-6 bg-gradient-to-b from-red-500 to-transparent rounded-b-full opacity-40 group-hover:opacity-80 transition-opacity animation-delay-500" />
                
                {/* Main content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div className="text-center">
                    {/* Icon with pulsing effect */}
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-xl animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-2 bg-black rounded-lg border border-red-500/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Feather" size={32} className="text-red-400 group-hover:text-red-300 transition-colors" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-red-400 mb-4 group-hover:text-red-300 transition-colors">
                      Создать Мем-Контракт
                    </h3>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-white transition-colors">
                      Заключи мем-контракт с ФиФи Банком! 
                      Отправь своё послание и получи уникальную мем-монету-череп в ответ...
                    </p>
                  </div>
                  
                  {/* Action indicator */}
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-400 group-hover:text-red-300 transition-colors">
                      <Icon name="MousePointer" size={16} />
                      <span>Нажми, чтобы открыть тетрадь</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-50" />
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-60" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 to-red-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>

            {/* Magic Coins Roulette Button */}
            <div className="group cursor-pointer" onClick={handleRouletteClick}>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-500/30 rounded-2xl p-8 h-80 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105">
                
                {/* Mystical smoke effect */}
                <div className="absolute top-4 left-1/3 w-3 h-12 bg-gradient-to-t from-purple-600/60 to-transparent rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-6 right-1/4 w-2 h-8 bg-gradient-to-t from-purple-500/40 to-transparent rounded-full blur-sm opacity-40 group-hover:opacity-80 transition-opacity animation-delay-700" />
                
                {/* Main content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div className="text-center">
                    {/* Rotating wheel icon */}
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full animate-pulse group-hover:animate-spin-slow group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-2 bg-black rounded-full border border-purple-500/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Coins" size={32} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                      </div>
                      
                      {/* Orbiting elements */}
                      <div className="absolute -top-2 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-bounce group-hover:animate-ping" />
                      <div className="absolute top-1/2 -right-2 w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                      Рулетка Мем-Черепов
                    </h3>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-white transition-colors">
                      Крути рулетку и получай редкие мем-монеты-черепа! 
                      Каждая монета имеет уникальную силу и стоимость в ФиФи Банке...
                    </p>
                  </div>
                  
                  {/* Action indicator */}
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-400 group-hover:text-purple-300 transition-colors">
                      <Icon name="RotateCcw" size={16} />
                      <span>Кликни, чтобы крутить колесо</span>
                    </div>
                  </div>
                </div>
                
                {/* Magical particles */}
                <div className="absolute top-6 right-8 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-50" />
                <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" />
                <div className="absolute top-1/2 left-4 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-40" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom atmospheric text */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-600/30 rounded-xl p-6 backdrop-blur-sm max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-3xl animate-pulse">👹</span>
                <h4 className="text-xl font-bold text-red-400">Послание от ФиФи Банка</h4>
                <span className="text-3xl animate-pulse">🕵️</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                "Хе-хе... Добро пожаловать в ФиФи Банк! Здесь мем-монеты-черепа имеют реальную силу. 
                Каждый контракт приносит уникальные монеты, а рулетка открывает редкие коллекции. 
                Собирай, торгуй и становись легендой мем-экономики!"
              </p>
              <p className="text-blue-400 text-sm mt-2 italic">
                - ФиФи Банк: "Каждая мем-монета-череп уникальна. Вероятность получить легендарную - всего 2%!"
              </p>
            </div>
          </div>
        </div>

        {/* Background atmospheric effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating mystical symbols */}
          <div className="absolute top-1/4 left-1/8 text-2xl text-red-500/20 animate-float">📜</div>
          <div className="absolute top-3/4 right-1/8 text-2xl text-purple-500/20 animate-float animation-delay-1000ms">🔮</div>
          <div className="absolute bottom-1/4 left-1/4 text-2xl text-gray-500/20 animate-float animation-delay-2000ms">⚡</div>
          <div className="absolute top-1/2 right-1/3 text-2xl text-blue-500/20 animate-float animation-delay-1500ms">👁️</div>
          
          {/* Subtle gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-900/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/5 to-transparent" />
        </div>
      </section>

      {/* Modals */}
      <DeathContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
      
      <FateRoulette 
        isOpen={showRouletteModal} 
        onClose={() => setShowRouletteModal(false)} 
      />
    </div>
  )
}

export default FateBankModule