import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import '../styles/Slider.scss'
import '../../node_modules/swiper/swiper.css';
import '../../node_modules/swiper/modules/scrollbar-element.css';


import './Slider.scss';

const images = [
  { src: '/img/01.jfif', title: 'Some foto of somthing', alt: 'image' },
  { src: '/img/02.jfif', title: 'Some fo', alt: 'image' },
  { src: '/img/03.jfif', title: 'Some foto of', alt: 'image' },
  { src: '/img/04.jfif', title: 'Som', alt: 'image' },
  { src: '/img/05.jfif', title: 'Something', alt: 'image' },
  { src: '/img/06.jfif', title: 'Something', alt: 'image' },
  { src: '/img/07.jfif', title: 'Something', alt: 'image' },
];

const Slider = () => {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        speed: 1000,
        scrollbar: {
          el: '.slider__scrollbar',
          draggable: true,
        },
        breakpoints: {
          320: { slidesPerView: 1, centeredSlides: false },
          992: { slidesPerView: 2, centeredSlides: true },
        },
      });
    }
  }, []);

  return (
    <div className="slider swiper" ref={swiperRef}>
      <div className="slider__wrapper swiper-wrapper">
        {images.map((img, index) => (
          <div className="slider__slide slide swiper-slide" key={index}>
            <div className="slide__body">
              <div className="slide__image">
                <img
                  className="slide__picture"
                  src={img.src}
                  alt={img.alt}
                  data-title={img.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider__scrollbar"></div>
    </div>
  );
};

export default Slider;
