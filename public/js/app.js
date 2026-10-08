document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && sidebar.classList.contains('active') &&
          !sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('active');
      }
    });
  }

  const theme = localStorage.getItem('mindascii_theme') || 'dark';
  document.body.setAttribute('data-theme', theme);

  const savedSettings = JSON.parse(localStorage.getItem('mindascii_settings') || '{}');
  if (savedSettings.previewFontSize) {
    const preview = document.querySelector('.preview-output');
    if (preview) preview.style.fontSize = savedSettings.previewFontSize + 'px';
  }
});
