
(() => {
  'use strict';
  const t = window.bobliTranslate;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine   = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const liteMQ = matchMedia('(max-width:900px), (hover:none)');   // телефоны/планшеты — облегчённый режим

  /* ---------- Уведомления ---------- */
  const toastEl = $('#toast'); let toastT;
  const toast = msg => {
    $('span', toastEl).textContent = t(msg);
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), 3400);
  };

  /* ---------- Фото-слоты: показываем заглушку, пока нет файла ---------- */
  $$('.photo').forEach(fig => {
    const img = $('img', fig);
    const ph = document.createElement('div');
    ph.className = 'photo__ph';
    ph.innerHTML = fig.dataset.initials
      ? `<b>${fig.dataset.initials}</b>`
      : `<svg class="ico"><use href="#i-camera"/></svg><b>${fig.dataset.label || 'Фото'}</b><small>${img ? img.getAttribute('src') : ''}</small>`;
    fig.appendChild(ph);
    if (!img) return;
    const ok = () => fig.classList.add('has-img');
    const bad = () => fig.classList.remove('has-img');
    img.addEventListener('load', ok);
    img.addEventListener('error', bad);
    if (img.complete) (img.naturalWidth ? ok : bad)();
  });

  /* ---------- Прелоадер ---------- */
  const pre = $('#preloader');
  const t0 = performance.now();
  let finished = false;
  const finish = () => {
    if (finished) return; finished = true;
    const wait = reduce ? 0 : Math.max(0, (liteMQ.matches ? 700 : 1200) - (performance.now() - t0));
    setTimeout(() => {
      pre.classList.add('done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
      setTimeout(() => pre.remove(), 1400);
    }, wait);
  };
  if (document.readyState === 'complete') finish(); else addEventListener('load', finish);
  setTimeout(finish, 4200);

  /* ---------- Заголовки по словам ---------- */
  $$('[data-split]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', words.join(' '));
    el.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
  });

  /* ---------- Счётчик цен ---------- */
  const nf = { format: value => new Intl.NumberFormat(document.documentElement.lang === 'en' ? 'en-US' : 'ru-RU').format(value) };
  const countUp = el => {
    const to = +el.dataset.count, dur = 1500, s = performance.now();
    const step = t => {
      const p = Math.min((t - s) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = nf.format(Math.round(to * e));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!reduce && 'IntersectionObserver' in window) $$('[data-count]').forEach(el => el.textContent = '0');

  /* ---------- Появление блоков при прокрутке ---------- */
  $$('[data-stagger]').forEach(g => [...g.children].forEach((c, i) => {
    c.style.setProperty('--i', i);
    if (!c.hasAttribute('data-reveal') && !c.hasAttribute('data-split')) c.setAttribute('data-reveal', '');
  }));
  const revealEls = $$('[data-reveal],[data-split]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
      const counters = $$('[data-count]', e.target);
      if (counters.length) reduce ? counters.forEach(c => c.textContent = nf.format(+c.dataset.count)) : counters.forEach(countUp);
    }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
    $$('[data-count]').forEach(c => c.textContent = nf.format(+c.dataset.count));
  }

  /* ---------- Прокрутка: шапка, прогресс, параллакс, «наверх» ---------- */
  const header = $('#header'), progress = $('#progress'), totop = $('#totop'), ringFg = $('.ring .fg', totop);
  const hero = $('.hero'), heroBg = $('.hero__bg'), heroContent = $('.hero__content'), parEls = $$('[data-parallax]');
  let heroH = hero.offsetHeight, ticking = false, scrolled = false, topShown = false, heroFaded = false;
  const resetHeroFx = () => { heroContent.style.translate = ''; heroContent.style.opacity = ''; heroFaded = false; };
  const update = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight, fx = !reduce && !liteMQ.matches;
    const rects = fx ? parEls.map(el => el.getBoundingClientRect()) : null;   // сначала все чтения layout…
    const max = document.documentElement.scrollHeight - vh;
    const p = max > 0 ? Math.min(1, y / max) : 0;
    progress.style.transform = `scaleX(${p.toFixed(4)})`;                     // …потом все записи
    const sc = y > 40;
    if (sc !== scrolled) { scrolled = sc; header.classList.toggle('is-scrolled', sc); }
    const st = y > 700;
    if (st !== topShown) { topShown = st; totop.classList.toggle('show', st); }
    if (topShown) ringFg.style.strokeDashoffset = (100 - p * 100).toFixed(1);
    if (!fx) return;                                                          // на телефонах эффекты ниже отключены
    if (y < heroH) {
      const t = Math.min(1, y / (heroH * .9));
      heroContent.style.translate = `0 ${(t * 70).toFixed(1)}px`;
      heroContent.style.opacity = (1 - t * 1.15).toFixed(3);
      heroFaded = true;
    } else if (heroFaded) resetHeroFx();
    parEls.forEach((el, i) => {
      const r = rects[i];
      if (r.bottom < -250 || r.top > vh + 250) return;
      const prev = el._y || 0;
      const center = r.top - prev + r.height / 2 - vh / 2;
      el._y = -center * parseFloat(el.dataset.parallax);
      el.style.translate = `0 ${el._y.toFixed(1)}px`;
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  let resizeT;
  addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(() => { heroH = hero.offsetHeight; update(); }, 150); });
  addEventListener('load', () => { heroH = hero.offsetHeight; update(); });
  liteMQ.addEventListener('change', () => { parEls.forEach(el => { el.style.translate = ''; el._y = 0; }); resetHeroFx(); update(); });
  addEventListener('boblilanguagechange', () => { heroH = hero.offsetHeight; update(); });
  update();
  totop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- Подсветка активного пункта меню ---------- */
  const navLinks = $$('.nav__list a[href^="#"], .mnav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'about', 'menu', 'reservation', 'contact'].forEach(id => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* ---------- Мобильное меню ---------- */
  const burger = $('#burger');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', t(open ? 'Закрыть меню' : 'Открыть меню'));
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    $$('.mnav a, .nav__cta, .nav__in .logo').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width:1200px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  /* ---------- Ссылки-заглушки на будущие страницы ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-soon]');
    if (!a) return;
    e.preventDefault();
    toast(`Раздел «${a.dataset.soon}» скоро появится`);
  });

  /* ---------- Кнопки: волна при нажатии ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('.btn'); if (!b) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2;
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(span);
    setTimeout(() => span.remove(), 800);
  });

  /* ---------- Эффекты только для мыши (на телефонах отключены) ---------- */
  const throttle = fn => {
    let id = 0, ev;
    const h = e => { ev = e; if (!id) id = requestAnimationFrame(() => { id = 0; fn(ev); }); };
    h.cancel = () => { cancelAnimationFrame(id); id = 0; };
    return h;
  };
  if (fine && !reduce) {
    /* магнитные кнопки */
    $$('[data-magnetic]').forEach(b => {
      const move = throttle(e => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left - r.width / 2) * .18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * .3).toFixed(1)}px`;
      });
      b.addEventListener('pointermove', move);
      b.addEventListener('pointerleave', () => { move.cancel(); b.style.translate = ''; });
    });
    /* 3D-наклон карточек блюд */
    $$('[data-tilt]').forEach(c => {
      const move = throttle(e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--ry', ((x - .5) * 12).toFixed(2) + 'deg');
        c.style.setProperty('--rx', ((.5 - y) * 10).toFixed(2) + 'deg');
        c.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        c.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      c.addEventListener('pointermove', move);
      c.addEventListener('pointerleave', () => { move.cancel(); c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    });
    /* подсветка курсором: маленький элемент двигаем через transform — без перерисовки */
    $$('[data-spot]').forEach(sec => {
      const dot = document.createElement('i'); dot.className = 'spot'; sec.prepend(dot);
      const move = throttle(e => {
        const r = sec.getBoundingClientRect();
        dot.style.transform = `translate3d(${(e.clientX - r.left).toFixed(0)}px,${(e.clientY - r.top).toFixed(0)}px,0)`;
      });
      sec.addEventListener('pointerenter', () => sec.classList.add('spot-on'));
      sec.addEventListener('pointerleave', () => { sec.classList.remove('spot-on'); move.cancel(); });
      sec.addEventListener('pointermove', move);
    });
    /* лёгкий сдвиг главного фото от мыши */
    hero.addEventListener('pointermove', throttle(e => {
      heroBg.style.translate = `${(-(e.clientX / innerWidth - .5) * 32).toFixed(1)}px ${(-(e.clientY / innerHeight - .5) * 20).toFixed(1)}px`;
    }));
    hero.addEventListener('pointerleave', () => { heroBg.style.translate = ''; });
  }

  /* ---------- Касание иконок «повода»: разовая анимация вместо hover ---------- */
  $$('.occ').forEach(o => o.addEventListener('click', () => {
    o.classList.remove('tap'); void o.offsetWidth; o.classList.add('tap');
    clearTimeout(o._t); o._t = setTimeout(() => o.classList.remove('tap'), 1000);
  }));

  /* ---------- Светлячки в hero (лёгкая версия) ---------- */
  (() => {
    const c = $('#embers'); if (!c || reduce) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const SCALE = .5;                                   // рисуем в половинном разрешении — свечение и так мягкое
    const sprite = document.createElement('canvas'); sprite.width = sprite.height = 48;
    const sg = sprite.getContext('2d'), grad = sg.createRadialGradient(24, 24, 0, 24, 24, 24);
    grad.addColorStop(0, 'rgba(255,208,125,1)'); grad.addColorStop(.35, 'rgba(255,190,100,.45)'); grad.addColorStop(1, 'rgba(255,190,100,0)');
    sg.fillStyle = grad; sg.fillRect(0, 0, 48, 48);     // спрайт рисуем один раз
    let w = 0, h = 0, lastW = 0, last = 0, run = false, looping = false, parts = [];
    const make = fresh => ({
      x: Math.random() * w, y: fresh ? Math.random() * h : h + 10 + Math.random() * 60,
      r: Math.random() * 1.6 + .8, vy: Math.random() * .9 + .3, vx: (Math.random() - .5) * .4,
      a: Math.random() * .6 + .3, ph: Math.random() * 6.28, s: Math.random() * .04 + .015
    });
    const setup = () => {
      w = lastW = c.clientWidth; h = c.clientHeight;
      c.width = Math.round(w * SCALE); c.height = Math.round(h * SCALE);
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      const n = liteMQ.matches ? 10 : Math.min(32, Math.round(w / 45));
      parts = Array.from({ length: n }, () => make(true));
    };
    const frame = t => {
      if (!run) { looping = false; return; }
      requestAnimationFrame(frame);
      if (t - last < 33) return;                        // не чаще ~30 кадров/с
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy; p.ph += p.s; p.x += p.vx + Math.sin(p.ph) * .5;
        if (p.y < -12) Object.assign(p, make(false));
        ctx.globalAlpha = p.a * (Math.sin(p.ph * 3) + 1) / 2;
        const d = p.r * 10;
        ctx.drawImage(sprite, p.x - d / 2, p.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;
    };
    setup();
    let rt;   // пересоздаём только при смене ширины (на телефоне высота «прыгает» при скрытии адресной строки)
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (c.clientWidth !== lastW) setup(); }, 250); });
    const start = on => { run = on; hero.classList.toggle('is-off', !on); if (on && !looping) { looping = true; requestAnimationFrame(frame); } };
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => start(e.isIntersecting), { threshold: 0 }).observe(hero);
    else start(true);
  })();

  /* ---------- Отзывы ---------- */
  $$('[data-stars]').forEach(el => {
    el.innerHTML = Array.from({ length: +el.dataset.stars }, (_, i) => `<svg class="ico star" style="--i:${i}"><use href="#i-star"/></svg>`).join('');
  });
  const slides = $$('.review'), dots = $$('.dots button');
  let cur = 0;
  const show = n => {
    slides[cur].classList.remove('is-active'); dots[cur].classList.remove('is-active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('is-active');
    void dots[cur].offsetWidth;            // перезапуск анимации полоски
    dots[cur].classList.add('is-active');
  };
  dots.forEach((d, i) => {
    d.addEventListener('click', () => show(i));
    $('i', d).addEventListener('animationend', () => show(cur + 1));   // авто-переключение по окончании полоски
  });

  /* ---------- Форма бронирования ---------- */
  const form = $('#bookForm');
  const timeSel = form.elements['time'];
  for (let h = 11; h <= 22; h++) for (const m of ['00', '30']) {
    if (h === 22 && m === '30') continue;
    timeSel.add(new Option(`${h}:${m}`, `${h}:${m}`));
  }
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  form.elements['date'].min = today.toISOString().slice(0, 10);
  form.elements['phone'].addEventListener('input', e => { e.target.value = e.target.value.replace(/[^\d+()\-\s]/g, ''); });
  form.addEventListener('input', e => { const f = e.target.closest('.field'); if (f) f.classList.remove('invalid'); });

  const confetti = origin => {
    const r = origin.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const colors = ['#d9a233', '#f2cf7a', '#ffffff', '#7fbf8a'];
    for (let i = 0; i < 38; i++) {
      const s = document.createElement('i'), a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 140;
      s.className = 'confetti';
      s.style.cssText = `left:${cx}px;top:${cy}px;--x:${(Math.cos(a) * d).toFixed(0)}px;--y:${(Math.sin(a) * d - 70).toFixed(0)}px;--r:${(Math.random() * 720 - 360).toFixed(0)}deg;background:${colors[i % 4]}`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1400);
    }
  };
  const shake = el => { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); };

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('input,select', form).forEach(el => {
      const f = el.closest('.field');
      let valid = el.checkValidity();
      if (el.type === 'tel') valid = valid && el.value.replace(/\D/g, '').length >= 10;
      f.classList.toggle('invalid', !valid);
      if (!valid) { ok = false; shake(f); }
    });
    if (!ok) { toast('Заполните все поля, чтобы забронировать стол'); return; }

    /* TODO: здесь отправьте данные на свой сервер / в Telegram-бота / на почту:
       const data = Object.fromEntries(new FormData(form)); fetch('/api/booking', {method:'POST', body: JSON.stringify(data)}) */

    const btn = $('.form__submit', form), label = $('.btn__txt', btn), old = label.textContent;
    btn.disabled = true; label.textContent = t('Отправляем…');
    setTimeout(() => {
      label.textContent = t('Готово! Ждём вас');
      btn.classList.add('is-done');
      confetti(btn);
      toast('Заявка принята! Мы позвоним, чтобы подтвердить бронь');
      form.reset();
      setTimeout(() => { label.textContent = t(old); btn.disabled = false; btn.classList.remove('is-done'); }, 3600);
    }, 900);
  });

  /* ---------- Подписка ---------- */
  const news = $('#newsForm');
  news.addEventListener('submit', e => {
    e.preventDefault();
    const inp = news.elements['email'];
    if (!inp.checkValidity()) { shake(news); toast('Введите корректный e-mail'); return; }
    /* TODO: отправьте e-mail в вашу рассылку */
    news.classList.add('sent');
    setTimeout(() => { news.classList.remove('sent'); news.reset(); toast('Спасибо за подписку!'); }, 1000);
  });

  /* ---------- Год в подвале ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
