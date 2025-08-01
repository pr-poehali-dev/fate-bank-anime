import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const GamesSection = () => {
  return (
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
  )
}

export default GamesSection