import { useRef, useState } from 'react'
import { clampAngle } from '../../lib/dial'

type Props = {
  angle: number        // degrees, 0–180
  cx: number           // pivot x in viewBox units
  cy: number           // pivot y in viewBox units
  length: number       // needle length in viewBox units
  onAngleChange?: (angle: number) => void
  disabled?: boolean
}

export default function GuessNeedle({ angle, cx, cy, length, onAngleChange, disabled }: Props) {
  const isDragging = useRef(false)
  const [isGrabbing, setIsGrabbing] = useState(false)

  function getSvgPoint(e: React.PointerEvent): { x: number; y: number } | null {
    const svg = (e.currentTarget as Element).closest('svg') as SVGSVGElement | null
    if (!svg) return null
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    return pt.matrixTransform(ctm.inverse())
  }

  function computeAngle(svgX: number, svgY: number): number {
    const dx = svgX - cx
    const dy = svgY - cy
    // 0° = left, 90° = top, 180° = right
    // From angleToPoint: x = cx - r*cos(rad), y = cy - r*sin(rad)
    // So: cos(rad) = -dx/r, sin(rad) = -dy/r → atan2(-dy, -dx)
    const rad = Math.atan2(-dy, -dx)
    return clampAngle(rad * 180 / Math.PI)
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (disabled) return
    e.stopPropagation()
    isDragging.current = true
    setIsGrabbing(true)
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    const pt = getSvgPoint(e)
    if (pt) onAngleChange?.(computeAngle(pt.x, pt.y))
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return
    const pt = getSvgPoint(e)
    if (pt) onAngleChange?.(computeAngle(pt.x, pt.y))
  }

  function handlePointerUp(e: React.PointerEvent) {
    isDragging.current = false
    setIsGrabbing(false)
    ;(e.currentTarget as Element).releasePointerCapture(e.pointerId)
  }

  const cursor = disabled ? 'default' : isGrabbing ? 'grabbing' : 'grab'

  return (
    <g transform={`rotate(${angle - 90}, ${cx}, ${cy})`}>
      {/* Needle shaft — vertical line pointing straight up from pivot */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - length}
        stroke="var(--color-brown-dark)"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {/* Small circle at the tip */}
      <circle
        cx={cx}
        cy={cy - length}
        r={6}
        fill="var(--color-brown-dark)"
      />
      {/* Pivot dot */}
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill="var(--color-brown-dark)"
      />
      {/* Invisible wider hit area — same path, 30px thick, transparent */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - length}
        stroke="transparent"
        strokeWidth={30}
        strokeLinecap="round"
        pointerEvents={disabled ? 'none' : 'all'}
        style={{ cursor, touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </g>
  )
}
