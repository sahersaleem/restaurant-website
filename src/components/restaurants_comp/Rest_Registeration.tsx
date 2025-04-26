"use client";

import { useForm } from "react-hook-form";
import {
  RestaurantRegisterationData,
  RestaurantRegisterationSchema,
} from "@/schemas/restaurantLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdLock } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { LuLoader} from "react-icons/lu";
import { GrRestaurant } from "react-icons/gr";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { useRestaurantContext } from "@/app/(restaurant)/_components/RstaurantContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const RestaurantRegs = () => {
  const { addRestaurantId } = useRestaurantContext();
  const { register, handleSubmit } = useForm<RestaurantRegisterationData>({
    resolver: zodResolver(RestaurantRegisterationSchema),
    defaultValues: {
      restaurantName: "",
      address:"",
      email: "",
      password: "",
    },
  });
const [loading , setloading] = useState<boolean>(false)
const router = useRouter()
  const handleForm = async (data: any) => {
    console.log(data)
    try {
 
      setloading(true)
      const res = await axios.post("/api/restaurant/create_account", data);
      console.log(res)

      if (res) {
        console.log(res)
        addRestaurantId(res.data.rest._id);
        setloading(false)
        router.push('/login')
      
      }
    } catch (error: any) {
      console.log(error);
      setloading(false)
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center p-6 lg:p-20  font-poppins">
      <Card className="max-w-[500px] w-full ">
        <CardContent>
          <CardHeader className="flex items-center justify-center f">
            <Image src={'/images/shef.png'} width={60} height={60} alt="restaurant"/>
            <CardTitle className="text-sm lg:text-3xl font-comic tracking-wide">
              Register Your Restauarnt  
            </CardTitle>
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
                  <input
                    placeholder="johndoe281@gmail.com"
                    className="input"
                    {...register("email")}
                  />
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
                    {...register("password")}
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold">Address</label>
                <div className="signUp-div">
                  {" "}
                  <MdLock size={20} />
                  <input
                    placeholder="address"
                    type="address"
                    className="input"
                    {...register("address")}
                  />
                </div>
              </div>

              <Button
                className="w-full bg-red font-comic text-lg  "
                type="submit"
                onSubmit={handleForm}
              >
               {loading ? <LuLoader size={30} className="animate-spin"/> : "To Register"}
              </Button>
            </form>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantRegs;
