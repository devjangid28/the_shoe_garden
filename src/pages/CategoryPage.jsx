import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products, { categories, allSizes, allColors } from '../data/products';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  }, []);

  const category = categories.find((c) => c.id === categoryId) || categories[0];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.category !== categoryId) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
      if (selectedColors.length > 0 && !selectedColors.some((c) => p.colors.some((pc) => pc.name.toLowerCase() === c.toLowerCase()))) return false;
      return true;
    });
  }, [categoryId, selectedSizes, selectedColors]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  };

  const toggleColor = (colorName) => {
    setSelectedColors((prev) => prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]);
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const handleQuickShop = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="category-page">
      <div className="category-page__header">
        <h1 className="category-page__title">{category.label}</h1>
        <p className="category-page__count">{filteredProducts.length} Results</p>
      </div>

      <button className="category-page__filter-toggle" onClick={() => setFilterOpen(!filterOpen)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="21" x2="4" y1="14"/><line x1="4" y1="10" x2="4" y1="3"/><line x1="12" y1="21" x2="12" y1="12"/><line x1="12" y1="8" x2="12" y1="3"/><line x1="20" y1="21" x2="20" y1="16"/><line x1="20" y1="12" x2="20" y1="3"/>
        </svg>
        Filters
        {(selectedSizes.length > 0 || selectedColors.length > 0) && (
          <span className="category-page__filter-badge">{selectedSizes.length + selectedColors.length}</span>
        )}
      </button>

      <div className="category-page__layout">
        <aside className={`category-page__filters ${filterOpen ? 'category-page__filters--open' : ''}`}>
          <div className="category-page__filter-header">
            <h2>Filters</h2>
            {(selectedSizes.length > 0 || selectedColors.length > 0) && (
              <button className="category-page__clear" onClick={clearFilters}>Clear All</button>
            )}
          </div>

          <div className="category-page__filter-group">
            <h3 className="category-page__filter-label">Size</h3>
            <div className="category-page__filter-options">
              {allSizes.map((size) => (
                <button
                  key={size}
                  className={`category-page__size-btn ${selectedSizes.includes(size) ? 'category-page__size-btn--active' : ''}`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="category-page__filter-group">
            <h3 className="category-page__filter-label">Color</h3>
            <div className="category-page__filter-colors">
              {allColors.map((color) => (
                <button
                  key={color.name}
                  className={`category-page__color-btn ${selectedColors.includes(color.name) ? 'category-page__color-btn--active' : ''}`}
                  onClick={() => toggleColor(color.name)}
                  title={color.name}
                >
                  <span className="category-page__color-swatch" style={{ backgroundColor: color.hex }} />
                  <span className="category-page__color-name">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="category-page__products">
          {filteredProducts.length === 0 ? (
            <div className="category-page__empty">
              <p>No products found matching your filters.</p>
              <button className="category-page__clear-btn" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="category-page__grid">
              {filteredProducts.map((product) => (
                <ProductTile key={product.id} product={product} onQuickShop={handleQuickShop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductTile = ({ product, onQuickShop }) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const currentColor = product.colors[selectedColorIdx];

  return (
    <div
      className="product-tile"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onQuickShop(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onQuickShop(product.id); }}
    >
      <div className="product-tile__image-wrap">
        <img
          src={currentColor.image}
          alt={product.name}
          className="product-tile__image"
          loading="lazy"
        />
        <button className={`product-tile__quickshop ${hovered ? 'product-tile__quickshop--visible' : ''}`} onClick={(e) => { e.stopPropagation(); onQuickShop(product.id); }}>
          Quick Shop
        </button>
      </div>
      <div className="product-tile__info">
        <p className="product-tile__brand">{product.brand}</p>
        <h3 className="product-tile__name">{product.name}</h3>
        <p className="product-tile__price">₹ {product.price.toLocaleString('en-IN')}</p>
        <div className="product-tile__colors">
          {product.colors.map((color, i) => (
            <button
              key={i}
              className={`product-tile__swatch ${i === selectedColorIdx ? 'product-tile__swatch--active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={(e) => { e.stopPropagation(); setSelectedColorIdx(i); }}
              title={color.name}
              aria-label={color.name}
            />
          ))}
          <span className="product-tile__color-name">{currentColor.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
