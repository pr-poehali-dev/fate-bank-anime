import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Icon from "@/components/ui/icon"
import { useState, useEffect } from "react"

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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className={`space-y-8 ${showMascot ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-neon-purple neon-text animate-neon-pulse">
                БАНК<br />СУДЬБЫ
              </h1>
              <div className="h-16">
                <p className="text-xl text-neon-blue animate-glitch">
                  {memePhrases[currentPhrase]}
                </p>
              </div>
              <p className="text-base sm:text-lg text-gray-300 max-w-lg">
                Твой гайд по тёмным мем-контрактам и финансовым заклинаниям!
                Создавай NFT контракты судьбы и торгуй мистическими токенами.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white px-6 sm:px-8 py-3 text-base sm:text-lg neon-glow">
                <Icon name="FileText" className="mr-2" />
                Создать контракт
              </Button>
              <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 px-6 sm:px-8 py-3 text-base sm:text-lg">
                <Icon name="Coins" className="mr-2" />
                Магия монет
              </Button>
            </div>
          </div>

          {/* Right side - Mascot and Coin */}
          <div className="relative flex items-center justify-center">
            {/* Mascot */}
            <div className={`relative ${showMascot ? 'animate-scale-in' : 'opacity-0'}`}>
              <img 
                src="/img/bb2cf523-ae57-4a84-8fbd-7584e096e610.jpg"
                alt="Death Note Mascot"
                className="w-60 sm:w-80 h-60 sm:h-80 object-cover rounded-lg neon-glow animate-float"
              />
            </div>

            {/* Floating coin */}
            <div className="absolute -right-8 sm:-right-16 top-8 sm:top-16 animate-spin-slow">
              <img 
                src="/img/7f22151e-7dd0-4d0c-889f-9bb48e7af0df.jpg"
                alt="Mystical Coin"
                className="w-20 sm:w-32 h-20 sm:h-32 object-cover rounded-full neon-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Menu */}
      <nav className="fixed top-0 w-full bg-death-black/80 backdrop-blur-md border-b border-neon-purple/20 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-2xl font-bold text-neon-purple neon-text">💀 Банк Судьбы</div>
            <div className="hidden lg:flex space-x-6">
              {['Контракты', 'Маскот', 'Монеты', 'Тетрадь', 'Игры', 'Рейтинги'].map((item) => (
                <Button key={item} variant="ghost" className="text-white hover:text-neon-purple hover:bg-neon-purple/10 text-sm">
                  {item}
                </Button>
              ))}
            </div>
            <Button className="bg-neon-purple hover:bg-neon-purple/80 text-sm sm:text-base">
              <Icon name="User" className="mr-1 sm:mr-2" size={16} />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      {/* Contracts Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-neon-purple neon-text mb-4">
              📜 КОНТРАКТЫ СУДЬБЫ
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">Создавай мем-контракты и получай персональные NFT с пророчествами</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contract Form */}
            <Card className="bg-black/50 border-neon-purple/30 gothic-border">
              <CardHeader>
                <CardTitle className="text-neon-purple neon-text">Создать контракт судьбы</CardTitle>
                <CardDescription className="text-gray-400">
                  Введи своё желание или "финансовый грех"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white mb-2 block">Твоё желание:</label>
                  <Textarea 
                    placeholder="Хочу стать криптомиллионером..."
                    className="bg-black/70 border-neon-blue/50 text-white"
                    value={contractForm.wish}
                    onChange={(e) => setContractForm({...contractForm, wish: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-white mb-2 block">Стиль сертификата:</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Готический', 'Мемный', 'Мистический', 'Абсурдный'].map((style) => (
                      <Badge 
                        key={style} 
                        variant="outline" 
                        className={`cursor-pointer transition-all ${
                          contractForm.style === style 
                            ? 'border-neon-purple bg-neon-purple/20 text-neon-purple' 
                            : 'border-neon-purple/50 text-neon-purple/70 hover:bg-neon-purple/10 hover:border-neon-purple'
                        }`}
                        onClick={() => setContractForm({...contractForm, style})}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full bg-neon-purple hover:bg-neon-purple/80 neon-glow transition-all hover:scale-105" 
                  onClick={handleContractSubmit}
                  disabled={!contractForm.wish.trim()}
                >
                  <Icon name="Scroll" className="mr-2" />
                  Подписать контракт
                </Button>
              </CardContent>
            </Card>

            {/* Gallery Preview */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-neon-blue neon-text">🎭 Галерея шедевров</h3>
              <div className="grid gap-4">
                {[
                  { title: "Контракт на успех", rating: "⭐⭐⭐⭐⭐", user: "@cryptowizard" },
                  { title: "Мемный NFT удачи", rating: "⭐⭐⭐⭐", user: "@memebaron" },
                  { title: "Заклинание богатства", rating: "⭐⭐⭐⭐⭐", user: "@richmagic" }
                ].map((contract, i) => (
                  <Card key={i} className="bg-black/30 border-neon-blue/20 hover:border-neon-blue/50 transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{contract.title}</p>
                          <p className="text-gray-400 text-sm">{contract.user}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-neon-purple">{contract.rating}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mascot Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-neon-purple neon-text mb-8">
            🎭 НАШИЙ МАСКОТ
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-black/50 border-neon-purple/30">
              <CardHeader>
                <CardTitle className="text-neon-purple">💀 Лор героя</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Мистический гид между мирами криптовалют и судьбы. 
                  Владеет тетрадью контрактов и знает все секреты NFT магии.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-neon-blue/30">
              <CardHeader>
                <CardTitle className="text-neon-blue">🎲 Мем-реакции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all hover:scale-105"
                    onClick={() => handleMascotReaction('laugh')}
                  >
                    Рассмеши меня!
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-neon-pink text-neon-pink hover:bg-neon-pink/10 transition-all hover:scale-105"
                    onClick={() => handleMascotReaction('advice')}
                  >
                    Дай совет
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all hover:scale-105"
                    onClick={() => handleMascotReaction('predict')}
                  >
                    Предскажи будущее
                  </Button>
                  {mascotPhrase && (
                    <div className="mt-4 p-3 bg-neon-purple/20 rounded-lg border border-neon-purple/50 animate-fade-in">
                      <p className="text-neon-purple text-center font-medium">{mascotPhrase}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-neon-pink/30">
              <CardHeader>
                <CardTitle className="text-neon-pink">🏆 Ачивки эмоций</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['😈 Дьявольский смех', '🤔 Мудрая задумчивость', '⚡ Электрический восторг'].map((achievement) => (
                    <Badge key={achievement} className="bg-neon-pink/20 text-neon-pink border-neon-pink/50">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coins Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-neon-blue neon-text mb-4">
              🪙 МАГИЯ МОНЕТ
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">Зарабатывай, трать и коллекционируй мистические токены</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { name: "Death Coin", power: "Основная валюта", rarity: "Обычная", color: "neon-purple" },
              { name: "Soul Token", power: "Редкая магия", rarity: "Редкая", color: "neon-blue" },
              { name: "Fate NFT", power: "Изменение судьбы", rarity: "Эпическая", color: "neon-pink" },
              { name: "Meme Essence", power: "Вирусная сила", rarity: "Легендарная", color: "death-red" }
            ].map((coin, i) => (
              <Card key={i} className={`bg-black/50 border-${coin.color}/30 hover:border-${coin.color}/70 transition-all cursor-pointer group`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 animate-spin-slow group-hover:animate-neon-pulse"></div>
                  <h3 className={`text-xl font-bold text-${coin.color} neon-text mb-2`}>{coin.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{coin.power}</p>
                  <Badge className={`bg-${coin.color}/20 text-${coin.color} border-${coin.color}/50`}>
                    {coin.rarity}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coin Battle */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-neon-purple neon-text mb-6 sm:mb-8">⚔️ Монетные битвы</h3>
            <div className="bg-black/50 rounded-lg p-8 border border-neon-purple/30">
              <p className="text-gray-300 mb-6">Участвуй в еженедельных битвах за редкие NFT!</p>
              <div className="flex justify-center gap-4">
                <Button className="bg-neon-purple hover:bg-neon-purple/80">
                  <Icon name="Sword" className="mr-2" />
                  Начать битву
                </Button>
                <Button variant="outline" className="border-neon-blue text-neon-blue">
                  <Icon name="Trophy" className="mr-2" />
                  Рейтинг
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Death Note / Notebook Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-neon-purple neon-text mb-4">
              📖 ТЕТРАДЬ СУДЬБЫ
            </h2>
            <p className="text-xl text-gray-300">Твоя персональная лента контрактов и достижений</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Feed */}
            <div>
              <h3 className="text-2xl font-bold text-neon-blue neon-text mb-6">📜 Твои записи</h3>
              <div className="space-y-4">
                {[
                  { type: "Контракт", title: "Заклинание успеха", status: "Активен", date: "Сегодня" },
                  { type: "Пророчество", title: "Предсказание богатства", status: "Исполнен", date: "Вчера" },
                  { type: "NFT", title: "Мемная душа #1337", status: "Продан", date: "2 дня назад" }
                ].map((record, i) => (
                  <Card key={i} className="bg-black/50 border-neon-purple/20 hover:border-neon-purple/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/50 mb-2">
                            {record.type}
                          </Badge>
                          <p className="text-white font-medium">{record.title}</p>
                          <p className="text-gray-400 text-sm">{record.date}</p>
                        </div>
                        <Badge 
                          variant="outline"
                          className={`${
                            record.status === 'Активен' ? 'border-neon-blue text-neon-blue' :
                            record.status === 'Исполнен' ? 'border-green-400 text-green-400' :
                            'border-neon-pink text-neon-pink'
                          }`}
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Top Records */}
            <div>
              <h3 className="text-2xl font-bold text-neon-pink neon-text mb-6">👑 Топ записей</h3>
              <div className="space-y-4">
                {[
                  { title: "Я продал душу за NFT обезьяны", votes: "1337", author: "@cryptodegenerate" },
                  { title: "Контракт на миллион лайков", votes: "666", author: "@viralking" },
                  { title: "Заклинание вечного холда", votes: "420", author: "@diamondhands" }
                ].map((record, i) => (
                  <Card key={i} className="bg-black/50 border-neon-pink/20 hover:border-neon-pink/50 transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{record.title}</p>
                          <p className="text-gray-400 text-sm">{record.author}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-neon-pink font-bold">👍 {record.votes}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Games Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-neon-blue neon-text mb-4">
              🎮 МИНИ-ИГРЫ
            </h2>
            <p className="text-xl text-gray-300">Играй и зарабатывай мистические награды</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "🔮 Угадай пророчество!",
                description: "Предскажи будущее крипторынка",
                reward: "Мемный NFT",
                color: "neon-purple"
              },
              {
                title: "🍎 Яблочный баттл",
                description: "Собери больше всех рефералов",
                reward: "Death Coins",
                color: "neon-blue"
              },
              {
                title: "⚡ Тёмные сделки",
                description: "Боевая мини-игра на везение",
                reward: "Rare Tokens",
                color: "neon-pink"
              }
            ].map((game, i) => (
              <Card key={i} className={`bg-black/50 border-${game.color}/30 hover:border-${game.color}/70 transition-all cursor-pointer group`}>
                <CardHeader>
                  <CardTitle className={`text-${game.color} neon-text`}>{game.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge className={`bg-${game.color}/20 text-${game.color} border-${game.color}/50`}>
                        Награда: {game.reward}
                      </Badge>
                    </div>
                    <Button className={`w-full bg-${game.color} hover:bg-${game.color}/80 group-hover:neon-glow`}>
                      <Icon name="Play" className="mr-2" />
                      Играть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-black/50 border-t border-neon-purple/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-neon-purple neon-text mb-4">💀 Банк Судьбы</h3>
              <p className="text-gray-400">
                Мистический NFT маркетплейс для торговли контрактами судьбы и мемными токенами.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Разделы</h4>
              <div className="space-y-2">
                {['Контракты', 'Маскот', 'Монеты', 'Тетрадь', 'Игры'].map((item) => (
                  <p key={item} className="text-gray-400 hover:text-neon-purple cursor-pointer transition-colors">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Поддержка</h4>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-neon-blue cursor-pointer transition-colors">FAQ</p>
                <p className="text-gray-400 hover:text-neon-blue cursor-pointer transition-colors">Правила</p>
                <p className="text-gray-400 hover:text-neon-blue cursor-pointer transition-colors">Контакты</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Связь</h4>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                  <Icon name="MessageCircle" />
                </Button>
                <Button size="sm" variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                  <Icon name="Mail" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neon-purple/20 text-center">
            <p className="text-gray-400">
              © 2024 Банк Судьбы. Все контракты защищены мистической магией. 
              <span className="text-neon-purple ml-2">⚡ Powered by Death Note Energy</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Meme Disclaimer Footer */}
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
    </div>
  )
}

export default Index