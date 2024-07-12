'use strict'

let pageSlider = new Swiper(`.slider`, {
  speed:1000,
  scrollbar:{
    el: '.slider__scrollbar',
    draggable: true,
  },
  breakpoints:{
    '320':{
      slidesPerView:1,
      centeredSlides:false
    },
    '992':{
      slidesPerView:2,
      centeredSlides:true
    },
  }
});

const page = document.querySelecnor ('.page');
const images= document.querySelecnorAll('.slide__picture');

if(images.lenght){
  let backgroundSlides = ``;
  let textSlides = ``;
  
  images.forEach(image => {
    backgroundSlides +=`
    <div class = 'background__slide swiper__slide'>
      <div class='background__image'><
        <img src='${image.getAttribute("src")}' alt='${image.alt}'/>
      </div>
    </div>
    `;
    textSlides+=`
    <div class = 'text__slide swiper__slide'>
      <span>${image.dataset.title ? image.dataset.title: ''}<span/>
    </div>
    `;
  });
  const background = `
  <div class = 'background swiper'>
  <div class = 'background__wrapper swiper-wrapper'>
      ${backgroundSlides}
  <div/>  
  <div/>
  `;
  const text = `
  <div class = 'text swiper'>
  <div class = 'text__wrapper swiper-wrapper'>
      ${textSlides}
  <div/>  
  <div/>
  `;

  page.insertAdjacentHTML('afterbegin', background);
  page.insertAdjacentHTML('beforeend', text);
  
  let pageBgSlider = new Swiper('.background', {
    speed:500
  });
  let pageTextSlider = new Swiper('.text', {
    effect: 'fade',
    fadeEffect:{
      crossFade:true
    },
    speed:1000
  });
// controll
  pageSlider.controller.control = pageBgSlider;
  pageBgSlider.controller.control - pageTextSlider;
}

const speed = 800;
document.addEventListener('click', function (e){
  const targetElement = e.target;
  const textBlock = document.querySelector('.text');
  textBlock.style.transitionDuration - `${speed}ms`;
// open imaage
  if (targetElement.closest('.slide')){
    const slide = targetElement.closest('.slide');
    const slideImage = document.querySelector('ing');
  }
})