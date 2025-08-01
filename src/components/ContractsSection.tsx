import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Icon from "@/components/ui/icon"

interface ContractsSectionProps {
  contractForm: { wish: string; style: string }
  setContractForm: (form: { wish: string; style: string }) => void
  handleContractSubmit: () => void
}

const ContractsSection = ({ contractForm, setContractForm, handleContractSubmit }: ContractsSectionProps) => {
  return (
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
  )
}

export default ContractsSection