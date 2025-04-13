"use client";

import React, { useEffect, useState } from "react";
import { useRestaurantContext } from "../../_components/RstaurantContext";
import axios from "axios";
import { IRestaurant } from "@/types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";
import { TimingSlot } from "@/types/types";
import Loader from "@/components/landingPageComponent/Loader";
const Page = () => {
  const { restaurantId } = useRestaurantContext();
  const [restaurantInforamtion, setRestaurantInformation] =
    useState<IRestaurant | null>(null);
  const [logoLink, setLogoLink] = useState<string>("");

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formState, setFormState] = useState<IRestaurant>({
    restaurantName: "",
    description: "",
    address: "",
    timings: { day: "", slots: [""] },
    cuisineType: "",
    password: "",
    confirmPassword: "",
    role: "Owner",
    logo: "",
  });
  const [files, setFiles] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [timings, setTimings] = useState<TimingSlot[]>([
    { day: "", slots: [""] },
  ]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const router = useRouter();

  const handleAddDay = () => {
    setTimings([...timings, { day: "", slots: [""] }]);
  };

  const handleDayCHange = (index: number, value: string) => {
    const updated = [...timings];
    updated[index].day = value;
    setTimings(updated);
  };

  const handleSlotChange = (
    dayIndex: number,
    slotIndex: number,
    value: string
  ) => {
    const updated = [...timings];
    updated[dayIndex].slots[slotIndex] = value;
    setTimings(updated);
  };

  const handleAddSlot = (dayIndex: number) => {
    const updated = [...timings];
    updated[dayIndex].slots.push("");
    setTimings(updated);
  };

  useEffect(() => {
    const getRestaurantPdfLink = async () => {
      setLoadingData(true);
      try {
        if (!restaurantId) {
          setLoadingData(false);
          return;
        }
        const res = await axios.get(
          `/api/restaurant/get_restaurants?id=${restaurantId}`
        );

        if (res.data) {
          const restaurant = res.data.findRestaurantById;
          setRestaurantInformation(res.data.findRestaurantById);
         console.log(restaurant)
          setFormState({
            restaurantName: restaurant?.restaurantName || "",
            address: restaurant?.address || "",
            description: restaurant?.description || "",
            confirmPassword: restaurant?.confirmPassword || "",
            password: restaurant?.password || "",
            cuisineType: restaurant?.cuisineType || "",
            logo: restaurant.logo || "",
            role: "Owner",
            phoneNumber: restaurant.phoneNumber || "",
            website_link: restaurant.website_link || "",
            googlePage: restaurant.googlePage || "",
          });

          setLoadingData(false);
        } else {
          console.log("not found");
        }
      } catch (error: any) {
        console.log("error occurr while fetching", error.message);
      } finally {
        setLoadingData(false);
      }
    };

    getRestaurantPdfLink();
  }, [restaurantId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInput = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);    


      try {
         const restaurantTimings = {timings}
        const timingRequest = await axios.post(
          `/api/restaurant/create_restaurant_timming?id=${restaurantId}`,
          restaurantTimings
        );

        console.log(timingRequest)
  
      } catch (error:any) {
        console.log("Error occur while creating timming of Request" , error.message)
      }
     













      const res = await axios.put(
        `/api/restaurant/get_restaurants?id=${restaurantId}`,
        formState
      );
      setLoading(false);
      setIsEditing(false);
      router.refresh();
      if (!res) {
        console.log("ERROR OCURRED WHILE SENDING DATA");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      router.refresh();
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleFiles = (e: File[]) => {
    if (e) {
      setFiles(e[0]);
    }
  };

  const uploadImages = async () => {
    if (files) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("files", files);

      try {
        const res = await axios.post(
          "/api/restaurant/create_account/logo_upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
        if (res.data) {
          setLogoLink(res.data.logoUrl);
          setIsUploading(false);

          if (logoLink) {
            const logoData = { logoLink, restaurantId };
            console.log(logoData);
            try {
              setIsUploading(true);

              const response = await axios.put(
                "/api/restaurant/upload_pdf_links",
                logoData
              );
              console.log(response);

              setIsUploading(false);

              router.refresh();
            } catch (error: any) {
              console.log(error.message);
            }
          }
          // console.log(response);

          setIsUploading(false);
          router.refresh();
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    setFormState({ ...formState, logo: logoLink });
  }, [logoLink]);

  return (
    <div className="bg-white  mt-10 w-full  flex  items-center flex-col h-screen font-poppins ">
      {loadingData ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-around w-full">
            {" "}
            <h1 className="text-4xl text-center font-bold font-poppins">
              Restaurant Profile
            </h1>{" "}
            {isEditing ? (
              <Button onClick={handleSave} className="bg-red">
                {loading ? (
                  <LuLoader size={30} className="animate-spin" />
                ) : (
                  "save"
                )}
              </Button>
            ) : (
              <Button onClick={handleEdit} className="bg-red">
                Edit
              </Button>
            )}
          </div>

          <div className="flex flex-row gap-x-6 items-center justify-evenly  w-full">
            <div className="px-10 mt-20  space-y-4 w-2/5 ">
              {restaurantInforamtion && (
                <>
                  <div>
                    <h2 className="">Restaurant Name</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.restaurantName}
                          name="restaurantName"
                          onChange={handleInput}
                          placeholder="restaurantName"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion.restaurantName ? (
                            <p>{restaurantInforamtion.restaurantName}</p>
                          ) : (
                            <p className="italic ">Add Description here</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Restaurant Address</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.address}
                          name="address"
                          onChange={handleInput}
                          placeholder="Address"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion ? (
                            <p>{restaurantInforamtion.address}</p>
                          ) : (
                            <p className="italic ">Add address here</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Description</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.description}
                          name="description"
                          onChange={handleInput}
                          placeholder="description"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion.description ? (
                            <p>{restaurantInforamtion.description}</p>
                          ) : (
                            <p className="italic ">Add descripion here</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Phone Number</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.phoneNumber}
                          name="phoneNumber"
                          onChange={handleInput}
                          placeholder="+92333977373"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion.phoneNumber ? (
                            <p>{restaurantInforamtion.phoneNumber}</p>
                          ) : (
                            <p className="italic ">Add phone number here</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Google page</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.googlePage}
                          name="googlePage"
                          onChange={handleInput}
                          placeholder="http:ww:google.com"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion.googlePage ? (
                            <p>{restaurantInforamtion.googlePage}</p>
                          ) : (
                            <p className="italic ">Add google page here</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Website link</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.website_link}
                          name="website_link"
                          onChange={handleInput}
                          placeholder="http://localhost:3000"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion.website_link ? (
                            <p>{restaurantInforamtion.website_link}</p>
                          ) : (
                            <p className="italic ">Add website link here</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="">Restaurant Opening Timings</h2>
                    {isEditing
                      ? timings.map((timing, dayIndex) => (
                          <div key={dayIndex} className="flex flex-col gap-y-4">
                            <div className="rest-inform-para">
                              <input
                                value={timing.day}
                                onChange={(e: any) =>
                                  handleDayCHange(dayIndex, e.target.value)
                                }
                                placeholder="Monday to Thursday"
                              />
                            </div>
                            {timing.slots.map((slot, slotIndex) => (
                              <div key={slotIndex} className="rest-inform-para">
                                <input
                                  value={slot}
                                  onChange={(e: any) =>
                                    handleSlotChange(
                                      dayIndex,
                                      slotIndex,
                                      e.target.value
                                    )
                                  }
                                  type="time"
                                  placeholder="9:am"
                                />
                              </div>
                            ))}

                            <button
                              onClick={() => handleAddSlot(dayIndex)}
                              className="text-sm text-blue-500 underline"
                            >
                              + Add Time Slot
                            </button>
                          </div>
                        ))
                      : ""}
                    <button
                      onClick={() => handleAddDay()}
                      className="text-sm text-blue-500 underline"
                    >
                      + Add Day
                    </button>
                  </div>
                </>
              )}
            </div>
            <div>
              <h2
                className="text-center text-xl
            "
              >
                Your business logo
              </h2>
              {!isEditing && restaurantInforamtion?.logo ? (
                <div className=" w-[300px] h-[300px] bg-black rounded-full">
                  <Image
                    src={formState.logo || restaurantInforamtion?.logo}
                    alt="restaurant-image"
                    width={300}
                    height={300}
                    className="object-cover object-center rounded-full w-[300px] h-[300px] "
                  />
                </div>
              ) : (
                <div>
                  <FileUpload onChange={handleFiles} />
                  <Button
                    onClick={uploadImages}
                    className={` mt-9 bg-red`}
                    variant={"default"}
                  >
                    {isUploading ? (
                      <LuLoader size={30} className="animate-spin" />
                    ) : (
                      "upload"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
