(function() {
  var toggle = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');
  var html = document.documentElement;
  // Sync icon with theme already applied by the head script
  if (html.classList.contains('light')) {
    icon.textContent = 'light_mode';
  }
  toggle.addEventListener('click', function() {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      html.classList.add('light');
      icon.textContent = 'light_mode';
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      icon.textContent = 'dark_mode';
      localStorage.setItem('theme', 'dark');
    }
  });
})();
