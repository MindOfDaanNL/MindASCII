const fontEngine = require('../services/fontEngine');
const borderEngine = require('../services/borderEngine');
const { textWidth } = require('../utils/textWidth');
const { alignText } = require('../utils/formatting');

function generate(input = {}) {
  const {
    text = '',
    font = 'Block',
    width = 80,
    height = null,
    border = 'double',
    padding = 1,
    title = null,
    footer = null,
    alignment = 'center',
    vAlign = 'center',
    style = 'Retro'
  } = input;

  if (!text) {
    return { success: true, output: '' };
  }

  const ascii = fontEngine.renderText(text, font);
  const lines = ascii.split('\n');
  const maxWidth = Math.max(...lines.map(l => textWidth(l)), 0);

  const aligned = lines.map(line => alignText(line, maxWidth, alignment));

  const boxResult = borderEngine.drawBox(aligned, {
    border,
    title,
    footer,
    padding
  });

  return {
    success: true,
    output: boxResult,
    metadata: {
      font,
      border,
      width: maxWidth + padding * 2,
      height: aligned.length + 2,
      alignment,
      vAlign,
      style
    }
  };
}

module.exports = { generate };
