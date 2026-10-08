const { textWidth } = require('../utils/textWidth');
const { alignText } = require('../utils/formatting');

const SEPARATOR_CHARS = {
  ascii_dash: { line: '-', left: '+', right: '+', fill: '-' },
  ascii_equal: { line: '=', left: '+', right: '+', fill: '=' },
  ascii_tilde: { line: '~', left: '+', right: '+', fill: '~' },
  ascii_dot: { line: '.', left: '+', right: '+', fill: '.' },
  unicode_dash: { line: '─', left: '┌', right: '┐', fill: '─' },
  unicode_equal: { line: '═', left: '╔', right: '╗', fill: '═' },
  unicode_wave: { line: '〰', left: '', right: '', fill: '〰' }
};

function generate(input = {}) {
  const {
    text = '',
    character = '-',
    length = 60,
    pattern = null,
    prefix = '',
    suffix = '',
    alignment = 'center',
    style = 'Clean'
  } = input;

  let char = character;
  let sepChar = SEPARATOR_CHARS.ascii_dash;

  for (const key of Object.keys(SEPARATOR_CHARS)) {
    if (key === character || SEPARATOR_CHARS[key].line === character) {
      sepChar = SEPARATOR_CHARS[key];
      break;
    }
  }

  let line = '';

  if (pattern && pattern.length > 0) {
    for (let i = 0; i < length; i++) {
      line += pattern[i % pattern.length];
    }
  } else {
    line = char.repeat(length);
  }

  const fullWidth = prefix.length + line.length + suffix.length;
  const targetWidth = Math.max(fullWidth, length);

  const prefixPad = ' '.repeat(Math.max(0, length - line.length));
  let result = prefix + line + suffix;

  const { padRight, padLeft, centerText } = require('../utils/formatting');
  switch (alignment) {
    case 'left':
      result = prefix + line + suffix;
      break;
    case 'right':
      result = ' '.repeat(Math.max(0, targetWidth - prefix.length - line.length - suffix.length)) + prefix + line + suffix;
      break;
    default:
      result = centerText(prefix + line + suffix, targetWidth);
      break;
  }

  return {
    success: true,
    output: result,
    metadata: {
      character,
      length,
      alignment,
      style
    }
  };
}

module.exports = { generate, SEPARATOR_CHARS };
