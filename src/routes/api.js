const path = require('path');
const { validationResult } = require('../utils/validation');
const asciiEngine = require('../services/asciiEngine');
const fontEngine = require('../services/fontEngine');
const layoutEngine = require('../services/layoutEngine');
const boxEngine = require('../services/boxEngine');
const borderEngine = require('../services/borderEngine');
const formatter = require('../services/formatter');
const environmentEngine = require('../services/environmentEngine');

const router = require('express').Router();
const exportController = require('../controllers/exportController');

router.get('/fonts', async (req, res) => {
  try {
    res.json({ success: true, fonts: fontEngine.listFonts() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/borders', async (req, res) => {
  try {
    res.json({ success: true, borders: borderEngine.listBorders() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/styles', async (req, res) => {
  try {
    res.json({ success: true, styles: fontEngine.listStyles() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/environments', async (req, res) => {
  try {
    res.json({ success: true, environments: environmentEngine.listEnvironments() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/symbols', async (req, res) => {
  try {
    const categories = environmentEngine.loadSymbols();
    res.json({ success: true, symbols: Object.values(categories) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate', async (req, res) => {
  try {
    const result = await asciiEngine.generate(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/text', async (req, res) => {
  try {
    const result = await asciiEngine.generateText(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/banner', async (req, res) => {
  try {
    const result = await asciiEngine.generateBanner(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/box', async (req, res) => {
  try {
    const result = await asciiEngine.generateBox(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/table', async (req, res) => {
  try {
    const result = await asciiEngine.generateTable(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/separator', async (req, res) => {
  try {
    const result = await asciiEngine.generateSeparator(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/header', async (req, res) => {
  try {
    const result = await asciiEngine.generateHeader(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/comment', async (req, res) => {
  try {
    const result = await asciiEngine.generateComment(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/logo', async (req, res) => {
  try {
    const result = await asciiEngine.generateLogo(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/composition', async (req, res) => {
  try {
    const result = await asciiEngine.generateComposition(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/generate/table-preview', async (req, res) => {
  try {
    const result = await asciiEngine.generateTable(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/export/txt', exportController.exportTxt);
router.post('/export/markdown', exportController.exportMarkdown);
router.post('/export/json', exportController.exportJson);
router.post('/export/code', exportController.exportCode);
router.post('/download/txt', exportController.downloadTxt);
router.post('/download/md', exportController.downloadMd);

module.exports = router;
