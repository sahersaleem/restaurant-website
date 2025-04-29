"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

import { FaSackDollar } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";

interface FeaturedPrice {
  featuredPrice: number;
  id: string;
}

const Page = () => {
  const [price, setPrice] = useState<number>(0);
  const [data, setData] = useState<FeaturedPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const get_current_price = async () => {
    try {
      const res = await axios.get("/api/featuredPrice");
      console.log(res);
      setData({
        featuredPrice: res.data.price[0]?.featuredPrice,
        id: res.data.price[0]?._id,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    get_current_price();
  }, []);

  const handleInput = async () => {
    try {
      setLoading(true);
      if (data?.id === undefined) {
        const res = await axios.post(`/api/featuredPrice`, {
          price,
        });

        setData({
          featuredPrice: res.data.price[0]?.featurePrice,
          id: res.data.price[0]?._id,
        });
      }

      const res = await axios.put(`/api/featuredPrice?id=${data?.id}`, {
        price,
      });
      if (res.data) {
        toast.success("Price updated successfully.");
        setLoading(false);
        get_current_price();
      }
    } catch (error: any) {
      toast.error("Error occurred while updating price");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen font-poppins">
      <h1 className="text-xl sm:text-4xl text-center mt-10  underline font-poppins">Manage Payments</h1>

      {data && (
        <div className="w-full flex justify-center items-center mt-20 sm:mt-36 p-6 lg:p-0">
          <div className="bg-[#FEFFFF] max-w-[400px] shadow-lg rounded-lg p-10">
            <h1 className="text-xl sm:text-2xl font-poppins text-center ">
              Set Restaurant Listing fees
            </h1>
            <div className="w-full flex flex-col justify-center items-center gap-y-3">
              <div className="flex gap-x-2 mt-5">
                <FaSackDollar size={40} className="text-[#FBCD6E]" />
                <div className="font-poppins flex flex-col gap-y-1 text-xs sm:text-base">
                  <h1>Current Listing Price For Restaurants</h1>
                  <p className="text-lg sm:text-2xl font-poppins font-semibold">
                    ${data?.featuredPrice}
                  </p>
                </div>
              </div>
              <div className="flex gap-y-4 flex-col">
                <label className=" font-poppins font-medium text-xs sm:text-base">
                  Enter new listings price.
                </label>
                <Input
                  value={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                  }}
                  placeholder="Enter featured price ."
                />
                <Button onClick={handleInput}>
                  {loading ? (
                    <LuLoader className="animate-spin" />
                  ) : (
                    "Update feature price"
                  )}
                </Button>
                <p className="text-xs sm:text-base">
                  This is the amount restaurant will pay to appear in top search
                  and gain visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
