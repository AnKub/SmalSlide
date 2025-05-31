import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import '../styles/Slider.scss';
import { useRef } from 'react';

const images = [
  { src: '/img/01.webp', title: 'Some foto of somthing', alt: 'image' },
  { src: '/img/02.webp', title: 'Some fo', alt: 'image' },
  { src: '/img/03.webp', title: 'Some foto of', alt: 'image' },
  { src: '/img/04.webp', title: 'Som', alt: 'image' },
  { src: '/img/05.webp', title: 'Something', alt: 'image' },
  { src: '/img/06.webp', title: 'Somethi', alt: 'image' },
  { src: '/img/07.webp', title: 'Someth', alt: 'image' },
];

const Slider = () => {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) 
  );

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [autoplay.current]
  );

  return (
    <div className="slider" ref={emblaRef}>
      <div className="slider__container">
        {images.map((img, index) => (
          <div className="slider__slide" key={index}>
            <img src={img.src} alt={img.alt} title={img.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
