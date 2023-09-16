import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children, initialCart }) => {
  const [cart, setCart] = useState(initialCart);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
