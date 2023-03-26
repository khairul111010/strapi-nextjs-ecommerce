import React, { createContext, useContext, useState } from "react";

export const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  const onAdd = (product, quantity) => {
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQty((prev) => prev + quantity);
    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist) {
      const updatedArray = cartItems.map((obj) => {
        if (obj.slug === product.slug) {
          let objQ = obj.quantity;
          return { ...obj, quantity: objQ + quantity };
        } else {
          return obj;
        }
      });

      setCartItems(updatedArray);
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  const onRemove = (product, quantity) => {
    setTotalPrice((prev) => prev - product.price * quantity);
    setTotalQty((prev) => prev - 1);
    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist.quantity === 1) {
      const updatedArray = cartItems.filter((obj) => obj.slug !== product.slug);
      setCartItems(updatedArray);
    } else {
      const updatedArray = cartItems.map((obj) => {
        if (obj.slug === product.slug) {
          let objQ = obj.quantity;
          return { ...obj, quantity: objQ - quantity };
        } else {
          return obj;
        }
      });
      setCartItems(updatedArray);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        incQty,
        decQty,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        onAdd,
        onRemove,
        totalQty,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
