"use client";

import React, { useEffect, useState } from "react";
import { IRestaurant } from "@/types/types";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdRestaurant } from "react-icons/io";
import Loader from "@/components/landingPageComponent/Loader";
import { FaArrowLeft, FaFilePdf } from "react-icons/fa6";
import RatingAndReviews from "@/components/landingPageComponent/RatingAndReviews";
import { Button } from "@/components/ui/button";
const Page = () => {
  const [data, setData] = useState<IRestaurant>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const getALLRestaurantsById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/restaurants/${id}`);

      if (res) {
        setData(res.data.findRestaurantById);
        setLoading(false);
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
    <div className="w-full h-screen max-w-7xl mx-auto px-10 sm:px-0" >
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-20">
           <Button className="mb-6 bg-red">
          <Link href={`/user/restaurants/${data?._id}`}>
            <FaArrowLeft    className="inline-block mx-2" />
            Back to Localization
          </Link>
        </Button>
          <h1 className="font-comic text-3xl ">{data?.restaurantName}</h1>
          <p className="text-xl italic font-comic">{data?.description}!</p>
          <div className="flex flex-col mt-2 gap-y-1">
            <Link href={data?.googlePage || ""} className="underline text-xs sm:text-sm">
              <CgWebsite className=" inline-block mr-3" />{" "}
              {data?.googlePage}
            </Link>
            <Link href={data?.website_link || ""} className="underline text-xs sm:text-sm">
              <FcGoogle className=" inline-block  sm:mr-3"  />{" "}
              {data?.website_link}
            </Link>
            <p className="text-sm">
              <MdOutlineLocationOn
                className=" inline-block sm:mr-3 font-comic text-xs sm:text-sm"
                
              />
              {data?.address}
            </p>
            <p className=" inline-block sm:mr-3 text-xs sm:text-lg">
              <IoMdRestaurant
                className=" inline-block sm:mr-3 font-comic"
  
              />
              {data?.cuisineType || "Italic"}
            </p>
            <Link
              href={data?.pdfLinks || ""}
              className="flex justify-around max-w-[250px] items-center shadow-lg p-6 rounded-lg"
            >
              <FaFilePdf size={40} className="text-red" />
              <span className="fonr-comics text-sm underline">
                Download Menu
              </span>
            </Link>
          </div>
          <RatingAndReviews/>
        </div>
      )}
    </div>
  );
};

export default Page;
