"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IRestaurant } from "@/types/types";
import Loader from "@/components/landingPageComponent/Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";
import { FileUpload } from "@/components/ui/file-upload";
import { Trash2Icon } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

const RestaurantDialogModel = ({
  refreshData,
  ...res
}: IRestaurant & { refreshData: () => void }) => {
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
  const [status, setstatus] = useState<"pending" | "approved" | "reject">(
    "pending"
  );
  const [files, setFiles] = useState<File | null>();

  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<IRestaurant>({
    restaurantName: "",
    description: "",
    address: "",
    timings: [{ day: "", slots: [""] }],
    cuisineType: "",
    password: "",
    confirmPassword: "",
    role: "Owner",
    logo: "",
    pdfLinks: "",
  });
  const [uploadPdf, setUploadPdf] = useState<boolean>(false);
  const router = useRouter();
  const approvedRestaurant = async (
    id: string,
    status: "pending" | "approved" | "reject"
  ) => {
    try {
      const res = await axios.put("/api/restaurants", {
        id: id,
        status: status,
      });
      if (res.data) {
        toast.success("Status updated successfully");
        console.log(res.data);
        refreshData();
      }
    } catch {
      toast.error("Error occur while approving restaurant");
    }
  };

  const handleSave = async (id: string) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `/api/restaurant/get_restaurants?id=${id}`,
        formState
      );
      setIsEditingStatus(false);
      toast.success("Restaurant updated successfully");
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

  const onclickfn = () => {
    setFormState(res);
    setIsEditingStatus(true);
  };

  const uploadImages = async (id: string) => {
    if (files) {
      const formData = new FormData();
      formData.append("files", files);

      try {
        setUploadPdf(true);
        const res = await axios.post("/api/restaurant/menu_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const uploaded_url = res.data.pdfUrl;
        if (uploaded_url) {
          const pdfsData = { pdfLinks: uploaded_url, restaurantId: id };

          const response = await axios.put(
            "/api/restaurant/upload_pdf_links",
            pdfsData
          );
          toast.success("Menu uploaded successfully");
          setUploadPdf(false);
        }
      } catch (error: any) {
        toast.error("Upload failed");
      }
    }
  };

  const handleFiles = (e: File[]) => {
    if (e && e[0]) {
      setFiles(e[0]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-xs sm:text-base">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] h-[95%] pt-10 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Restaurant Submission</DialogTitle>
          <DialogDescription className="flex w-full justify-between items-center">
            View the restaurant’s submitted details and set its approval status
            accordingly.
            {!isEditingStatus ? (
              <Button onClick={() => onclickfn()}>Edit</Button>
            ) : (
              <Button onClick={() => handleSave(res._id!)}>
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
            <Image
              src={res.logo||""}
              className="w-24 h-24 rounded"
              width={100}
              height={100}
              alt="restaurant-logo"
            />
            {!isEditingStatus ? (
              <p>
                <strong className="text-lg">Restaurant Name:</strong>{" "}
                {res.restaurantName}{" "}
              </p>
            ) : (
              <>
                <strong className="text-sm">Restaurant Name:</strong>{" "}
                <Input
                  placeholder="Edit Restaurant name"
                  value={formState.restaurantName}
                  name="restaurantName"
                  onChange={handleInput}
                />
              </>
            )}

            {!isEditingStatus ? (
              <p>
                <strong>Description:</strong> {res.description}
              </p>
            ) : (
              <>
                <strong className="text-sm">Description:</strong>{" "}
                <Input
                  placeholder="Edit description..."
                  value={formState.description}
                  name="description"
                  onChange={handleInput}
                />
              </>
            )}

            {!isEditingStatus ? (
              <p>
                <strong>Location:</strong> {res.address}
              </p>
            ) : (
              <>
                <strong className="text-sm">Address:</strong>{" "}
                <Input
                  placeholder="Edit address..."
                  value={formState.address}
                  name="address"
                  onChange={handleInput}
                />
              </>
            )}
            {!isEditingStatus ? (
              <p>
                <strong>Contact:</strong> {res.phoneNumber}
              </p>
            ) : (
              <>
                <strong className="text-sm">Phone number:</strong>{" "}
                <Input
                  placeholder="Edit phone number..."
                  value={formState.phoneNumber}
                  name="phoneNumber"
                  onChange={handleInput}
                />
              </>
            )}
            {!isEditingStatus ? (
              <p>
                <strong>Cuisine:</strong> {res.cuisineType}
              </p>
            ) : (
              <>
                <strong className="text-sm">Cuisine Type:</strong>{" "}
                <Input
                  placeholder="Edit cuisine number..."
                  value={formState.cuisineType}
                  name="cuisineType"
                  onChange={handleInput}
                />
              </>
            )}
            {!isEditingStatus ? (
              <p>
                <strong>Google Page:</strong> {res.googlePage}
              </p>
            ) : (
              <>
                <strong className="text-sm">Google Page:</strong>{" "}
                <Input
                  placeholder="Edit google page..."
                  value={formState.googlePage}
                  name="googlePage"
                  onChange={handleInput}
                />
              </>
            )}

            {!isEditingStatus ? (
              <p>
                <strong>Website Page:</strong> {res.website_link}
              </p>
            ) : (
              <>
                <strong className="text-sm">Website link:</strong>{" "}
                <Input
                  placeholder="Edit website link..."
                  value={formState.website_link}
                  name="website_link"
                  onChange={handleInput}
                />
              </>
            )}
            {!isEditingStatus ? (
              <Button variant={"link"}>
                {" "}
                <a href={res.pdfLinks} target="_blank" rel="noopener noreferrer" type="application/pdf" download={res.pdfLinks}>Open</a>
              </Button>
            ) : (
              <div>
                <FileUpload onChange={handleFiles} />
                <Button
                  onClick={() => {
                    uploadImages(res._id!);
                  }}
                  className={` mt-9 bg-red`}
                  variant={"default"}
                >
                  {uploadPdf ? <LuLoader className="animate-spin" /> : "Upload"}
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p>
              <strong className="text-xl font-semibold font-poppins capitalize">
                Status:
              </strong>{" "}
              <span
                className={`capitalize ${
                  res.status === "pending"
                    ? "text-yellow-500 font-semibold"
                    : res.status === "approved"
                    ? "text-green-500"
                    : "text-red"
                }`}
              >
                {res.status}
              </span>
            </p>

            {res.status === "pending" ? (
              <Button onClick={() => approvedRestaurant(res._id!, "approved")}>
                Approved Restaurant
              </Button>
            ) : (
              ""
            )}

            {isEditingStatus && (
              <Select
                value={status}
                onValueChange={(value: "pending" | "approved" | "reject") => {
                  approvedRestaurant(res._id!, value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">approved</SelectItem>
                  <SelectItem value="reject">reject</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Page = () => {
  const [restaurantsData, setRestaurantsData] = useState<IRestaurant[] | null>(
    null
  );
  const [isDeleted, setisDeleted] = useState<boolean>(false);
  const get_restaurant = async () => {
    try {
      const res = await axios.get("/api/admin/restaurants");
      setRestaurantsData(res.data.restaurant);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    get_restaurant();
  }, []);

  const deleteRestaurant = async(id: string) => {
    setisDeleted(true);
    try {
    const res = await axios.delete(`/api/restaurants?id=${id}` )
     if(res.data){
      toast.success("Restauant deleted successfully!")
      get_restaurant()
     }

    } catch (error:any) {
      toast.success("Error occur while deleting restaurants")
      
    }
 

  };

  return (
    <div className="w-full h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />
      {!restaurantsData && (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
      {
        <div>
     <h1 className="text-xl lg:text-4xl text-center mt-10 mb-10 underline font-poppins">Manage Restaurants</h1>

          <table className="min-w-full text-left bg-white mt-5 ">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2 ">Status</th>
                <th className="px-4 py-2 hidden sm:inline-block">View</th>
                <th className="px-4 py-2 hidden sm:inline-block">Delete</th>
              </tr>
            </thead>
            <tbody>
              {restaurantsData &&
                restaurantsData.map((res, ind) => (
                  <tr key={res._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs sm:text-base">{res.restaurantName}</td>
                    <td className="px-4 py-2 text-xs sm:text-base">{res.address}</td>
                    <td
                      className={`px-4 py-2 capitalize font-bold text-xs sm:text-base ${
                        res.status === "pending"
                          ? "text-yellow-500 font-semibold"
                          : res.status === "approved"
                          ? "text-green-500"
                          : "text-red"
                      }`}
                    >
                      {res.status}
                    </td>
                    <td className="px-4 py-2 hidden sm:inline-block">
                      <RestaurantDialogModel
                        {...res}
                        refreshData={get_restaurant}
                      />
                    </td>

                    <td className="hidden sm:inline-block">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" ><Trash2Icon className="text-xs sm:text-base"/></Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                              Do you want to delete <span className="font-semibold">{res.restaurantName}</span> 
                            </DialogDescription>
                          </DialogHeader>
                      
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" onClick={()=>deleteRestaurant(res._id!)}>
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
      }
    </div>
  );
};

export default Page;
