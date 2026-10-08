const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '..', 'data', 'fonts');
const STYLES_DIR = path.join(__dirname, '..', 'data', 'styles');
const BORDERS_DIR = path.join(__dirname, '..', 'data', 'borders');
const SYMBOLS_DIR = path.join(__dirname, '..', 'data', 'symbols');
const ENVIRONMENTS_DIR = path.join(__dirname, '..', 'data', 'environments');

let fontCache = null;
let styleCache = null;
let borderCache = null;
let symbolCache = null;
let environmentCache = null;

function loadJSON(dir, name) {
  const filePath = path.join(dir, name + '.json');
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function loadAll(dir, indexFile) {
  const indexPath = path.join(dir, indexFile);
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const result = {};
    for (const item of index) {
      result[item.name] = item;
    }
    return result;
  }
  const result = {};
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== indexFile);
    for (const file of files) {
      const data = loadJSON(dir, file.replace('.json', ''));
      if (data && data.name) {
        result[data.name] = data;
      }
    }
  }
  return result;
}

function getFonts() {
  if (!fontCache) {
    fontCache = loadAll(FONTS_DIR, 'index.json');
  }
  return fontCache;
}

function getFont(name) {
  const fonts = getFonts();
  const font = fonts[name] || fonts['Standard'];
  if (font && !font.characters) {
    const full = loadJSON(FONTS_DIR, font.file || font.name);
    if (full) return full;
  }
  return font;
}

function listFonts() {
  const fonts = getFonts();
  return Object.values(fonts).map(f => ({
    name: f.name,
    height: f.height || 6,
    category: f.category || 'Classic',
    description: f.description || ''
  }));
}

function renderText(text, fontName) {
  const font = getFont(fontName);
  if (!font || !font.characters) return text;

  if (!text) return '';

  const chars = text.split('');
  const height = font.height || 6;
  const lines = [];
  for (let i = 0; i < height; i++) lines.push('');

  for (const char of chars) {
    const glyph = font.characters[char] || font.characters[char.toUpperCase()] || font.characters['?'];
    if (!glyph) {
      const spaceLines = font.characters[' '] || Array(height).fill('     ');
      for (let i = 0; i < height; i++) {
        lines[i] += spaceLines[i] || '     ';
      }
      continue;
    }
    for (let i = 0; i < height; i++) {
      lines[i] += glyph[i] || '';
    }
  }

  return lines.join('\n');
}

function getStyles() {
  if (!styleCache) {
    styleCache = loadAll(STYLES_DIR, 'index.json');
  }
  return styleCache;
}

function getStyle(name) {
  const styles = getStyles();
  return styles[name] || styles['Clean'];
}

function listStyles() {
  const styles = getStyles();
  return Object.values(styles).map(s => ({
    name: s.name,
    label: s.label || s.name,
    category: s.category || 'General',
    description: s.description || ''
  }));
}

function applyStyle(result, styleName) {
  const style = getStyle(styleName);
  if (!style || !style.settings) return result;
  return result;
}

module.exports = {
  getFonts,
  getFont,
  listFonts,
  renderText,
  getStyles,
  getStyle,
  listStyles,
  applyStyle,
  FONTS_DIR,
  STYLES_DIR
};
