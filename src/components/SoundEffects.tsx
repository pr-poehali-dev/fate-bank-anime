import { useRef } from 'react'

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null)

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }

  const playBeep = (frequency: number, duration: number, volume: number = 0.1) => {
    const audioContext = initAudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }

  const soundEffects = {
    click: () => playBeep(800, 0.1, 0.1),
    success: () => {
      playBeep(523, 0.1, 0.1) // C5
      setTimeout(() => playBeep(659, 0.1, 0.1), 100) // E5
      setTimeout(() => playBeep(784, 0.2, 0.1), 200) // G5
    },
    error: () => {
      playBeep(300, 0.1, 0.1)
      setTimeout(() => playBeep(250, 0.1, 0.1), 100)
      setTimeout(() => playBeep(200, 0.2, 0.1), 200)
    },
    magic: () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          playBeep(400 + i * 100, 0.1, 0.05)
        }, i * 50)
      }
    },
    coin: () => {
      playBeep(880, 0.1, 0.1)
      setTimeout(() => playBeep(1108, 0.1, 0.1), 100)
    },
    mascot: () => {
      playBeep(659, 0.05, 0.08) // E5
      setTimeout(() => playBeep(784, 0.05, 0.08), 50) // G5
      setTimeout(() => playBeep(880, 0.1, 0.08), 100) // A5
    }
  }

  return soundEffects
}

const SoundEffects = () => {
  return null // This is a hook component, no UI needed
}

export default SoundEffects