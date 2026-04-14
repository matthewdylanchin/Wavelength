import { Home, Dices, Users, Trophy } from 'lucide-react'
import type { Spectrum } from '../../lib/spectra'
import ActiveGameCard from './ActiveGameCard'

type Props = {
  spectrum: Spectrum
  roundNumber: number
}

const NAV_ITEMS = [
  { icon: Home,   label: 'Home',         active: true  },
  { icon: Dices,  label: 'My Games',     active: false },
  { icon: Users,  label: 'Friends',      active: false },
  { icon: Trophy, label: 'Achievements', active: false },
]

export default function Sidebar({ spectrum, roundNumber }: Props) {
  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        background: 'var(--bg-panel)',
        borderRight: '1px solid var(--color-cream-shadow)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 12px',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 8,
              background: active ? 'var(--color-cream-shadow)' : 'transparent',
              color: active ? 'var(--color-brown-dark)' : 'var(--color-brown-soft)',
              fontWeight: active ? 600 : 400,
              fontSize: 14,
              fontFamily: 'var(--font-ui)',
            }}
          >
            <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
            <span>{label}</span>
          </div>
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      <ActiveGameCard spectrum={spectrum} roundNumber={roundNumber} />
    </div>
  )
}
