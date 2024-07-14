'use strict'

let pageSlider = new Swiper(`.slider`, {
  speed: 1000,
  scrollbar: {
    el: '.slider__scrollbar',
    draggable: true,
  },
  breakpoints: {
    '320': {
      slidesPerView: 1,
      centeredSlides: false
    },
    '992': {
      slidesPerView: 2,
      centeredSlides: true
    },
  }
});

const page = document.querySelector('.page');
const images = document.querySelectorAll('.slide__picture');

if (images.length) {
  let backgroundSlides = ``;
  let textSlides = ``;

  images.forEach(image => {
    backgroundSlides += `
    <div class='background__slide swiper-slide'>
      <div class='background__image'>
        <img src='${image.getAttribute("src")}' alt='${image.alt}'/>
      </div>
    </div>
    `;
    textSlides += `
    <div class='text__slide swiper-slide'>
      <span>${image.dataset.title ? image.dataset.title : ''}</span>
    </div>
    `;
  });

  const background = `
  <div class='background swiper'>
    <div class='background__wrapper swiper-wrapper'>
      ${backgroundSlides}
    </div>
  </div>
  `;
  const text = `
  <div class='text swiper'>
    <div class='text__wrapper swiper-wrapper'>
      ${textSlides}
    </div>
  </div>
  `;

  page.insertAdjacentHTML('afterbegin', background);
  page.insertAdjacentHTML('beforeend', text);

  let pageBgSlider = new Swiper('.background', {
    speed: 500
  });
  let pageTextSlider = new Swiper('.text', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1000
  });

  // control
  pageSlider.controller.control = pageBgSlider;
  pageBgSlider.controller.control = pageTextSlider;
}

const speed = 800;
document.addEventListener('click', function (e) {
  const targetElement = e.target;
  const textBlock = document.querySelector('.text');
  textBlock.style.transitionDuration = `${speed}ms`;

  // open image
  if (targetElement.closest('.slide')) {
    const slide = targetElement.closest('.slide');
    const slideImage = slide.querySelector('img');
    const activeImage = document.querySelector('.slide__picture.active');

    if (slide.classList.contains('swiper-slide-active')) {
      slideImage.classList.add('active');
      textBlock.classList.add('active');
      imageOpen(slideImage);
    } else {
      if (activeImage) {
        activeImage.classList.remove('active');
      }
      pageSlider.slideTo(getIndex(slide));
    }
    e.preventDefault();
  }

  // close image
  if (targetElement.closest('.open-image')) {
    const openImage = targetElement.closest('.open-image');
    const activeImage = document.querySelector('.slide__picture.active');
    const imagePos = getImagePos(activeImage);

    openImage.style.cssText = `
    position: fixed;
    left: ${imagePos.left}px;
    top: ${imagePos.top}px;
    width: ${imagePos.width}px;
    height: ${imagePos.height}px;
    transition: all ${speed}ms;
    `;

    setTimeout(() => {
      activeImage.classList.remove('active');
      activeImage.style.opacity = 1;
      openImage.remove();
    }, speed);

    textBlock.classList.remove('active');
  }
});

function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el);
}

function imageOpen(image) {
  const imagePos = getImagePos(image);
  const openImage = image.cloneNode();

  const openImageBlock = document.createElement('div');
  openImageBlock.classList.add('open-image');
  openImageBlock.append(openImage);

  openImageBlock.style.cssText = `
  position: fixed;
  left: ${imagePos.left}px;
  top: ${imagePos.top}px;
  width: ${imagePos.width}px;
  height: ${imagePos.height}px;
  transition: all ${speed}ms;
  `;

  document.body.append(openImageBlock);
  setTimeout(() => {
    image.style.opacity = 0;
    openImageBlock.style.left = 0;
    openImageBlock.style.top = 0;
    openImageBlock.style.width = '100%';
    openImageBlock.style.height = '100%';
  }, 0);
}

function getImagePos(image) {
  return {
    left: image.getBoundingClientRect().left,
    top: image.getBoundingClientRect().top,
    width: image.offsetWidth,
    height: image.offsetHeight
  }
}


// about scroll text
function textOpacityScroll() {
  const items = document.querySelectorAll('.text-section'); // Находим все элементы с классом 'text-section'

  if (items.length) {
    items.forEach(item => { // Перебираем каждый элемент
      const itemValue = item.querySelector('.text-section__value'); // Находим элемент с текстом
      const itemMask = item.querySelector('.text-section__mask'); // Находим элемент маски
      const itemSpeed = itemValue.dataset.textSpeed || 500; // Получаем скорость из data-атрибута или используем значение по умолчанию
      const itemOpacity = itemValue.dataset.textOpacity || 0.2; // Получаем прозрачность из data-атрибута или используем значение по умолчанию

      // Оборачиваем каждое слово в span с заданной прозрачностью и скоростью перехода
      itemValue.innerHTML = itemValue.innerHTML.replace(/([A-Za-z0-9'-,.&!?+<>/]+)/g, 
      `<span style='transition: opacity ${itemSpeed}ms; opacity:${itemOpacity}'>$1</span>`);

      // Обработчик события прокрутки
      window.addEventListener('scroll', function () {
        const maskPosition = itemMask.getBoundingClientRect().top - window.innerHeight; // Определяем положение маски относительно окна просмотра
        const itemWay = Math.abs(maskPosition) / (window.innerHeight + itemMask.offsetHeight) * 100; // Рассчитываем текущий прогресс прокрутки
        const itemWords = itemValue.querySelectorAll('span'); // Находим все слова, обернутые в span
        const currentWord = maskPosition <= 0 ? Math.floor(itemWords.length / 100 * itemWay) : -1; // Определяем текущее слово на основе положения прокрутки
        addOpacity(itemWords, currentWord); // Вызываем функцию для изменения прозрачности слов
      });

      // Функция для изменения прозрачности слов
      function addOpacity(itemWords, currentWord) {
        itemWords.forEach((itemWord, index) => {
          itemWord.style.opacity = itemOpacity; // Устанавливаем прозрачность для всех слов
          if (index <= currentWord) {
            itemWord.style.opacity = 1; // Устанавливаем полную непрозрачность для текущего и предыдущих слов
          }
        });
      }
    });
  }
}

// Вызов функции для начала работы
textOpacityScroll();
