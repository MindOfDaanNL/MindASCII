const fontEngine = require('../services/fontEngine');
const { textWidth } = require('../utils/textWidth');
const { centerText, rightAlign, alignText, padRight } = require('../utils/formatting');

function generate(input = {}) {
  const {
    text = '',
    font = 'Standard',
    width = 80,
    alignment = 'center',
    style = 'Clean'
  } = input;

  if (!text) {
    return { success: true, output: '' };
  }

  const ascii = fontEngine.renderText(text, font);
  const lines = ascii.split('\n');
  const maxWidth = Math.max(...lines.map(l => textWidth(l)), 0);
  const targetWidth = width || maxWidth;

  const aligned = lines.map(line => alignText(line, targetWidth, alignment));

  return {
    success: true,
    output: aligned.join('\n'),
    metadata: {
      font,
      width: maxWidth,
      height: lines.length,
      alignment,
      style
    }
  };
}

module.exports = { generate };
