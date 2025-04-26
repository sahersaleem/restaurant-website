"use client";

import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Loader } from "lucide-react";
import { MdOutlineMail } from "react-icons/md";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const Login = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSave = async () => {
    try {
      setProcessing(true)
      const res = await axios.post("/api/forgot-password", { email });
      setProcessing(false)
      toast.success(res.data.message);
    
    } catch (error: any) {
      toast.error("Error occur while sending email");
      setProcessing(false)
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center  p-6 lg:p-0">
            <Toaster position="bottom-right" reverseOrder={false} />
      <Card className="max-w-[500px] ">
        <CardContent>
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-2xl  sm:text-4xl font-comic tracking-wide  after:content-[''] after:block after:w-[70%] after:h-[3px] sm:after:h-[6px]  after:bg-red sm:after:mt-2 after:rounded-lg after:mt-1">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardDescription>
            <form className="space-y-4">
              <div>
                <label className="font-semibold">Email Adress</label>
                <div className="signUp-div">
                  <MdOutlineMail size={20} />
                  <input
                    placeholder="johndoe281@gmail.com"
                    className="input"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <Button
                className="w-full bg-red text-xl "
                type="submit"
                onClick={handleSave}
              >
                {processing ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Send email link"
                )}
              </Button>
            </form>
          </CardDescription>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
