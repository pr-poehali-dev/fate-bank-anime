import { useState, useRef, useEffect } from 'react'
import Icon from '@/components/ui/icon'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Мистический саундтрек (URL будет заменён на реальный трек)
  const audioUrl = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZAzaR2e/LeSsGKWrI8N+OPwsTUaLX3J5BFggmY7Dr7t18WRfT"

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Fallback if audio fails to play
        console.log('Audio play failed - user interaction required')
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main music button */}
      <div
        className="relative group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <button
          onClick={togglePlay}
          className={`
            w-14 h-14 rounded-full border-2 border-purple-400 
            bg-gradient-to-br from-purple-900/80 to-blue-900/80 
            backdrop-blur-sm shadow-2xl shadow-purple-500/25
            flex items-center justify-center
            transition-all duration-300 hover:scale-110
            ${isPlaying ? 'animate-pulse' : ''}
          `}
        >
          <Icon 
            name={isPlaying ? 'Pause' : 'Play'} 
            size={24} 
            className="text-purple-300 ml-1" 
          />
          
          {/* Glow effect when playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping" />
          )}
        </button>

        {/* Sound waves animation */}
        {isPlaying && (
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-purple-400 rounded-full animate-pulse"
                style={{
                  height: '20px',
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}

        {/* Controls panel */}
        {showControls && (
          <div className="absolute bottom-16 right-0 bg-purple-900/95 border border-purple-400/50 rounded-lg px-4 py-3 backdrop-blur-sm animate-slide-down">
            <div className="flex flex-col items-center space-y-3 min-w-32">
              <span className="text-purple-300 text-sm font-medium">
                🎵 Death Note OST
              </span>
              
              {/* Volume control */}
              <div className="flex items-center space-x-2">
                <Icon name="Volume2" size={16} className="text-purple-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-purple-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              {/* Status */}
              <div className="text-xs text-purple-400">
                {isPlaying ? '▶ Играет' : '⏸ Пауза'}
              </div>
            </div>
            
            {/* Tooltip arrow */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-purple-400/50"></div>
          </div>
        )}
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={audioUrl} type="audio/wav" />
        {/* Fallback silence for browsers that don't support the format */}
      </audio>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  )
}

export default MusicPlayer