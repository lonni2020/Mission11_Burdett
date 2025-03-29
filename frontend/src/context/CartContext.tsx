import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItemCount: (bookID: number, count: number) => void; // New method
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update the cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      if (existingItem) {
        // If the item already exists, update its count and price
        return prevCart.map((c) =>
          c.bookID === item.bookID
            ? { ...c, count: c.count + item.count, price: c.price + item.price }
            : c
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevCart, item];
      }
    });
  };

  const updateItemCount = (bookID: number, count: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.bookID === bookID ? { ...item, count } : item
      )
    );
  };

  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateItemCount, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
