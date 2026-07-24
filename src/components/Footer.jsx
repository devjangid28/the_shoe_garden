import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">THE SHOES GARDEN</span>
            <p className="footer__tagline">Where sneaker culture lives.</p>
          </div>

          <div className="footer__columns">
            <div className="footer__column">
              <h4 className="footer__column-title">Shop</h4>
              <a href="#" className="footer__link">New Arrivals</a>
              <a href="#" className="footer__link">Sneakers</a>
              <a href="#" className="footer__link">Sports</a>
              <a href="#" className="footer__link">Lifestyle</a>
              <a href="#" className="footer__link">Sale</a>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Help</h4>
              <a href="#" className="footer__link">FAQs</a>
              <a href="#" className="footer__link">Shipping</a>
              <a href="#" className="footer__link">Returns</a>
              <a href="#" className="footer__link">Size Guide</a>
              <a href="#" className="footer__link">Contact</a>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <a href="#" className="footer__link">About Us</a>
              <a href="#" className="footer__link">Careers</a>
              <a href="#" className="footer__link">Press</a>
              <a href="#" className="footer__link">Sustainability</a>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Stay Connected</h4>
              <p className="footer__newsletter-text">Subscribe for exclusive drops & news</p>
              <div className="footer__newsletter">
                <input
                  type="email"
                  placeholder="Your email"
                  className="footer__newsletter-input"
                />
                <button className="footer__newsletter-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
              <div className="footer__socials">
                <a href="https://www.instagram.com/customshoes_sikar?igsh=M2I5NjA5YWJ0cnB0" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">&copy; 2026 The Shoes Garden. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Privacy Policy</a>
            <a href="#" className="footer__legal-link">Terms of Service</a>
            <a href="#" className="footer__legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
