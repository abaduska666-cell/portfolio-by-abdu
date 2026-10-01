
/* Local RU / EN translation. No network requests or page reloads. */
(() => {
  'use strict';
  const dictionary = {
  "Записаться": "Reserve",
  "BobliRest — вкусная еда, яркие впечатления": "BobliRest — great food, memorable moments",
  "BobliRest — ресторан с тёплой атмосферой: фирменные блюда от шефа, бронирование столов, банкеты и праздники.": "BobliRest — a restaurant with a warm atmosphere. Discover our chef’s signature dishes, reserve a table or plan a special celebration.",
  "г. Караганда, ул. Вкусная, 123": "123 Vkusnaya Street, Karaganda",
  "Ежедневно: 11:00 – 23:00": "Every day: 11:00–23:00",
  "BobliRest — на главную": "BobliRest — home",
  "РЕСТОРАН": "RESTAURANT",
  "Основное меню": "Main navigation",
  "Главная": "Home",
  "О нас": "About us",
  "Меню": "Menu",
  "Бронирование": "Reservations",
  "Галерея": "Gallery",
  "Блог": "Blog",
  "Контакты": "Contact",
  "Забронировать стол": "Book a table",
  "Открыть меню": "Open menu",
  "Закрыть меню": "Close menu",
  "Мобильное меню": "Mobile navigation",
  "Главное фото: блюдо или зал": "Featured photo: food or dining room",
  "Фирменное блюдо BobliRest": "BobliRest signature dish",
  "Хорошая еда. Хорошее настроение.": "Good food. Good mood.",
  "Вкусная еда": "Delicious food",
  "Яркие впечатления": "Memorable moments",
  "Насладитесь идеальным сочетанием изысканных вкусов, тёплой атмосферы и незабываемых моментов.": "Enjoy a perfect blend of exquisite flavours, a warm atmosphere and unforgettable moments.",
  "Смотреть меню": "Explore the menu",
  "Наши преимущества": "Why dine with us",
  "Свежие продукты": "Fresh ingredients",
  "Местные ингредиенты, приготовленные с мастерством": "Local ingredients, expertly prepared",
  "Опытные повара": "Experienced chefs",
  "Увлечённые шефы, создающие кулинарное совершенство": "Passionate chefs creating exceptional food",
  "Тёплая атмосфера": "Warm atmosphere",
  "Уютное место для друзей, семьи и праздников": "A welcoming place for friends, family and celebrations",
  "Отличный сервис": "Attentive service",
  "Мы дарим радость с каждой тарелкой": "A little joy in every dish",
  "Фото зала": "Dining room photo",
  "Зал ресторана BobliRest": "BobliRest dining room",
  "Шеф за работой": "Our chef at work",
  "Шеф-повар оформляет блюдо": "Our chef adding the finishing touches",
  "СДЕЛАНО С ЛЮБОВЬЮ • ПОДАНО С ЛЮБОВЬЮ •": "MADE WITH LOVE • SERVED WITH LOVE •",
  "Где каждое блюдо рассказывает историю": "Where every dish tells a story",
  "В BobliRest мы верим, что ужин — это не просто еда, а создание воспоминаний. Наше меню сделано с любовью, вдохновлено кухнями мира и уходит корнями в традиции.": "At BobliRest, we believe dining is about more than food — it is about making memories. Our menu is crafted with love, inspired by world cuisines and rooted in tradition.",
  "Приходите голодными — уходите счастливыми!": "Come hungry — leave happy!",
  "Наша история": "Our story",
  "Познакомиться с нами": "Get to know us",
  "Наши фирменные блюда": "Our signature dishes",
  "Рекомендации шефа": "Chef’s recommendations",
  "Полное меню": "Full menu",
  "Всё меню": "View full menu",
  "Паста Альфредо": "Alfredo pasta",
  "Кремовая паста Альфредо": "Creamy Alfredo pasta",
  "С пармезаном и свежими травами": "With Parmesan and fresh herbs",
  "Стейк на гриле": "Grilled steak",
  "Стейк на гриле с травами": "Grilled steak with herbs",
  "Подаётся с чесночным маслом": "Served with garlic butter",
  "Боул с киноа": "Quinoa bowl",
  "Полезный, свежий и вкусный": "Wholesome, fresh and delicious",
  "ВЕГ": "VEG",
  "Шоколадный фондан": "Chocolate fondant",
  "Шоколадный фондан с ванильным мороженым": "Chocolate fondant with vanilla ice cream",
  "Шоколадный фонтан": "Chocolate fountain",
  "Тёплый молочный шоколад": "Warm milk chocolate",
  "Фон: атмосфера зала": "Background: dining room atmosphere",
  "Идеальное место для": "The perfect place for",
  "Любого события": "Every occasion",
  "От камерных ужинов до грандиозных торжеств — мы делаем каждый момент особенным.": "From intimate dinners to grand celebrations, we make every moment special.",
  "Забронировать столик": "Reserve a table",
  "Романтические ужины": "Romantic dinners",
  "Семейные встречи": "Family gatherings",
  "Дни рождения": "Birthday parties",
  "Корпоративы": "Corporate events",
  "Забронируйте стол": "Make a reservation",
  "Забронируйте стол для отличного ужина": "Reserve your table for a wonderful evening",
  "Ваше имя": "Your name",
  "Телефон": "Phone",
  "Дата": "Date",
  "Время": "Time",
  "1 гость": "1 guest",
  "2 гостя": "2 guests",
  "3 гостя": "3 guests",
  "4 гостя": "4 guests",
  "5 гостей": "5 guests",
  "6 гостей": "6 guests",
  "7 гостей": "7 guests",
  "8 гостей": "8 guests",
  "9–12 гостей": "9–12 guests",
  "Более 12 (банкет)": "More than 12 (banquet)",
  "Гостей": "Guests",
  "Без повода": "Just because",
  "Романтический ужин": "Romantic dinner",
  "Семейная встреча": "Family gathering",
  "День рождения": "Birthday",
  "Корпоратив": "Corporate event",
  "Повод": "Occasion",
  "Забронировать": "Book now",
  "Отзывы гостей": "Guest reviews",
  "Еда была просто потрясающей, а атмосфера — идеальной. Обязательно вернёмся ещё!": "The food was simply amazing and the atmosphere was perfect. We will definitely be back!",
  "Анна Соколова": "Anna Sokolova",
  "Лучший стейк в городе и очень внимательный персонал. Отмечали здесь день рождения — всё прошло на высшем уровне.": "The best steak in town and very attentive staff. We celebrated a birthday here and everything was excellent.",
  "Дмитрий Орлов": "Dmitry Orlov",
  "Уютный зал и невероятные десерты. Теперь это наше любимое место для семейных ужинов.": "A cosy dining room and incredible desserts. This is now our favourite place for family dinners.",
  "Мария Ковалёва": "Maria Kovaleva",
  "АС": "AS",
  "ДО": "DO",
  "МК": "MK",
  "Отзывы": "Reviews",
  "Отзыв 1": "Review 1",
  "Отзыв 2": "Review 2",
  "Отзыв 3": "Review 3",
  "Вкусная еда. Хорошее настроение. Вместе лучше.": "Good food. Good mood. Better together.",
  "ВКонтакте": "VK",
  "Быстрые ссылки": "Quick links",
  "Наше меню": "Our menu",
  "Закуски": "Starters",
  "Основные блюда": "Main courses",
  "Напитки": "Drinks",
  "Десерты": "Desserts",
  "Блюда от шефа": "Chef’s specials",
  "г. Караганда,": "Karaganda,",
  "ул. Вкусная, 123": "123 Vkusnaya Street",
  "Рассылка": "Newsletter",
  "Подпишитесь, чтобы получать специальные предложения и новости.": "Subscribe for special offers and our latest news.",
  "Ваш e-mail": "Your email",
  "Подписаться": "Subscribe",
  "BobliRest. Все права защищены.": "BobliRest. All rights reserved.",
  "Политика конфиденциальности": "Privacy policy",
  "Условия использования": "Terms of use",
  "Наверх": "Back to top",
  "Фото": "Photo",
  "Заполните все поля, чтобы забронировать стол": "Please complete all fields to book a table",
  "Отправляем…": "Sending…",
  "Готово! Ждём вас": "All set! See you soon",
  "Заявка принята! Мы позвоним, чтобы подтвердить бронь": "Request received! We will call to confirm your reservation",
  "Введите корректный e-mail": "Please enter a valid email address",
  "Спасибо за подписку!": "Thank you for subscribing!"
};
  const reverse = new Map(Object.entries(dictionary).map(([ru,en])=>[en,ru]));
  const normalize = text => text.replace(/\s+/g,' ').trim();
  let language = 'ru';
  try { const stored=localStorage.getItem('boblirest.language'); if(stored==='en'||stored==='ru') language=stored; } catch {}
  function translate(text) {
    const value=normalize(text);
    const section=value.match(/^Раздел «(.+)» скоро появится$/) || value.match(/^“(.+)” is coming soon$/);
    if(section) {
      const name=translate(section[1]);
      return language==='ru' ? 'Раздел «'+name+'» скоро появится' : '“'+name+'” is coming soon';
    }
    const ru=reverse.get(value)||value;
    if(!Object.prototype.hasOwnProperty.call(dictionary,ru)) return text;
    const result=language==='en'?dictionary[ru]:ru;
    return text.match(/^\s*/)[0]+result+text.match(/\s*$/)[0];
  }
  window.bobliTranslate=translate;
  const headings=[...document.querySelectorAll('[data-split]')].map(element=>({element,ru:normalize(element.textContent)}));
  // Text may change, but form values must remain stable across languages.
  document.querySelectorAll('option:not([value])').forEach(option=>option.value=option.textContent);
  function apply(next) {
    language=next;
    document.documentElement.lang=language;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT), nodes=[];
    while(walker.nextNode()) {
      const node=walker.currentNode;
      if(!node.parentElement.closest('script,style,noscript,textarea,[data-split],.language-switch')&&normalize(node.nodeValue)) nodes.push(node);
    }
    nodes.forEach(node=>node.nodeValue=translate(node.nodeValue));
    headings.forEach(({element,ru})=>{
      const text=translate(ru);
      if(element.querySelector('.w')) {
        const fragment=document.createDocumentFragment();
        text.split(/\s+/).forEach((word,index)=>{
          if(index) fragment.append(document.createTextNode(' '));
          const outer=document.createElement('span'),inner=document.createElement('span');
          outer.className='w'; outer.setAttribute('aria-hidden','true');
          inner.style.setProperty('--i',index);
          inner.textContent=word; outer.append(inner); fragment.append(outer);
        });
        element.replaceChildren(fragment);
      } else element.textContent=text;
      element.setAttribute('aria-label',text);
    });
    document.querySelectorAll('[aria-label],[alt],[placeholder],[data-label],[data-soon],[data-initials]').forEach(element=>{
      if(element.closest('.language-switch')) return;
      ['aria-label','alt','placeholder','data-label','data-soon','data-initials'].forEach(attribute=>{
        if(element.hasAttribute(attribute)) element.setAttribute(attribute,translate(element.getAttribute(attribute)));
      });
    });
    document.title=translate(document.title);
    const description=document.querySelector('meta[name="description"]');
    if(description) description.content=translate(description.content);
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    try { localStorage.setItem('boblirest.language',language); } catch {}
    window.dispatchEvent(new Event('boblilanguagechange'));
  }
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>apply(button.dataset.language)));
  apply(language);
})();
