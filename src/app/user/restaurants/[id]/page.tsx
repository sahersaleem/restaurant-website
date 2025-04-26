"use client";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IRestaurant } from "@/types/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, forwardRef } from "react";

import { Document, Page as PDFBook } from "react-pdf";
import { pdfjs } from "react-pdf";

import HTMLFlipBook from "react-pageflip";
import GooglePageComp from "@/components/landingPageComponent/GooglePageComp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageWrapper = forwardRef(
  ({ pageNumber, pdfUrl }: { pageNumber: number; pdfUrl: string }, ref) => (
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

  return (
    <div className="flex flex-col items-center py-10">
      <HTMLFlipBook
        width={370}
        height={500}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        className="shadow-lg"
      >
        {Array.from({ length: numPages }, (_, index) => (
          <PageWrapper key={index} pageNumber={index + 1} pdfUrl={pdfUrl} />
        ))}
      </HTMLFlipBook>
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
    <div className="bg-[#282C2F] text-white flex ">
      <div className="bg-white ml-14 w-[400px] h-[300px] mt-20 bg-card rounded-lg text-black p-2 flex justify-center items-center flex-col">
        <h1 className="text-lg text-center">{data?.restaurantName}</h1>
        <Link
          className="text-lg text-red underline "
          href={`/restaurant/${id}`}
        >
          View details
        </Link>
      </div>
      <div className="w-screen h-screen max-w-7xl mx-auto flex justify-center items-center bg-[#282C2F]">
        <div className="">
          <h1 className="text-2xl font-comic font-medium">
            Restaurant menu pdf
          </h1>
          {data && (
            <>
              <RestaurantPdfs pdfUrl={data?.pdfLinks} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
