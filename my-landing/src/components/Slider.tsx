import useEmblaCarousel from 'embla-carousel-react';
import '../styles/Slider.scss';

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
  const [emblaRef] = useEmblaCarousel({ loop: true });

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
