"use client";

import axios from "axios";

import { IRestaurant } from "@/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HeartIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import Loader from "./Loader";
import { Input } from "../ui/input";

const All_restaurants = () => {
  const [data, setData] = useState<IRestaurant[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const filteredRestaurant = data?.filter((item) => {
    const term = searchTerm.toLowerCase();

    if (data.length !== 0) {
      return (
        item.restaurantName?.toLowerCase().includes(term) ||
        item.cuisineType?.toLowerCase().includes(term) ||
        item.address?.toLowerCase().includes(term)
      );
    }
    return [];
  });

  return (
    <div className="mt-36 h-screen">
      <h1 className="text-4xl  text-center font-semibold font-poppins">
        Top Picks of the Week
      </h1>
      <div className="w-full items-center justify-center flex mt-10">
        <div className="flex items-center justify-center gap-x-4 border border-black px-4 py-2 rounded-lg w-1/2 ">
          {" "}
          <input
            placeholder="Search restaurant by cuisine , restaurant name and location ..."
            className=" outline-none active:outline-none visited:outline-none !bg-transparent font-comic "
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <SearchIcon className="text-red font-bold" size={30} />
        </div>
      </div>
      {loading && (
        <div className="flex w-full h-screen justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="flex items-center gap-4 mt-20 justify-center">
        {!searchTerm &&
          data?.map((item) => (
            <div key={item._id} className="shadow-lg p-2">
              <div>
                <Link href={`/user/restaurants/${item._id}`}>
                  <Image
                    src={"/images/rest2.jpg"}
                    width={270}
                    height={500}
                    alt="image-text"
                    className="h-[300px] object-center object-cover"
                  />
                </Link>

                <div className="flex justify-between mt-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold font-comic">
                      {item.restaurantName}
                    </p>{" "}
                    <p className="font-bold font-comic text-red">{item.cuisineType || "italian"}</p>{" "}
                  </div>
               
                    <HeartIcon size={20} className="text-red" />
        
                </div>
              </div>
            </div>
          ))}
        {searchTerm &&
          filteredRestaurant?.length !== 0 &&
          filteredRestaurant?.map((item) => (
            <div key={item._id} className="shadow-lg p-2">
           <div>
                <Link href={`/user/restaurants/${item._id}`}>
                  <Image
                    src={"/images/rest2.jpg"}
                    width={270}
                    height={500}
                    alt="image-text"
                    className="h-[300px] object-center object-cover"
                  />
                </Link>

                <div className="flex justify-between mt-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold font-comic">
                      {item.restaurantName}
                    </p>{" "}
                    <p className="font-bold font-comic text-red">{item.cuisineType || "italian"}</p>{" "}
                  </div>
               
                    <HeartIcon size={20} className="text-red" />
        
                </div>
              </div>
            </div>
          ))}
        {searchTerm && filteredRestaurant?.length === 0 && (
          <div>
            <p className="text-xl text-center font-bold font-comic">
              No restaurant found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default All_restaurants;
