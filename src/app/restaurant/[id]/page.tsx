"use client";

import { IRestaurant } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import GooglePageComp from "@/components/landingPageComponent/GooglePageComp";
import { CgWebsite } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdRestaurant } from "react-icons/io";
import { TimingSlot } from "@/types/types";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import Advertisement from "@/components/landingPageComponent/Advertisement";
const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState<IRestaurant>();
  const [timings, setTimings] = useState<TimingSlot[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const getALLRestaurantsById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/restaurants/${id}`);

      if (res) {
        setData(res.data.findRestaurantById);
      }
    } catch (error: any) {
      console.log("Error occurred while getting.");
      setLoading(false);
    }
  };
  const getRestaurantTimings = async () => {
    if (!id) {
      return;
    }

    try {
      const res = await axios.get(
        `/api/restaurant/create_restaurant_timming?id=${id}`
      );
      console.log(res.data.restaurantTimingsFindById);
      setTimings(res.data.restaurantTimingsFindById);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getALLRestaurantsById();
    getRestaurantTimings();
  }, []);

  return (

    <div>
 
    
    <div className="bg-slate-50 w-screen h-auto flex justify-center items-center  overflow-x-hidden min-h-screen">
     
      {data && (
        <div className="max-w-[800px] w-full bg-card shadow-lg  rounded-lg p-10 mt-20 space-y-6 ">
          <div className="flex justify-between flex-col lg:flex-row">
            <Image
              src={data?.logo || ""}
              alt="logo"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="">
              <Button className=" bg-red mt-6 sm:mt-0">
                <Link href={`/user/restaurants/${data._id}`}>
                  <FaArrowLeft className="inline-block mx-2" />
                  Retour au menu pdf
                </Link>
              </Button>
              <h1 className="mt-4 font-semibold text-2xl font-comic">
                {data?.restaurantName}
              </h1>
              <p
                className="text-sm font-light text-justify italic
         mt-2"
              >
                {data?.description}
              </p>
              <div className="flex flex-col mt-2 gap-y-1">
                <Link href={data!.googlePage!} className="underline text-xs sm:text-sm">
                  <CgWebsite className=" inline-block sm:mr-3"  />{" "}
                  {data?.googlePage}
                </Link>
                <Link href={data!.website_link!} className="underline text-xs sm:text-sm">
                  <FcGoogle className=" inline-block sm:mr-3"  />{" "}
                  {data!.website_link!}
                </Link>
                <p className="text-sm">
                  <MdOutlineLocationOn
                    className=" inline-block mr-3 font-comic"
                    size={20}
                  />
                  {data.address}
                </p>
                <p className="text-lg inline-block sm:mr-3">
                  <IoMdRestaurant
                    className=" inline-block mr-3 font-comic"
                   
                  />
                  {data.cuisineType || "Italic"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h1 className="mt-4 font-bold text-xl font-comic ">Horaires</h1>
            <div className="text-sm sm:text-lg rounded-lg flex flex-col w-full">
              {timings?.map((timing, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center lg:px-6
}"
                >
                  <p>{timing.days}</p>
                  <div>
                    {timing.slots.length > 1 ? (
                      <div className=" ">
                        {timing.slots[0]} to {timing.slots[1]}
                      </div>
                    ) : (
                      timing.slots[0]
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <GooglePageComp
            restaurantName={data!.restaurantName!}
            address={data!.address!}
            id={data._id!}
          />
        </div>
        
      )}
      
    </div>
    <Advertisement position="inline"/>
    </div>
  );
};

export default Page;
