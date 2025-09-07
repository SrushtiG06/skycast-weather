document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const unitToggle = document.getElementById('unitToggle');
  const resetBtn = document.getElementById('resetBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // Load saved settings
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedUnit = localStorage.getItem('unit') || 'celsius';

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(savedTheme);
  themeToggle.value = savedTheme;
  unitToggle.value = savedUnit;

  // Change theme from dropdown
  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.value;
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
  });

  // Change unit
  unitToggle.addEventListener('change', () => {
    localStorage.setItem('unit', unitToggle.value);
  });

  // Reset settings
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('theme');
    localStorage.removeItem('unit');
    themeToggle.value = 'light';
    unitToggle.value = 'celsius';
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = '🌙';
    }
  });

  // Theme toggle button in header (☀️ / 🌙)
  if (themeToggleBtn) {
    themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.value = newTheme;
      themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Hamburger menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});
