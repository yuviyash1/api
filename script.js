// DISHA Recruitment — shared interactions
(function() {
    // 1. Inject your CSS code dynamically
    const cssStyles = `
    :root {
        --navy: #0c1f4d;
        --navy-light: #16275e;
        --orange: #f4631e;
        --orange-dark: #e0501a;
        --bg-grey: #f5f6f8;
        --line: #e7e9ee;
        --text-dark: #16275e;
        --text-body: #4b5468;
        --white: #ffffff;
        --radius: 10px;
        --shadow: 0 4px 18px rgba(12,31,77,0.08);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { font-family: 'Inter', sans-serif; color:var(--text-body); background:var(--white); }
    /* ... Paste the rest of your style.css rules here ... */
    `;

    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

  
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      if (navLinks.classList.contains('open')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#fff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 8px 18px rgba(12,31,77,0.12)';
        navLinks.style.zIndex = '999';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }

  // Buttons that point to contact / hiring support scroll smoothly if anchor on same page
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
