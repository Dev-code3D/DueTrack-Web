// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('open');
    });
  }

  // Gestion du mode sombre
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Vérifier la préférence sauvegardée ou la préférence système
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark');
      updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', function() {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      themeToggle.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
    }
  }

  // Mettre à jour l'année dans le footer
  const yearElement = document.querySelector('[data-year]');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Function to open and close the QR modal
function openQrModal() {
      document.getElementById('qr-modal').classList.remove('hidden');
      document.getElementById('qr-modal').classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeQrModal() {
      document.getElementById('qr-modal').classList.add('hidden');
      document.getElementById('qr-modal').classList.remove('flex');
      document.body.style.overflow = '';
    }

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeQrModal();
      }
    });

    // Close modal on background click
    const modalEl = document.getElementById('qr-modal');
    if (modalEl) {
      modalEl.addEventListener('click', function(e) {
        if (e.target === this) {
          closeQrModal();
        }
      });
    }
