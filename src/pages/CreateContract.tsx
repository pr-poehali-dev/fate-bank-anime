import { useState } from 'react'
import MemeCoin from '@/components/MemeCoin'
import Icon from '@/components/ui/icon'

const CreateContract = () => {
  const [formData, setFormData] = useState({
    name: '',
    wish: '',
    sacrifice: '',
    timeLimit: '24h'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contractCreated, setContractCreated] = useState(false)
  const [contractNumber, setContractNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      const randomContract = Math.floor(Math.random() * 999999) + 100000
      setContractNumber(randomContract.toString())
      setContractCreated(true)
      setIsSubmitting(false)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const resetForm = () => {
    setFormData({ name: '', wish: '', sacrifice: '', timeLimit: '24h' })
    setContractCreated(false)
    setContractNumber('')
  }

  if (contractCreated) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <MemeCoin size="large" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              ✨ Контракт Заключён! ✨
            </h1>
            <p className="text-purple-300 text-lg">
              Твоя судьба теперь в руках мистических сил...
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">📜 Контракт Судьбы</h2>
              <p className="text-purple-300">№ {contractNumber}</p>
            </div>

            <div className="space-y-4 text-white">
              <div className="flex items-start space-x-3">
                <Icon name="User" size={20} className="text-purple-400 mt-1" />
                <div>
                  <span className="text-purple-400 font-medium">Контрактор:</span>
                  <p className="text-lg">{formData.name}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon name="Star" size={20} className="text-purple-400 mt-1" />
                <div>
                  <span className="text-purple-400 font-medium">Желание:</span>
                  <p className="text-lg">{formData.wish}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon name="Flame" size={20} className="text-purple-400 mt-1" />
                <div>
                  <span className="text-purple-400 font-medium">Жертва:</span>
                  <p className="text-lg">{formData.sacrifice}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon name="Clock" size={20} className="text-purple-400 mt-1" />
                <div>
                  <span className="text-purple-400 font-medium">Срок исполнения:</span>
                  <p className="text-lg">{formData.timeLimit}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-red-900/30 border border-red-400/50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-red-400 mt-1" />
                <div className="text-red-300">
                  <p className="font-medium mb-2">⚠️ Предупреждение:</p>
                  <p className="text-sm">
                    Контракт имеет юридическую силу только в мемной вселенной. 
                    В реальном мире это просто развлечение! 😄
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                Создать новый контракт
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <MemeCoin size="medium" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            📜 Создать Мем-Контракт Судьбы
          </h1>
          <p className="text-purple-300 text-lg">
            Заключи договор с мистическими силами! Но помни - это всего лишь игра! 😈
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/50 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                <Icon name="User" size={16} className="inline mr-2" />
                Твоё имя (или псевдоним)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-400/50 rounded-lg text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none transition-all duration-300"
                placeholder="Введи своё имя..."
              />
            </div>

            <div>
              <label className="block text-purple-300 font-medium mb-2">
                <Icon name="Star" size={16} className="inline mr-2" />
                Твоё желание
              </label>
              <textarea
                name="wish"
                value={formData.wish}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-400/50 rounded-lg text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Чего ты желаешь больше всего?"
              />
            </div>

            <div>
              <label className="block text-purple-300 font-medium mb-2">
                <Icon name="Flame" size={16} className="inline mr-2" />
                Что готов пожертвовать?
              </label>
              <textarea
                name="sacrifice"
                value={formData.sacrifice}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-400/50 rounded-lg text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Какую цену готов заплатить?"
              />
            </div>

            <div>
              <label className="block text-purple-300 font-medium mb-2">
                <Icon name="Clock" size={16} className="inline mr-2" />
                Срок исполнения
              </label>
              <select
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-400/50 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-all duration-300"
              >
                <option value="24h">24 часа</option>
                <option value="3d">3 дня</option>
                <option value="1w">1 неделя</option>
                <option value="1m">1 месяц</option>
                <option value="forever">Навсегда</option>
              </select>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-2xl
                  ${isSubmitting 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105 shadow-purple-500/25'
                  }
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Заключаю контракт...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Icon name="FileSignature" size={20} />
                    <span>Заключить контракт</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateContract