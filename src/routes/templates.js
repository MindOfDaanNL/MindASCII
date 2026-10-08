const express = require('express');
const templateController = require('../controllers/templateController');
const router = express.Router();

router.get('/', templateController.getAllTemplates);
router.get('/:id', templateController.getTemplate);
router.post('/', templateController.createTemplate);
router.put('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
