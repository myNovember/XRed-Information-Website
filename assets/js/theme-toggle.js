(function() {
  var toggle = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');
  var html = document.documentElement;
  toggle.addEventListener('click', function() {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      html.classList.add('light');
      icon.textContent = 'light_mode';
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      icon.textContent = 'dark_mode';
    }
  });
})();
