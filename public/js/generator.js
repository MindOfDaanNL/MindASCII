document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('generatorForm');
  const output = document.getElementById('genOutput');
  const copyBtn = document.getElementById('copyBtn');
  const exportBtn = document.getElementById('exportBtn');
  const typeSelect = document.getElementById('genType');
  const textInput = document.getElementById('genText');
  const languageSelect = document.getElementById('genLanguage');

  function toggleFields() {
    const type = typeSelect?.value;
    const textRow = textInput?.closest('.form-row');
    const langRow = languageSelect?.closest('.form-row');

    if (textRow) textRow.style.display = (type === 'separator') ? 'none' : 'flex';
    if (langRow) langRow.style.display = (type === 'comment') ? 'flex' : 'none';

    const tableText = textInput?.value || 'Name,Status,Port';
    if (type === 'table') {
      textInput.value = tableText;
    }
  }

  function getSeparatorData() {
    const char = document.querySelector('[name="character"]')?.value || '-';
    const patternInput = document.querySelector('[name="pattern"]')?.value || '';
    const length = parseInt(document.querySelector('[name="length"]')?.value || '60');
    return {
      type: 'separator',
      character: char,
      pattern: patternInput,
      length: length
    };
  }

  function getFormData() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const type = data.type || 'text';

    if (type === 'separator') {
      return getSeparatorData();
    }

    if (type === 'table') {
      const text = data.text || 'MindDocker,Running,3050\nMindASCII,Development,3050';
      const rows = text.split('\n').map(line => line.split(','));
      return {
        type: 'table',
        headers: rows[0],
        rows: rows.slice(1),
        border: data.border,
        alignment: data.alignment
      };
    }

    if (type === 'comment') {
      return {
        type: 'comment',
        text: data.text,
        language: data.language,
        border: data.border,
        width: parseInt(data.width) || 80
      };
    }

    if (type === 'logo') {
      const textParts = data.text.split(',');
      const elements = textParts.map((t, i) => ({
        type: i === 0 ? 'banner' : 'text',
        text: t.trim(),
        font: data.font
      }));
      return {
        type: 'composition',
        elements: elements,
        width: parseInt(data.width) || 80,
        border: data.border,
        alignment: data.alignment
      };
    }

    return {
      type: type,
      text: data.text,
      font: data.font,
      usage: data.usage,
      width: parseInt(data.width) || 80,
      height: null,
      border: data.border,
      style: data.style,
      language: data.language,
      alignment: data.alignment,
      padding: parseInt(data.padding) || 1
    };
  }

  function generate() {
    const data = getFormData();
    const endpoint = data.type === 'comment' ? '/api/generate/comment' : '/api/generate';

    output.textContent = '';
    output.classList.remove('preview-placeholder');

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(result => {
        if (result.success) {
          output.textContent = result.output;
        } else {
          output.textContent = 'Error: ' + (result.error || 'Unknown error');
          output.classList.add('preview-placeholder');
        }
      })
      .catch(err => {
        output.textContent = 'Error: ' + err.message;
        output.classList.add('preview-placeholder');
      });
  }

  function updatePreview() {
    if (output.textContent) {
      output.classList.remove('preview-placeholder');
    }
  }

  if (form) {
    toggleFields();

    typeSelect?.addEventListener('change', function() {
      toggleFields();
      generate();
    });

    const allInputs = form.querySelectorAll('input, select');
    allInputs.forEach(input => {
      input.addEventListener('change', generate);
      input.addEventListener('keyup', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'SELECT') {
          e.preventDefault();
          generate();
        }
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      generate();
    });

    generate();
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const text = output.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 2000);
      });
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      const text = output.textContent;
      const type = typeSelect?.value || 'text';
      let content = text;
      let filename = 'mindascii_output.txt';

      if (type === 'comment') {
        filename = 'mindascii_comment.md';
        content = '```\n' + text + '\n```';
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const template = localStorage.getItem('mindascii_template');
  if (template && output) {
    try {
      const t = JSON.parse(template);
      output.textContent = t.output || t.content;
      output.classList.remove('preview-placeholder');
      localStorage.removeItem('mindascii_template');
    } catch(e) {}
  }
});
