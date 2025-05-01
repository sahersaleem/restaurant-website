"use client";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IRestaurant } from "@/types/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, {
  useEffect,
  useState,
  forwardRef,
  useReducer,
  useRef,
} from "react";
import { Document, Page as PDFBook } from "react-pdf";
import { pdfjs } from "react-pdf";

import HTMLFlipBook from "react-pageflip";
import GooglePageComp from "@/components/landingPageComponent/GooglePageComp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import Loader from "@/components/landingPageComponent/Loader";


const PageWrapper = forwardRef<HTMLDivElement, { pageNumber: number; pdfUrl: string }>(
  ({ pageNumber, pdfUrl }, ref) => (
    <div ref={ref} className="flip-page">
      <Document file={pdfUrl}>
        <PDFBook pageNumber={pageNumber} width={350} />
      </Document>
    </div>
  )
);

PageWrapper.displayName = "PageWrapper";

const RestaurantPdfs = ({ pdfUrl }: { pdfUrl: any }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0); // Flipbook uses 0-based indexing
  const bookRef = useRef<any>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);
    };

    if (pdfUrl) loadPdf();
  }, [pdfUrl]);

  const flipSound = new Audio("/flip.mp3");
  flipSound.volume = 0.5;

  const handleNextPage = () => {
    if (bookRef.current?.pageFlip && currentPage < numPages - 1) {
      bookRef.current.pageFlip().flipNext();
      flipSound.currentTime = 0;
      flipSound.play();
    }
  };

  const handlePrevPage = () => {
    if (bookRef.current?.pageFlip && currentPage > 0) {
      bookRef.current.pageFlip().flipPrev();
      flipSound.currentTime = 0;
      flipSound.play();
    }
  };

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage >= numPages - 1;

  return (
    <div className="flex flex-col items-center py-6 lg:py-10">
<HTMLFlipBook
     {... {
      width: 370,
      height: 500,
      maxShadowOpacity: 0.5,
      drawShadow: false,
      showCover: true,
      flippingTime:10,
      size: "fixed",
      className: "shadow-lg",
      ref: bookRef,
      onFlip:(e:any)=>{ setCurrentPage(e.data)}
     } as any}
     >
        {Array.from({ length: numPages }, (_, index) => (
          <PageWrapper key={index} pageNumber={index + 1} pdfUrl={pdfUrl} />
        ))}
      </HTMLFlipBook>

      <div className="flex gap-x-4 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={isPrevDisabled}
          className={`px-4 py-2 rounded font-comic bg-red ${
            isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <GrFormPrevious size={30} />
        </button>
        <button
          onClick={handleNextPage}
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded font-comic bg-red ${
            isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <GrFormNext size={30} />
        </button>
      </div>
    </div>
  );
};


const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState<IRestaurant>();
  const [loading, setLoading] = useState<boolean>(false);
  console.log(id);

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
    <div className="bg-[#282C2F] text-white flex flex-col lg:flex-row justify-center items-center">
      <div className=" lg:ml-14 lg:bg-card  lg:w-[400px] lg:h-[300px] mt-20  rounded-lg text-black p-2 flex justify-center items-center flex-col">
        <h1 className="text-xl text-center text-white lg:text-black font-poppins">{data?.restaurantName}</h1>
        <Link
          className="text-lg text-red underline "
          href={`/restaurant/${id}`}
        >
          View details
        </Link>
      </div>
      <div className="w-screen h-screen max-w-7xl mx-auto flex justify-center items-center bg-[#282C2F]">
        <div className="">
          <h1 className="text-2xl font-comic font-semibold text-center underline ">
            Restaurant menu pdf
          </h1>
          {data ? (
            <>
              <RestaurantPdfs pdfUrl={data?.pdfLinks} />
            </>
          ):<Loader/>}
        </div>
      </div>
    </div>
  );
};

export default Page;
