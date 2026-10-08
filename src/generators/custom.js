const fontEngine = require('../services/fontEngine');
const borderEngine = require('../services/borderEngine');
const { textWidth } = require('../utils/textWidth');
const { alignText } = require('../utils/formatting');

function generate(input = {}) {
  const {
    elements = [],
    width = 80,
    border = 'single',
    alignment = 'center',
    style = 'Clean'
  } = input;

  if (!elements || elements.length === 0) {
    return { success: true, output: '' };
  }

  const rendered = [];
  for (const el of elements) {
    let text = el.text || '';
    if (el.font) {
      text = fontEngine.renderText(el.text, el.font);
    }
    rendered.push(text);
  }

  let combined = rendered.join('\n');

  const lines = combined.split('\n');
  const maxWidth = Math.max(...lines.map(l => textWidth(l)), 0);
  const targetWidth = width || maxWidth;
  const aligned = lines.map(line => alignText(line, targetWidth, alignment));

  const boxResult = borderEngine.drawBox(aligned, { border });

  return {
    success: true,
    output: boxResult,
    metadata: {
      elements: elements.length,
      border,
      width: targetWidth,
      alignment,
      style
    }
  };
}

module.exports = { generate };
