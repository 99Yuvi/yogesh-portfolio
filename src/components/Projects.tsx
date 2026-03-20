import { motion } from 'framer-motion'
import {
  Bot, ShoppingCart, Calendar, ShoppingBag, Cpu,
  LayoutDashboard, ArrowUpRight, Zap, CreditCard, Bell, type LucideIcon
} from 'lucide-react'
import { projects } from '../data/portfolio'

const iconMap: Record<string, LucideIcon> = {
  Bot, ShoppingCart, Calendar, ShoppingBag, Cpu, LayoutDashboard, CreditCard, Bell,
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
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
            Portfolio
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real-world solutions built with modern technologies — from AI-powered automation to enterprise web systems.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = iconMap[project.icon] || Bot
            return (
              <motion.div
                key={project.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="glass-card glow-border p-6 group cursor-default flex flex-col"
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-200"
                      title="View Live Project"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <div className="p-2 rounded-lg text-slate-500/30">
                      <ArrowUpRight size={18} />
                    </div>
                  )}
                </div>

                {/* Title & desc */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/5 text-slate-300 border border-white/10"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Websites maintained */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass-card p-6"
        >
          <p className="text-slate-400 text-sm font-medium mb-4">Websites Maintained & Enhanced</p>
          <div className="flex flex-wrap gap-3">
            {['getgabs.com', '99pandit.com', 'avislease.in', 'thecandidhouse.com'].map((site) => (
              <a
                key={site}
                href={`https://${site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:border-primary-400/40 hover:text-primary-300 transition-all duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-green-400" />
                {site}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
