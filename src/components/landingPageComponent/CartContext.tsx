"use client";

import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

type Cart = {
  wishList: string[];
  setWishList: React.Dispatch<React.SetStateAction<string[]>>;
  addProductsInWishList: (id: string) => void;
  addProduct: (id: string) => void;
};

const cartContext = createContext<Cart | null>(null);

const CartContext = ({ children }: { children: React.ReactNode }) => {
  // Cart products state
  const [wishList, setWishList] = useState<string[]>([]);
  // useEffect for getting item from localStorage

  useEffect(() => {
    const store = JSON.parse(window.localStorage.getItem("wishlist") || "[]");

    if (store.length > 0) {
      setWishList(store);
    }
  }, []);

  useEffect(() => {
    const item = localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const addProductsInWishList = (productId: string) => {
    const findId = wishList.find((id) => id === productId);

    if (findId) {
      toast.error("Restaurant déjà ajouté dans la liste de souhaits");

      return;
    } else {
      setWishList((prev) => {
        return [...prev, productId];
      });
      toast.success("Restaurant ajouté à la liste de souhaits avec succès");
    }
  };

  const addProduct = (id: string) => {
    addProductsInWishList(id);
  };

  return (
    <cartContext.Provider
      value={{
        addProductsInWishList,
        wishList,
        setWishList,
        addProduct,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContext;

// custom hook
export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    console.warn("useCart called outside of CartContext.Provider");
    return {
      addProductsInWishList: () => {},
      wishList: [],
      setWishList: () => {},
      addProduct: () => {},
    };
  }
  return context;
};
