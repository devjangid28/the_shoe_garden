import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import products from '../data/products';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchPanelRef = useRef(null);
  const cartPanelRef = useRef(null);
  const wishlistPanelRef = useRef(null);

  const {
    cartItems, wishlistItems, removeFromCart,
    removeFromWishlist, cartCount, wishlistCount, cartTotal,
  } = useShop();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchOpen && searchPanelRef.current && !searchPanelRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (cartOpen && cartPanelRef.current && !cartPanelRef.current.contains(e.target)) {
        setCartOpen(false);
      }
      if (wishlistOpen && wishlistPanelRef.current && !wishlistPanelRef.current.contains(e.target)) {
        setWishlistOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen, cartOpen, wishlistOpen]);

  useEffect(() => {
    if (searchOpen || cartOpen || wishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen, cartOpen, wishlistOpen]);

  const searchResults = searchQuery.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearchSelect = (productId) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${location.pathname !== '/' ? 'navbar--dark' : ''}`}>
        <div className="navbar__inner">
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`navbar__hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`navbar__hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`navbar__hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>

          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-text">THE SHOES GARDEN</span>
          </Link>

          <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
            <Link to="/category/sneakers" className="navbar__link" onClick={() => setMenuOpen(false)}>Sneakers</Link>
            <Link to="/category/sports" className="navbar__link" onClick={() => setMenuOpen(false)}>Sports</Link>
            <Link to="/category/lifestyle" className="navbar__link" onClick={() => setMenuOpen(false)}>Lifestyle</Link>
            <a href="#brands" className="navbar__link" onClick={() => setMenuOpen(false)}>Brands</a>
          </div>

          <div className="navbar__actions">
            <button className="navbar__icon-btn" aria-label="Search" onClick={() => { setSearchOpen(true); setCartOpen(false); setWishlistOpen(false); }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <button className="navbar__icon-btn" aria-label="Wishlist" onClick={() => { setWishlistOpen(true); setSearchOpen(false); setCartOpen(false); }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlistCount > 0 && <span className="navbar__cart-count">{wishlistCount}</span>}
            </button>
            <button className="navbar__icon-btn" aria-label="Cart" onClick={() => { setCartOpen(true); setSearchOpen(false); setWishlistOpen(false); }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="navbar__cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Panel */}
      <div className={`navbar__panel navbar__panel--search ${searchOpen ? 'navbar__panel--open' : ''}`} ref={searchPanelRef}>
        <div className="navbar__panel-inner">
          <div className="navbar__search-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search shoes, brands..."
              className="navbar__search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="navbar__panel-close" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="navbar__search-results">
              {searchResults.map(product => (
                <div
                  key={product.id}
                  className="navbar__search-result"
                  onClick={() => handleSearchSelect(product.id)}
                >
                  <img src={product.colors[0].image} alt={product.name} className="navbar__search-result-img" />
                  <div className="navbar__search-result-info">
                    <p className="navbar__search-result-brand">{product.brand}</p>
                    <p className="navbar__search-result-name">{product.name}</p>
                    <p className="navbar__search-result-price">₹ {product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {searchQuery.length > 1 && searchResults.length === 0 && (
            <div className="navbar__search-empty">No results found for &quot;{searchQuery}&quot;</div>
          )}
          {searchQuery.length <= 1 && (
            <div className="navbar__search-hints">
              <p className="navbar__search-hint-title">Popular Searches</p>
              <div className="navbar__search-tags">
                {['Nike', 'Adidas', 'Sneakers', 'Puma'].map(tag => (
                  <button key={tag} className="navbar__search-tag" onClick={() => setSearchQuery(tag)}>{tag}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`navbar__panel navbar__panel--cart ${cartOpen ? 'navbar__panel--open' : ''}`} ref={cartPanelRef}>
        <div className="navbar__panel-inner">
          <div className="navbar__drawer-header">
            <h3>Cart ({cartCount})</h3>
            <button className="navbar__panel-close" onClick={() => setCartOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          {cartCount === 0 ? (
            <div className="navbar__drawer-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p>Your cart is empty</p>
              <button className="navbar__drawer-btn" onClick={() => { setCartOpen(false); navigate('/category/sneakers'); }}>Start Shopping</button>
            </div>
          ) : (
            <>
              <div className="navbar__drawer-items">
                {cartItems.map((item, i) => (
                  <div key={`${item.id}-${i}`} className="navbar__drawer-item">
                    <img src={item.selectedColor?.image || item.colors[0].image} alt={item.name} className="navbar__drawer-item-img" />
                    <div className="navbar__drawer-item-info">
                      <p className="navbar__drawer-item-brand">{item.brand}</p>
                      <p className="navbar__drawer-item-name">{item.name}</p>
                      <p className="navbar__drawer-item-price">₹ {item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button className="navbar__drawer-item-remove" onClick={() => removeFromCart(item.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="navbar__drawer-footer">
                <div className="navbar__drawer-total">
                  <span>Total</span>
                  <span>₹ {cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="navbar__drawer-checkout">Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Wishlist Drawer */}
      <div className={`navbar__panel navbar__panel--wishlist ${wishlistOpen ? 'navbar__panel--open' : ''}`} ref={wishlistPanelRef}>
        <div className="navbar__panel-inner">
          <div className="navbar__drawer-header">
            <h3>Wishlist ({wishlistCount})</h3>
            <button className="navbar__panel-close" onClick={() => setWishlistOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          {wishlistCount === 0 ? (
            <div className="navbar__drawer-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <p>Your wishlist is empty</p>
              <button className="navbar__drawer-btn" onClick={() => { setWishlistOpen(false); navigate('/category/sneakers'); }}>Discover Shoes</button>
            </div>
          ) : (
            <div className="navbar__drawer-items">
              {wishlistItems.map((item) => (
                <div key={item.id} className="navbar__drawer-item">
                  <img src={item.colors[0].image} alt={item.name} className="navbar__drawer-item-img" />
                  <div className="navbar__drawer-item-info">
                    <p className="navbar__drawer-item-brand">{item.brand}</p>
                    <p className="navbar__drawer-item-name">{item.name}</p>
                    <p className="navbar__drawer-item-price">₹ {item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <button className="navbar__drawer-item-remove" onClick={() => removeFromWishlist(item.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {(searchOpen || cartOpen || wishlistOpen) && (
        <div className="navbar__overlay" onClick={() => { setSearchOpen(false); setCartOpen(false); setWishlistOpen(false); }} />
      )}
    </>
  );
};

export default Navbar;
