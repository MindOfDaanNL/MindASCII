const borderEngine = require('../services/borderEngine');
const { textWidth } = require('../utils/textWidth');
const { alignText } = require('../utils/formatting');

function generate(input = {}) {
  const {
    headers = [],
    rows = [],
    border = 'single',
    widths = null,
    alignments = {},
    style = 'Clean'
  } = input;

  const result = borderEngine.drawTable(headers, rows, {
    border,
    alignments: alignments || {}
  });

  return {
    success: true,
    output: result,
    metadata: {
      border,
      columns: (headers || rows[0] || []).length,
      rows: rows.length,
      style
    }
  };
}

module.exports = { generate };
