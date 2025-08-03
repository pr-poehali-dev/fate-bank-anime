import { useState, useEffect } from "react"

import Hero from "@/components/Hero"
import ContractsSection from "@/components/ContractsSection"
import MascotSection from "@/components/MascotSection"
import CoinsSection from "@/components/CoinsSection"
import NotebookSection from "@/components/NotebookSection"
import GamesSection from "@/components/GamesSection"

import MemeDisclaimer from "@/components/MemeDisclaimer"
import InteractiveBackground from "@/components/InteractiveBackground"
import MemeToast from "@/components/MemeToast"
import AppleRain from "@/components/AppleRain"
import RandomMascot from "@/components/RandomMascot"
import { useSoundEffects } from "@/components/SoundEffects"

interface ToastMessage {
  id: string
  message: string
  emoji: string
  type: 'success' | 'magic' | 'coin' | 'mascot'
}

const Index = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [showMascot, setShowMascot] = useState(false)
  const [contractForm, setContractForm] = useState({ wish: '', style: 'Готический' })
  const [mascotPhrase, setMascotPhrase] = useState('')
  const [showFooterEmojis, setShowFooterEmojis] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  
  // New animation states
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null)
  const [showAppleRain, setShowAppleRain] = useState(false)
  const [randomMascotTrigger, setRandomMascotTrigger] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const sounds = useSoundEffects()

  const memePhrases = [
    "💀 Сдавай судьбу — получай контракт!",
    "🍎 Яблоко знаний = Монета власти",
    "📜 Твоя душа стоит NFT?",
    "⚡ Контракт активирован!",
    "🌟 Магия монет работает!"
  ]

  const mascotPhrases = [
    "Тут только судьба и юмор! 😈",
    "Не забывай — это всё ради смеха! 🎭",
    "Контракты тут мемные, не настоящие! 😄",
    "Играй и улыбайся, друг! ✨",
    "Магия здесь — в веселье! 🪄"
  ]

  const showToast = (message: string, emoji: string, type: ToastMessage['type']) => {
    const toast: ToastMessage = {
      id: Date.now().toString(),
      message,
      emoji,
      type
    }
    setCurrentToast(toast)
  }

  const handleContractSubmit = () => {
    sounds.success()
    showToast("Контракт подписан! Но это всё шутка! 😄", "📜", "success")
    setContractForm({ wish: '', style: 'Готический' })
    
    // Trigger apple rain for successful contract
    setTimeout(() => setShowAppleRain(true), 500)
  }

  const handleMascotReaction = (type: string) => {
    sounds.mascot()
    
    const phrases = {
      laugh: ["😈 Ха-ха! Твоя судьба уже решена - смеяться!", "🎭 Мемы — моя стихия!"],
      advice: ["📝 Мой совет: не воспринимай меня серьёзно!", "✨ Лучший контракт — это улыбка!"],
      predict: ["🔮 Предсказываю: ты будешь смеяться!", "🎆 Будущее полно мемов и веселья!"]
    }
    const randomPhrase = phrases[type as keyof typeof phrases][Math.floor(Math.random() * 2)]
    setMascotPhrase(randomPhrase)
    setTimeout(() => setMascotPhrase(''), 3000)

    // Show mascot toast
    showToast("Маскот отвечает!", "🎭", "mascot")
  }

  // Enhanced click handler with sound effects
  const handleClick = (soundType: 'click' | 'magic' | 'coin') => {
    sounds[soundType]()
    setClickCount(prev => prev + 1)

    // Random mascot appearance every 10 clicks
    if (clickCount > 0 && clickCount % 10 === 0) {
      setRandomMascotTrigger(true)
    }

    // Special effects for certain actions
    if (soundType === 'magic') {
      showToast("Магия активирована! ✨", "🔮", "magic")
    } else if (soundType === 'coin') {
      showToast("Монета заработана! 🪙", "💰", "coin")
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowMascot(true), 500)
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % memePhrases.length)
    }, 3000)
    
    // Footer animation trigger
    const footerTimer = setTimeout(() => setFooterVisible(true), 2000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(phraseTimer)
      clearTimeout(footerTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-death-black death-note-bg relative overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />

      {/* Original floating elements (keeping for compatibility) */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-10 w-6 h-6 bg-neon-purple rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-neon-blue rounded-full animate-float opacity-40 animation-delay-1000ms"></div>
        <div className="absolute bottom-32 left-32 w-8 h-8 bg-neon-pink rounded-full animate-float opacity-50 animation-delay-2000ms"></div>
      </div>

      <Hero 
        showMascot={showMascot} 
        currentPhrase={memePhrases[currentPhrase]} 
      />

      <div onClick={() => handleClick('click')}>
        <ContractsSection 
          contractForm={contractForm}
          setContractForm={setContractForm}
          handleContractSubmit={handleContractSubmit}
        />
      </div>

      <div onClick={() => handleClick('magic')}>
        <MascotSection 
          mascotPhrase={mascotPhrase}
          handleMascotReaction={handleMascotReaction}
        />
      </div>

      <div onClick={() => handleClick('coin')}>
        <CoinsSection />
      </div>

      <NotebookSection />

      <GamesSection />



      <MemeDisclaimer 
        footerVisible={footerVisible}
        mascotPhrase={mascotPhrase}
        setMascotPhrase={setMascotPhrase}
        showFooterEmojis={showFooterEmojis}
        setShowFooterEmojis={setShowFooterEmojis}
        mascotPhrases={mascotPhrases}
      />

      {/* New Animation Components */}
      <MemeToast 
        toast={currentToast}
        onDismiss={() => setCurrentToast(null)}
      />

      <AppleRain 
        isActive={showAppleRain}
        onComplete={() => setShowAppleRain(false)}
      />

      <RandomMascot 
        trigger={randomMascotTrigger}
        onComplete={() => setRandomMascotTrigger(false)}
      />
    </div>
  )
}

export default Index