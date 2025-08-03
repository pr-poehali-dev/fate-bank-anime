import { useCallback } from 'react'

interface DeathSounds {
  inkDrop: () => void
  paperFlip: () => void
  whisper: () => void
  rouletteSpin: () => void
  mysticalChime: () => void
  success: () => void
  error: () => void
  ryukLaugh: () => void
  writing: () => void
}

export const useDeathSounds = (): DeathSounds => {
  // Web Audio API context for better control
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    } catch (error) {
      // Fallback for browsers that don't support Web Audio API
      console.log('Audio context not available')
    }
  }, [])

  const playComplexSound = useCallback((frequencies: number[], durations: number[], types: OscillatorType[] = ['sine'], volume: number = 0.1) => {
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playSound(freq, durations[index] || 0.1, types[index] || 'sine', volume)
      }, index * 50)
    })
  }, [playSound])

  const inkDrop = useCallback(() => {
    // Low drip sound - simulates ink dropping
    playComplexSound([200, 150, 100], [0.1, 0.15, 0.2], ['sine', 'sine', 'sine'], 0.05)
  }, [playComplexSound])

  const paperFlip = useCallback(() => {
    // High frequency brief sound - simulates paper rustling
    playComplexSound([800, 600, 400], [0.05, 0.1, 0.15], ['sawtooth', 'triangle', 'sine'], 0.03)
  }, [playComplexSound])

  const whisper = useCallback(() => {
    // Low mysterious tone
    playComplexSound([80, 120, 90], [0.3, 0.4, 0.5], ['triangle', 'sine', 'triangle'], 0.02)
  }, [playComplexSound])

  const rouletteSpin = useCallback(() => {
    // Spinning wheel sound - increasing frequency
    const frequencies = Array.from({ length: 20 }, (_, i) => 300 + i * 10)
    const durations = Array(20).fill(0.05)
    playComplexSound(frequencies, durations, Array(20).fill('sawtooth'), 0.04)
  }, [playComplexSound])

  const mysticalChime = useCallback(() => {
    // Magical bell-like sound
    playComplexSound([523, 659, 784, 1047], [0.2, 0.3, 0.4, 0.5], ['sine', 'sine', 'sine', 'sine'], 0.06)
  }, [playComplexSound])

  const success = useCallback(() => {
    // Ascending triumphant sound
    playComplexSound([440, 554, 659, 880], [0.1, 0.1, 0.1, 0.3], ['sine', 'sine', 'sine', 'sine'], 0.08)
  }, [playComplexSound])

  const error = useCallback(() => {
    // Descending ominous sound
    playComplexSound([400, 350, 300, 250], [0.1, 0.1, 0.1, 0.2], ['sawtooth', 'sawtooth', 'sawtooth', 'triangle'], 0.05)
  }, [playComplexSound])

  const ryukLaugh = useCallback(() => {
    // Chaotic evil laugh simulation
    const frequencies = [150, 200, 180, 220, 160, 240, 190]
    const durations = [0.1, 0.05, 0.1, 0.05, 0.1, 0.05, 0.15]
    playComplexSound(frequencies, durations, Array(7).fill('triangle'), 0.04)
  }, [playComplexSound])

  const writing = useCallback(() => {
    // Scratching pen sound
    playComplexSound([1000, 800, 1200], [0.05, 0.1, 0.05], ['sawtooth', 'triangle', 'sawtooth'], 0.02)
  }, [playComplexSound])

  return {
    inkDrop,
    paperFlip,
    whisper,
    rouletteSpin,
    mysticalChime,
    success,
    error,
    ryukLaugh,
    writing
  }
}