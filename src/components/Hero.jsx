import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__media">
        <img
          className="hero__image hero__image--desktop"
          src="https://mosaic-images.goat.com/3000/d91f6b76-fa2e-496c-81f9-c03764be77db-Desktop%20(27).gif?w=1920"
          alt="Summertime Lows"
        />
        <img
          className="hero__image hero__image--mobile"
          src="https://mosaic-images.goat.com/3000/e999d2bd-b921-4498-9bf0-f4f2edebf26a-Mobile%20(26).gif?w=750"
          alt="Summertime Lows"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">SUMMERTIME LOWS</h1>
        <p className="hero__subtitle">The freshest kicks for the season</p>
        <a href="#shop" className="hero__cta">
          <span className="hero__cta-text">Shop Now</span>
          <span className="hero__cta-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
