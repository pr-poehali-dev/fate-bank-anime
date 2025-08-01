import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const Footer = () => {
  return (
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
  )
}

export default Footer