import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './slider.module.css';

const slideImages = [
  {
    url: '/images/slide1.jpeg',
    id: '1'
  },
  {
    url: '/images/slide2.jpeg',
    id: '2'
  },
  {
    url: '/images/slide3.jpeg',
    id: '3'
  },
  {
    url: '/images/slide4.jpeg',
    id: '4'
  },
  {
    url: '/images/slide5.jpeg',
    id: '5'
  },
  {
    url: '/images/slide6.jpeg',
    id: '6'
  }
];

const Slider = () => {
  return (
    <div className={styles.sliderContainer}>
      <Fade cssClass={styles.slider} autoplay duration={4000} arrows={false}>
        {slideImages.map((slideImage) => (
          <img
            src={slideImage.url}
            alt={slideImage.id}
            className={styles.eachSlide}
            key={slideImage.id}
          />
        ))}
      </Fade>
    </div>
  );
};

export default Slider;
