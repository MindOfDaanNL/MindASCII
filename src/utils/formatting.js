const { textWidth } = require('./textWidth');

function padRight(str, width) {
  const current = textWidth(str);
  if (current >= width) return str;
  return str + ' '.repeat(width - current);
}

function padLeft(str, width) {
  const current = textWidth(str);
  if (current >= width) return str;
  return ' '.repeat(width - current) + str;
}

function centerText(str, width) {
  const current = textWidth(str);
  if (current >= width) return str;
  const total = width - current;
  const left = Math.floor(total / 2);
  const right = total - left;
  return ' '.repeat(left) + str + ' '.repeat(right);
}

function rightAlign(str, width) {
  const current = textWidth(str);
  if (current >= width) return str;
  return ' '.repeat(width - current) + str;
}

function alignText(text, width, alignment) {
  const lines = text.split('\n');
  switch (alignment) {
    case 'left':
      return lines.map(l => padRight(l, width)).join('\n');
    case 'center':
      return lines.map(l => centerText(l, width)).join('\n');
    case 'right':
      return lines.map(l => rightAlign(l, width)).join('\n');
    case 'justified':
      return justifyText(lines, width);
    default:
      return text;
  }
}

function justifyText(lines, width) {
  if (lines.length <= 1) return padRight(lines[0] || '', width);
  const lastIdx = lines.length - 1;
  return lines.map((line, i) => {
    if (i === lastIdx) return padRight(line, width);
    const words = line.trim().split(/\s+/).filter(w => w);
    if (words.length <= 1) return padRight(line, width);
    const content = words.join(' ');
    const current = textWidth(content);
    if (current >= width) return padRight(content, width);
    const totalSpaces = width - current;
    const gaps = words.length - 1;
    const spacePerGap = Math.floor(totalSpaces / gaps);
    let extra = totalSpaces - spacePerGap * gaps;
    let result = '';
    for (let j = 0; j < words.length; j++) {
      if (j > 0) {
        let spaces = spacePerGap + (extra > 0 ? 1 : 0);
        if (extra > 0) extra--;
        result += ' '.repeat(spaces);
      }
      result += words[j];
    }
    return result;
  }).join('\n');
}

function padVertical(lines, totalHeight, vAlign) {
  if (!Array.isArray(lines)) return lines;
  if (lines.length >= totalHeight) return lines;
  const padLines = totalHeight - lines.length;
  let top = 0, bottom = 0;
  if (vAlign === 'top') {
    bottom = padLines;
  } else if (vAlign === 'bottom') {
    top = padLines;
  } else {
    top = Math.floor(padLines / 2);
    bottom = padLines - top;
  }
  const padding = [];
  for (let i = 0; i < top; i++) padding.push('');
  padding.push(...lines);
  for (let i = 0; i < bottom; i++) padding.push('');
  return padding;
}

function normalizeLineEndings(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function trimTrailingWhitespace(lines) {
  if (Array.isArray(lines)) {
    return lines.map(l => l.replace(/\s+$/, ''));
  }
  return lines.split('\n').map(l => l.replace(/\s+$/, '')).join('\n');
}

function normalizeIndentation(lines, indent = 0) {
  if (!Array.isArray(lines)) return lines;
  const pad = ' '.repeat(indent);
  return lines.map(l => l === '' ? '' : pad + l);
}

module.exports = {
  padRight,
  padLeft,
  centerText,
  rightAlign,
  alignText,
  justifyText,
  padVertical,
  normalizeLineEndings,
  trimTrailingWhitespace,
  normalizeIndentation
};
