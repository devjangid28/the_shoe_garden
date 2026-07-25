import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCarousel.css';

const categories = [
  {
    id: 'sneakers',
    label: 'SNEAKERS',
    image: '/sneakers.jpg',
    mobileImage: '/sneakers.jpg',
    link: '/category/sneakers',
  },
  {
    id: 'sports',
    label: 'SPORTS',
    image: '/sports.jpg',
    mobileImage: '/sports.jpg',
    link: '/category/sports',
  },
  {
    id: 'lifestyle',
    label: 'LIFESTYLE',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    link: '/category/lifestyle',
  },
];

const FeaturedCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="featured" id="new">
      <div className="featured__inner">
        <div className="featured__image-panel">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={cat.link}
              className={`featured__image-slide ${i === activeIndex ? 'featured__image-slide--active' : ''}`}
            >
              <picture>
                <source srcSet={cat.image} media="(min-width: 768px)" />
                <img
                  src={cat.mobileImage}
                  alt={cat.label}
                  className="featured__image"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </picture>
            </Link>
          ))}
        </div>

        <div className="featured__control-panel">
          <h2 className="featured__panel-title">CATEGORIES</h2>
          <div className="featured__category-list">
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className={`featured__category-item ${i === activeIndex ? 'featured__category-item--active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
              >
                <span className="featured__category-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
                <Link to={cat.link} className="featured__category-label">
                  {cat.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
