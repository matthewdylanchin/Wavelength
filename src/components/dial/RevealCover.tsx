import { useEffect, useRef } from 'react'
import { animate, useMotionValue } from 'framer-motion'
import { CX, CY, R } from './dialGeometry'

// Flat edge along CY, curved part bulging upward — covers the scoring bands
const SEMICIRCLE = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY} Z`

type Props = {
  revealed: boolean
}

export default function RevealCover({ revealed }: Props) {
  const gRef = useRef<SVGGElement>(null)
  // Tracks the rotation angle (0 = covering, 180 = rotated away to lower half)
  const angleMotion = useMotionValue(0)

  // On every frame, write the SVG transform attribute using the three-argument
  // rotate(angle, cx, cy) form — the only way to guarantee the pivot is (CX, CY)
  // in viewBox coordinates regardless of how the SVG is scaled or what browser
  // does with CSS transform-origin on SVG elements.
  useEffect(() => {
    gRef.current?.setAttribute('transform', `rotate(0, ${CX}, ${CY})`)

    const unsubscribe = angleMotion.on('change', (a) => {
      gRef.current?.setAttribute('transform', `rotate(${a}, ${CX}, ${CY})`)
    })
    return unsubscribe
  }, [angleMotion])

  // Animate when revealed toggles
  useEffect(() => {
    const controls = animate(angleMotion, revealed ? -180 : 0, {
      type: 'spring',
      stiffness: 60,
      damping: 18,
      mass: 1.2,
    })
    return () => controls.stop()
  }, [revealed, angleMotion])

  return (
    <g ref={gRef}>
      {/*
       * Fully opaque at all times — the reveal effect comes from rotation only.
       * Fill matches DialBase background so bands don't bleed through.
       */}
      <path d={SEMICIRCLE} fill="var(--color-band-2)" stroke="none" />
    </g>
  )
}
