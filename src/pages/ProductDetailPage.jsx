import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(productId));
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="product-detail product-detail--notfound">
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const currentColor = product.colors[selectedColorIdx];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-detail">
      <button className="product-detail__back" onClick={() => navigate(-1)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <div className="product-detail__main-image">
            <img src={currentColor.image} alt={product.name} />
          </div>
        </div>

        <div className="product-detail__info">
          <p className="product-detail__brand">{product.brand}</p>
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__price">₹ {product.price.toLocaleString('en-IN')}</p>
          <p className="product-detail__type">{product.type}</p>

          <div className="product-detail__section">
            <h3 className="product-detail__section-title">Color: {currentColor.name}</h3>
            <div className="product-detail__colors">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  className={`product-detail__color-btn ${i === selectedColorIdx ? 'product-detail__color-btn--active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColorIdx(i)}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          <div className="product-detail__section">
            <h3 className="product-detail__section-title">Size</h3>
            <div className="product-detail__sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`product-detail__size-btn ${selectedSize === size ? 'product-detail__size-btn--active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`product-detail__add-btn ${addedToCart ? 'product-detail__add-btn--added' : ''}`}
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            {addedToCart ? 'Added to Cart!' : selectedSize ? 'Add to Cart' : 'Select a Size'}
          </button>

          <div className="product-detail__meta">
            <p>Free shipping on orders over ₹ 5,000</p>
            <p>30-day easy returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
