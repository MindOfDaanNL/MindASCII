const fs = require('fs');
const path = require('path');

const DEFAULT_ENV = {
  name: 'Terminal',
  maxWidth: 120,
  allowedCharacters: 'all',
  commentSyntax: null,
  ansiSupport: false,
  unicodeSupport: true,
  recommendedFonts: ['Standard', 'Block', 'Slant'],
  recommendedBorders: ['single', 'double', 'rounded'],
  recommendedSpacing: 1
};

const ENVIRONMENTS_DIR = path.join(__dirname, '..', 'data', 'environments');

function loadEnvironments() {
  const environments = {};
  if (fs.existsSync(ENVIRONMENTS_DIR)) {
    const files = fs.readdirSync(ENVIRONMENTS_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(ENVIRONMENTS_DIR, file), 'utf8'));
      environments[data.name] = data;
    }
  }
  return environments;
}

function getEnvironment(name) {
  const environments = loadEnvironments();
  return environments[name] || DEFAULT_ENV;
}

function loadEnvironment(req, res, next) {
  res.locals.environments = loadEnvironments();
  res.locals.environment = getEnvironment(req.query.usage || 'Terminal');
  next();
}

module.exports = {
  loadEnvironments,
  getEnvironment,
  DEFAULT_ENV,
  loadEnvironment
};
