
/* RU / EN translation: preserve DOM nodes, input values and event handlers. */
(function () {
  'use strict';
  const translations = {
  "Skip to content": "К содержимому",
  "Home": "Главная",
  "About": "О компании",
  "Services": "Услуги",
  "Projects": "Проекты",
  "Process": "Этапы работы",
  "Contact": "Контакты",
  "Get a quote": "Рассчитать стоимость",
  "We build the structures": "Мы строим здания,",
  "your city stands on.": "на которых держится ваш город.",
  "2Builders is a full-service general contractor delivering commercial, industrial, and residential projects — planned with precision and built by crews who show up on schedule.": "2Builders — генеральный подрядчик полного цикла. Мы строим коммерческие, промышленные и жилые объекты: точно планируем работы и выполняем их в срок.",
  "Start a project": "Обсудить проект",
  "See our work": "Наши проекты",
  "Licensed, bonded, and insured general contractor.": "Генеральный подрядчик с лицензией, финансовыми гарантиями и страхованием.",
  "Years building": "Лет в строительстве",
  "Projects completed": "Завершённых проектов",
  "Skilled tradespeople": "Квалифицированных специалистов",
  "On-time completion": "Объектов сдано в срок",
  "years in the field": "лет практического опыта",
  "Built on precision, delivered with accountability": "Точность в работе. Ответственность за результат.",
  "Since our first project, 2Builders has run on one rule: the people who plan the work are the same people who answer for it. We keep engineering, project management, and our own field crews under one roof, so nothing gets lost in translation between the drawing and the job site.": "С первого проекта 2Builders следует одному правилу: за результат отвечают те же люди, которые планируют работу. Инженеры, руководители проектов и собственные строительные бригады работают в одной команде — от чертежа до строительной площадки.",
  "From ground-up commercial builds to complex renovations, we plan around your budget and code requirements before a single wall goes up — then we build to a schedule you can actually see.": "Строим коммерческие объекты с нуля и выполняем сложные реконструкции. Ещё до начала работ учитываем ваш бюджет и строительные нормы, а затем следуем прозрачному графику.",
  "Licensed general contractor, fully bonded & insured": "Лицензия генерального подрядчика, финансовые гарантии и страхование",
  "In-house structural engineering & project management": "Собственные инженеры-конструкторы и команда управления проектами",
  "OSHA-certified supervisors on every site": "Руководители с сертификацией OSHA на каждом объекте",
  "Real-time schedule and budget reporting for every client": "Актуальные отчёты о сроках и бюджете для каждого заказчика",
  "What we build, and how": "Что и как мы строим",
  "Four disciplines, one accountable team — from the first calculation to the final inspection.": "Четыре направления и одна ответственная команда — от первых расчётов до итоговой проверки.",
  "Structural engineering": "Проектирование конструкций",
  "Structural design and analysis for buildings of every scale, from foundation calculations to final framing plans.": "Расчёт и проектирование конструкций зданий любого масштаба — от фундамента до рабочих чертежей каркаса.",
  "Construction management": "Управление строительством",
  "One point of accountability for schedule, budget, and subcontractor coordination, from mobilization to closeout.": "Единый центр ответственности за сроки, бюджет и работу подрядчиков — от подготовки площадки до сдачи объекта.",
  "Sustainable building": "Экологичное строительство",
  "Energy-conscious materials and methods that lower long-term operating costs without slowing down the schedule.": "Энергоэффективные материалы и технологии снижают затраты на эксплуатацию, не замедляя строительство.",
  "General contracting": "Генеральный подряд",
  "Ground-up construction and full renovations, built by our own crews and vetted trade partners.": "Строительство с нуля и комплексная реконструкция силами наших бригад и проверенных партнёров.",
  "How a project moves from idea to keys": "От идеи до передачи ключей",
  "The same four phases, every time — so you always know what happens next.": "Четыре понятных этапа в каждом проекте — вы всегда знаете, что будет дальше.",
  "Plan": "Планирование",
  "We study the site, the budget, and the code before a single drawing is treated as final.": "Изучаем площадку, бюджет и строительные нормы, прежде чем утверждать чертежи.",
  "Design & permit": "Проектирование и согласования",
  "Architects and engineers finalize plans while we manage permitting and approvals in parallel.": "Архитекторы и инженеры завершают проект, а мы параллельно занимаемся разрешениями и согласованиями.",
  "Build": "Строительство",
  "Our crews and vetted subcontractors execute against a schedule you can track in real time.": "Наши бригады и проверенные подрядчики работают по графику, за которым вы можете следить в реальном времени.",
  "Deliver & support": "Сдача и поддержка",
  "Final inspections, a full walkthrough, and a warranty that outlasts the punch list.": "Проводим итоговые проверки и совместный осмотр объекта. Гарантийная поддержка продолжается и после устранения замечаний.",
  "Recent work": "Последние проекты",
  "A sample of projects across commercial, residential, and industrial construction.": "Избранные объекты коммерческого, жилого и промышленного строительства.",
  "All": "Все",
  "Commercial": "Коммерческие",
  "Residential": "Жилые",
  "Industrial": "Промышленные",
  "Meridian Office Tower": "Офисная башня «Меридиан»",
  "Harborview Residences": "Жилой комплекс «Харборвью»",
  "Northgate Distribution Center": "Логистический центр «Нортгейт»",
  "Union Square Retail Complex": "Торговый комплекс «Юнион-сквер»",
  "Cedar Ridge Townhomes": "Таунхаусы «Сидар-Ридж»",
  "Ashford Manufacturing Plant": "Завод «Эшфорд»",
  "No projects in this category yet.": "В этой категории пока нет проектов.",
  "Have a site and a deadline?": "Есть участок и сроки?",
  "Let's build the plan.": "Давайте составим план.",
  "Tell us about your project": "Расскажите о вашем проекте",
  "Share a few details and a project lead will get back to you within one business day.": "Расскажите о задаче — руководитель проекта свяжется с вами в течение одного рабочего дня.",
  "Name": "Имя",
  "Email": "Электронная почта",
  "Enter your name.": "Укажите ваше имя.",
  "Enter a valid email.": "Укажите корректный адрес электронной почты.",
  "Phone": "Телефон",
  "Project type": "Тип объекта",
  "Not sure yet": "Пока не определился",
  "Project details": "Описание проекта",
  "Tell us a little about the project.": "Расскажите немного о проекте.",
  "Send message": "Отправить сообщение",
  "Office": "Офис",
  "Karaganda,": "Караганда,",
  "abaya 23": "ул. Абая, 23",
  "Hours": "Время работы",
  "Mon–Fri, 7:00 AM – 5:00 PM": "Пн–Пт, 07:00–17:00",
  "Licensed general contractor delivering commercial, industrial, and residential construction.": "Лицензированный генеральный подрядчик. Строительство коммерческих, промышленных и жилых объектов.",
  "Company": "Компания",
  "Legal": "Правовая информация",
  "Privacy policy": "Политика конфиденциальности",
  "Terms of service": "Условия использования",
  "Site safety policy": "Безопасность на стройплощадке",
  "2Builders. All rights reserved.": "2Builders. Все права защищены.",
  "Licensed General Contractor": "Лицензированный генеральный подрядчик",
  "2Builders — General Contractors & Construction Management": "2Builders — Генеральный подряд и управление строительством",
  "2Builders is a licensed general contractor delivering commercial, industrial, and residential construction — from first blueprint to final walkthrough.": "2Builders — лицензированный генеральный подрядчик. Коммерческое, промышленное и жилое строительство: от первого чертежа до сдачи объекта.",
  "2Builders — home": "2Builders — главная",
  "Primary": "Основная навигация",
  "Open menu": "Открыть меню",
  "Close menu": "Закрыть меню",
  "Scroll to content": "Перейти к содержимому",
  "2Builders in numbers": "2Builders в цифрах",
  "Filter projects by category": "Фильтр проектов по категориям",
  "Back to top": "Наверх",
  "2Builders crew on an active job site": "Команда 2Builders на строительной площадке",
  "2Builders office": "Офис 2Builders",
  "2Builders on Instagram": "2Builders в Instagram",
  "2Builders on Facebook": "2Builders в Facebook",
  "About photo — job site or crew, 1000×1250px": "Фото компании — площадка или команда, 1000×1250 пикселей",
  "Office photo — 900×700px": "Фото офиса — 900×700 пикселей",
  "Please fill in the highlighted fields.": "Заполните выделенные поля.",
  "Sending…": "Отправка…",
  "Thanks — we've received your project details and will be in touch within one business day.": "Спасибо! Мы получили описание проекта и свяжемся с вами в течение одного рабочего дня."
};
  const reverse = new Map(Object.entries(translations).map(([en,ru])=>[ru,en]));
  const normalize = text => text.replace(/\s+/g, ' ').trim();
  let language = 'ru';
  try { const saved = localStorage.getItem('2builders.language'); if (saved === 'en' || saved === 'ru') language = saved; } catch {}
  function translate(text) {
    const normalized = normalize(text);
    const english = reverse.get(normalized) || normalized;
    const result = language === 'ru' ? translations[english] : english;
    if (!result) {
      // Translate project image fallback captions without altering dimensions.
      const split = english.indexOf(' — ');
      const prefix = split > 0 ? (reverse.get(english.slice(0,split)) || english.slice(0,split)) : '';
      if (split > 0 && translations[prefix]) {
        return (language === 'ru' ? translations[prefix] : prefix) + english.slice(split);
      }
      return text;
    }
    return text.replace(normalized, result) === text && normalized !== text.trim()
      ? text.replace(/^(\s*)[\s\S]*?(\s*)$/, '$1' + result + '$2')
      : (text.match(/^\s*/)[0] + result + text.match(/\s*$/)[0]);
  }
  window.buildersTranslate = translate;
  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement.closest('script,style,noscript,svg,textarea,.language-switch') && normalize(node.nodeValue)) nodes.push(node);
    }
    nodes.forEach(node => { node.nodeValue = translate(node.nodeValue); });
    document.querySelectorAll('[aria-label],[alt],[placeholder],[data-label]').forEach(element => {
      if (element.closest('.language-switch')) return;
      ['aria-label','alt','placeholder','data-label'].forEach(attribute => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute,translate(element.getAttribute(attribute)));
      });
    });
    document.title = translate(document.title);
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = translate(description.content);
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed',String(button.dataset.language === language));
    });
    try { localStorage.setItem('2builders.language', language); } catch {}
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => applyLanguage(button.dataset.language));
    });
    applyLanguage(language);
  });
})();
