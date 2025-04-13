"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRestaurantContext } from "../../_components/RstaurantContext";
import { FileUpload } from "@/components/ui/file-upload";
import { LuLoader } from "react-icons/lu";
import Link from "next/link";
import { GrDocumentPdf, GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";

const Page = () => {
  const [files, setFiles] = useState<File>();
  const [pdfLinks, setPdfLinks] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { restaurantId } = useRestaurantContext();
  const [pdflink, setPdfLink] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    const getRestaurantPdfLink = async () => {
      try {
        if (!restaurantId) {
          return;
        }
        const res = await axios.get(
          `/api/restaurant/get_restaurants?id=${restaurantId}`
        );

        if (res.data.findRestaurantById.pdfLinks) {
          setPdfLink(res.data.findRestaurantById.pdfLinks);
        } else {
          console.log("not found");
        }
      } catch (error: any) {
        console.log("error occurr while fetching", error.message);
      }
    };

    getRestaurantPdfLink();
  }, [restaurantId]);

  const handleFiles = (e: File[]) => {
    if (e) {
      setFiles(e[0]);
    }
  };

  const uploadImages = async () => {
    if (files) {
      const formData = new FormData();
      formData.append("files", files);

      try {
        const res = await axios.post("/api/restaurant/menu_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        if (res.data) {
          setPdfLinks(res.data.pdfUrl);
        }
        console.log(pdfLinks)
        if (pdfLinks) {
          const pdfsData = { pdfLinks, restaurantId };
          console.log(pdfsData);
          try {
            setLoading(true);

            const response = await axios.put(
              "/api/restaurant/upload_pdf_links",
              pdfsData
            );
            // console.log(response);
            router.refresh()
            setLoading(false);
          } catch (error: any) {
            console.log(error.message);
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white  mt-10 w-full ">
      <h1 className="text-4xl text-center font-bold ">Upload Your Menu </h1>
      <div className="w-full flex justify-around items-center">
        <div className="w-1/2 p-10">
          <p className="text-3xl">
            Easily upload your restaurant’s menu in PDF format so customers can
            view or download it.
          </p>
          {pdflink && (
            <div className="bg-gray-200 p-4 rounded-lg mt-10 flex justify-between items-center">
              {pdflink ? (
                <>
                  <Link
                    href={pdflink}
                    className="underline flex items-center gap-x-4  "
                  >
                    <GrDocumentPdf size={40} className="text-red" />
                    <span className="text-lg font-semibold">Menu.pdf</span>
                  </Link>
                  <button onClick={handleEdit}>
                    <GrEdit className="" size={20} />
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          )}
          {!pdflink || isEditing ? (
            <FileUpload
              name="files"
              placeholder="upload"
              type="file"
              onChange={handleFiles}
              accept="application/pdf"
            />
          ) : (
            ""
          )}

          {!pdflink || isEditing ? (
            <button onClick={uploadImages} className={`button mt-9`}>
              {loading ? (
                <LuLoader className="animate-spin" />
              ) : isEditing ? (
                "Save"
              ) : (
                "upload"
              )}
            </button>
          ) : (
            ""
          )}
        </div>

        <Image src={"/images/menu.png"} width={600} height={600} alt="menu" />
      </div>
    </div>
  );
};

export default Page;
