import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import products from '../data/products';
import './ProductCarousel.css';

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [showAdded, setShowAdded] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const currentColor = product.colors[selectedColor];
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, currentColor);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-link">
        <div className="product-card__image-wrap">
          <img
            src={currentColor.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
          {showAdded && (
            <div className="product-card__toast">Added to Cart!</div>
          )}
          <div className="product-card__actions">
            <button
              className={`product-card__action-btn product-card__action-btn--fav ${wishlisted ? 'product-card__action-btn--fav-active' : ''}`}
              onClick={handleToggleWishlist}
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button
              className="product-card__action-btn product-card__action-btn--quickshop"
              onClick={handleAddToCart}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span>{showAdded ? 'Added!' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </Link>

      <div className="product-card__info">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">₹ {product.price.toLocaleString('en-IN')}</p>
        <p className="product-card__type">{product.type}</p>
        <div className="product-card__colors">
          {product.colors.map((color, i) => (
            <button
              key={i}
              className={`product-card__swatch ${i === selectedColor ? 'product-card__swatch--active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={(e) => { e.stopPropagation(); setSelectedColor(i); }}
              aria-label={color.name}
              title={color.name}
            />
          ))}
          <span className="product-card__color-name">{currentColor.name}</span>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featuredProducts = products.slice(0, 8);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.product-card')?.offsetWidth || 300;
    el.scrollBy({ left: direction * cardWidth * 2, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className="products" id="sneakers">
      <div className="products__header">
        <div>
          <h2 className="products__title">NEW ARRIVALS</h2>
          <p className="products__subtitle">Fresh drops from the brands you love</p>
        </div>
        <Link to="/category/sneakers" className="products__view-all">View All</Link>
      </div>

      <div className="products__carousel-wrap">
        <button
          className={`products__arrow products__arrow--left ${!canScrollLeft ? 'products__arrow--hidden' : ''}`}
          onClick={() => scroll(-1)}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="products__scroll" ref={scrollRef} onScroll={checkScroll}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <button
          className={`products__arrow products__arrow--right ${!canScrollRight ? 'products__arrow--hidden' : ''}`}
          onClick={() => scroll(1)}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;
