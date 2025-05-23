"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { signUpformData, signUpSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineDateRange } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import {useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";

const SignUp = () => {
  const { register, handleSubmit } = useForm<signUpformData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      date_of_birth: "",
      email: "",
      password: "",
      town: "",
      forename: "",
    },
  });

  const router = useRouter()

  const handleForm = async (data: any) => {
    try {
      const res = await axios.post("/api/signUp", data);
      if (res) {
     router.push('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center mt-20 pb-10 ">
      <Card className="max-w-[500px] ">
        <CardContent>
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-2xl  sm:text-5xl font-comic tracking-wide  after:content-[''] after:block after:w-[70%] after:h-[3px] sm:after:h-[6px]  after:bg-red sm:after:mt-2 after:rounded-lg after:mt-1">
              Sign Up
            </CardTitle>
          
            

              <Link
                href={"/restaurant"}
                className="text-sm underline text-red capitalize font-comic font-medium"
              >
                want to register your restaurant?
              </Link>
        
          </CardHeader>
          <CardDescription>
            <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
              <div className="flex gap-x-2">
                <div>
                  <label className="font-semibold">Name</label>
                  <div className="signUp-div">
                    {" "}
                    <FiUser size={20} />{" "}
                    <input
                      {...register("name")}
                      className="input"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold">Forename</label>
                  <div className="signUp-div">
                    <FiUser size={20} />
                    <input
                      {...register("forename")}
                      className="input"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
              <div>{/* date of birth */}</div>
              <div>
                <label className="font-semibold">Town</label>
                <div className="signUp-div">
                  <LuMapPin size={20} />
                  <input
                    placeholder="Saint-Pieere"
                    className="input"
                    {...register("town")}
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold">Date of birth</label>
                <div className="signUp-div">
                  <MdOutlineDateRange size={20} />
                  <input
                    placeholder="Saint-Pieere"
                    className="input"
                    type="date"
                    {...register("date_of_birth")}
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold">Email Adress</label>
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
                    autoComplete="true"
                  />
                </div>

                <p className="text-xs mt-2 mb-6">
                  The password must contain at least 6 characters, one uppercase
                  letter and one special character.
                </p>
              </div>

              <Button
                className="w-full bg-red "
                type="submit"
                onClick={handleForm}
              >
                To Register
              </Button>
            </form>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
