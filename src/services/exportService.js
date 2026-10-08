const fs = require('fs');
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

function exportAsText(output, options = {}) {
  let result = String(output);

  if (options.trimTrailing) {
    result = result.split('\n').map(l => l.replace(/\s+$/, '')).join('\n');
  }

  if (options.prefix) {
    result = result.split('\n').map(l => l === '' ? l : options.prefix + l).join('\n');
  }

  if (options.suffix) {
    result = result.split('\n').map(l => l === '' ? l : l + options.suffix).join('\n');
  }

  return {
    success: true,
    output: result,
    format: 'txt',
    filename: options.filename || 'mindascii_output.txt'
  };
}

function exportAsMarkdown(output, options = {}) {
  const codeBlock = options.codeBlock !== false;
  const language = options.language || 'text';
  let content = String(output);

  if (options.trimTrailing) {
    content = content.split('\n').map(l => l.replace(/\s+$/, '')).join('\n');
  }

  if (codeBlock) {
    content = '```' + language + '\n' + content + '\n```';
  }

  return {
    success: true,
    output: content,
    format: 'md',
    filename: options.filename || 'mindascii_output.md'
  };
}

function exportAsJson(output, metadata = {}, options = {}) {
  const data = {
    success: true,
    output: String(output),
    metadata: metadata || {}
  };

  return {
    success: true,
    output: JSON.stringify(data, null, 2),
    format: 'json',
    filename: options.filename || 'mindascii_output.json',
    rawData: data
  };
}

function exportAsCode(output, language = 'javascript', options = {}) {
  const syntax = require('../services/asciiEngine').getCommentSyntax(language);
  let content = String(output);

  if (syntax.line) {
    content = content.split('\n').map(l => {
      if (l.trim() === '') return '';
      return syntax.line + l;
    }).join('\n');
  }

  return {
    success: true,
    output: content,
    format: language,
    filename: options.filename || `mindascii_output.${language.replace(/#|_.*/, '')}.txt`
  };
}

function saveToFile(output, filename) {
  ensureStorageDir();
  const filePath = path.join(STORAGE_DIR, filename);
  fs.writeFileSync(filePath, String(output), 'utf8');
  return {
    success: true,
    filePath,
    filename
  };
}

module.exports = {
  exportAsText,
  exportAsMarkdown,
  exportAsJson,
  exportAsCode,
  saveToFile
};
