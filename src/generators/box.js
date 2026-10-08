const borderEngine = require('../services/borderEngine');
const { textWidth } = require('../utils/textWidth');
const { alignText } = require('../utils/formatting');

function generate(input = {}) {
  const {
    text = '',
    font = 'Standard',
    width = 60,
    height = null,
    border = 'single',
    padding = 1,
    title = null,
    footer = null,
    alignment = 'center',
    vAlign = 'center',
    style = 'Clean'
  } = input;

  if (!text) {
    return { success: true, output: '' };
  }

  const lines = String(text).split('\n');
  let aligned = lines.map(line => alignText(line, width - padding * 2, alignment));

  let boxContent = aligned;
  if (height) {
    const innerHeight = height - 2 - padding * 2;
    const { padVertical } = require('../utils/formatting');
    if (boxContent.length < innerHeight) {
      boxContent = padVertical(boxContent, innerHeight, vAlign);
    }
  }

  const result = borderEngine.drawBox(boxContent, {
    border,
    title,
    footer,
    padding
  });

  return {
    success: true,
    output: result,
    metadata: {
      border,
      width,
      height: boxContent.length + 2 + padding * 2,
      alignment,
      vAlign,
      style
    }
  };
}

module.exports = { generate };
