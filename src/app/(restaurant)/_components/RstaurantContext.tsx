"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ResataurantContextType = {
  restaurantId: string;
  addRestaurantId: (id: string) => void;
};

export const RestaurntContext = createContext<ResataurantContextType | null>(
  null
);

export const RestaurntContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [restaurantId, setRestaurantId] = useState<string>("");

  useEffect(() => {
    if(restaurantId!==undefined){
      const id = JSON.parse(window.localStorage.getItem("restaurantId") || "");
      if (id) {
        setRestaurantId(id);
      }
    }
 
    
  }, []);

  useEffect(() => {
   
     const id = localStorage.setItem("restaurantId", JSON.stringify(restaurantId));
     console.log(id)
    
    
  }, [restaurantId]);

  const addRestaurantId = (id: string) => {
    setRestaurantId(id);
  };

  return (
    <RestaurntContext.Provider value={{ restaurantId, addRestaurantId }}>
      {children}
    </RestaurntContext.Provider>
  );
};


export function useRestaurantContext() {
    const context = useContext(RestaurntContext);
    if (!context) {
      throw new Error("use cart must be inside the context");
    }
    return context;
  }