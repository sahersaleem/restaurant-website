"use client";

import { useForm } from "react-hook-form";
import { loginSchema, loginFormData } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { MdLock } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/navigation";

import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { Loader } from "lucide-react";

const Login = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const router = useRouter();

  const handleForm = async (data: any) => {
    try {
      setProcessing(true);
      const { email, password } = data;
      const loginData = { email, password, rememberMe };
      console.log(loginData);
      const res = await axios.post("/api/login", loginData);

      if (res) {
        setProcessing(false);
        if (res.data.role == "owner") {
          router.push("/dashboard");
        } else if (res.data.role == "admin") {
          router.push("/admin/dashboard");
        } else if (res.data.role == "moderator") {
          router.push("/moderator/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log("Error ocurred", error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center  p-6 lg:p-0">
      <Card className="max-w-[450px] ">
        <CardContent>
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-2xl  sm:text-5xl font-comic tracking-wide  after:content-[''] after:block after:w-[70%] after:h-[3px] sm:after:h-[6px]  after:bg-red sm:after:mt-2 after:rounded-lg after:mt-1">
              Login
            </CardTitle>
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
                    type="email"
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

                <p className="text-xs mt-2 mb-6">
                  The password must contain at least 6 characters, one uppercase
                  letter and one special character.
                </p>
              </div>
              <div className="flex justify-between">
                <label className="flex items-center text-sm justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link
                  href={"/forgot-password"}
                  className="text-sm underline text-red"
                >
                  Forgot password
                </Link>
              </div>

              <Button
                className="w-full bg-red text-xl "
                type="submit"
                onClick={handleForm}
              >
                {processing ? <Loader className="animate-spin" /> : "Login"}
              </Button>

              <Link href="/signUp" className="text-center w-ful inline-block underline text-red mt-5">
               
               
                   
                want to Sign Up?
                
              </Link>
            </form>
          </CardDescription>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
