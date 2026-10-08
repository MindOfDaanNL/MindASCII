const projectService = require('../services/projectService');

async function getTemplate(req, res) {
  try {
    const { id } = req.params;
    const { templates } = projectService.getTemplates();
    const template = templates.find(t => t.id === id);
    if (!template) {
      return res.status(404).json({ success: false, error: 'Template not found' });
    }
    res.json({ success: true, template });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function getAllTemplates(req, res) {
  try {
    const result = projectService.getTemplates();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function createTemplate(req, res) {
  try {
    const result = projectService.saveTemplate(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function updateTemplate(req, res) {
  try {
    const { id } = req.params;
    const projectService_ = require('../services/projectService');
    const { templates } = projectService_.getTemplates();
    const existing = templates.findIndex(t => t.id === id);
    if (existing < 0) {
      return res.status(404).json({ success: false, error: 'Template not found' });
    }
    const updated = { ...templates[existing], ...req.body, updatedAt: new Date().toISOString() };
    projectService_.saveTemplate(updated);
    res.json({ success: true, template: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function deleteTemplate(req, res) {
  try {
    const { id } = req.params;
    const { templates } = projectService.getTemplates();
    const filtered = templates.filter(t => t.id !== id);
    projectService.saveTemplate({ _replace: true, templates: filtered });
    res.json({ success: true, deleted: templates.length - filtered.length > 0 });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  getTemplate,
  getAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate
};
