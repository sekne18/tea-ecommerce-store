"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

type ContextType = {
  showCart: boolean;
  cartItems: ProductType[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  setShowCart: (value: boolean) => void;
  onAdd: (product: ProductType, quantity: number) => void;
  toggleCartItemQuantity: (id: number, value: string) => void;
  onRemove: (id: ProductType) => void;
};

const Context = createContext<ContextType>({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  incQty: () => {},
  decQty: () => {},
  setShowCart: () => {},
  onAdd: () => {},
  toggleCartItemQuantity: () => {},
  onRemove: () => {},
});

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  let foundProduct: ProductType;
  let index: number;

  const onAdd = (product: ProductType, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item: ProductType) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems: ProductType[] = cartItems.map(
        (cartProduct: ProductType) => {
          if (cartProduct._id === product._id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          } else {
            return cartProduct;
          }
        }
      );

      setCartItems([...updatedCartItems]);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: ProductType) => {
    foundProduct = cartItems.find((item) => item._id === product._id)!;
    const newcartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );

    setTotalQuantities(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newcartItems);
  };

  const toggleCartItemQuantity = (id: number, value: string) => {
    foundProduct = cartItems.find((item) => item._id === id)!;
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        setShowCart,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
