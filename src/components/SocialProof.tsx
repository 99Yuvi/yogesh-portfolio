import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye } from 'lucide-react'

const NOTIFICATIONS = [
  { city: 'Mumbai', action: 'viewed your portfolio' },
  { city: 'Bangalore', action: 'checked your AI projects' },
  { city: 'Delhi', action: 'is reading your experience' },
  { city: 'Hyderabad', action: 'viewed your projects' },
  { city: 'Pune', action: 'checked your skills' },
  { city: 'Chennai', action: 'is exploring your portfolio' },
  { city: 'Dubai', action: 'viewed your portfolio' },
  { city: 'Singapore', action: 'checked your AI work' },
  { city: 'London', action: 'is reading your projects' },
  { city: 'San Francisco', action: 'viewed your portfolio' },
]

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function SocialProof() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(NOTIFICATIONS[0])

  useEffect(() => {
    // First show after 8 seconds
    const initial = setTimeout(() => showNext(), 8000)
    return () => clearTimeout(initial)
  }, [])

  const showNext = () => {
    const notif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)]
    setCurrent(notif)
    setVisible(true)

    // Hide after 4 seconds
    setTimeout(() => {
      setVisible(false)
      // Show next after random 15-30 seconds
      setTimeout(showNext, randomBetween(15000, 30000))
    }, 4000)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-24 left-6 z-40 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl shadow-black/40"
          style={{ background: '#141424', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-8 h-8 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
            <Eye size={15} className="text-primary-400" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Someone from {current.city}</p>
            <p className="text-slate-400 text-xs">{current.action} • just now</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1 flex-shrink-0" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
