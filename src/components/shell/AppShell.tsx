import type { ReactNode } from 'react'
import type { Spectrum } from '../../lib/spectra'
import Sidebar from './Sidebar'
import TitleBar from './TitleBar'

type Props = {
  spectrum: Spectrum
  roundNumber: number
  children: ReactNode
}

export default function AppShell({ spectrum, roundNumber, children }: Props) {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar spectrum={spectrum} roundNumber={roundNumber} />

      {/* Main column */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--bg-window)',
        }}
      >
        <TitleBar />

        {/* Game content — centered horizontally and vertically */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflowY: 'auto',
            padding: '1.5rem 2rem',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
