const fontEngine = require('../services/fontEngine');
const { textWidth } = require('../utils/textWidth');

function generate(input = {}) {
  const {
    text = '',
    font = 'Standard',
    width = 80,
    style = 'Clean'
  } = input;

  if (!text) {
    return { success: true, output: '' };
  }

  const lines = text.split('\n').map(t => {
    const ascii = fontEngine.renderText(t, font);
    return ascii;
  });

  const output = lines.join('\n\n');

  return {
    success: true,
    output,
    metadata: {
      font,
      width,
      style
    }
  };
}

module.exports = { generate };
