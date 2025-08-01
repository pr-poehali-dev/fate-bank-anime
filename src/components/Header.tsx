import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const Header = () => {
  return (
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
  )
}

export default Header