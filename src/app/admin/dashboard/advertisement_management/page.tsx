"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { PlusIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { LuLoader } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";

interface Iadds {
  _id: string;
  title: string;
  link: string;
  imageUrl: string;
}

const AdvertisementDialogModel = ({
  refreshData,
  ...ad
}: Iadds & { refreshData: () => void }) => {
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
  // const [status, setstatus] = useState<"pending" | "approved" | "reject">(
  //   "pending"
  // );
  const [files, setFiles] = useState<File | null>();

  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<Iadds>({
    title: "",
    imageUrl: "",
    link: "",
    _id: "",
  });

  console.log(ad);
  const router = useRouter();

  const approvedRestaurant = async (id: string, isActive: true) => {
    try {
      const res = await axios.put("/api/advertisement", {
        id: id,
        isActive,
      });
      if (res.data) {
        toast.success("Ad active successfully");
        console.log(res.data);
        refreshData();
      }
    } catch {
      toast.error("Error occur!");
    }
  };
  const onclickfn = () => {
    setFormState(ad);
    setIsEditingStatus(true);
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
        console.log(res);
        toast.success("Ad uploaded successfully");
        return res.data.advertisementImageUrl;
      } catch (error: any) {
        console.log("Error occurr while uploading images");
        toast.error("Error occurr while uploading ad");
      }
    }
  };

  const handleSave = async (id: string) => {
    try {
      setLoading(true);
      const imageLink = await uploadImages();
      if (imageLink) {
        setFormState((prev) => ({ ...prev, imageUrl: imageLink }));
      }
   
      const res = await axios.put(`/api/advertisement?id=${id}`, {formState});
      setIsEditingStatus(false);
      toast.success("Ads updated successfully");
      refreshData();
    } catch (error: any) {
      toast.error("Error occurr while updating restaurant information");
    } finally {
      router.refresh();
      setLoading(false);
      setIsEditingStatus(false);
    }
  };

  const handleInput = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFiles = (e: File[]) => {
    if (e && e[0]) {
      setFiles(e[0]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] h-[95%] pt-10 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Your Ads</DialogTitle>
          <DialogDescription className="flex w-full justify-between items-center">
            View the restaurant’s submitted details and set its approval status
            accordingly.
            {!isEditingStatus ? (
              <Button
                onClick={() => {
                  onclickfn();
                }}
              >
                Edit
              </Button>
            ) : (
              <Button onClick={() => handleSave(ad._id)}>
                {loading ? <LuLoader className="animate-spin" /> : "Save"}
              </Button>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-x-28">
          <div
            className={`space-y-2 ${
              isEditingStatus ? "flex  flex-col w-1/2" : ""
            }`}
          >
            {!isEditingStatus ? (
              <Image
                src={formState.imageUrl||ad.imageUrl}
                className="w-24 h-24 rounded"
                width={100}
                height={100}
                alt="restaurant-logo"
              />
            ) : (
              <div>
                <FileUpload onChange={handleFiles} />
              </div>
            )}
            {!isEditingStatus ? (
              <p>
                <strong className="text-lg">Title</strong> {ad.title}{" "}
              </p>
            ) : (
              <>
                <strong className="text-sm">Title</strong>{" "}
                <Input
                  placeholder="Edit Ad title"
                  value={formState.title}
                  name="title"
                  onChange={handleInput}
                />
              </>
            )}{" "}
            {!isEditingStatus ? (
              <p>
                <strong className="text-lg">Advertisement Link</strong>{" "}
                {ad.title}{" "}
              </p>
            ) : (
              <>
                <strong className="text-sm">Advertisement Link</strong>{" "}
                <Input
                  placeholder="Edit Ad link"
                  value={formState.link}
                  name="link"
                  onChange={handleInput}
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Page = () => {
  const [adsData, setAdsData] = useState<Iadds[]>();

  const router = useRouter();

  const get_all_add = async () => {
    try {
      const res = await axios.get("/api/advertisement");
      console.log(res.data);
      if (res.data) {
        setAdsData(res.data.ads);
      }
    } catch (error: any) {
      console.log("Error occurrr while fetching data");
    }
  };

  useEffect(() => {
    get_all_add();
  }, []);

  const handleAdd = async () => {
    router.push("/admin/dashboard/advertisement_management/upload-add");
  };

  const deleteAd = async (id: string) => {
    try {
      const res = await axios.delete(`/api/advertisement?id=${id}`);
      if (res.data) {
        toast.success("ad deleted successfully!");
        get_all_add();
      }
    } catch (error: any) {
      toast.error("Error occur while deleting restaurants");
    }
  };

  return (
    <div className="px-10 w-full h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex justify-between mt-14 items-center">
        <h1 className="text-4xl text-center">Your Ads!</h1>
        <Button onClick={handleAdd}>
          {" "}
          <PlusIcon />
          Add
        </Button>
      </div>
      <table className="min-w-full text-left bg-white mt-5">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Id</th>

            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {adsData &&
            adsData.map((ad, ind) => (
              <tr key={ad._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{ad._id}</td>

                <td className="px-4 py-2">{ad.title}</td>
                <td className="px-4 py-2">
                  <AdvertisementDialogModel {...ad} refreshData={get_all_add} />
                </td>
                <td>
                  {" "}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2Icon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          Do you want to delete{" "}
                          <span className="font-semibold">{ad.title}</span>
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={() => deleteAd(ad._id)}
                          >
                            yes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
