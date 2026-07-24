import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/brand/:brandName" element={<BrandPage />} />
      </Routes>
    </Router>
  );
}

export default App;
