"use client";

import axios from "axios";

import { IRestaurant } from "@/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, HeartIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import Loader from "./Loader";
import { Input } from "../ui/input";
import { useCart } from "./CartContext";
import { FaHeart } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { SlBadge } from "react-icons/sl";
import { motion } from "framer-motion";
import Advertisement from "./Advertisement";
import { useSearchParams } from "next/navigation";
const All_restaurants = () => {
  const [data, setData] = useState<IRestaurant[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");

  useEffect(() => {
    const getALLRestaurants = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/restaurants");
        console.log(res.data);
        if (res.data) {
          setData(res.data.restaurant);
          setLoading(false);
        }
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getALLRestaurants();
  }, []);

  const { wishList, addProduct } = useCart();

  const filteredRestaurant = data?.filter((item) => {
    if (searchTerm?.trim() !== null) {
      const term = searchTerm?.toLowerCase();
      if (term) {
        if (data.length !== 0) {
          return (
            item.restaurantName?.toLowerCase().includes(term) ||
            item.cuisineType?.toLowerCase().includes(term) ||
            item.address?.toLowerCase().includes(term)
          );
        }
      }
    }

    return [];
  });

  return (
    <div
      className="h-full pb-10   static  mb-20 -mt-20 lg:mb-10 lg:-mt-20 bg-white "
      id="all_restaurants"
    >
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Heading Animation */}
       <motion.h1 
      className="text-4xl text-center font-semibold font-comic hidden lg:inline-block"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Résultats de recherche pour: {searchTerm}
    </motion.h1>

    {/* Search Bar Animation */}
      {/* <motion.div 
      className="w-full flex items-center justify-center mt-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-center gap-x-4 border border-black px-4 py-2 rounded-lg w-[80%] sm:w-1/2">
        <input
          placeholder="Recherchez un restaurant par cuisine, nom du restaurant et emplacement.."
          className="outline-none bg-transparent font-comic w-full text-xs sm:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="text-red font-bold" size={30} />
      </div>
    </motion.div> */}

      {/* Loader */}
      {loading && (
        <div className="flex w-full h-screen justify-center items-center">
          <Loader />
        </div>
      )}

      {/* Restaurants Grid */}
      <motion.div
        className="flex items-center gap-4 mt-20 justify-center flex-wrap"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {/* <Advertisement position="top"/> */}
        {!searchTerm &&
          data?.map((item: any) => (
            <motion.div
              key={item._id}
              className="shadow-lg p-2 relative rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Link href={`/user/restaurants/${item._id}`}>
                <Image
                  src={item.thumbnail || "/images/rest2.jpg"}
                  width={270}
                  height={600}
                  alt="restaurant"
                  className=" w-[150px] h-[200px] sm:w-[220px] sm:h-[300px] object-cover rounded-md"
                />
              </Link>

              <div className="flex justify-between mt-4">
                <div className="flex flex-col">
                  <p className="text-xs sm:text-sm font-semibold font-comic">
                    {item.restaurantName}
                  </p>
                  <p className="text-xs sm:text-sm font-bold font-comic text-red">
                    {item.cuisineType || "Italian"}
                  </p>
                </div>

                <button onClick={() => addProduct(item._id)}>
                  {wishList.includes(item._id) ? (
                    <FaHeart className="text-red text-lg" />
                  ) : (
                    <HeartIcon className="text-red text-lg" />
                  )}
                </button>
              </div>

              {item.isFeatured && (
                <span className="absolute top-2 right-2 bg-orangeDark text-black px-2 py-1 text-xs sm:text-sm font-semibold rounded-full flex items-center gap-1">
                  <SlBadge size={20} />
                  Vedette
                </span>
              )}
            </motion.div>
          ))}

        {searchTerm &&
          filteredRestaurant?.length !== 0 &&
          filteredRestaurant?.map((item: any) => (
            <motion.div
              key={item._id}
              className="shadow-lg p-2 relative rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Link href={`/user/restaurants/${item._id}`}>
                <Image
                  src={item.thumbnail || "/images/rest2.jpg"}
                  width={270}
                  height={600}
                  alt="restaurant"
                  className=" w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover rounded-md"
                />
              </Link>

              <div className="flex justify-between mt-4">
                <div className="flex flex-col">
                  <p className="text-xs sm:text-sm font-semibold font-comic">
                    {item.restaurantName}
                  </p>
                  <p className="text-xs sm:text-sm font-bold font-comic text-red">
                    {item.cuisineType || "Italian"}
                  </p>
                </div>

                <button onClick={() => addProduct(item._id)}>
                  {wishList.includes(item._id) ? (
                    <FaHeart className="text-red" size={20} />
                  ) : (
                    <HeartIcon size={20} />
                  )}
                </button>
              </div>

              {item.isFeatured && (
                <span className="absolute top-2 right-2 bg-orangeDark text-black px-2 py-1 text-xs sm:text-sm font-semibold rounded-full flex items-center gap-1">
                  <SlBadge size={20} /> Featured
                </span>
              )}
            </motion.div>
          ))}

        {/* If Searching and Not Found */}
        {searchTerm && filteredRestaurant?.length === 0 && (
          <motion.div
            className="flex justify-center w-full mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl font-bold font-comic text-center">
              No restaurant found
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default All_restaurants;
