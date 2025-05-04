import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className=" mt-10 lg:-mt-20 w-full flex  lg:justify-between items-center flex-col lg:flex-row px-10  lg:gap-y-10  lg:pb-0   h-auto lg:h-screen   lg:bg-transparent ">
      <div className="w-full">
        <h2 className="text-[#DA3255] font-chew tracking-wide hidden lg:inline-block sm:text-2xl text-center lg:text-3xl lg:text-left">
          T’as faim ? Clique, cherche, mange
        </h2>
        <h1 className=" text-xl sm:text-4xl text-center lg:text-left lg:text-7xl mb-2 font-chew font-bold sm:text-black lg:text-[#E2CB30] tracking-wider whitespace-nowrap">
          Le goût de la <br className="hidden lg:inline-block" />
          Réunion en un clic !
        </h1>
        <h3 className="text-white text-sm hidden lg:text-lg font-comic font-bold tracking-wide  ">
          Parcourez les restaurants locaux, consultez les menus et{" "}
          <br className="hidden lg:inline-block" /> comblez vos envies
          gourmandes.
        </h3>
        <div className="flex gap-x-4 mt-8">
          <button className="button !font-comic tracking-wide !bg-[#DA3255] hidden lg:inline-block">
            {" "}
            <Link href={"#all_restaurants"}>Explorer les restaurants</Link>
          </button>
        </div>
      </div>
      <Image
        src={"/images/burger2.png"}
        alt="hero"
        width={720}
        height={720}
        className="rounded-lg object-cover object-center hidden lg:block"
      />
    </div>
  );
};

export default Hero;
