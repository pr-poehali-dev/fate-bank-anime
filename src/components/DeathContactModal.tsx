import { useState } from 'react'
import Icon from '@/components/ui/icon'

interface DeathContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const DeathContactModal = ({ isOpen, onClose }: DeathContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showRyuk, setShowRyuk] = useState(false)

  const ryukComments = {
    name: "Какое интересное имя... Запишу его в свою тетрадь 📝",
    email: "Электронная почта... Технологии людей забавны 🤔",
    message: "Твои слова станут частью судьбы... ✍️",
    error: "Хм? Что-то пошло не так... Людские ошибки неизбежны 😏",
    success: "Интересно... Что же решит судьба? 👹"
  }

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = "L говорит: \"Имя - основа идентификации\""
        } else if (value.length < 2) {
          newErrors.name = "Рюк смеется: \"Слишком короткое имя для тетради\""
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) {
          newErrors.email = "L настаивает: \"Контакт необходим\""
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Рюк хмыкает: \"Людская почта должна быть правильной\""
        } else {
          delete newErrors.email
        }
        break
      case 'message':
        if (!value.trim()) {
          newErrors.message = "L размышляет: \"Пустые слова не имеют силы\""
        } else if (value.length < 10) {
          newErrors.message = "Рюк зевает: \"Слишком скучно... Добавь деталей\""
        } else {
          delete newErrors.message
        }
        break
    }
    
    setErrors(newErrors)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    validateField(field, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    Object.keys(formData).forEach(field => {
      validateField(field, formData[field as keyof typeof formData])
    })
    
    if (Object.keys(errors).length > 0) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    setShowRyuk(true)
    
    // Auto close after success animation
    setTimeout(() => {
      setIsSuccess(false)
      setShowRyuk(false)
      setFormData({ name: '', email: '', message: '' })
      onClose()
    }, 4000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" />
      
      {/* Success State */}
      {isSuccess && (
        <div className="relative z-10 text-center animate-fade-in">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-black rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-gradient-to-br from-gray-900 to-black rounded-full border border-red-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="BookOpen" size={48} className="text-red-400 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-red-400 animate-typewriter">
                Мем-контракт создан!
              </h3>
              <p className="text-xl text-gray-300 animate-fade-in-delay">
                Уникальная мем-монета-череп уже в пути!
              </p>
            </div>
          </div>
          
          {/* Ryuk appears */}
          {showRyuk && (
            <div className="animate-slide-up">
              <div className="text-6xl mb-4 animate-bounce">👹</div>
              <p className="text-lg text-purple-300 italic animate-typewriter-slow">
                "Поздравляю! Твоя мем-монета-череп скоро прибудет в ФиФи Банк!"
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Form Modal */}
      {!isSuccess && (
        <div className="relative z-10 w-full max-w-md mx-auto animate-scale-in">
          <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl border border-red-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
            {/* Ink drip effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-900 via-red-700 to-red-900 opacity-50" />
            
            {/* Blood drops animation */}
            <div className="absolute top-4 right-8 w-2 h-2 bg-red-600 rounded-full animate-ping opacity-60" />
            <div className="absolute top-8 right-12 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-40" />
            
            {/* Header */}
            <div className="relative p-6 border-b border-red-500/20">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-full animate-pulse" />
                  <div className="absolute inset-2 bg-black rounded-full border border-red-500/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Feather" size={24} className="text-red-400" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-red-400 mb-2">
                  ФиФи Банк
                </h2>
                <p className="text-gray-400 text-sm">
                  Создайте мем-контракт для получения черепов
                </p>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Имя
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : formData.name 
                        ? 'border-green-500 focus:ring-green-500/50'
                        : 'border-gray-600 focus:ring-red-500/50'
                    }`}
                    placeholder="Введите ваше имя..."
                  />
                  {formData.name && !errors.name && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Icon name="Check" size={20} className="text-green-400" />
                    </div>
                  )}
                </div>
                {errors.name && (
                  <p className="text-sm text-red-400 animate-shake">
                    👹 {errors.name}
                  </p>
                )}
              </div>
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : formData.email 
                        ? 'border-green-500 focus:ring-green-500/50'
                        : 'border-gray-600 focus:ring-red-500/50'
                    }`}
                    placeholder="your@email.com"
                  />
                  {formData.email && !errors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Icon name="Check" size={20} className="text-green-400" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 animate-shake">
                    🤔 {errors.email}
                  </p>
                )}
              </div>
              
              {/* Message Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Сообщение
                </label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : formData.message 
                        ? 'border-green-500 focus:ring-green-500/50'
                        : 'border-gray-600 focus:ring-red-500/50'
                    }`}
                    placeholder="Опишите какую мем-монету-череп хотите получить..."
                  />
                  {formData.message && !errors.message && (
                    <div className="absolute right-3 top-3">
                      <Icon name="Check" size={20} className="text-green-400" />
                    </div>
                  )}
                </div>
                {errors.message && (
                  <p className="text-sm text-red-400 animate-shake">
                    😴 {errors.message}
                  </p>
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="relative w-full group overflow-hidden"
              >
                <div className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 active:scale-95'
                }`}>
                  {/* Ink splatter effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span className="text-gray-300">Записываю в тетрадь...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} className="text-white" />
                        <span className="text-white">Создать мем-контракт</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Splatter animation on click */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-300 rounded-full opacity-0 group-active:animate-ping group-active:opacity-60" />
                </div>
              </button>
            </form>
            
            {/* Mysterious footer */}
            <div className="px-6 pb-4">
              <p className="text-xs text-gray-500 text-center italic">
                "Каждая мем-монета-череп уникальна и бесценна" - ФиФи Банк
              </p>
            </div>
          </div>
          
          {/* Floating ink drops */}
          <div className="absolute -top-4 -left-4 w-8 h-8 opacity-30">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-float" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 opacity-20">
            <div className="w-1 h-1 bg-red-500 rounded-full animate-float animation-delay-1000ms" />
          </div>
        </div>
      )}
    </div>
  )
}

export default DeathContactModal