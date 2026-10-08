document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.getElementById('editorText');
  const preview = document.getElementById('editorPreview');
  const charCount = document.getElementById('charCount');
  const outputWidth = document.getElementById('outputWidth');
  const outputHeight = document.getElementById('outputHeight');

  let history = [];
  let historyIndex = -1;

  function getTextWidth(text) {
    let width = 0;
    for (const char of text) {
      const code = char.codePointAt(0);
      if (code >= 0x1100 && code <= 0x115F) width += 2;
      else if (code >= 0x2329 && code <= 0x232A) width += 2;
      else if (code >= 0x2E80 && code <= 0x303E) width += 2;
      else if (code >= 0x3041 && code <= 0x33FF) width += 2;
      else if (code >= 0x3401 && code <= 0x4DBF) width += 2;
      else if (code >= 0x4E00 && code <= 0xA4CF) width += 2;
      else if (code >= 0xA490 && code <= 0xA4C6) width += 2;
      else if (code >= 0xA960 && code <= 0xA97F) width += 2;
      else if (code >= 0xAC00 && code <= 0xD7A3) width += 2;
      else if (code >= 0xF900 && code <= 0xFAFF) width += 2;
      else if (code >= 0xFE10 && code <= 0xFE19) width += 2;
      else if (code >= 0xFE30 && code <= 0xFE6F) width += 2;
      else if (code >= 0xFF00 && code <= 0xFF60) width += 2;
      else if (code >= 0x1F300 && code <= 0x1F64F) width += 2;
      else if (code >= 0x1F900 && code <= 0x1F9FF) width += 2;
      else if (code >= 0x20000 && code <= 0x3FFFD) width += 2;
      else width += 1;
    }
    return width;
  }

  function updateStats() {
    if (textarea && charCount) {
      charCount.textContent = textarea.value.length;
    }
    if (textarea && outputWidth && outputHeight) {
      const lines = textarea.value.split('\n');
      outputHeight.textContent = lines.length;
      let maxWidth = 0;
      for (const line of lines) {
        const w = getTextWidth(line);
        if (w > maxWidth) maxWidth = w;
      }
      outputWidth.textContent = maxWidth;
    }
  }

  function updatePreview() {
    if (textarea && preview) {
      const val = textarea.value;
      preview.textContent = val || 'No preview available';
      preview.classList.toggle('preview-placeholder', !val);
    }
  }

  function saveToHistory() {
    const content = textarea ? textarea.value : '';
    history = history.slice(0, historyIndex + 1);
    history.push(content);
    historyIndex = history.length - 1;
    if (history.length > 100) {
      history.shift();
      historyIndex--;
    }
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      textarea.value = history[historyIndex];
      updateStats();
      updatePreview();
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      textarea.value = history[historyIndex];
      updateStats();
      updatePreview();
    }
  }

  if (textarea) {
    saveToHistory();
    updateStats();
    updatePreview();

    textarea.addEventListener('input', function() {
      saveToHistory();
      updateStats();
      updatePreview();
    });

    document.getElementById('editorUndo')?.addEventListener('click', undo);
    document.getElementById('editorRedo')?.addEventListener('click', redo);

    document.getElementById('editorCopy')?.addEventListener('click', function() {
      navigator.clipboard.writeText(textarea.value).then(() => {
        const original = document.getElementById('editorCopy').textContent;
        document.getElementById('editorCopy').textContent = 'Copied!';
        setTimeout(() => document.getElementById('editorCopy').textContent = original, 2000);
      });
    });

    document.getElementById('editorSave')?.addEventListener('click', function() {
      const name = prompt('Project name:', 'My Project');
      if (!name) return;
      fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          type: 'editor',
          output: textarea.value,
          settings: {}
        })
      })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            window.location.href = '/projects';
          } else {
            alert('Error: ' + (data.error || 'Unknown error'));
          }
        })
        .catch(err => alert('Error: ' + err.message));
    });

    document.getElementById('editorFind')?.addEventListener('click', function() {
      const search = prompt('Find:');
      if (!search) return;
      const idx = textarea.value.indexOf(search);
      if (idx >= 0) {
        textarea.focus();
        textarea.setSelectionRange(idx, idx + search.length);
      } else {
        alert('Not found');
      }
    });

    document.getElementById('editorReplace')?.addEventListener('click', function() {
      const search = prompt('Find:');
      if (!search) return;
      const replace = prompt('Replace:');
      if (replace === null) return;
      textarea.value = textarea.value.split(search).join(replace);
      saveToHistory();
      updateStats();
      updatePreview();
    });

    document.getElementById('editorFormat')?.addEventListener('click', function() {
      const lines = textarea.value.split('\n');
      const trimmed = lines.map(l => l.replace(/\s+$/, ''));
      textarea.value = trimmed.join('\n');
      saveToHistory();
      updateStats();
      updatePreview();
    });

    document.getElementById('editorExport')?.addEventListener('click', function() {
      const text = textarea.value;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mindascii_export.txt';
      a.click();
      URL.revokeObjectURL(url);
    });

    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if (e.ctrlKey && (e.key === 'Z' || (e.ctrlKey && e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); }
      if (e.ctrlKey && e.key === 's') { e.preventDefault(); document.getElementById('editorSave')?.click(); }
      if (e.ctrlKey && e.key === 'c') { /* copy handled by browser */ }
      if (e.ctrlKey && e.key === 'a') { /* select all handled by browser */ }
      if (e.key === 'Tab') {
        e.preventDefault();
        document.getElementById('editorText').focus();
        document.execCommand('insertText', false, '\t');
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        textarea.value = '';
        saveToHistory();
        updateStats();
        updatePreview();
      }
    });
  }
});
