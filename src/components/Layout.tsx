import { ReactNode } from 'react'
import Navigation from './Navigation'
import AnimatedFooter from './AnimatedFooter'
import DeathNoteBackground from './DeathNoteBackground'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-death-black relative overflow-hidden">
      <DeathNoteBackground />
      <Navigation />
      <main className="relative z-10">
        {children}
      </main>
      <AnimatedFooter />
    </div>
  )
}

export default Layout