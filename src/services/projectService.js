const fs = require('fs');
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

function saveProject(project) {
  ensureStorageDir();
  const projectsFile = path.join(STORAGE_DIR, 'projects.json');
  let projects = [];
  if (fs.existsSync(projectsFile)) {
    try {
      projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
    } catch (err) {
      projects = [];
    }
  }

  const now = new Date().toISOString();
  const existing = projects.findIndex(p => p.id === project.id);

  if (existing >= 0) {
    project.updatedAt = now;
    projects[existing] = { ...projects[existing], ...project };
  } else {
    project.id = project.id || Date.now().toString();
    project.createdAt = now;
    project.updatedAt = now;
    projects.unshift(project);
  }

  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), 'utf8');
  return { success: true, project: projects[existing >= 0 ? existing : 0] };
}

function getProjects() {
  ensureStorageDir();
  const projectsFile = path.join(STORAGE_DIR, 'projects.json');
  if (!fs.existsSync(projectsFile)) return { success: true, projects: [] };

  try {
    const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
    return { success: true, projects };
  } catch (err) {
    return { success: true, projects: [] };
  }
}

function getProject(id) {
  const { projects } = getProjects();
  const project = projects.find(p => p.id === id);
  return { success: !!project, project };
}

function deleteProject(id) {
  ensureStorageDir();
  const projectsFile = path.join(STORAGE_DIR, 'projects.json');
  let projects = [];
  if (fs.existsSync(projectsFile)) {
    projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
  }
  const filtered = projects.filter(p => p.id !== id);
  fs.writeFileSync(projectsFile, JSON.stringify(filtered, null, 2), 'utf8');
  return { success: true, deleted: projects.length - filtered.length > 0 };
}

function updateProject(id, updates) {
  const { projects } = getProjects();
  const existing = projects.findIndex(p => p.id === id);
  if (existing < 0) return { success: false, error: 'Project not found' };

  projects[existing] = { ...projects[existing], ...updates, updatedAt: new Date().toISOString() };
  ensureStorageDir();
  fs.writeFileSync(path.join(STORAGE_DIR, 'projects.json'), JSON.stringify(projects, null, 2), 'utf8');
  return { success: true, project: projects[existing] };
}

function saveTemplate(template) {
  ensureStorageDir();
  const templatesFile = path.join(STORAGE_DIR, 'templates.json');
  let templates = [];
  if (fs.existsSync(templatesFile)) {
    try {
      templates = JSON.parse(fs.readFileSync(templatesFile, 'utf8'));
    } catch (err) {
      templates = [];
    }
  }

  const now = new Date().toISOString();
  const existing = templates.findIndex(t => t.id === template.id);

  if (existing >= 0) {
    template.updatedAt = now;
    templates[existing] = { ...templates[existing], ...template };
  } else {
    template.id = template.id || Date.now().toString();
    template.createdAt = now;
    template.updatedAt = now;
    templates.unshift(template);
  }

  fs.writeFileSync(templatesFile, JSON.stringify(templates, null, 2), 'utf8');
  return { success: true, template: templates[existing >= 0 ? existing : 0] };
}

function getTemplates() {
  ensureStorageDir();
  const templatesFile = path.join(STORAGE_DIR, 'templates.json');
  if (!fs.existsSync(templatesFile)) return { success: true, templates: [] };

  try {
    const templates = JSON.parse(fs.readFileSync(templatesFile, 'utf8'));
    return { success: true, templates };
  } catch (err) {
    return { success: true, templates: [] };
  }
}

module.exports = {
  saveProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
  saveTemplate,
  getTemplates
};
