// hxrrrrri-UI Theme System
// 10 luxury themes — each has a primary + secondary accent colour.
// Every CSS variable-based component updates automatically.

export const THEMES = [
  {
    id: 'obsidian', name: 'Obsidian',
    dot1: '#FF4D2D', dot2: '#5555D8',
    desc: 'Burnt ember · Midnight indigo',
    vars: {
      '--hxrrrrri-a1':'#FF4D2D','--hxrrrrri-a2':'#5555D8',
      '--hxrrrrri-ar':'255','--hxrrrrri-ag':'77','--hxrrrrri-ab':'45',
      '--hxrrrrri-br':'85','--hxrrrrri-bg-c':'85','--hxrrrrri-bb':'216',
      '--hxrrrrri-bg-l1':'rgba(255,77,45,0.16)','--hxrrrrri-bg-l2':'rgba(40,40,180,0.18)','--hxrrrrri-bg-l3':'rgba(255,140,30,0.05)',
      '--hxrrrrri-bg-d1':'#080710','--hxrrrrri-bg-d2':'#0a0818','--hxrrrrri-bg-d3':'#0c091c','--hxrrrrri-bg-d4':'#07080e',
      '--hxrrrrri-orb1':'rgba(255,77,45,0.13)','--hxrrrrri-orb2':'rgba(40,40,200,0.16)','--hxrrrrri-orb3':'rgba(255,140,30,0.05)',
    },
  },
  {
    id: 'arctic', name: 'Arctic',
    dot1: '#4FC3F7', dot2: '#7C3AED',
    desc: 'Glacial cyan · Polar violet',
    vars: {
      '--hxrrrrri-a1':'#4FC3F7','--hxrrrrri-a2':'#7C3AED',
      '--hxrrrrri-ar':'79','--hxrrrrri-ag':'195','--hxrrrrri-ab':'247',
      '--hxrrrrri-br':'124','--hxrrrrri-bg-c':'58','--hxrrrrri-bb':'237',
      '--hxrrrrri-bg-l1':'rgba(30,140,230,0.14)','--hxrrrrri-bg-l2':'rgba(80,25,200,0.18)','--hxrrrrri-bg-l3':'rgba(150,210,255,0.04)',
      '--hxrrrrri-bg-d1':'#05080f','--hxrrrrri-bg-d2':'#070a18','--hxrrrrri-bg-d3':'#08091c','--hxrrrrri-bg-d4':'#04070d',
      '--hxrrrrri-orb1':'rgba(40,150,240,0.12)','--hxrrrrri-orb2':'rgba(90,30,210,0.15)','--hxrrrrri-orb3':'rgba(140,200,255,0.04)',
    },
  },
  {
    id: 'emerald', name: 'Emerald',
    dot1: '#00D18C', dot2: '#D4A017',
    desc: 'Liquid malachite · Aged gold',
    vars: {
      '--hxrrrrri-a1':'#00D18C','--hxrrrrri-a2':'#D4A017',
      '--hxrrrrri-ar':'0','--hxrrrrri-ag':'209','--hxrrrrri-ab':'140',
      '--hxrrrrri-br':'212','--hxrrrrri-bg-c':'160','--hxrrrrri-bb':'23',
      '--hxrrrrri-bg-l1':'rgba(0,180,115,0.14)','--hxrrrrri-bg-l2':'rgba(150,100,10,0.18)','--hxrrrrri-bg-l3':'rgba(0,255,160,0.04)',
      '--hxrrrrri-bg-d1':'#030e08','--hxrrrrri-bg-d2':'#081208','--hxrrrrri-bg-d3':'#061410','--hxrrrrri-bg-d4':'#030c07',
      '--hxrrrrri-orb1':'rgba(0,195,120,0.12)','--hxrrrrri-orb2':'rgba(160,105,8,0.16)','--hxrrrrri-orb3':'rgba(0,240,150,0.04)',
    },
  },
  {
    id: 'aurum', name: 'Aurum',
    dot1: '#E8B84B', dot2: '#C05050',
    desc: 'Liquid gold · Vermillion lacquer',
    vars: {
      '--hxrrrrri-a1':'#E8B84B','--hxrrrrri-a2':'#C05050',
      '--hxrrrrri-ar':'232','--hxrrrrri-ag':'184','--hxrrrrri-ab':'75',
      '--hxrrrrri-br':'192','--hxrrrrri-bg-c':'80','--hxrrrrri-bb':'80',
      '--hxrrrrri-bg-l1':'rgba(200,155,25,0.16)','--hxrrrrri-bg-l2':'rgba(160,50,50,0.16)','--hxrrrrri-bg-l3':'rgba(255,210,80,0.04)',
      '--hxrrrrri-bg-d1':'#0d0c07','--hxrrrrri-bg-d2':'#150e06','--hxrrrrri-bg-d3':'#130f07','--hxrrrrri-bg-d4':'#0b0a05',
      '--hxrrrrri-orb1':'rgba(210,160,30,0.12)','--hxrrrrri-orb2':'rgba(175,55,55,0.14)','--hxrrrrri-orb3':'rgba(255,205,55,0.04)',
    },
  },
  {
    id: 'sakura', name: 'Sakura',
    dot1: '#FF6B9D', dot2: '#5BC8C8',
    desc: 'Cherry blossom · Jade river',
    vars: {
      '--hxrrrrri-a1':'#FF6B9D','--hxrrrrri-a2':'#5BC8C8',
      '--hxrrrrri-ar':'255','--hxrrrrri-ag':'107','--hxrrrrri-ab':'157',
      '--hxrrrrri-br':'91','--hxrrrrri-bg-c':'200','--hxrrrrri-bb':'200',
      '--hxrrrrri-bg-l1':'rgba(230,60,120,0.14)','--hxrrrrri-bg-l2':'rgba(40,160,160,0.16)','--hxrrrrri-bg-l3':'rgba(255,180,210,0.04)',
      '--hxrrrrri-bg-d1':'#0e0809','--hxrrrrri-bg-d2':'#0c0f0f','--hxrrrrri-bg-d3':'#0f0910','--hxrrrrri-bg-d4':'#0b0709',
      '--hxrrrrri-orb1':'rgba(245,70,130,0.12)','--hxrrrrri-orb2':'rgba(45,175,175,0.14)','--hxrrrrri-orb3':'rgba(255,170,200,0.04)',
    },
  },
  {
    id: 'amethyst', name: 'Amethyst',
    dot1: '#A78BFA', dot2: '#F59E0B',
    desc: 'Deep amethyst · Saffron ember',
    vars: {
      '--hxrrrrri-a1':'#A78BFA','--hxrrrrri-a2':'#F59E0B',
      '--hxrrrrri-ar':'167','--hxrrrrri-ag':'139','--hxrrrrri-ab':'250',
      '--hxrrrrri-br':'245','--hxrrrrri-bg-c':'158','--hxrrrrri-bb':'11',
      '--hxrrrrri-bg-l1':'rgba(110,70,230,0.14)','--hxrrrrri-bg-l2':'rgba(180,110,5,0.18)','--hxrrrrri-bg-l3':'rgba(200,180,255,0.04)',
      '--hxrrrrri-bg-d1':'#08070f','--hxrrrrri-bg-d2':'#0e0b06','--hxrrrrri-bg-d3':'#0d0a1a','--hxrrrrri-bg-d4':'#07060d',
      '--hxrrrrri-orb1':'rgba(120,75,240,0.12)','--hxrrrrri-orb2':'rgba(190,115,5,0.15)','--hxrrrrri-orb3':'rgba(185,155,255,0.05)',
    },
  },
  {
    id: 'copper', name: 'Copper',
    dot1: '#E07B39', dot2: '#3B82C4',
    desc: 'Oxidised copper · Cerulean steel',
    vars: {
      '--hxrrrrri-a1':'#E07B39','--hxrrrrri-a2':'#3B82C4',
      '--hxrrrrri-ar':'224','--hxrrrrri-ag':'123','--hxrrrrri-ab':'57',
      '--hxrrrrri-br':'59','--hxrrrrri-bg-c':'130','--hxrrrrri-bb':'196',
      '--hxrrrrri-bg-l1':'rgba(190,95,30,0.16)','--hxrrrrri-bg-l2':'rgba(35,100,175,0.18)','--hxrrrrri-bg-l3':'rgba(255,155,70,0.05)',
      '--hxrrrrri-bg-d1':'#0e0904','--hxrrrrri-bg-d2':'#05080e','--hxrrrrri-bg-d3':'#100a05','--hxrrrrri-bg-d4':'#0c0804',
      '--hxrrrrri-orb1':'rgba(200,100,32,0.12)','--hxrrrrri-orb2':'rgba(35,105,185,0.15)','--hxrrrrri-orb3':'rgba(255,145,55,0.05)',
    },
  },
  {
    id: 'pearl', name: 'Pearl',
    dot1: '#D4D8E2', dot2: '#A8856A',
    desc: 'Lunar pearl · Cognac warmth',
    vars: {
      '--hxrrrrri-a1':'#D4D8E2','--hxrrrrri-a2':'#A8856A',
      '--hxrrrrri-ar':'212','--hxrrrrri-ag':'216','--hxrrrrri-ab':'226',
      '--hxrrrrri-br':'168','--hxrrrrri-bg-c':'133','--hxrrrrri-bb':'106',
      '--hxrrrrri-bg-l1':'rgba(180,185,210,0.10)','--hxrrrrri-bg-l2':'rgba(130,95,65,0.16)','--hxrrrrri-bg-l3':'rgba(240,242,248,0.04)',
      '--hxrrrrri-bg-d1':'#09090e','--hxrrrrri-bg-d2':'#0d0a08','--hxrrrrri-bg-d3':'#0c0c13','--hxrrrrri-bg-d4':'#08090d',
      '--hxrrrrri-orb1':'rgba(170,175,205,0.09)','--hxrrrrri-orb2':'rgba(140,100,70,0.14)','--hxrrrrri-orb3':'rgba(225,228,238,0.05)',
    },
  },
  {
    id: 'crimson', name: 'Crimson',
    dot1: '#E53E5C', dot2: '#00C896',
    desc: 'Deep crimson · Viridian contrast',
    vars: {
      '--hxrrrrri-a1':'#E53E5C','--hxrrrrri-a2':'#00C896',
      '--hxrrrrri-ar':'229','--hxrrrrri-ag':'62','--hxrrrrri-ab':'92',
      '--hxrrrrri-br':'0','--hxrrrrri-bg-c':'200','--hxrrrrri-bb':'150',
      '--hxrrrrri-bg-l1':'rgba(210,35,65,0.15)','--hxrrrrri-bg-l2':'rgba(0,150,110,0.14)','--hxrrrrri-bg-l3':'rgba(255,100,120,0.04)',
      '--hxrrrrri-bg-d1':'#0f0608','--hxrrrrri-bg-d2':'#040d0a','--hxrrrrri-bg-d3':'#100709','--hxrrrrri-bg-d4':'#0c0507',
      '--hxrrrrri-orb1':'rgba(220,38,70,0.12)','--hxrrrrri-orb2':'rgba(0,165,115,0.13)','--hxrrrrri-orb3':'rgba(255,85,110,0.04)',
    },
  },
  {
    id: 'ocean', name: 'Ocean',
    dot1: '#06B6D4', dot2: '#F97316',
    desc: 'Abyssal teal · Bioluminescent orange',
    vars: {
      '--hxrrrrri-a1':'#06B6D4','--hxrrrrri-a2':'#F97316',
      '--hxrrrrri-ar':'6','--hxrrrrri-ag':'182','--hxrrrrri-ab':'212',
      '--hxrrrrri-br':'249','--hxrrrrri-bg-c':'115','--hxrrrrri-bb':'22',
      '--hxrrrrri-bg-l1':'rgba(5,155,185,0.14)','--hxrrrrri-bg-l2':'rgba(200,85,10,0.16)','--hxrrrrri-bg-l3':'rgba(100,230,245,0.04)',
      '--hxrrrrri-bg-d1':'#040c10','--hxrrrrri-bg-d2':'#100806','--hxrrrrri-bg-d3':'#060e12','--hxrrrrri-bg-d4':'#040b0d',
      '--hxrrrrri-orb1':'rgba(5,165,195,0.12)','--hxrrrrri-orb2':'rgba(210,90,10,0.14)','--hxrrrrri-orb3':'rgba(80,225,242,0.05)',
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

/** Get the currently active theme ID based on --hxrrrrri-a1 */
export function getCurrentThemeId() {
  const a1 = getComputedStyle(document.documentElement).getPropertyValue('--hxrrrrri-a1').trim()
  return THEMES.find(t => t.vars['--hxrrrrri-a1'] === a1)?.id ?? 'obsidian'
}
