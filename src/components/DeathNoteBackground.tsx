import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  char: string
  opacity: number
  fadeRate: number
  size: number
  glow: boolean
}

interface NotePage {
  x: number
  y: number
  rotation: number
  rotationSpeed: number
  opacity: number
  scale: number
  scaleDirection: number
  glitchTime: number
}

interface MysticEye {
  x: number
  y: number
  size: number
  opacity: number
  blinkTimer: number
  glowIntensity: number
}

const DeathNoteBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const notePagesRef = useRef<NotePage[]>([])
  const mysticEyesRef = useRef<MysticEye[]>([])

  // Символы и имена для анимации
  const deathNoteSymbols = [
    'デスノート', 'DEATH', 'LIFE', 'RYUK', 'LIGHT', 'KIRA', 
    '死', '神', '審判', '命', '運命', '正義',
    'Смерть', 'Судьба', 'Справедливость', 'Закон', 'Власть', 'Истина',
    'L', 'Misa', 'Near', 'Mello', 'Rem', 'Watari',
    '♠', '♦', '♣', '♥', '◊', '△', '◯', '□',
    '†', '‡', '☠', '⚡', '✦', '★', '◈', '◉'
  ]

  const createParticle = (canvas: HTMLCanvasElement): Particle => ({
    x: Math.random() * canvas.width,
    y: -50,
    vx: (Math.random() - 0.5) * 2,
    vy: Math.random() * 3 + 1,
    char: deathNoteSymbols[Math.floor(Math.random() * deathNoteSymbols.length)],
    opacity: Math.random() * 0.8 + 0.2,
    fadeRate: Math.random() * 0.005 + 0.001,
    size: Math.random() * 20 + 12,
    glow: Math.random() > 0.7
  })

  const createNotePage = (canvas: HTMLCanvasElement): NotePage => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    opacity: Math.random() * 0.3 + 0.1,
    scale: Math.random() * 0.5 + 0.3,
    scaleDirection: Math.random() > 0.5 ? 1 : -1,
    glitchTime: 0
  })

  const createMysticEye = (canvas: HTMLCanvasElement): MysticEye => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 80 + 40,
    opacity: 0,
    blinkTimer: Math.random() * 300 + 200,
    glowIntensity: 0
  })

  const drawNotePage = (ctx: CanvasRenderingContext2D, page: NotePage) => {
    ctx.save()
    ctx.translate(page.x, page.y)
    ctx.rotate((page.rotation * Math.PI) / 180)
    ctx.scale(page.scale, page.scale)
    
    // Глитч-эффект
    if (page.glitchTime > 0) {
      ctx.translate(Math.random() * 10 - 5, Math.random() * 10 - 5)
    }
    
    ctx.globalAlpha = page.opacity
    
    // Контур листа с неоновым свечением
    ctx.strokeStyle = `rgba(138, 43, 226, ${page.opacity * 0.8})`
    ctx.lineWidth = 2
    ctx.shadowColor = '#8A2BE2'
    ctx.shadowBlur = 15
    
    // Рисуем лист тетради
    ctx.beginPath()
    ctx.rect(-100, -140, 200, 280)
    ctx.stroke()
    
    // Линии на листе
    ctx.strokeStyle = `rgba(100, 100, 255, ${page.opacity * 0.4})`
    ctx.lineWidth = 1
    ctx.shadowBlur = 5
    
    for (let i = -120; i < 120; i += 20) {
      ctx.beginPath()
      ctx.moveTo(-90, i)
      ctx.lineTo(90, i)
      ctx.stroke()
    }
    
    // Мистические символы на листе
    ctx.fillStyle = `rgba(255, 255, 255, ${page.opacity * 0.7})`
    ctx.font = '16px serif'
    ctx.textAlign = 'center'
    ctx.shadowColor = '#FFFFFF'
    ctx.shadowBlur = 8
    
    const symbols = ['死神', 'DEATH', 'キラ']
    symbols.forEach((symbol, index) => {
      ctx.fillText(symbol, 0, -80 + index * 40)
    })
    
    ctx.restore()
  }

  const drawMysticEye = (ctx: CanvasRenderingContext2D, eye: MysticEye) => {
    if (eye.opacity <= 0) return
    
    ctx.save()
    ctx.globalAlpha = eye.opacity
    
    // Внешнее свечение
    const gradient = ctx.createRadialGradient(
      eye.x, eye.y, 0,
      eye.x, eye.y, eye.size
    )
    gradient.addColorStop(0, `rgba(255, 0, 0, ${eye.glowIntensity})`)
    gradient.addColorStop(0.5, `rgba(138, 43, 226, ${eye.glowIntensity * 0.5})`)
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(eye.x - eye.size, eye.y - eye.size, eye.size * 2, eye.size * 2)
    
    // Глаз
    ctx.strokeStyle = `rgba(255, 255, 255, ${eye.opacity})`
    ctx.lineWidth = 3
    ctx.shadowColor = '#FFFFFF'
    ctx.shadowBlur = 10
    
    // Внешний контур глаза
    ctx.beginPath()
    ctx.ellipse(eye.x, eye.y, eye.size * 0.4, eye.size * 0.25, 0, 0, Math.PI * 2)
    ctx.stroke()
    
    // Зрачок
    ctx.fillStyle = `rgba(255, 0, 0, ${eye.opacity * 0.8})`
    ctx.beginPath()
    ctx.ellipse(eye.x, eye.y, eye.size * 0.15, eye.size * 0.15, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Блик в глазу
    ctx.fillStyle = `rgba(255, 255, 255, ${eye.opacity})`
    ctx.beginPath()
    ctx.ellipse(eye.x - eye.size * 0.05, eye.y - eye.size * 0.05, eye.size * 0.05, eye.size * 0.05, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Очистка с градиентом
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#000000')
    gradient.addColorStop(0.5, '#0a0a0a')
    gradient.addColorStop(1, '#000000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Анимация падающих символов
    particlesRef.current.forEach((particle, index) => {
      particle.y += particle.vy
      particle.x += particle.vx
      particle.opacity -= particle.fadeRate
      
      // Эффект свечения для особых символов
      if (particle.glow) {
        ctx.shadowColor = '#8A2BE2'
        ctx.shadowBlur = 20
      } else {
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
      }
      
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.glow ? '#FFFFFF' : `rgba(138, 43, 226, ${particle.opacity})`
      ctx.font = `${particle.size}px serif`
      ctx.textAlign = 'center'
      ctx.fillText(particle.char, particle.x, particle.y)
      
      // Удаление частиц
      if (particle.y > canvas.height + 50 || particle.opacity <= 0) {
        particlesRef.current[index] = createParticle(canvas)
      }
    })
    
    // Анимация листов тетради
    notePagesRef.current.forEach(page => {
      page.rotation += page.rotationSpeed
      page.scale += page.scaleDirection * 0.002
      
      if (page.scale > 0.8) {
        page.scaleDirection = -1
      } else if (page.scale < 0.2) {
        page.scaleDirection = 1
      }
      
      // Случайные глитчи
      if (Math.random() < 0.005) {
        page.glitchTime = 10
      }
      if (page.glitchTime > 0) {
        page.glitchTime--
      }
      
      drawNotePage(ctx, page)
    })
    
    // Анимация мистических глаз
    mysticEyesRef.current.forEach(eye => {
      eye.blinkTimer--
      
      if (eye.blinkTimer <= 0) {
        if (eye.opacity === 0) {
          eye.opacity = 0.8
          eye.glowIntensity = 0.6
          eye.blinkTimer = 120 + Math.random() * 180
        } else {
          eye.opacity = 0
          eye.glowIntensity = 0
          eye.blinkTimer = 300 + Math.random() * 500
          // Перемещаем глаз в новое место
          eye.x = Math.random() * canvas.width
          eye.y = Math.random() * canvas.height
        }
      }
      
      drawMysticEye(ctx, eye)
    })
    
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Инициализация частиц
    particlesRef.current = Array.from({ length: 50 }, () => createParticle(canvas))
    notePagesRef.current = Array.from({ length: 6 }, () => createNotePage(canvas))
    mysticEyesRef.current = Array.from({ length: 3 }, () => createMysticEye(canvas))
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ 
        background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 100%)',
        filter: 'contrast(1.2) brightness(0.9)'
      }}
    />
  )
}

export default DeathNoteBackground