export type Spectrum = {
  left: string
  right: string
}

export const SPECTRA: Spectrum[] = []

export function pickRandomSpectrum(excluding?: Spectrum): Spectrum {
  const pool = excluding
    ? SPECTRA.filter(s => s.left !== excluding.left || s.right !== excluding.right)
    : SPECTRA
  const list = pool.length > 0 ? pool : SPECTRA
  return list[Math.floor(Math.random() * list.length)]!
}
