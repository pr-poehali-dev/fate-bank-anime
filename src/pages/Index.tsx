import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ContractsSection from "@/components/ContractsSection"
import MascotSection from "@/components/MascotSection"
import CoinsSection from "@/components/CoinsSection"
import NotebookSection from "@/components/NotebookSection"
import GamesSection from "@/components/GamesSection"
import Footer from "@/components/Footer"
import MemeDisclaimer from "@/components/MemeDisclaimer"

const Index = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [showMascot, setShowMascot] = useState(false)
  const [contractForm, setContractForm] = useState({ wish: '', style: 'Готический' })
  const [mascotPhrase, setMascotPhrase] = useState('')
  const [showFooterEmojis, setShowFooterEmojis] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

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

  const handleContractSubmit = () => {
    alert(`💀 Контракт подписан! Желание: "${contractForm.wish}" в стиле "${contractForm.style}". Но помни - это всё шутка! 😄`)
    setContractForm({ wish: '', style: 'Готический' })
  }

  const handleMascotReaction = (type: string) => {
    const phrases = {
      laugh: ["😈 Ха-ха! Твоя судьба уже решена - смеяться!", "🎭 Мемы — моя стихия!"],
      advice: ["📝 Мой совет: не воспринимай меня серьёзно!", "✨ Лучший контракт — это улыбка!"],
      predict: ["🔮 Предсказываю: ты будешь смеяться!", "🎆 Будущее полно мемов и веселья!"]
    }
    const randomPhrase = phrases[type as keyof typeof phrases][Math.floor(Math.random() * 2)]
    setMascotPhrase(randomPhrase)
    setTimeout(() => setMascotPhrase(''), 3000)
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
      {/* Floating mystical elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-6 h-6 bg-neon-purple rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-neon-blue rounded-full animate-float opacity-40 animation-delay-1000ms"></div>
        <div className="absolute bottom-32 left-32 w-8 h-8 bg-neon-pink rounded-full animate-float opacity-50 animation-delay-2000ms"></div>
      </div>

      <Header />
      
      <Hero 
        showMascot={showMascot} 
        currentPhrase={memePhrases[currentPhrase]} 
      />

      <ContractsSection 
        contractForm={contractForm}
        setContractForm={setContractForm}
        handleContractSubmit={handleContractSubmit}
      />

      <MascotSection 
        mascotPhrase={mascotPhrase}
        handleMascotReaction={handleMascotReaction}
      />

      <CoinsSection />

      <NotebookSection />

      <GamesSection />

      <Footer />

      <MemeDisclaimer 
        footerVisible={footerVisible}
        mascotPhrase={mascotPhrase}
        setMascotPhrase={setMascotPhrase}
        showFooterEmojis={showFooterEmojis}
        setShowFooterEmojis={setShowFooterEmojis}
        mascotPhrases={mascotPhrases}
      />
    </div>
  )
}

export default Index