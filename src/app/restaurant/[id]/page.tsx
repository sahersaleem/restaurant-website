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
const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState<IRestaurant>();

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

  useEffect(() => {
    getALLRestaurantsById();
  }, []);

  return (
    <div className="bg-slate-50 w-screen h-auto flex justify-center items-center  overflow-x-hidden">
      {data && (
        <div className="max-w-[800px] w-full bg-card shadow-lg  rounded-lg p-10 mt-20 space-y-6 ">
          <div className="flex justify-between">
            <Image
              src={data?.logo || ""}
              alt="logo"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="">
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
                <Link href={data!.googlePage!} className="underline text-sm">
                  <CgWebsite className=" inline-block mr-3" size={25} />{" "}
                  {data?.googlePage}
                </Link>
                <Link href={data!.website_link!} className="underline text-sm">
                  <FcGoogle className=" inline-block mr-3" size={25} />{" "}
                  {data!.website_link!}
                </Link>
                <p className="text-sm">
                  <MdOutlineLocationOn
                    className=" inline-block mr-3 font-comic"
                    size={25}
                  />
                  {data.address}
                </p>
                <p className="text-lg inline-block mr-3">
                  <IoMdRestaurant
                    className=" inline-block mr-3 font-comic"
                    size={25}
                  />
                  {data.cuisineType || "Italic"}
                </p>
              </div>
            </div>
          </div>
               
            <div>
            <h1 className="mt-4 font-medium text-xl font-comic">Timings</h1>
            {
              data.timings?.map((time , index)=>(
                <div key={index}>{time.days} : {time.slots.length>=1 ? time.slots[0] : `${time.slots[0]}-${time.slots[1]} ` }</div>
              ))
            }
            </div>
          <GooglePageComp
            restaurantName={data!.restaurantName!}
            address={data!.address!}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
