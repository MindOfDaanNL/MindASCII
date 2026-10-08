const path = require('path');
const generatorController = require('../controllers/generatorController');

const router = require('express').Router();

router.get('/', generatorController.renderHome);
router.get('/generator', generatorController.renderGenerator);
router.get('/editor/:projectId?', generatorController.renderEditor);
router.get('/projects', generatorController.renderProjects);
router.get('/templates', generatorController.renderTemplates);
router.get('/settings', generatorController.renderSettings);

module.exports = router;
