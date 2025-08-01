import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useState, useEffect } from "react"

interface HeroProps {
  showMascot: boolean
  currentPhrase: string
}

const Hero = ({ showMascot, currentPhrase }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side - Text content */}
        <div className={`space-y-8 ${showMascot ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-neon-purple neon-text animate-neon-pulse">
              БАНК<br />СУДЬБЫ
            </h1>
            <div className="h-16">
              <p className="text-xl text-neon-blue animate-glitch">
                {currentPhrase}
              </p>
            </div>
            <p className="text-base sm:text-lg text-gray-300 max-w-lg">
              Твой гайд по тёмным мем-контрактам и финансовым заклинаниям!
              Создавай NFT контракты судьбы и торгуй мистическими токенами.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white px-6 sm:px-8 py-3 text-base sm:text-lg neon-glow">
              <Icon name="FileText" className="mr-2" />
              Создать контракт
            </Button>
            <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 px-6 sm:px-8 py-3 text-base sm:text-lg">
              <Icon name="Coins" className="mr-2" />
              Магия монет
            </Button>
          </div>
        </div>

        {/* Right side - Mascot and Coin */}
        <div className="relative flex items-center justify-center">
          {/* Mascot */}
          <div className={`relative ${showMascot ? 'animate-scale-in' : 'opacity-0'}`}>
            <img 
              src="/img/bb2cf523-ae57-4a84-8fbd-7584e096e610.jpg"
              alt="Death Note Mascot"
              className="w-60 sm:w-80 h-60 sm:h-80 object-cover rounded-lg neon-glow animate-float"
            />
          </div>

          {/* Floating coin */}
          <div className="absolute -right-8 sm:-right-16 top-8 sm:top-16 animate-spin-slow">
            <img 
              src="/img/7f22151e-7dd0-4d0c-889f-9bb48e7af0df.jpg"
              alt="Mystical Coin"
              className="w-20 sm:w-32 h-20 sm:h-32 object-cover rounded-full neon-glow"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero