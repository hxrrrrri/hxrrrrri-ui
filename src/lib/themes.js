// MRK-UI Theme System
// 10 luxury themes — each has a primary + secondary accent colour.
// Every CSS variable-based component updates automatically.

export const THEMES = [
  {
    id: 'obsidian', name: 'Obsidian',
    dot1: '#FF4D2D', dot2: '#5555D8',
    desc: 'Burnt ember · Midnight indigo',
    vars: {
      '--mrk-a1':'#FF4D2D','--mrk-a2':'#5555D8',
      '--mrk-ar':'255','--mrk-ag':'77','--mrk-ab':'45',
      '--mrk-br':'85','--mrk-bg-c':'85','--mrk-bb':'216',
      '--mrk-bg-l1':'rgba(255,77,45,0.16)','--mrk-bg-l2':'rgba(40,40,180,0.18)','--mrk-bg-l3':'rgba(255,140,30,0.05)',
      '--mrk-bg-d1':'#080710','--mrk-bg-d2':'#0a0818','--mrk-bg-d3':'#0c091c','--mrk-bg-d4':'#07080e',
      '--mrk-orb1':'rgba(255,77,45,0.13)','--mrk-orb2':'rgba(40,40,200,0.16)','--mrk-orb3':'rgba(255,140,30,0.05)',
    },
  },
  {
    id: 'arctic', name: 'Arctic',
    dot1: '#4FC3F7', dot2: '#7C3AED',
    desc: 'Glacial cyan · Polar violet',
    vars: {
      '--mrk-a1':'#4FC3F7','--mrk-a2':'#7C3AED',
      '--mrk-ar':'79','--mrk-ag':'195','--mrk-ab':'247',
      '--mrk-br':'124','--mrk-bg-c':'58','--mrk-bb':'237',
      '--mrk-bg-l1':'rgba(30,140,230,0.14)','--mrk-bg-l2':'rgba(80,25,200,0.18)','--mrk-bg-l3':'rgba(150,210,255,0.04)',
      '--mrk-bg-d1':'#05080f','--mrk-bg-d2':'#070a18','--mrk-bg-d3':'#08091c','--mrk-bg-d4':'#04070d',
      '--mrk-orb1':'rgba(40,150,240,0.12)','--mrk-orb2':'rgba(90,30,210,0.15)','--mrk-orb3':'rgba(140,200,255,0.04)',
    },
  },
  {
    id: 'emerald', name: 'Emerald',
    dot1: '#00D18C', dot2: '#D4A017',
    desc: 'Liquid malachite · Aged gold',
    vars: {
      '--mrk-a1':'#00D18C','--mrk-a2':'#D4A017',
      '--mrk-ar':'0','--mrk-ag':'209','--mrk-ab':'140',
      '--mrk-br':'212','--mrk-bg-c':'160','--mrk-bb':'23',
      '--mrk-bg-l1':'rgba(0,180,115,0.14)','--mrk-bg-l2':'rgba(150,100,10,0.18)','--mrk-bg-l3':'rgba(0,255,160,0.04)',
      '--mrk-bg-d1':'#030e08','--mrk-bg-d2':'#081208','--mrk-bg-d3':'#061410','--mrk-bg-d4':'#030c07',
      '--mrk-orb1':'rgba(0,195,120,0.12)','--mrk-orb2':'rgba(160,105,8,0.16)','--mrk-orb3':'rgba(0,240,150,0.04)',
    },
  },
  {
    id: 'aurum', name: 'Aurum',
    dot1: '#E8B84B', dot2: '#C05050',
    desc: 'Liquid gold · Vermillion lacquer',
    vars: {
      '--mrk-a1':'#E8B84B','--mrk-a2':'#C05050',
      '--mrk-ar':'232','--mrk-ag':'184','--mrk-ab':'75',
      '--mrk-br':'192','--mrk-bg-c':'80','--mrk-bb':'80',
      '--mrk-bg-l1':'rgba(200,155,25,0.16)','--mrk-bg-l2':'rgba(160,50,50,0.16)','--mrk-bg-l3':'rgba(255,210,80,0.04)',
      '--mrk-bg-d1':'#0d0c07','--mrk-bg-d2':'#150e06','--mrk-bg-d3':'#130f07','--mrk-bg-d4':'#0b0a05',
      '--mrk-orb1':'rgba(210,160,30,0.12)','--mrk-orb2':'rgba(175,55,55,0.14)','--mrk-orb3':'rgba(255,205,55,0.04)',
    },
  },
  {
    id: 'sakura', name: 'Sakura',
    dot1: '#FF6B9D', dot2: '#5BC8C8',
    desc: 'Cherry blossom · Jade river',
    vars: {
      '--mrk-a1':'#FF6B9D','--mrk-a2':'#5BC8C8',
      '--mrk-ar':'255','--mrk-ag':'107','--mrk-ab':'157',
      '--mrk-br':'91','--mrk-bg-c':'200','--mrk-bb':'200',
      '--mrk-bg-l1':'rgba(230,60,120,0.14)','--mrk-bg-l2':'rgba(40,160,160,0.16)','--mrk-bg-l3':'rgba(255,180,210,0.04)',
      '--mrk-bg-d1':'#0e0809','--mrk-bg-d2':'#0c0f0f','--mrk-bg-d3':'#0f0910','--mrk-bg-d4':'#0b0709',
      '--mrk-orb1':'rgba(245,70,130,0.12)','--mrk-orb2':'rgba(45,175,175,0.14)','--mrk-orb3':'rgba(255,170,200,0.04)',
    },
  },
  {
    id: 'amethyst', name: 'Amethyst',
    dot1: '#A78BFA', dot2: '#F59E0B',
    desc: 'Deep amethyst · Saffron ember',
    vars: {
      '--mrk-a1':'#A78BFA','--mrk-a2':'#F59E0B',
      '--mrk-ar':'167','--mrk-ag':'139','--mrk-ab':'250',
      '--mrk-br':'245','--mrk-bg-c':'158','--mrk-bb':'11',
      '--mrk-bg-l1':'rgba(110,70,230,0.14)','--mrk-bg-l2':'rgba(180,110,5,0.18)','--mrk-bg-l3':'rgba(200,180,255,0.04)',
      '--mrk-bg-d1':'#08070f','--mrk-bg-d2':'#0e0b06','--mrk-bg-d3':'#0d0a1a','--mrk-bg-d4':'#07060d',
      '--mrk-orb1':'rgba(120,75,240,0.12)','--mrk-orb2':'rgba(190,115,5,0.15)','--mrk-orb3':'rgba(185,155,255,0.05)',
    },
  },
  {
    id: 'copper', name: 'Copper',
    dot1: '#E07B39', dot2: '#3B82C4',
    desc: 'Oxidised copper · Cerulean steel',
    vars: {
      '--mrk-a1':'#E07B39','--mrk-a2':'#3B82C4',
      '--mrk-ar':'224','--mrk-ag':'123','--mrk-ab':'57',
      '--mrk-br':'59','--mrk-bg-c':'130','--mrk-bb':'196',
      '--mrk-bg-l1':'rgba(190,95,30,0.16)','--mrk-bg-l2':'rgba(35,100,175,0.18)','--mrk-bg-l3':'rgba(255,155,70,0.05)',
      '--mrk-bg-d1':'#0e0904','--mrk-bg-d2':'#05080e','--mrk-bg-d3':'#100a05','--mrk-bg-d4':'#0c0804',
      '--mrk-orb1':'rgba(200,100,32,0.12)','--mrk-orb2':'rgba(35,105,185,0.15)','--mrk-orb3':'rgba(255,145,55,0.05)',
    },
  },
  {
    id: 'pearl', name: 'Pearl',
    dot1: '#D4D8E2', dot2: '#A8856A',
    desc: 'Lunar pearl · Cognac warmth',
    vars: {
      '--mrk-a1':'#D4D8E2','--mrk-a2':'#A8856A',
      '--mrk-ar':'212','--mrk-ag':'216','--mrk-ab':'226',
      '--mrk-br':'168','--mrk-bg-c':'133','--mrk-bb':'106',
      '--mrk-bg-l1':'rgba(180,185,210,0.10)','--mrk-bg-l2':'rgba(130,95,65,0.16)','--mrk-bg-l3':'rgba(240,242,248,0.04)',
      '--mrk-bg-d1':'#09090e','--mrk-bg-d2':'#0d0a08','--mrk-bg-d3':'#0c0c13','--mrk-bg-d4':'#08090d',
      '--mrk-orb1':'rgba(170,175,205,0.09)','--mrk-orb2':'rgba(140,100,70,0.14)','--mrk-orb3':'rgba(225,228,238,0.05)',
    },
  },
  {
    id: 'crimson', name: 'Crimson',
    dot1: '#E53E5C', dot2: '#00C896',
    desc: 'Deep crimson · Viridian contrast',
    vars: {
      '--mrk-a1':'#E53E5C','--mrk-a2':'#00C896',
      '--mrk-ar':'229','--mrk-ag':'62','--mrk-ab':'92',
      '--mrk-br':'0','--mrk-bg-c':'200','--mrk-bb':'150',
      '--mrk-bg-l1':'rgba(210,35,65,0.15)','--mrk-bg-l2':'rgba(0,150,110,0.14)','--mrk-bg-l3':'rgba(255,100,120,0.04)',
      '--mrk-bg-d1':'#0f0608','--mrk-bg-d2':'#040d0a','--mrk-bg-d3':'#100709','--mrk-bg-d4':'#0c0507',
      '--mrk-orb1':'rgba(220,38,70,0.12)','--mrk-orb2':'rgba(0,165,115,0.13)','--mrk-orb3':'rgba(255,85,110,0.04)',
    },
  },
  {
    id: 'ocean', name: 'Ocean',
    dot1: '#06B6D4', dot2: '#F97316',
    desc: 'Abyssal teal · Bioluminescent orange',
    vars: {
      '--mrk-a1':'#06B6D4','--mrk-a2':'#F97316',
      '--mrk-ar':'6','--mrk-ag':'182','--mrk-ab':'212',
      '--mrk-br':'249','--mrk-bg-c':'115','--mrk-bb':'22',
      '--mrk-bg-l1':'rgba(5,155,185,0.14)','--mrk-bg-l2':'rgba(200,85,10,0.16)','--mrk-bg-l3':'rgba(100,230,245,0.04)',
      '--mrk-bg-d1':'#040c10','--mrk-bg-d2':'#100806','--mrk-bg-d3':'#060e12','--mrk-bg-d4':'#040b0d',
      '--mrk-orb1':'rgba(5,165,195,0.12)','--mrk-orb2':'rgba(210,90,10,0.14)','--mrk-orb3':'rgba(80,225,242,0.05)',
    },
  },
]

/** Apply a theme by ID or theme object to any element (defaults to :root) */
export function applyTheme(themeOrId, element = document.documentElement) {
  const theme = typeof themeOrId === 'string'
    ? THEMES.find(t => t.id === themeOrId) ?? THEMES[0]
    : themeOrId
  Object.entries(theme.vars).forEach(([k, v]) => element.style.setProperty(k, v))
  return theme
}

/** Get the currently active theme ID based on --mrk-a1 */
export function getCurrentThemeId() {
  const a1 = getComputedStyle(document.documentElement).getPropertyValue('--mrk-a1').trim()
  return THEMES.find(t => t.vars['--mrk-a1'] === a1)?.id ?? 'obsidian'
}
