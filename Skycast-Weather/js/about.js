document.addEventListener('DOMContentLoaded', () => {
  // Theme setup
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const header = document.querySelector('header');
  const themeToggleBtn = document.createElement('button');
  themeToggleBtn.id = 'themeToggleBtn';
  themeToggleBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
  Object.assign(themeToggleBtn.style, {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginLeft: '1rem'
  });
  header.appendChild(themeToggleBtn);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    console.log('Form Submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });

  // 🔽 Hamburger Menu Toggle (add this block)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});
