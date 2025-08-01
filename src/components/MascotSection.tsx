import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MascotSectionProps {
  mascotPhrase: string
  handleMascotReaction: (type: string) => void
}

const MascotSection = ({ mascotPhrase, handleMascotReaction }: MascotSectionProps) => {
  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-neon-purple neon-text mb-8">
          🎭 НАШИЙ МАСКОТ
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
  )
}

export default MascotSection