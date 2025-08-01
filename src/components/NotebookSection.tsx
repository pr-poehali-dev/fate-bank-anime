import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const NotebookSection = () => {
  return (
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
  )
}

export default NotebookSection