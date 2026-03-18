import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })
  const trailX = useSpring(cursorX, { stiffness: 120, damping: 30 })
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 30 })
  const isVisible = useRef(false)

  useEffect(() => {
    // Only show on non-touch devices
    if ('ontouchstart' in window) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      isVisible.current = true
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Outer glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(108,99,255,0.25) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-3 h-3 rounded-full bg-primary-400 mix-blend-screen opacity-80" />
      </motion.div>
    </>
  )
}
