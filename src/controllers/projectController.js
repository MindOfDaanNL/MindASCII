const projectService = require('../services/projectService');

async function getProject(req, res) {
  try {
    const { id } = req.params;
    const result = projectService.getProject(id);
    if (!result.success) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function getAllProjects(req, res) {
  try {
    const result = projectService.getProjects();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function createProject(req, res) {
  try {
    const result = projectService.saveProject(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const result = projectService.updateProject(id, req.body);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const result = projectService.deleteProject(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  getProject,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
};
