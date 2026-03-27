import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { HxSystem, HxThemeMap } from '../types'

const defaultThemes: HxThemeMap = {
  luxury: {
    background: '#0B0B12',
    surface: 'rgba(255,255,255,0.08)',
    text: '#F4F6FF',
    textMuted: '#BFC5E3',
    accent: '#FF6A3D',
    accentAlt: '#6B76FF',
    border: 'rgba(255,255,255,0.18)',
    glow: 'rgba(255,106,61,0.35)',
  },
  minimal: {
    background: '#F7F7F5',
    surface: '#FFFFFF',
    text: '#111111',
    textMuted: '#5D5D5D',
    accent: '#222222',
    accentAlt: '#6B6B6B',
    border: '#DDDDDD',
  },
  brutalist: {
    background: '#FDF8E1',
    surface: '#FFFFFF',
    text: '#0A0A0A',
    textMuted: '#2E2E2E',
    accent: '#FF2500',
    accentAlt: '#0047FF',
    border: '#000000',
  },
  neofuturistic: {
    background: '#02040D',
    surface: 'rgba(0, 232, 255, 0.08)',
    text: '#DFFCFF',
    textMuted: '#7BC3D5',
    accent: '#00E8FF',
    accentAlt: '#FF40C8',
    border: 'rgba(0, 232, 255, 0.25)',
    glow: 'rgba(0, 232, 255, 0.45)',
  },
  enterprise: {
    background: '#F4F7FC',
    surface: '#FFFFFF',
    text: '#1D2A39',
    textMuted: '#66758A',
    accent: '#0E63FF',
    accentAlt: '#0F8D81',
    border: '#D9E1EB',
  },
  experimental: {
    background: '#130A1F',
    surface: 'rgba(255, 255, 255, 0.06)',
    text: '#F5EFFF',
    textMuted: '#CBB7E8',
    accent: '#D84BFF',
    accentAlt: '#3DFFD2',
    border: 'rgba(255,255,255,0.2)',
    glow: 'rgba(216, 75, 255, 0.4)',
  },
  a11y: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#111111',
    textMuted: '#2A2A2A',
    accent: '#0047B8',
    accentAlt: '#005E2E',
    border: '#1F1F1F',
  },
}

interface ThemeContextValue {
  themes: HxThemeMap
}

const ThemeContext = createContext<ThemeContextValue>({ themes: defaultThemes })

interface ThemeProviderProps {
  children: ReactNode
  themes?: Partial<HxThemeMap>
}

export function ThemeProvider({ children, themes }: ThemeProviderProps) {
  const mergedThemes = useMemo<HxThemeMap>(
    () => ({ ...defaultThemes, ...(themes ?? {}) }),
    [themes],
  )

  return <ThemeContext.Provider value={{ themes: mergedThemes }}>{children}</ThemeContext.Provider>
}

export function useSystemTheme(system: HxSystem) {
  const ctx = useContext(ThemeContext)
  return ctx.themes[system]
}

