/**
 * hxrrrrri-UI Component Library
 * Ultra Luxury Glass + Ultra Minimal systems
 *
 * Usage:
 *   import { applyTheme, THEMES } from 'hxrrrrri-ui'
 *   import 'hxrrrrri-ui/dist/hxrrrrri-ui.css'
 *
 * Or import individual CSS files:
 *   import 'hxrrrrri-ui/src/styles/tokens.css'
 *   import 'hxrrrrri-ui/src/styles/luxury.css'
 *   import 'hxrrrrri-ui/src/styles/minimal.css'
 *
 * Then use class names directly:
 *   <button className="lux-btn lux-btn-primary">Primary</button>
 *   <div className="lux-g2 lux-hi2 lux-shine">Glass Card</div>
 *   <button className="min-btn min-btn-primary">Minimal Button</button>
 */

export { THEMES, applyTheme, getCurrentThemeId } from './lib/themes.js'

// Re-export CSS via side-effect imports
// (the consumer imports these; tree-shaking will not remove them)
