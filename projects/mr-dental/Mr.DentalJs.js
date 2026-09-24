(() => {
  'use strict';
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  const header = document.querySelector('header.nav');
  const mobile = window.matchMedia('(max-width: 940px)');

  function setMenu(open, restoreFocus = false) {
    if (!burger || !menu) return;
    open = Boolean(open && mobile.matches);
    menu.hidden = !open;
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    if (restoreFocus) burger.focus();
  }

  if (burger && menu) {
    burger.addEventListener('click', () => setMenu(menu.hidden));
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setMenu(false);
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({preventScroll: true});
        }
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);
    });
    document.addEventListener('click', event => {
      if (!menu.hidden && !header.contains(event.target)) setMenu(false);
    });
    document.addEventListener('focusin', event => {
      if (!menu.hidden && !header.contains(event.target)) setMenu(false);
    });
    mobile.addEventListener('change', () => setMenu(false));
    setMenu(false);
  }

  const toast = document.getElementById('toast');
  const message = document.getElementById('toastMsg');
  let timer;
  function showToast(text) {
    if (!toast || !message) return;
    message.textContent = text;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 3200);
  }
  if (toast) { toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite'); }

  // These controls may be absent in a version without an appointment form.
  const submit = document.getElementById('apptSubmit');
  if (submit) submit.addEventListener('click', () => {
    showToast('Для записи на приём свяжитесь с клиникой по телефону.');
  });
  const play = document.getElementById('playBtn');
  if (play) play.addEventListener('click', () => showToast('Видео-демонстрация скоро будет доступна.'));
})();
