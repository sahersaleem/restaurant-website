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
import { Toaster, toast } from "react-hot-toast";

const Page = () => {
  const [files, setFiles] = useState<File | null>();
  const [pdfLinks, setPdfLinks] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { restaurantId } = useRestaurantContext();
  const [pdflink, setPdfLink] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

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
  useEffect(() => {
    getRestaurantPdfLink();
  }, [restaurantId]);

  const handleFiles = (e: File[]) => {
    if (e && e[0]) {
      setFiles(e[0]);
    }
  };

  const uploadImages = async () => {
    if (files) {
      const formData = new FormData();
      formData.append("files", files);

      try {
        setLoading(true)
        const res = await axios.post("/api/restaurant/menu_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const uploaded_url = res.data.pdfUrl;

        if (uploaded_url) {
          const thumbnail = await axios.post("/api/upload-thumbnail", {
            uploaded_url,
          });

        

          const pdfsData = {
            pdfLinks: uploaded_url,
            restaurantId,
            thumbnail: thumbnail.data.link,
          };


          
          setLoading(true);

          const response = await axios.put(
            "/api/restaurant/upload_pdf_links",
            pdfsData
          );
          console.log(response);
          toast.success("Menu uploaded successfully");
          await getRestaurantPdfLink();
          setFiles(null);
          setLoading(false);
          setIsEditing(false);
        }
      } catch (error: any) {
        toast.error("UPload failed");
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white mt-20 sm:mt-10 w-full h-full min-h-screen">
      <h1 className="text-2xl sm:text-4xl text-center font-bold font-poppins underline ">Téléchargez votre menu </h1>
      <div className="w-full flex justify-evenly sm:justify-around items-center h-screen flex-col sm:flex-row">
        <div className="sm:w-1/2 p-10">
          <p className="text-lg sm:text-3xl">
          Téléchargez facilement le menu de votre restaurant au format PDF pour que les clients puissent
          Consultez-le ou téléchargez-le.
          </p>
          {pdflink && !isEditing && (
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
              onChange={handleFiles}
            />
          ) : (
            ""
          )}

          {!pdflink || isEditing ? (
            <button onClick={uploadImages} className={`button mt-9`}>
              {loading ? (
                <LuLoader className="animate-spin" />
              ) : isEditing ? (
                "Sauvegarder"
              ) : (
                "télécharger"
              )}
            </button>
          ) : (
            ""
          )}
        </div>
{
       !isEditing && <Image
          src={"/images/menupic.jpg"}
          width={400}
          height={400}
          alt="menu"
          className="rounded-full w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] "
        />}
      </div>
    </div>
  );
};

export default Page;
