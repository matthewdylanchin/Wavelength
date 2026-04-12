import { AnimatePresence, motion } from 'framer-motion'
import { CX, CY, R } from './dialGeometry'

const SEMICIRCLE = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY} Z`

type Props = {
  revealed: boolean
}

export default function RevealCover({ revealed }: Props) {
  return (
    <AnimatePresence>
      {!revealed && (
        <motion.g
          key="reveal-cover"
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: -460, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/*
           * Fill must match DialBase so the dial looks identical before reveal.
           * Fully opaque — no transparency "for testing." If bands show through, the bug ships.
           */}
          <path d={SEMICIRCLE} fill="var(--color-cream)" stroke="none" />
        </motion.g>
      )}
    </AnimatePresence>
  )
}
