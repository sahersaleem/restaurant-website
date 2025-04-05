"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  RestaurantRegisterationData,
  RestaurantRegisterationSchema,
} from "@/schemas/restaurantLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineDateRange } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { GrRestaurant } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const RestaurantRegs = () => {
  const { register, handleSubmit } = useForm<RestaurantRegisterationData>({
    resolver: zodResolver(RestaurantRegisterationSchema),
  });

  const handleForm = (data: RestaurantRegisterationData) => {
    console.log(data);
  };

  return (
    <div className="w-full h-auto flex justify-center items-center p-20 ">
      <Card className="max-w-[450px]   ">
        <CardContent>
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-2xl">Register your restaurant</CardTitle>
            <div className="flex items-center justify-center gap-x-2">
              <h2 className="text-sm">Create your restaurant account here!</h2>
            </div>
          </CardHeader>
          <CardDescription>
            <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
              <div>
                <label className="font-semibold">Restaurant name</label>
                <div className="signUp-div">
                  {" "}
                  <GrRestaurant size={20} />{" "}
                  <input
                    {...register("restaurantName")}
                    className="input "
                    placeholder="abc"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">Email Address</label>
                <div className="signUp-div">
                  <MdOutlineMail size={20} />
                  <input placeholder="johndoe281@gmail.com" className="input" />
                </div>
              </div>

              <div>
                <label className="font-semibold">Password</label>
                <div className="signUp-div">
                  {" "}
                  <MdLock size={20} />
                  <input
                    placeholder="password"
                    type="password"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">Confirm Password</label>
                <div className="signUp-div">
                  {" "}
                  <MdLock size={20} />
                  <input
                    placeholder="confirm password"
                    type="password"
                    className="input"
                  />
                </div>

                <p className="text-xs mt-2 mb-6">
                  The password must contain at least 6 characters, one uppercase
                  letter and one special character.
                </p>
              </div>

              <div>
                <label className="font-semibold">Phone Number</label>
                <div className="signUp-div">
                  {" "}
                  <MdOutlinePhone size={20} />
                  <input placeholder="021...." className="input" />
                </div>
              </div>
              <div>
                <label className="font-semibold">Location</label>
                <div className="signUp-div">
                  {" "}
                  <LuMapPin size={20} />
                  <input placeholder="abc streer" className="input" />
                </div>
              </div>

              <div>
                <label className="font-semibold">Cuisine type</label>
                <div className="signUp-div">
                  {" "}
                  <MdOutlineFoodBank size={20} />
                  <input placeholder="italian" className="input" />
                </div>
              </div>

              <div>
                <label className="font-semibold">Opening time</label>
                <div className="signUp-div">
                  {" "}
                  <CiTimer size={20} />
                  <input placeholder="9:00am" className="input" type="time" />
                </div>
              </div>

              <div>
                <label className="font-semibold">Closing time</label>
                <div className="signUp-div">
                  {" "}
                  <CiTimer size={20} />
                  <input placeholder="12:00am" className="input" type="time" />
                </div>
              </div>

              <Button className="w-full  ">To Register</Button>
            </form>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantRegs;
