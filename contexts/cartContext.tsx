import React, { createContext, useContext, useState } from "react";
import { fetchCartData } from "utils/cart";

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const updateCart = async ({ cartId }) => {
    const userCart = await fetchCartData(cartId);
    setCart(userCart);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
