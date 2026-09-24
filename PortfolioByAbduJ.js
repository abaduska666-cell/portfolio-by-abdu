/* Персональные данные: замените имя в HTML, email здесь и ссылки соцсетей в HTML. */
const CONTACT_EMAIL = 'abaduska666@gmail.com';
let language = 'ru';
const languageButton = document.querySelector('.language');
const translated = [...document.querySelectorAll('[data-en]')];
translated.forEach(element => element.dataset.ru = element.textContent);
const placeholders = [...document.querySelectorAll('[data-en-placeholder]')];
placeholders.forEach(element => element.dataset.ruPlaceholder = element.placeholder);
const menu = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-toggle');
function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', language === 'ru' ? 'Открыть меню' : 'Open menu');
}
languageButton.addEventListener('click', () => {
  language = language === 'ru' ? 'en' : 'ru';
  document.documentElement.lang = language;
  translated.forEach(element => element.textContent = element.dataset[language]);
  placeholders.forEach(element => element.placeholder = element.dataset[language + 'Placeholder']);
  languageButton.innerHTML = language.toUpperCase() + ' <span>⌄</span>';
  languageButton.setAttribute('aria-label', language === 'ru' ? 'Switch to English' : 'Переключить на русский');
  document.title = language === 'ru' ? 'Portfolio от Абду — фуллстак-разработчик' : 'Portfolio by Abdu — fullstack developer';
  document.querySelector('.dialog-close').setAttribute('aria-label', language === 'ru' ? 'Закрыть' : 'Close');
  document.querySelector('#form-status').textContent = '';
  closeMenu();
});
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? (language === 'ru' ? 'Закрыть меню' : 'Close menu') : (language === 'ru' ? 'Открыть меню' : 'Open menu'));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.querySelectorAll('.email-link').forEach(a => { a.href = 'mailto:' + CONTACT_EMAIL; a.innerHTML = a.innerHTML.replace('hello@example.com', CONTACT_EMAIL); });
document.querySelector('#year').textContent = new Date().getFullYear();
const projects = [
  {
    "title": "Mr.Dental",
    "url": "./projects/mr-dental/index.html",
    "category": [
      "СТОМАТОЛОГИЧЕСКАЯ КЛИНИКА",
      "DENTAL CLINIC"
    ],
    "description": [
      "Адаптивный сайт стоматологической клиники: услуги, истории пациентов и мобильная навигация.",
      "A responsive dental clinic website with services, patient stories and mobile navigation."
    ],
    "scope": [
      "HTML · CSS · JavaScript. Учебный проект для портфолио.",
      "HTML · CSS · JavaScript. A learning project for my portfolio."
    ]
  },
  {
    "title": "BobliRest",
    "url": "./projects/boblirest/index.html",
    "category": [
      "РЕСТОРАН",
      "RESTAURANT"
    ],
    "description": [
      "Сайт ресторана с меню, формой бронирования, отзывами и переключением русского и английского языков.",
      "A restaurant website with a menu, reservation form, reviews and Russian / English language switching."
    ],
    "scope": [
      "HTML · CSS · JavaScript. Учебный проект для портфолио.",
      "HTML · CSS · JavaScript. A learning project for my portfolio."
    ]
  },
  {
    "title": "2Builders",
    "url": "./projects/2builders/index.html",
    "category": [
      "СТРОИТЕЛЬНАЯ КОМПАНИЯ",
      "CONSTRUCTION COMPANY"
    ],
    "description": [
      "Сайт строительной компании с услугами, этапами работы, фильтрами проектов и двумя языками.",
      "A construction company website with services, project stages, project filters and two languages."
    ],
    "scope": [
      "HTML · CSS · JavaScript. Учебный проект для портфолио.",
      "HTML · CSS · JavaScript. A learning project for my portfolio."
    ]
  }
];
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[Number(button.dataset.project)], i = language === 'ru' ? 0 : 1;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category[i];
  document.querySelector('#dialog-description').textContent = project.description[i];
  document.querySelector('.dialog-scope').textContent = project.scope[i];
  document.querySelector('#dialog-visit').href = project.url;
  dialog.showModal();
}));
dialog.setAttribute('aria-labelledby', 'dialog-title');
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-contact').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); });
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const body = 'Имя / Name: ' + data.get('name').trim() + '\nКонтакт / Contact: ' + data.get('contact').trim() + '\n\n' + data.get('message').trim();
  const subject = language === 'ru' ? 'Обсудить проект — ' : 'Project inquiry — ';
  const status = document.querySelector('#form-status');
  window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject + data.get('name').trim()) + '&body=' + encodeURIComponent(body);
  status.textContent = language === 'ru' ? 'Черновик передан почтовому приложению. Проверьте его и нажмите «Отправить» в почте. Если приложение не открылось, напишите на ' + CONTACT_EMAIL : 'An email draft was requested. Review and send it in your email app. If it did not open, write to ' + CONTACT_EMAIL;
});

/* Motion enhancement: content remains visible if JS is unavailable. */
(() => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = document.querySelectorAll(
    '.hero-content > *, .section-heading, .project, .about > div, .contact-heading, #contact-form, .details > div, .closing > *, .footer > div, .footer > nav'
  );
  const revealed = new WeakSet();
  const activeAnimations = new Set();
  function reveal(element) {
    if (revealed.has(element) || motionPreference.matches || !element.animate) return;
    revealed.add(element);
    const animation = element.animate([
      {opacity: 0, transform: 'translateY(22px)'},
      {opacity: 1, transform: 'translateY(0)'}
    ], {
      duration: 700,
      delay: element.parentElement?.classList.contains('hero-content')
        ? [...element.parentElement.children].indexOf(element) * 85 : 0,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'backwards'
    });
    activeAnimations.add(animation);
    const cleanup = () => activeAnimations.delete(animation);
    animation.addEventListener('finish', cleanup, {once:true});
    animation.addEventListener('cancel', cleanup, {once:true});
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});
    revealTargets.forEach(element => observer.observe(element));
    const glowObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('motion-in-view', entry.isIntersecting));
    });
    document.querySelectorAll('.hero, .closing').forEach(element => glowObserver.observe(element));
  }
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) {
      activeAnimations.forEach(animation => animation.cancel());
      activeAnimations.clear();
    }
  });
})();
