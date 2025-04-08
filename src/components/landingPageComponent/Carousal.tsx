'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'

const Carousal = () => {
  useEffect(() => {
    const init = async () => {
      const { Carousel, initTWE } = await import("tw-elements");
      initTWE({ Carousel });
    };
    init();
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="relative"
      data-twe-carousel-init
      data-twe-ride="carousel"
      data-twe-interval="4000" // slower interval
      data-twe-carousel-fade   // smooth fade instead of slide
    >
      {/* Carousel indicators */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-twe-carousel-indicators
      >
        <button
          type="button"
          data-twe-target="#carouselExampleIndicators"
          data-twe-slide-to={0}
          data-twe-carousel-active
          className="mx-[3px] box-content h-[3px] w-[30px] cursor-pointer bg-black/90 opacity-50 transition-opacity duration-[600ms] ease-in-out"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-twe-target="#carouselExampleIndicators"
          data-twe-slide-to={1}
          className="mx-[3px] box-content h-[3px] w-[30px] cursor-pointer bg-black/90 opacity-50 transition-opacity duration-[600ms] ease-in-out"
          aria-label="Slide 2"
        />
      </div>

      {/* Carousel items */}
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {/* First Slide */}
        <div
          className="relative float-left -mr-[100%] w-full transition-opacity duration-[1000ms] ease-out motion-reduce:transition-none"
          data-twe-carousel-item
        >
          <div className="mt-20 w-full flex justify-between items-center">
            <div className="mt-10">
              <h1 className=" text-6xl mb-2 font-quickSand font-bold text-orange">
              Discover Restaurants <br/>You’ll Love
              </h1>
              <h3 className="text-white text-2xl">
                Explore a wide range of cuisines and restaurants near you. <br />
                Whether you&apo;sre craving biryani or sushi, find it on our interactive map.
              </h3>
              <div className="flex gap-x-4 mt-8">
                <button className='button'>Explore Restaurants</button>
                <button className='button'>Add your Restaurant</button>
              </div>
            </div>
            <Image
              src={"/images/burger.jpg"}
              alt="hero"
              width={620}
              height={620}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Second Slide */}
        {/* <div
          className="relative float-left -mr-[100%] w-full transition-opacity duration-[1000ms] ease-out motion-reduce:transition-none"
          data-twe-carousel-item
          data-twe-carousel-active
        >
          <div className="mt-20 w-full flex justify-between items-center">
            <div className="mt-10">
            <h1 className=" text-6xl mb-2 font-quickSand font-bold text-orange">
              Discover Restaurants <br/>You’ll Love
              </h1>
              <h3 className="text-white text-2xl">
                Explore a wide range of cuisines and restaurants near you. <br />
                Whether you're craving biryani or sushi, find it on our interactive map.
              </h3>
              <div className="flex gap-x-4 mt-8">
                <button className='button'>Explore Restaurants</button>
                <button className='button'>Add your Restaurant</button>
              </div>
            </div>
            <Image
              src={"/images/hero2.jpg"}
              alt="hero"
              width={620}
              height={620}
              className="rounded-lg"
            />
          </div>
        </div> */}
      </div>

      {/* Previous Button */}
      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center text-transparent opacity-50 hover:opacity-90"
        type="button"
        data-twe-target="#carouselExampleIndicators"
        data-twe-slide="prev"
      >
        <span className="inline-block h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
      </button>

      {/* Next Button */}
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center text-transparent opacity-50 hover:opacity-90"
        type="button"
        data-twe-target="#carouselExampleIndicators"
        data-twe-slide="next"
      >
        <span className="inline-block h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default Carousal
