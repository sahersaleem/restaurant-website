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
import { Slot } from "@radix-ui/react-slot";
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
    timings: [{ day: "", slots: [""] }],
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
    { days: "", slots: [""] },
  ]);

  const [restaurantTimingData, setRestaurantTimingData] =
    useState<TimingSlot[]>();

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const router = useRouter();

  const handleAddDay = () => {
    setTimings([...timings, { days: "", slots: [""] }]);
  };

  const handleDayCHange = (index: number, value: string) => {
    const updated = [...timings];
    updated[index].days = value;
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

        const getTimingsOfRestaurant = await axios.get(
          `/api/restaurant/create_restaurant_timming?id=${restaurantId}`
        );

        if (getTimingsOfRestaurant.data) {
          console.log(getTimingsOfRestaurant.data.restaurantTimingsFindById);
          setRestaurantTimingData(
            getTimingsOfRestaurant.data.restaurantTimingsFindById
          );
        }

        const res = await axios.get(
          `/api/restaurant/get_restaurants?id=${restaurantId}`
        );

        if (res.data) {
          const restaurant = res.data.findRestaurantById;
          setRestaurantInformation(res.data.findRestaurantById);
          console.log(restaurant);
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
        const timingRequest = await axios.post(
          `/api/restaurant/create_restaurant_timming?id=${restaurantId}`,
          { timings }
        );

        console.log(timingRequest);
      } catch (error: any) {
        console.log(
          "Error occur while creating timming of Request",
          error.message
        );
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
    <div className="bg-white  mt-10 w-full  flex  items-center flex-col h-auto font-poppins min-h-screen pb-20  ">
      {loadingData ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-evenly sm:justify-around w-full flex-col sm:flex-row items-center">
            {" "}
            <h1 className="text-xl sm:text-4xl text-center font-bold font-poppins underline">
              Profil du restaurant
            </h1>{" "}
            {isEditing ? (
              <Button
                onClick={handleSave}
                className="bg-red text-xs  w-[100px] mt-10 sm:mt-0 px-5"
              >
                {loading ? (
                  <LuLoader size={30} className="animate-spin" />
                ) : (
                  "sauvegarder"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleEdit}
                className="bg-red text-xs sm:text-base w-[100px]"
              >
                Éditer
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-x-6 items-center justify-evenly  w-full">
            <div className="px-6 sm:px-10 mt-20  space-y-4 sm:w-2/5 ">
              {restaurantInforamtion && (
                <>
                  <div>
                    <h2 className="">Nom du restaurante</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.restaurantName}
                          name="restaurantName"
                          onChange={handleInput}
                          placeholder="Nom du restaurant
"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion.restaurantName ? (
                            <p>{restaurantInforamtion.restaurantName}</p>
                          ) : (
                            <p className="italic text-xs sm:text-base">
                              Ajoutez le nom du restaurant ici
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Adresse du restaurant</h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.address}
                          name="address"
                          onChange={handleInput}
                          placeholder="Adresse"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion ? (
                            <p>{restaurantInforamtion.address}</p>
                          ) : (
                            <p className="italic ">Ajouter l’adresse ici</p>
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
                    <h2 className="">Numéro de téléphone </h2>
                    <div className="rest-inform-para">
                      {isEditing ? (
                        <input
                          value={formState?.phoneNumber}
                          name="numéro de téléphone
"
                          onChange={handleInput}
                          placeholder="+92333977373"
                          disabled={!isEditing}
                        />
                      ) : (
                        <div>
                          {!!restaurantInforamtion.phoneNumber ? (
                            <p>{restaurantInforamtion.phoneNumber}</p>
                          ) : (
                            <p className="italic ">
                              Ajoutez votre numéro de téléphone ici
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Page Google</h2>
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
                            <p className="italic ">
                              Ajouter une page google ici
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="">Lien vers le site Web</h2>
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
                            <p className="italic ">
                              Ajoutez le lien du site Web ici
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="">Horaires d’ouverture du restaurant</h2>

                    {!isEditing && restaurantTimingData ? (
                      <div className="text-sm sm:text-lg bg-gray-100  rounded-lg flex flex-col ">
                        {restaurantTimingData.map((timings, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center px-6 py-2
}"
                          >
                            <p>{timings.days}</p>
                            <div>
                              {timings.slots[0]} to {timings.slots[1]}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {isEditing
                      ? timings.map((timing, dayIndex) => (
                          <div key={dayIndex} className="flex flex-col gap-y-4">
                            <div className="rest-inform-para">
                              <input
                                value={timing.days}
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
                              + Ajouter un créneau horaire
                            </button>
                          </div>
                        ))
                      : ""}
                    {isEditing && (
                      <button
                        onClick={() => handleAddDay()}
                        className="text-sm text-blue-500 underline"
                      >
                        + Ajouter un jour
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            <div>
              <h2
                className="text-center text-lg sm:text-xl mt-10 sm:mt-0
            "
              >
                Le logo de votre entreprise
              </h2>
              {!isEditing && restaurantInforamtion?.logo ? (
                <div className="  w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-black rounded-full">
                  <Image
                    src={formState.logo || restaurantInforamtion?.logo}
                    alt="restaurant-image"
                    width={300}
                    height={300}
                    className="object-cover object-center rounded-full   w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] "
                  />
                </div>
              ) : (
                <div className="w-full   flex sm:inline-block  justify-center items-center flex-col">
                  <FileUpload onChange={handleFiles} />
                  <Button
                    onClick={uploadImages}
                    className={` mt-9 bg-red`}
                    variant={"default"}
                  >
                    {isUploading ? (
                      <LuLoader size={30} className="animate-spin" />
                    ) : (
                      "télécharger"
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
