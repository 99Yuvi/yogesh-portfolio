import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AiChat from './components/AiChat'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import SocialProof from './components/SocialProof'

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-900 text-slate-100">
      {/* Global UI */}
      <ScrollProgress />
      <CustomCursor />

      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating widgets */}
      <WhatsAppButton />
      <AiChat />
      <SocialProof />
    </div>
  )
}
