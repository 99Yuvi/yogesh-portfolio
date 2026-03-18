import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { MapPin, Briefcase, GraduationCap, Zap } from 'lucide-react'
import { personalInfo, stats, education } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState('0')
  const numMatch = value.match(/\d+/)
  const suffix = value.replace(/\d+/, '')
  const target = numMatch ? parseInt(numMatch[0]) : 0

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start = Math.min(start + increment, target)
      setDisplay(Math.floor(start).toString())
      if (start >= target) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{inView ? display + suffix : '0' + suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-medium mb-4">
            <Zap size={13} />
            About Me
          </div>
          <h2 className="section-title">
            Crafting <span className="gradient-text">Digital Experiences</span>
            <br />with Intelligence
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Avatar + Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Avatar card */}
            <div className="glass-card glow-border p-6 flex items-center gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-primary-500/30">
                  YM
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-900 animate-pulse" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{personalInfo.name}</h3>
                <p className="text-primary-300 text-sm font-medium mt-0.5">{personalInfo.title}</p>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-2">
                  <MapPin size={13} className="text-primary-400" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-1">
                  <Briefcase size={13} className="text-accent-400" />
                  Currently at 99isolutions
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card glow-border p-5 text-center"
                >
                  <div className="text-3xl font-black gradient-text mb-1"><CountUp value={stat.value} /></div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={18} className="text-primary-400" />
                <h4 className="font-semibold text-white">Education</h4>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className={`${i < education.length - 1 ? 'border-b border-white/5 pb-4' : ''}`}>
                    <p className="font-medium text-white text-sm">{edu.degree}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{edu.institution}</p>
                    <p className="text-slate-500 text-xs">{edu.period} · {edu.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Bio + highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              <p className="text-slate-400 leading-relaxed">
                My journey began with PHP & Laravel building admin panels and web apps. Today, I
                architect intelligent systems — from AI agents that handle WhatsApp conversations
                autonomously, to GenAI-powered answer nodes that transform how businesses interact
                with their customers.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="space-y-4">
              {[
                {
                  icon: '🤖',
                  title: 'AI & GenAI Expert',
                  desc: 'Building LLM-powered agents, AI answer nodes, and GenAI workflows for production systems.',
                },
                {
                  icon: '💬',
                  title: 'WhatsApp Business API',
                  desc: 'Specialized in WhatsApp automation — AI agents, order notifications, OTP flows, and chatbots.',
                },
                {
                  icon: '⚡',
                  title: 'Full-Stack Architect',
                  desc: 'End-to-end development with Laravel, React, Next.js, Node.js and system design expertise.',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 6 }}
                  className="glass-card glow-border p-5 flex gap-4 cursor-default"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <div className="glass-card p-5">
              <p className="text-sm font-medium text-slate-300 mb-3">Languages I speak</p>
              <div className="flex gap-4">
                <div>
                  <span className="text-white font-semibold">Hindi</span>
                  <span className="text-slate-500 text-sm ml-2">Native</span>
                </div>
                <div className="w-px h-5 bg-white/10 self-center" />
                <div>
                  <span className="text-white font-semibold">English</span>
                  <span className="text-slate-500 text-sm ml-2">Professional</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
