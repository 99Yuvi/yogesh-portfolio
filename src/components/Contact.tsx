import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Send, Zap, CheckCircle, Copy, Check } from 'lucide-react'
import confetti from 'canvas-confetti'
import { personalInfo } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

function fireConfetti() {
  const count = 180
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }
  confetti({ ...defaults, particleCount: Math.floor(count * 0.25), origin: { x: 0.2, y: 0.6 }, colors: ['#6c63ff', '#38bdf8', '#a855f7'] })
  confetti({ ...defaults, particleCount: Math.floor(count * 0.25), origin: { x: 0.8, y: 0.6 }, colors: ['#6c63ff', '#38bdf8', '#f59e0b'] })
  setTimeout(() => confetti({ ...defaults, particleCount: Math.floor(count * 0.5), origin: { x: 0.5, y: 0.5 }, colors: ['#ffffff', '#6c63ff', '#38bdf8'] }), 250)
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    if (type === 'email') { setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000) }
    else { setCopiedPhone(true); setTimeout(() => setCopiedPhone(false), 2000) }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    // Use location.href for better browser compatibility than window.open
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    fireConfetti()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-medium mb-4">
            <Zap size={13} />
            Get In Touch
          </div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Build Together</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? Looking for an AI solution or full-stack developer? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to start a project?</h3>
              <p className="text-slate-400 leading-relaxed">
                I'm currently available for freelance work and open to full-time opportunities.
                Whether you need an AI agent, a WhatsApp integration, or a complete web application
                — let's talk.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              {/* Email - with copy */}
              <div className="flex items-center gap-4 glass-card p-4 glow-border hover:border-primary-400/40 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center group-hover:bg-primary-500/25 transition-colors flex-shrink-0">
                  <Mail size={18} className="text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium">Email</p>
                  <p className="text-slate-200 font-medium truncate">{personalInfo.email}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="p-2 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all flex-shrink-0"
                  title="Copy email"
                >
                  {copiedEmail ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
                </button>
              </div>

              {/* Phone - with copy */}
              <div className="flex items-center gap-4 glass-card p-4 glow-border hover:border-primary-400/40 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center group-hover:bg-primary-500/25 transition-colors flex-shrink-0">
                  <Phone size={18} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-medium">Phone</p>
                  <p className="text-slate-200 font-medium">{personalInfo.phone}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all flex-shrink-0"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 glass-card p-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="text-slate-200 font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="glass-card p-5">
              <p className="text-slate-400 text-sm mb-4">Connect on social media</p>
              <div className="flex gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all duration-200 text-sm font-medium"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-slate-300 hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <p className="text-green-300 text-sm font-medium">
                Available for freelance projects & collaborations
              </p>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 lg:p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-400/60 focus:bg-primary-500/5 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-400/60 focus:bg-primary-500/5 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-400/60 focus:bg-primary-500/5 transition-all duration-200 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 ${
                  sent
                    ? 'bg-green-500/20 border border-green-400/40 text-green-300'
                    : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/25'
                }`}
              >
                {sent ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-center text-slate-500 text-xs">
                Your message will open in your email client.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
