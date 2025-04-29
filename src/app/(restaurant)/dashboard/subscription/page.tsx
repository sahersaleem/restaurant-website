"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaMedal } from "react-icons/fa";
import axios from "axios";

const Page = () => {
  const [id, setId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const get_current_price = async () => {
    try {
      const res = await axios.get("/api/featuredPrice");
      console.log(res);
      setAmount(res.data.price[0].featuredPrice);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    get_current_price();
  }, []);

  useEffect(() => {
    const restaurantId = JSON.parse(localStorage.getItem("restaurantId") || "");

    if (restaurantId) {
      setId(restaurantId);
      console.log(restaurantId);
    }
  }, []);

  const handlePayment = async () => {
    try {
     const data = {amount , id}
     console.log(data)
      const res = await axios.post("/api/checkout",{data});
      console.log(res)
      if(res.data.url){
        window.location.href=res.data.url
      }
    } catch (error: any) {
      console.log("Error occur while creating checkout session.");
    }
  };

  return (
    <div className="w-full h-full pb-20">
      <h1 className="text-xl underline sm:text-4xl text-center font-bold font-poppins mt-6 sm:mt-10">
        Subscription
      </h1>

      <div className="min-h-screen flex justify-center items-center px-6">
        <div className="bg-white shadow-xl rounded-xl px-6 py-6 sm:p-10 max-w-xl text-center">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 " >
            <FaMedal className="text-8xl text-yellow-500 font-poppins" />
            Feature Your Restaurant!
          </h1>
          <p className="text-gray-700 mb-6 font-poppins">
            Want more orders and top placement? For just{" "}
            <span className="font-bold text-yellow-500 ">$5000</span>, get
            featured on our homepage and top of search results!
          </p>
          <ul className="text-left list-disc ml-6 text-gray-600 mb-6">
            <li className="list-none sm:text-2xl font-poppins font-semibold">
              <LuCircleCheckBig className="inline sm:text-2xl text-green-600" />{" "}
              Top in search results
            </li>
            <li className="list-none sm:text-2xl font-poppins font-semibold">
              <LuCircleCheckBig className="inline sm:text-2xl text-green-600" />{" "}
              Promoted on homepage
            </li>
            <li className="list-none sm:text-2xl font-poppins font-semibold">
              <LuCircleCheckBig className="inline sm:text-2xl text-green-600" />{" "}
              Featured badge for your profile
            </li>
            <li className="list-none sm:text-2xl font-poppins font-semibold">
              <LuCircleCheckBig className="inline sm:text-2xl text-green-600" />{" "}
              More visibility, more orders!
            </li>
          </ul>
          <Button
            className="bg-red  text-white text-lg  rounded-full w-full "
            onClick={handlePayment}
          >
            Pay with Stripe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
