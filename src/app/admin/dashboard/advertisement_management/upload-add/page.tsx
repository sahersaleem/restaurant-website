"use client";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdSchemaType, AdSchema } from "@/schemas/advertisementSchema";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Page = () => {
  const { register, handleSubmit } = useForm<AdSchemaType>({
    resolver: zodResolver(AdSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      link: "",
    },
  });
  const [files, setFiles] = useState<File>();
  const [imageLink, setImageLink] = useState<string>("");
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const [position, setPosition] = useState<"top" | "side" | "inline">("top");
const router = useRouter()
  const handleFiles = async (e: File[]) => {
    if (e) {
      setFiles(e[0]);
    }
    console.log(files);
  };

  const uploadImages = async () => {
    if (files) {
      const formData = new FormData();
      formData.append("files", files);
      try {
        const res = await axios.post(
          "/api/advertisement/uploadImage",
          formData
        );

        if (res) {
          toast.success("Ad uploaded successfully");
          router.push('/admin/dashboard/advertisement_management')

        }
      
       
        setImageLink(res.data.advertisementImageUrl);
        return res.data.advertisementImageUrl
      } catch (error: any) {
 
        toast.error("Error occurr while uploading ad");
        return ""
      }
    }
  };

  const handleForm = async (data: any) => {
  
   
    try {
      setIsLoading(true)
    const advertisementImages =  await uploadImages();
      const { title, link } = data;

      const adInformation = { title, link, imageLink:advertisementImages  , position};

      console.log(adInformation);

      const res = await axios.post("/api/advertisement", adInformation );
      console.log(res)
    } catch (error: any) {
      console.log(error.message);

    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="px-10 w-full h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />

      <h1 className="text-xl sm:text-4xl text-center mt-10 underline">Ad Integration</h1>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="space-y-4 mt-10 w-full sm:w-1/3"
      >
        <div>
          <label>Ad Title</label>
          <Input
            {...register("title")}
            placeholder="Add advertisement title here"
          />
        </div>
        <div>
          <label>Ad link</label>
          <Input
            {...register("link")}
            placeholder="Add advertisement link here"
          />
        </div>
        <div>
        <label className="block text-sm font-medium mb-1">Select Position</label>
      <Select
        value={position}
        onValueChange={(val: "top" | "side" | "inline") => setPosition(val)}
      >
        <SelectTrigger className="mb-4">
          <SelectValue placeholder="Select Position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="top">Top</SelectItem>
          <SelectItem value="side">Side</SelectItem>
          <SelectItem value="inline">Inline</SelectItem>
        </SelectContent>
      </Select>
        </div>
        <div>
          <label>Ad Image</label>
          <FileUpload onChange={handleFiles} />
        </div>
        <Button>{isLoading ? <LuLoader className="animate-spin text-lg"/>: "Save"}</Button>
      </form>
    </div>
  );
};

export default Page;
