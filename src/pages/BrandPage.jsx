import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import products, { brandDescriptions, allSizes, allColors } from '../data/products';
import './BrandPage.css';

const BrandPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);

  const brand = brandName.charAt(0).toUpperCase() + brandName.slice(1);
  const description = brandDescriptions[brand] || '';

  const brandProducts = useMemo(() => {
    return products.filter((p) => p.brand === brand);
  }, [brand]);

  const models = useMemo(() => {
    const modelSet = new Set(brandProducts.map((p) => p.model));
    return Array.from(modelSet);
  }, [brandProducts]);

  const filteredProducts = useMemo(() => {
    let result = brandProducts.filter((p) => {
      if (selectedModels.length > 0 && !selectedModels.includes(p.model)) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
      if (selectedColors.length > 0 && !selectedColors.some((c) => p.colors.some((pc) => pc.name.toLowerCase() === c.toLowerCase()))) return false;
      return true;
    });

    switch (sortBy) {
      case 'price_asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].reverse();
        break;
      default:
        break;
    }

    return result;
  }, [brandProducts, selectedModels, selectedSizes, selectedColors, sortBy]);

  const toggleModel = (model) => {
    setSelectedModels((prev) => prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]);
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  };

  const toggleColor = (colorName) => {
    setSelectedColors((prev) => prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]);
  };

  const clearFilters = () => {
    setSelectedModels([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const handleQuickShop = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="brand-page">
      <div className="brand-page__header">
        <h1 className="brand-page__title">{brand}</h1>
        <div className="brand-page__description">
          <p>{description}</p>
        </div>
      </div>

      <button className="brand-page__filter-toggle" onClick={() => setFilterOpen(!filterOpen)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="21" x2="4" y1="14"/><line x1="4" y1="10" x2="4" y1="3"/><line x1="12" y1="21" x2="12" y1="12"/><line x1="12" y1="8" x2="12" y1="3"/><line x1="20" y1="21" x2="20" y1="16"/><line x1="20" y1="12" x2="20" y1="3"/>
        </svg>
        Add Filters
        {(selectedModels.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0) && (
          <span className="brand-page__filter-badge">{selectedModels.length + selectedSizes.length + selectedColors.length}</span>
        )}
      </button>

      <div className="brand-page__toolbar">
        <span className="brand-page__count">Results <strong>{filteredProducts.length}</strong></span>
        <div className="brand-page__sort">
          <label className="brand-page__sort-label">Sort By:</label>
          <select className="brand-page__sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="brand-page__layout">
        <aside className={`brand-page__filters ${filterOpen ? 'brand-page__filters--open' : ''}`}>
          <div className="brand-page__filter-header">
            <h2>Filters</h2>
            {(selectedModels.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0) && (
              <button className="brand-page__clear" onClick={clearFilters}>Clear All</button>
            )}
          </div>

          <div className="brand-page__filter-group">
            <h3 className="brand-page__filter-label">Model</h3>
            <div className="brand-page__filter-options">
              {models.map((model) => (
                <button
                  key={model}
                  className={`brand-page__model-btn ${selectedModels.includes(model) ? 'brand-page__model-btn--active' : ''}`}
                  onClick={() => toggleModel(model)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="brand-page__filter-group">
            <h3 className="brand-page__filter-label">Size</h3>
            <div className="brand-page__filter-options">
              {allSizes.map((size) => (
                <button
                  key={size}
                  className={`brand-page__size-btn ${selectedSizes.includes(size) ? 'brand-page__size-btn--active' : ''}`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="brand-page__filter-group">
            <h3 className="brand-page__filter-label">Color</h3>
            <div className="brand-page__filter-colors">
              {allColors.map((color) => (
                <button
                  key={color.name}
                  className={`brand-page__color-btn ${selectedColors.includes(color.name) ? 'brand-page__color-btn--active' : ''}`}
                  onClick={() => toggleColor(color.name)}
                  title={color.name}
                >
                  <span className="brand-page__color-swatch" style={{ backgroundColor: color.hex }} />
                  <span className="brand-page__color-name">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="brand-page__products">
          {filteredProducts.length === 0 ? (
            <div className="brand-page__empty">
              <p>No products found matching your filters.</p>
              <button className="brand-page__clear-btn" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="brand-page__grid">
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

const ProductTile = ({ product }) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const currentColor = product.colors[selectedColorIdx];

  return (
    <div className="brand-product-tile">
      <Link to={`/product/${product.id}`} className="brand-product-tile__image-link">
        <div className="brand-product-tile__image-wrap">
          <img
            src={currentColor.image}
            alt={product.name}
            className="brand-product-tile__image"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="brand-product-tile__info">
        <p className="brand-product-tile__brand">{product.brand}</p>
        <h3 className="brand-product-tile__name">{product.name}</h3>
        <p className="brand-product-tile__price">₹ {product.price.toLocaleString('en-IN')}</p>
        <div className="brand-product-tile__colors">
          {product.colors.map((color, i) => (
            <button
              key={i}
              className={`brand-product-tile__swatch ${i === selectedColorIdx ? 'brand-product-tile__swatch--active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColorIdx(i)}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
