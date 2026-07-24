import { Link } from 'react-router-dom';
import './CategorySection.css';

const categories = [
  {
    id: 'sneakers',
    title: 'SNEAKERS',
    description: 'Iconic styles that define culture',
    image: '/sneakers.jpg',
    link: '/category/sneakers',
  },
  {
    id: 'sports',
    title: 'SPORTS',
    description: 'Performance meets streetwear',
    image: '/sports.jpg',
    link: '/category/sports',
  },
  {
    id: 'lifestyle',
    title: 'LIFESTYLE',
    description: 'Everyday essentials, elevated',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80',
    link: '/category/lifestyle',
  },
];

const CategorySection = () => {
  return (
    <section className="categories" id="sports">
      <div className="categories__inner">
        <h2 className="categories__title">EXPLORE</h2>
        <div className="categories__grid">
          {categories.map((cat) => (
            <Link key={cat.id} to={cat.link} className="categories__card">
              <div className="categories__image-wrap">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="categories__image"
                  loading="lazy"
                />
                <div className="categories__card-overlay" />
              </div>
              <div className="categories__card-content">
                <h3 className="categories__card-title">{cat.title}</h3>
                <p className="categories__card-desc">{cat.description}</p>
                <span className="categories__card-cta">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
