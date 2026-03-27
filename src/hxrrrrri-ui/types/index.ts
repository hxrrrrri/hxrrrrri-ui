import type { HTMLAttributes } from 'react'

export type HxSystem =
  | 'luxury'
  | 'minimal'
  | 'brutalist'
  | 'neofuturistic'
  | 'enterprise'
  | 'experimental'
  | 'a11y'

export type HxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface HxStyledProps extends HTMLAttributes<HTMLElement> {
  system?: HxSystem
  className?: string
}

export interface HxMotionConfig {
  duration?: number
  ease?: [number, number, number, number]
  stagger?: number
}

export interface HxThemeTokens {
  background: string
  surface: string
  text: string
  textMuted: string
  accent: string
  accentAlt: string
  border: string
  glow?: string
}

export type HxThemeMap = Record<HxSystem, HxThemeTokens>
