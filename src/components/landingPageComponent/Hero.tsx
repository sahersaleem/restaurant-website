import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="mt-10 w-full flex justify-between items-center">
      <div className="">
        <h2 className="text-[#DA3255] font-chew tracking-wide text-3xl">
          Faim ? Réglons ça.
        </h2>
        <h1 className=" text-7xl mb-2 font-chew font-bold text-[#E2CB30] tracking-wider ">
          Découvrir des restaurants 
        </h1>
        <h3 className="text-white text-lg font-comic font-bold tracking-wide  ">
          Parcourez les restaurants locaux, consultez les menus et <br />{" "}
          comblez vos envies gourmandes.
        </h3>
        <div className="flex gap-x-4 mt-8">
          <button className="button !font-comic tracking-wide !bg-[#DA3255]">
            {" "}
            Explorer les restaurants
          </button>
        </div>
      </div>
      <Image
        src={"/images/burger2.png"}
        alt="hero"
        width={720}
        height={720}
        className="rounded-lg object-cover object-center"
      />
    </div>
  );
};

export default Hero;
