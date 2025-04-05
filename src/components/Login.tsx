"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema  , loginFormData } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineDateRange } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const Login = () => {
  const { register, handleSubmit } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleForm = (data:loginFormData ) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Card className="max-w-[450px] ">
        <CardContent>
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-2xl">Login</CardTitle>
            <h2 className="text-sm">Login to your account</h2>
          </CardHeader>
          <CardDescription>
            <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
             
              <div>
                <label className="font-semibold">Email Adress</label>
                <div className="signUp-div">
                  <MdOutlineMail size={20} />
                  <input
                    placeholder="johndoe281@gmail.com"
                    className="input"
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
                  />
                </div>

                <p className="text-xs mt-2 mb-6">
                  The password must contain at least 6 characters, one uppercase
                  letter and one special character.
                </p>
              </div>

              <Button className="w-full  ">Login</Button>
            </form>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
