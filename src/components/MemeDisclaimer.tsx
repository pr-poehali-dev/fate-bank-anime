interface MemeDisclaimerProps {
  footerVisible: boolean
  mascotPhrase: string
  setMascotPhrase: (phrase: string) => void
  showFooterEmojis: boolean
  setShowFooterEmojis: (show: boolean) => void
  mascotPhrases: string[]
}

const MemeDisclaimer = ({ 
  footerVisible, 
  mascotPhrase, 
  setMascotPhrase, 
  showFooterEmojis, 
  setShowFooterEmojis, 
  mascotPhrases 
}: MemeDisclaimerProps) => {
  return (
    <div className={`relative bg-gradient-to-r from-black via-death-black to-black py-12 px-4 border-t-2 border-neon-purple/30 overflow-hidden ${
      footerVisible ? 'animate-slide-in-right' : 'opacity-0'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-10 w-16 h-16 bg-neon-purple rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-6 right-20 w-12 h-12 bg-neon-blue rounded-full animate-float blur-sm animation-delay-1000ms"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-neon-pink rounded-full animate-float blur-sm animation-delay-2000ms"></div>
      </div>

      <div className="container mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Animated Mascot */}
          <div className="relative">
            <div className={`${footerVisible ? 'animate-bounce' : ''} transition-all duration-1000`}>
              <img 
                src="/img/bb2cf523-ae57-4a84-8fbd-7584e096e610.jpg"
                alt="Mascot waving"
                className="w-24 h-24 object-cover rounded-full neon-glow cursor-pointer hover:scale-110 transition-transform"
                onClick={() => {
                  const randomPhrase = mascotPhrases[Math.floor(Math.random() * mascotPhrases.length)]
                  setMascotPhrase(randomPhrase)
                  setTimeout(() => setMascotPhrase(''), 3000)
                }}
              />
            </div>
            {mascotPhrase && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-neon-purple/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-fade-in z-10">
                {mascotPhrase}
              </div>
            )}
          </div>

          {/* Center - Main disclaimer text */}
          <div className="flex-1 text-center relative">
            <div className={`${footerVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-2000 delay-500`}>
              <h3 className="text-2xl font-bold text-neon-purple neon-text mb-4">
                🎭 ВНИМАНИЕ! 🎭
              </h3>
              <div className="bg-black/60 rounded-lg p-6 border border-neon-purple/50 backdrop-blur">
                <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Этот сайт — <span className="text-neon-purple font-bold">шуточный мемный проект</span> для веселья и креатива. 
                  Все персонажи, мем-контракты и монеты здесь <span className="text-neon-blue font-bold">вымышлены</span>, 
                  созданы ради шуток, и <span className="text-death-red font-bold">не имеют юридической силы</span>. 
                  Не воспринимайте "Банк Судьбы" всерьёз — 
                  <span className="text-neon-pink font-bold">играйте и улыбайтесь!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Animated Coin */}
          <div className="relative">
            <div 
              className={`cursor-pointer ${footerVisible ? 'animate-spin-slow' : ''} transition-all duration-1000 hover:scale-110`}
              onMouseEnter={() => setShowFooterEmojis(true)}
              onMouseLeave={() => setShowFooterEmojis(false)}
            >
              <img 
                src="/img/7f22151e-7dd0-4d0c-889f-9bb48e7af0df.jpg"
                alt="Mystical Coin"
                className="w-20 h-20 object-cover rounded-full neon-glow"
              />
            </div>
            
            {/* Floating emojis on hover */}
            {showFooterEmojis && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-8 -left-4 animate-bounce text-2xl">😄</div>
                <div className="absolute -top-6 -right-6 animate-bounce text-2xl animation-delay-200ms">🍎</div>
                <div className="absolute -bottom-8 -left-2 animate-bounce text-2xl animation-delay-400ms">📜</div>
                <div className="absolute -bottom-6 -right-4 animate-bounce text-2xl animation-delay-600ms">✨</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom signature */}
        <div className={`mt-8 text-center ${footerVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-3000 delay-1000`}>
          <p className="text-sm text-gray-500">
            🎆 С любовью к мемам и юмору от команды poehali.dev 🚀
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemeDisclaimer