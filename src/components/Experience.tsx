import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2, ExternalLink, Zap } from 'lucide-react'
import { experiences } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
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
            Work Experience
          </div>
          <h2 className="section-title">
            My <span className="gradient-text">Professional Journey</span>
          </h2>
          <p className="section-subtitle">
            Building production-grade systems and AI solutions across diverse industries.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex gap-6 md:gap-10"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 hidden sm:flex flex-col items-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg flex-shrink-0 mt-1`}
                  >
                    <Briefcase size={20} className="text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 glass-card glow-border p-6 lg:p-8 hover:border-primary-400/40 transition-colors duration-300">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-500/15 text-green-400 border border-green-400/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-primary-300 font-semibold">{exp.company}</span>
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-primary-400 transition-colors"
                          aria-label="Company website"
                        >
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        {exp.period}
                      </div>
                      <div className="text-slate-500 text-xs mt-1">{exp.location}</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2.5">
                    {exp.achievements.map((achievement, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                        className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-primary-400 flex-shrink-0 mt-0.5"
                        />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
