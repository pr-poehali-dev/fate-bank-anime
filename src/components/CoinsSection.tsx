import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const CoinsSection = () => {
  return (
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
  )
}

export default CoinsSection