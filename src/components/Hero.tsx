import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Download } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

const roles = [
  'Full-Stack Developer',
  'AI Engineer',
  'WhatsApp API Specialist',
  'Laravel Expert',
  'GenAI Builder',
]

const floatingTechs = [
  { label: 'Laravel', color: '#FF2D20', x: '10%', y: '20%', delay: 0 },
  { label: 'React', color: '#61DAFB', x: '85%', y: '15%', delay: 0.5 },
  { label: 'Node.js', color: '#68A063', x: '75%', y: '70%', delay: 1 },
  { label: 'AI/LLM', color: '#A855F7', x: '5%', y: '75%', delay: 1.5 },
  { label: 'Next.js', color: '#ffffff', x: '88%', y: '45%', delay: 0.8 },
  { label: 'GenAI', color: '#F59E0B', x: '2%', y: '42%', delay: 0.3 },
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
          )
        },
        isDeleting ? 50 : 100
      )
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding pt-24">
      {/* Floating tech labels */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingTechs.map((tech, i) => (
          <motion.div
            key={tech.label}
            className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
            style={{
              left: tech.x,
              top: tech.y,
              background: `${tech.color}15`,
              border: `1px solid ${tech.color}40`,
              color: tech.color,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: tech.delay,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: tech.color }}
            />
            {tech.label}
          </motion.div>
        ))}
      </div>

      <div className="container-max w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6"
          >
            <Sparkles size={14} className="text-primary-400" />
            Available for freelance & collaborations
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none mb-4"
          >
            <span className="text-white">Hi, I'm </span>
            <span className="gradient-text">Yogesh</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-300 mb-6 h-12 flex items-center"
          >
            <span className="text-accent-400">{displayText}</span>
            <span className="ml-1 w-0.5 h-8 bg-accent-400 inline-block animate-pulse" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-lg lg:text-xl max-w-2xl leading-relaxed mb-10"
          >
            Full-Stack Developer & AI Engineer with{' '}
            <span className="text-white font-semibold">3+ years</span> of experience. I build
            intelligent web applications with{' '}
            <span className="text-primary-300 font-semibold">Laravel, React, Node.js</span> and
            integrate cutting-edge{' '}
            <span className="text-accent-400 font-semibold">AI/LLM solutions</span> for real-world
            problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#projects" className="btn-primary text-base px-8 py-3.5">
              View My Work
              <ArrowDown size={16} />
            </a>
            <a href="#contact" className="btn-outline text-base px-8 py-3.5">
              <Mail size={16} />
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              download="Yogesh_Mahawar_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl border border-white/20 text-slate-300 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <span className="text-slate-500 text-sm">Connect with me</span>
            <div className="h-px w-12 bg-slate-700" />
            <div className="flex gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-primary-400 hover:border-primary-400/30 hover:bg-primary-400/5 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
