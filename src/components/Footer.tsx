import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/30">
                Y
              </div>
              <span className="font-bold">
                <span className="gradient-text">Yogesh</span>
                <span className="text-slate-400"> Mahawar</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm">Full-Stack Developer & AI Engineer · Jaipur, India</p>
          </div>

          {/* Center */}
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Built with</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>using React + TailwindCSS</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-400/10 transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>

            <div className="w-px h-5 bg-white/10 mx-1" />

            <motion.button
              onClick={scrollTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-400/10 transition-all duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp size={17} />
            </motion.button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Yogesh Mahawar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
