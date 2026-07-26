import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCarousel from './components/FeaturedCarousel';
import ProductCarousel from './components/ProductCarousel';
import CategorySection from './components/CategorySection';
import Brands from './components/Brands';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandPage from './pages/BrandPage';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCarousel />
      <ProductCarousel />
      <CategorySection />
      <Brands />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/brand/:brandName" element={<BrandPage />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
