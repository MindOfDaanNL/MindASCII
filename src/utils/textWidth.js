const COMBINING_CHARS = new Set([
  '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
  '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
  '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317',
  '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F',
  '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327',
  '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D', '\u032E', '\u032F'
]);

function getCharWidth(char) {
  if (char === '\t') return 4;
  if (COMBINING_CHARS.has(char)) return 0;
  const code = char.codePointAt(0);
  if (code >= 0x1100 && code <= 0x115F) return 2;
  if (code >= 0x2329 && code <= 0x232A) return 2;
  if (code >= 0x2E80 && code <= 0x303E) return 2;
  if (code >= 0x3041 && code <= 0x33FF) return 2;
  if (code >= 0x3401 && code <= 0x4DBF) return 2;
  if (code >= 0x4E00 && code <= 0xA4CF) return 2;
  if (code >= 0xA490 && code <= 0xA4C6) return 2;
  if (code >= 0xA960 && code <= 0xA97F) return 2;
  if (code >= 0xAC00 && code <= 0xD7A3) return 2;
  if (code >= 0xF900 && code <= 0xFAFF) return 2;
  if (code >= 0xFE10 && code <= 0xFE19) return 2;
  if (code >= 0xFE30 && code <= 0xFE6F) return 2;
  if (code >= 0xFF00 && code <= 0xFF60) return 2;
  if (code >= 0x1F300 && code <= 0x1F64F) return 2;
  if (code >= 0x1F900 && code <= 0x1F9FF) return 2;
  if (code >= 0x20000 && code <= 0x3FFFD) return 2;
  return 1;
}

function textWidth(str) {
  if (!str) return 0;
  let width = 0;
  for (const char of str) {
    width += getCharWidth(char);
  }
  return width;
}

function getStringWidth(str) {
  return textWidth(str);
}

function truncate(str, maxWidth) {
  let result = '';
  let w = 0;
  for (const char of str) {
    const cw = getCharWidth(char);
    if (w + cw > maxWidth) break;
    w += cw;
    result += char;
  }
  return result;
}

module.exports = {
  textWidth,
  getStringWidth,
  truncate,
  COMBINING_CHARS
};
