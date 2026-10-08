const fs = require('fs');
const path = require('path');

const ENVIRONMENTS_DIR = path.join(__dirname, '..', 'data', 'environments');
const SYMBOLS_DIR = path.join(__dirname, '..', 'data', 'symbols');

let envCache = null;
let symbolCache = null;

const DEFAULT_ENVIRONMENT = {
  name: 'Terminal',
  maxWidth: 80,
  allowedCharacters: 'all',
  ansiSupport: false,
  unicodeSupport: true,
  recommendedFonts: ['Standard', 'Block'],
  recommendedBorders: ['single', 'ascii'],
  recommendedSpacing: 1,
  commentSyntax: null
};

function loadEnvironments() {
  if (envCache) return envCache;

  const result = {};
  const indexPath = path.join(ENVIRONMENTS_DIR, 'index.json');
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    for (const item of index) {
      const fileName = item.file || item.name.toLowerCase().replace(/\s+/g, '-');
      const full = JSON.parse(fs.readFileSync(path.join(ENVIRONMENTS_DIR, fileName + '.json'), 'utf8'));
      result[full.name] = full;
    }
  }
  envCache = result;
  return result;
}

function getEnvironment(name) {
  const envs = loadEnvironments();
  return envs[name] || DEFAULT_ENVIRONMENT;
}

function listEnvironments() {
  const envs = loadEnvironments();
  return Object.values(envs).map(e => ({
    name: e.name,
    label: e.label || e.name,
    category: e.category || 'General',
    description: e.description || ''
  }));
}

function adaptToEnvironment(output, envName) {
  const env = getEnvironment(envName);
  let result = output;

  if (env.maxWidth && typeof result === 'string') {
    const lines = result.split('\n');
    const trimmed = lines.map(l => {
      if (l.length > env.maxWidth) {
        return l.substring(0, env.maxWidth);
      }
      return l;
    });
    result = trimmed.join('\n');
  }

  if (env.allowedCharacters === 'ascii' && typeof result === 'string') {
    result = result.replace(/[^\x00-\x7F]/g, '?');
  }

  return result;
}

function loadSymbols() {
  if (symbolCache) return symbolCache;

  const result = {};
  const indexPath = path.join(SYMBOLS_DIR, 'index.json');
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    for (const item of index) {
      const fileName = item.file || item.name;
      const full = JSON.parse(fs.readFileSync(path.join(SYMBOLS_DIR, fileName + '.json'), 'utf8'));
      result[full.name] = full;
    }
  }
  symbolCache = result;
  return result;
}

function listSymbols() {
  const symbols = loadSymbols();
  return Object.values(symbols).map(s => ({
    name: s.name,
    label: s.label || s.name,
    symbols: s.symbols || []
  }));
}

function getSymbols(category) {
  const symbols = loadSymbols();
  if (category) return symbols[category]?.symbols || [];
  return Object.values(symbols).map(s => s.symbols || []).flat();
}

module.exports = {
  loadEnvironments,
  getEnvironment,
  listEnvironments,
  adaptToEnvironment,
  loadSymbols,
  listSymbols,
  getSymbols,
  DEFAULT_ENVIRONMENT
};
