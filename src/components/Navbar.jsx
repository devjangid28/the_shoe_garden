import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
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
          <button className="navbar__icon-btn" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button className="navbar__icon-btn" aria-label="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className="navbar__icon-btn" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="navbar__cart-count">2</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
