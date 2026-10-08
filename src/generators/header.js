const borderEngine = require('../services/borderEngine');
const { textWidth } = require('../utils/textWidth');
const { alignText, centerText } = require('../utils/formatting');

const DEFAULT_WIDTHS = {
  single: 60,
  double: 60,
  rounded: 60,
  ascii: 60
};

function generate(input = {}) {
  const {
    text = '',
    border = 'double',
    width = DEFAULT_WIDTHS[border] || 60,
    alignment = 'center',
    topBorder = true,
    bottomBorder = true,
    style = 'Clean'
  } = input;

  if (!text) {
    if (topBorder) {
      const b = borderEngine.getBorder(border);
      const line = b.chars.horizontal.repeat(width);
      console.log(line);
      return { success: true, output: line };
    }
    return { success: true, output: '' };
  }

  const b = borderEngine.getBorder(border);
  const chars = b.chars;
  const lines = String(text).split('\n');
  const maxWidth = Math.min(Math.max(...lines.map(l => textWidth(l)), 0), width);

  const aligned = lines.map(line => alignText(line, maxWidth, alignment));

  const result = [];
  const horizontalLine = chars.horizontal.repeat(width);

  if (topBorder) {
    if (chars.topLeft && chars.topRight) {
      result.push(chars.topLeft + horizontalLine + chars.topRight);
    } else {
      result.push(horizontalLine);
    }
  }

  for (const line of aligned) {
    if (chars.vertical) {
      const w = textWidth(line);
      const padded = alignText(line, maxWidth, alignment);
      result.push(chars.vertical + ' ' + padded + ' '.repeat(Math.max(0, maxWidth - textWidth(padded))) + ' ' + chars.vertical);
    } else {
      result.push(line);
    }
  }

  if (bottomBorder) {
    if (chars.bottomLeft && chars.bottomRight) {
      result.push(chars.bottomLeft + horizontalLine + chars.bottomRight);
    } else {
      result.push(horizontalLine);
    }
  }

  return {
    success: true,
    output: result.join('\n'),
    metadata: {
      border,
      width,
      alignment,
      topBorder,
      bottomBorder,
      style
    }
  };
}

module.exports = { generate };
