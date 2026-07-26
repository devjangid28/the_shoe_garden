import { useState, useEffect, useCallback } from 'react';
import './Hero.css';

const slides = [
  {
    id: 1,
    title: 'STEP INTO BOLD',
    subtitle: 'Make every walk your statement',
    image: 'https://mosaic-images.goat.com/3000/d91f6b76-fa2e-496c-81f9-c03764be77db-Desktop%20(27).gif?w=1920',
    mobileImage: 'https://mosaic-images.goat.com/3000/e999d2bd-b921-4498-9bf0-f4f2edebf26a-Mobile%20(26).gif?w=750',
    alt: 'Step Into Bold',
    responsive: {
      desktop: { objectPosition: 'center center' },
      tablet: { objectPosition: 'center center' },
      mobile: { objectPosition: 'center center' },
    },
  },
  {
    id: 2,
    title: 'NEW DROPS WEEKLY',
    subtitle: 'Fresh kicks, endless possibilities',
    image: '/2.jpg',
    alt: 'New Drops Weekly',
    responsive: {
      desktop: { objectPosition: 'center center' },
      tablet: { objectPosition: 'center center' },
      mobile: { objectPosition: 'center center' },
    },
  },
  {
    id: 3,
    title: 'ELEVATE YOUR GAME',
    subtitle: 'From streets to stadiums',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1920&q=80',
    alt: 'Elevate Your Game',
    responsive: {
      desktop: { objectPosition: 'center center' },
      tablet: { objectPosition: 'center center' },
      mobile: { objectPosition: 'center center' },
    },
  },
  {
    id: 4,
    title: 'WALK YOUR WAY',
    subtitle: 'Comfort meets culture',
    image: '/4.jpg',
    alt: 'Walk Your Way',
    responsive: {
      desktop: { objectPosition: 'center center' },
      tablet: { objectPosition: 'center center' },
      mobile: { objectPosition: 'center center' },
    },
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
        >
          <div className="hero__media">
            <img
              className="hero__image hero__image--desktop"
              src={slide.image}
              alt={slide.alt}
              style={{ objectPosition: slide.responsive.desktop.objectPosition }}
            />
            <img
              className="hero__image hero__image--mobile"
              src={slide.mobileImage || slide.image}
              alt={slide.alt}
              style={{ objectPosition: slide.responsive.mobile.objectPosition }}
            />
          </div>
        </div>
      ))}

      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__text-container">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`hero__text-slide ${i === current ? 'hero__text-slide--active' : ''}`}
            >
              <h1 className="hero__title">{slide.title}</h1>
              <p className="hero__subtitle">{slide.subtitle}</p>
            </div>
          ))}
        </div>
        <a href="#new" className="hero__cta">
          <span className="hero__cta-text">Shop Now</span>
          <span className="hero__cta-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </a>
      </div>

      <div className="hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
