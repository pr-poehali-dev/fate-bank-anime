import { ReactNode } from 'react'
import Navigation from './Navigation'
import AnimatedFooter from './AnimatedFooter'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-death-black death-note-bg relative overflow-hidden">
      <Navigation />
      <main className="relative z-10">
        {children}
      </main>
      <AnimatedFooter />
    </div>
  )
}

export default Layout