document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.header__toggle');
  const nav = document.querySelector('.header__nav');

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');

    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú' : 'Abrir menú'
    );
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) closeMenu();
  });
});