const exportService = require('../services/exportService');

async function exportTxt(req, res) {
  try {
    const { output, filename } = req.body;
    const result = exportService.exportAsText(output, { filename });
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function exportMarkdown(req, res) {
  try {
    const { output, filename, codeBlock, language } = req.body;
    const result = exportService.exportAsMarkdown(output, { filename, codeBlock, language });
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function exportJson(req, res) {
  try {
    const { output, metadata, filename } = req.body;
    const result = exportService.exportAsJson(output, metadata, { filename });
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function exportCode(req, res) {
  try {
    const { output, language, filename } = req.body;
    const result = exportService.exportAsCode(output, language, { filename });
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function downloadTxt(req, res) {
  try {
    const { output } = req.body;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="mindascii_output.txt"');
    res.send(String(output));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function downloadMd(req, res) {
  try {
    const { output } = req.body;
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', 'attachment; filename="mindascii_output.md"');
    res.send(String(output));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  exportTxt,
  exportMarkdown,
  exportJson,
  exportCode,
  downloadTxt,
  downloadMd
};
