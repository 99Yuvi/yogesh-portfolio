import { motion } from 'framer-motion'
import {
  Code2, Layers, Brain, MessageCircle, ShoppingBag,
  GitBranch, Palette, Database, Zap, type LucideIcon
} from 'lucide-react'
import { skills } from '../data/portfolio'

const iconMap: Record<string, LucideIcon> = {
  Code2, Layers, Brain, MessageCircle, ShoppingBag, GitBranch, Palette, Database,
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
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
            Technical Skills
          </div>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            A versatile skill set spanning full-stack development, AI engineering, and cloud-native architectures.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((category, i) => {
            const Icon = iconMap[category.icon] || Code2
            return (
              <motion.div
                key={category.category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="glass-card glow-border p-6 group cursor-default"
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={20} className="text-white" />
                </div>

                {/* Category */}
                <h3 className="font-semibold text-white text-sm mb-3">{category.category}</h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom highlight bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass-card p-6 flex flex-wrap justify-center gap-8"
        >
          {[
            { emoji: '🤖', label: 'AI Agent Development' },
            { emoji: '⚡', label: 'WhatsApp Automation' },
            { emoji: '🏗️', label: 'System Architecture' },
            { emoji: '🛒', label: 'Shopify Apps' },
            { emoji: '🧠', label: 'LLM & GenAI' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-slate-300">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
