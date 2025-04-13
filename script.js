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
  const items = document.querySelectorAll('.text-section'); 

  if (items.length) {
    items.forEach(item => { 
      const itemValue = item.querySelector('.text-section__value'); 
      const itemMask = item.querySelector('.text-section__mask'); 
      const itemSpeed = itemValue.dataset.textSpeed || 500; 
      const itemOpacity = itemValue.dataset.textOpacity || 0.2; 

      itemValue.innerHTML = itemValue.innerHTML.replace(/([A-Za-z0-9'-,.&!?+<>/]+)/g, 
      `<span style='transition: opacity ${itemSpeed}ms; opacity:${itemOpacity}'>$1</span>`);

      
      window.addEventListener('scroll', function () {
        const maskPosition = itemMask.getBoundingClientRect().top - window.innerHeight; 
        const itemWay = Math.abs(maskPosition) / (window.innerHeight + itemMask.offsetHeight) * 100;
        const itemWords = itemValue.querySelectorAll('span'); 
        const currentWord = maskPosition <= 0 ? Math.floor(itemWords.length / 100 * itemWay) : -1;
        addOpacity(itemWords, currentWord);
      });

      // для изменения прозрачности слов
      function addOpacity(itemWords, currentWord) {
        itemWords.forEach((itemWord, index) => {
          itemWord.style.opacity = itemOpacity; 
          if (index <= currentWord) {
            itemWord.style.opacity = 1; 
          }
        });
      }
    });
  }
}
textOpacityScroll();
