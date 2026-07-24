import { Link } from 'react-router-dom';
import './Brands.css';

const brands = [
  {
    id: 1,
    name: 'Nike',
    image: 'https://cms-cdn.flightclub.com/239754022ad7-a1db-ee11-fe59-0647863e.png?w=1200',
  },
  {
    id: 2,
    name: 'Adidas',
    image: 'https://cms-cdn.flightclub.com/879c42c3c9db-c24a-ee11-0f59-090af990.png?w=1200',
  },
  {
    id: 3,
    name: 'Puma',
    image: 'https://cms-cdn.flightclub.com/2d152cd717f7-e48a-ee11-fe59-019de96b.png?w=1200',
  },
  {
    id: 4,
    name: 'Velocity',
    image: 'https://cms-cdn.flightclub.com/2d152cd717f7-e48a-ee11-0f59-0941df91.png?w=1200',
  },
];

const Brands = () => {
  return (
    <section className="brands" id="brands">
      <div className="brands__inner">
        <h2 className="brands__title">BRANDS</h2>
        <div className="brands__grid">
          {brands.map((brand) => (
            <div key={brand.id} className="brands__card">
              <Link to={`/brand/${brand.name.toLowerCase()}`} className="brands__image-link">
                <div className="brands__image-container">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="brands__image"
                    loading="lazy"
                    width="240"
                    height="303"
                  />
                </div>
              </Link>
              <Link to={`/brand/${brand.name.toLowerCase()}`} className="brands__label-link">
                {brand.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
