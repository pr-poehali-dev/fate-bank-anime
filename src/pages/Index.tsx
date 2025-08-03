import FateBankModule from "@/components/FateBankModule"
import AnimatedFooter from "@/components/AnimatedFooter"
import InteractiveBackground from "@/components/InteractiveBackground"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Fate Bank Module - The centerpiece */}
        <FateBankModule />
      </main>

      {/* Animated Footer */}
      <AnimatedFooter />
    </div>
  )
}

export default Index