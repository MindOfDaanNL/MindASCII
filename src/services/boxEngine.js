const fs = require('fs');
const path = require('path');
const { textWidth } = require('../utils/textWidth');
const borderEngine = require('./borderEngine');

const BOXES_DIR = path.join(__dirname, '..', 'data', 'boxes');
let boxCache = null;

function loadBoxes() {
  if (boxCache) return boxCache;
  const result = {};
  if (fs.existsSync(BOXES_DIR)) {
    const files = fs.readdirSync(BOXES_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(BOXES_DIR, file), 'utf8'));
      if (data && data.name) {
        result[data.name] = data;
      }
    }
  }
  boxCache = result;
  return result;
}

function createBox(content, options = {}) {
  const borderType = options.border || 'single';
  const borderWidth = options.borderThickness || 1;
  const width = options.width || null;
  const height = options.height || null;
  const padding = options.padding || 1;
  const title = options.title || null;
  const footer = options.footer || null;
  const alignment = options.alignment || 'center';
  const vAlign = options.vAlign || 'center';

  const lines = String(content).split('\n');

  let innerWidth;
  if (width) {
    innerWidth = width - borderWidth * 2 - padding * 2;
  } else {
    innerWidth = Math.max(...lines.map(l => textWidth(l)), 1);
  }

  const padStr = ' '.repeat(padding);
  const paddedLines = lines.map(line => {
    const w = textWidth(line);
    let aligned;
    switch (alignment) {
      case 'center':
        aligned = line;
        break;
      case 'right':
        aligned = ' '.repeat(innerWidth - w) + line;
        break;
      default:
        aligned = line;
    }
    if (textWidth(aligned) < innerWidth) {
      aligned = aligned + ' '.repeat(innerWidth - textWidth(aligned));
    } else if (textWidth(aligned) > innerWidth) {
      aligned = aligned.substring(0, innerWidth);
    }
    return padStr + aligned + padStr;
  });

  let boxContent = paddedLines;
  if (height) {
    const totalHeight = height - borderWidth * 2;
    const padNeeded = totalHeight - boxContent.length;
    if (padNeeded > 0) {
      const padLines = Array(padNeeded).fill(padStr + ' '.repeat(innerWidth) + padStr);
      if (vAlign === 'top') {
        boxContent = [...paddedLines, ...padLines];
      } else if (vAlign === 'bottom') {
        boxContent = [...padLines, ...paddedLines];
      } else {
        const top = Math.floor(padNeeded / 2);
        const bottom = padNeeded - top;
        boxContent = [...Array(top).fill(padStr + ' '.repeat(innerWidth) + padStr), ...paddedLines, ...Array(bottom).fill(padStr + ' '.repeat(innerWidth) + padStr)];
      }
    }
  }

  return borderEngine.drawBox(boxContent, {
    border: borderType,
    title: title,
    footer: footer,
    padding: 0
  });
}

module.exports = {
  loadBoxes,
  createBox,
  drawTable: borderEngine.drawTable
};
