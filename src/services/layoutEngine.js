const { textWidth } = require('../utils/textWidth');
const { padRight, padLeft, centerText, rightAlign, alignText, padVertical, trimTrailingWhitespace } = require('../utils/formatting');

function fitWidth(text, maxWidth) {
  const lines = text.split('\n');
  const result = [];
  for (let line of lines) {
    const w = textWidth(line);
    if (w > maxWidth) {
      let remaining = line;
      while (textWidth(remaining) > maxWidth) {
        let chunk = '';
        let chunkWidth = 0;
        for (const char of remaining) {
          const cw = getCharWidth(char);
          if (chunkWidth + cw > maxWidth) break;
          chunk += char;
          chunkWidth += cw;
        }
        if (chunkWidth === 0) chunk = remaining.substring(0, 1);
        result.push(chunk);
        remaining = remaining.substring(chunk.length);
      }
      if (remaining) result.push(remaining);
    } else {
      result.push(line);
    }
  }
  return result;
}

function getCharWidth(char) {
  const code = char.codePointAt(0);
  if (code >= 0x1100 && code <= 0x115F) return 2;
  if (code >= 0x2329 && code <= 0x232A) return 2;
  if (code >= 0x2E80 && code <= 0x303E) return 2;
  if (code >= 0x3041 && code <= 0x33FF) return 2;
  if (code >= 0x3401 && code <= 0x4DBF) return 2;
  if (code >= 0x4E00 && code <= 0xA4CF) return 2;
  if (code >= 0xA490 && code <= 0xA4C6) return 2;
  if (code >= 0xA960 && code <= 0xA97F) return 2;
  if (code >= 0xAC00 && code <= 0xD7A3) return 2;
  if (code >= 0xF900 && code <= 0xFAFF) return 2;
  if (code >= 0xFE10 && code <= 0xFE19) return 2;
  if (code >= 0xFE30 && code <= 0xFE6F) return 2;
  if (code >= 0xFF00 && code <= 0xFF60) return 2;
  if (code >= 0x1F300 && code <= 0x1F64F) return 2;
  if (code >= 0x1F900 && code <= 0x1F9FF) return 2;
  if (code >= 0x20000 && code <= 0x3FFFD) return 2;
  return 1;
}

function layout(text, options = {}) {
  const maxWidth = options.width || 80;
  const maxHeight = options.height || null;
  const alignment = options.alignment || 'left';
  const vAlign = options.vAlign || 'top';
  const padding = options.padding || 0;

  let lines = text.split('\n');

  if (padding > 0) {
    const padStr = ' '.repeat(padding);
    lines = lines.map(l => l === '' ? '' : padStr + l);
  }

  lines = lines.map(l => {
    const w = textWidth(l);
    if (w > maxWidth - padding * 2 && maxWidth > padding * 2) {
      return fitWidth(l, maxWidth - padding * 2).join('\n').split('\n')[0];
    }
    return l;
  });

  const innerLines = lines.slice();
  const innerWidth = maxWidth - padding * 2;

  const aligned = innerLines.map(line => alignText(line, innerWidth, alignment));

  let result = aligned;

  if (maxHeight && result.length < maxHeight - padding * 2) {
    result = padVertical(result, maxHeight - padding * 2, vAlign);
  }

  return result.join('\n');
}

function autoWidth(text, maxWidth = 80) {
  const lines = text.split('\n');
  const actualWidth = Math.max(...lines.map(l => textWidth(l)), 1);
  return Math.min(actualWidth, maxWidth);
}

function getBounds(text) {
  const lines = text.split('\n');
  return {
    width: Math.max(...lines.map(l => textWidth(l)), 0),
    height: lines.length
  };
}

module.exports = {
  layout,
  fitWidth,
  autoWidth,
  getBounds,
  padRight,
  padLeft,
  centerText,
  rightAlign,
  padVertical,
  trimTrailingWhitespace
};
