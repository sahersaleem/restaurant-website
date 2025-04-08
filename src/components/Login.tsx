"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema  , loginFormData } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineDateRange } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
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


const Login = () => {
  const { register, handleSubmit } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      password:"",
      email:""
    }
  });

  const router = useRouter()

  const handleForm = async(data:any ) => {
    console.log(data)
    try {
     const res = await axios.post('/api/login',data)

     if(res){
    Cookies.set('token',res.data.token , {expires:7})
    console.log(res)
    if(res.data.role=="owner"){
      router.push('/dashboard')
    }else{
      router.push('/')
    }
       

     }
      
    } catch (error:any) {
      console.log("Error ocurred" , error.message)
      
    }
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

              <Button className="w-full bg-[#FF9F0D] hover:bg-[#eda232] " type="submit" onClick={handleForm}>Login</Button>
            </form>
          </CardDescription>
        </CardContent>
        <CardFooter><Link href={'/lign'}></Link></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
