export type Spectrum = {
  left: string
  right: string
}

export const SPECTRA: Spectrum[] = [
  { left: 'Freezing',  right: 'Scorching' },
  { left: 'Overrated', right: 'Underrated' },
  { left: 'Useless',   right: 'Useful' },
  { left: 'Boring',    right: 'Exciting' },
  { left: 'Weird',     right: 'Normal' },
  { left: 'Cheap',     right: 'Expensive' },
  { left: 'Quiet',     right: 'Loud' },
  { left: 'Dangerous', right: 'Safe' },
  { left: 'Ugly',      right: 'Beautiful' },
  { left: 'Easy',      right: 'Hard' },
]

export function pickRandomSpectrum(excluding?: Spectrum): Spectrum {
  const pool = excluding
    ? SPECTRA.filter(s => s.left !== excluding.left)
    : SPECTRA
  const list = pool.length > 0 ? pool : SPECTRA
  return list[Math.floor(Math.random() * list.length)]!
}
