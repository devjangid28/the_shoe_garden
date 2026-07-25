import { createContext, useContext, useState, useCallback } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = useCallback((product, color) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id && item.selectedColor?.name === color.name);
      if (exists) return prev;
      return [...prev, { ...product, selectedColor: color }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const isWishlisted = useCallback((productId) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <ShopContext.Provider value={{
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted,
      cartCount,
      wishlistCount,
      cartTotal,
    }}>
      {children}
    </ShopContext.Provider>
  );
};
