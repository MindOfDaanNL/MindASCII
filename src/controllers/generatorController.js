const fontEngine = require('../services/fontEngine');
const borderEngine = require('../services/borderEngine');
const environmentEngine = require('../services/environmentEngine');
const projectService = require('../services/projectService');
const { textWidth } = require('../utils/textWidth');

async function renderHome(req, res) {
  const fonts = fontEngine.listFonts();
  const borders = borderEngine.listBorders();
  const styles = fontEngine.listStyles();
  const environments = environmentEngine.listEnvironments();
  const symbols = environmentEngine.getSymbols();
  const languages = require('../services/asciiEngine').listLanguages();

  const { projects } = projectService.getProjects();

  const fontPreviews = fonts.map(f => ({
    name: f.name,
    category: f.category,
    preview: fontEngine.renderText('AB', f.name)
  }));

  const borderPreviews = borders.map(b => ({
    name: b.name,
    type: b.type,
    preview: borderEngine.drawBox([' '], { border: b.name })
  }));

  const symbolPreviews = environmentEngine.loadSymbols();
  const symbolCategories = Object.values(symbolPreviews);

  res.render('home/index', {
    title: 'MindASCII',
    fonts,
    fontPreviews,
    borders,
    borderPreviews,
    styles,
    environments,
    symbols: symbolCategories,
    languages,
    recentProjects: projects.slice(0, 5)
  });
}

async function renderGenerator(req, res) {
  const fonts = fontEngine.listFonts();
  const borders = borderEngine.listBorders();
  const styles = fontEngine.listStyles();
  const environments = environmentEngine.listEnvironments();
  const symbols = environmentEngine.getSymbols();
  const languages = require('../services/asciiEngine').listLanguages();

  res.render('generator/index', {
    title: 'Generator - MindASCII',
    fonts,
    borders,
    styles,
    environments,
    symbols,
    languages
  });
}

async function renderEditor(req, res) {
  const fonts = fontEngine.listFonts();
  const borders = borderEngine.listBorders();
  const styles = fontEngine.listStyles();
  const environments = environmentEngine.listEnvironments();
  const symbols = environmentEngine.getSymbols();
  const languages = require('../services/asciiEngine').listLanguages();

  let project = null;
  if (req.params.projectId) {
    const result = projectService.getProject(req.params.projectId);
    project = result.project;
  }

  res.render('editor/index', {
    title: 'Editor - MindASCII',
    fonts,
    borders,
    styles,
    environments,
    symbols,
    languages,
    project
  });
}

async function renderProjects(req, res) {
  const { projects } = projectService.getProjects();

  res.render('projects/index', {
    title: 'Projects - MindASCII',
    projects
  });
}

async function renderTemplates(req, res) {
  const { templates } = projectService.getTemplates();
  const fonts = fontEngine.listFonts();
  const borders = borderEngine.listBorders();
  const styles = fontEngine.listStyles();

  res.render('templates/index', {
    title: 'Templates - MindASCII',
    templates,
    fonts,
    borders,
    styles
  });
}

async function renderSettings(req, res) {
  const environments = environmentEngine.listEnvironments();
  const fonts = fontEngine.listFonts();
  const borders = borderEngine.listBorders();
  const styles = fontEngine.listStyles();

  res.render('settings/index', {
    title: 'Settings - MindASCII',
    environments,
    fonts,
    borders,
    styles
  });
}

module.exports = {
  renderHome,
  renderGenerator,
  renderEditor,
  renderProjects,
  renderTemplates,
  renderSettings
};
