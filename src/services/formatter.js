function trimTrailingWhitespace(text) {
  return text.split('\n').map(line => line.replace(/\s+$/, '')).join('\n');
}

function normalizeLineEndings(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function normalizeIndentation(text, indent = 0) {
  const pad = ' '.repeat(indent);
  return text.split('\n').map(line => line === '' ? '' : pad + line).join('\n');
}

function addPrefix(text, prefix) {
  return text.split('\n').map(line => line === '' ? '' : prefix + line).join('\n');
}

function center(text, width) {
  const { textWidth } = require('../utils/textWidth');
  return text.split('\n').map(line => {
    const w = textWidth(line);
    if (w >= width) return line;
    const total = width - w;
    const left = Math.floor(total / 2);
    const right = total - left;
    return ' '.repeat(left) + line + ' '.repeat(right);
  }).join('\n');
}

function format(text, options = {}) {
  let result = String(text);
  result = normalizeLineEndings(result);

  if (options.trimTrailing) {
    result = trimTrailingWhitespace(result);
  }

  if (options.trimStart && options.trimEnd) {
    result = result.replace(/^\s+/g, '').replace(/\s+$/g, '');
  }

  if (options.normalizeIndent !== undefined) {
    result = normalizeIndentation(result, options.normalizeIndent);
  }

  return result;
}

module.exports = {
  trimTrailingWhitespace,
  normalizeLineEndings,
  normalizeIndentation,
  addPrefix,
  center,
  format
};
