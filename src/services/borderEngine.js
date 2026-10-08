const fs = require('fs');
const path = require('path');

const BORDERS_DIR = path.join(__dirname, '..', 'data', 'borders');
let borderCache = null;

function loadBorders() {
  if (borderCache) return borderCache;

  const indexPath = path.join(BORDERS_DIR, 'index.json');
  const result = {};

  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    for (const item of index) {
      const fileName = item.file || item.name.toLowerCase().replace(/\s+/g, '-');
      const full = require(path.join(BORDERS_DIR, fileName + '.json'));
      result[full.name] = full;
    }
  } else {
    const files = fs.readdirSync(BORDERS_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(BORDERS_DIR, file), 'utf8'));
      if (data && data.name) {
        result[data.name] = data;
      }
    }
  }

  borderCache = result;
  return result;
}

function getBorder(name) {
  const borders = loadBorders();
  return borders[name] || borders['single'];
}

function listBorders() {
  const borders = loadBorders();
  return Object.values(borders).map(b => ({
    name: b.name,
    label: b.label || b.name,
    type: b.type || b.name,
    description: b.description || ''
  }));
}

function getChar(border, charName) {
  const b = getBorder(border);
  return b.chars[charName] || b.chars[charName.toLowerCase()] || '?';
}

function drawBox(content, options) {
  const b = getBorder(options.border || 'single');
  const borderType = b.type || b.name;
  const chars = {
    topLeft: options.fillHorizontal ? getChar(borderType, 'topLeft') : getChar(borderType, 'topLeft'),
    topRight: getChar(borderType, 'topRight'),
    bottomLeft: getChar(borderType, 'bottomLeft'),
    bottomRight: getChar(borderType, 'bottomRight'),
    horizontal: getChar(borderType, 'horizontal'),
    vertical: getChar(borderType, 'vertical'),
    teeRight: getChar(borderType, 'teeRight'),
    teeLeft: getChar(borderType, 'teeLeft'),
    teeDown: getChar(borderType, 'teeDown'),
    teeUp: getChar(borderType, 'teeUp'),
    cross: getChar(borderType, 'cross')
  };

  const fillChar = options.fillHorizontal || chars.horizontal;

  const lines = Array.isArray(content) ? content : String(content).split('\n');
  const width = Math.max(...lines.map(l => {
    const { textWidth } = require('../utils/textWidth');
    return textWidth(l);
  }), 0);

  const pad = options.padding || 0;
  const innerWidth = width + pad * 2;
  const top = options.title ? 1 : 0;
  const bottom = options.footer ? 1 : 0;

  const horizontalLine = chars.topLeft + fillChar.repeat(innerWidth) + chars.topRight;
  const bottomLine = chars.bottomLeft + fillChar.repeat(innerWidth) + chars.bottomRight;

  const result = [];

  if (options.title) {
    result.push(chars.topLeft + ' ' + options.title + ' ' + fillChar.repeat(innerWidth - options.title.length - 2) + chars.topRight);
  } else {
    result.push(horizontalLine);
  }

  for (const line of lines) {
    const { padLeft, padRight } = require('../utils/formatting');
    let padded = line;
    if (pad > 0) {
      const padStr = ' '.repeat(pad);
      padded = padStr + padded + padStr;
    }
    result.push(chars.vertical + padded + ' '.repeat(width + pad * 2 - require('../utils/textWidth').textWidth(padded)) + chars.vertical);
  }

  if (options.footer) {
    result.push(chars.bottomLeft + ' ' + options.footer + ' ' + fillChar.repeat(innerWidth - options.footer.length - 2) + chars.bottomRight);
  } else {
    result.push(bottomLine);
  }

  if (options.showBorder === false) {
    return lines.join('\n');
  }

  return result.join('\n');
}

function drawTable(headers, rows, options = {}) {
  const borderType = options.border || 'single';
  const alignments = options.alignments || {};
  const b = getBorder(borderType);
  const chars = b.chars;
  const { textWidth } = require('../utils/textWidth');

  const allData = headers && headers.length > 0 ? [headers, ...rows] : (rows || []);
  const colCount = allData.length > 0 ? Math.max(...allData.map(r => r.length)) : 0;

  const colWidths = [];
  for (let col = 0; col < colCount; col++) {
    let maxWidth = 0;
    for (const row of allData) {
      if (row[col]) {
        maxWidth = Math.max(maxWidth, textWidth(String(row[col])));
      }
    }
    colWidths.push(maxWidth);
  }

  function formatCell(value, col) {
    const cell = String(value || '');
    const width = colWidths[col];
    const align = alignments[col] || 'left';
    const w = textWidth(cell);
    switch (align) {
      case 'center':
        const total = width - w;
        const left = Math.floor(total / 2);
        const right = total - left;
        return ' '.repeat(left) + cell + ' '.repeat(right);
      case 'right':
        return ' '.repeat(width - w) + cell;
      default:
        return cell + ' '.repeat(width - w);
    }
  }

  function separator(left, mid, right, fill) {
    return left + colWidths.map(w => fill.repeat(w)).join(mid) + right;
  }

  const result = [];
  const topLine = separator(chars.topLeft, chars.teeDown, chars.topRight, chars.horizontal);
  const headerSep = separator(chars.teeRight, chars.cross, chars.teeLeft, chars.horizontal);
  const bottomLine = separator(chars.bottomLeft, chars.teeUp, chars.bottomRight, chars.horizontal);
  const rowSep = separator(chars.teeRight, chars.cross, chars.teeLeft, chars.horizontal);

  result.push(topLine);

  if (headers && headers.length > 0) {
    const headerLine = chars.vertical + headers.map(formatCell).join(chars.vertical) + chars.vertical;
    result.push(headerLine);
    result.push(headerSep);

    for (let i = 1; i < allData.length; i++) {
      const row = allData[i];
      const rowLine = chars.vertical + row.map(formatCell).join(chars.vertical) + chars.vertical;
      result.push(rowLine);
    }
  } else {
    for (let i = 0; i < allData.length; i++) {
      const row = allData[i];
      const rowLine = chars.vertical + row.map(formatCell).join(chars.vertical) + chars.vertical;
      result.push(rowLine);
      if (i < allData.length - 1) {
        result.push(rowSep);
      }
    }
  }

  result.push(bottomLine);

  return result.join('\n');
}

module.exports = {
  loadBorders,
  getBorder,
  listBorders,
  getChar,
  drawBox,
  drawTable
};
