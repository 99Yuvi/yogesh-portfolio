import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/portfolio'

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-medium mb-4">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            Client Reviews
          </div>
          <h2 className="section-title">
            What <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            Real feedback from clients and colleagues I've worked with on AI and full-stack projects.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card glow-border p-6 flex flex-col gap-4"
            >
              {/* Quote icon */}
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg`}>
                  <Quote size={18} className="text-white" />
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Review text */}
              <p className="text-slate-300 leading-relaxed text-sm flex-1">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="h-px bg-white/5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">
                    {t.role} · <span className="text-primary-300">{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 text-sm mb-4">Want to work together?</p>
          <a href="#contact" className="btn-primary">
            Let's Build Something Great
          </a>
        </motion.div>
      </div>
    </section>
  )
}
