"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "react-hot-toast";
import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { complainSchema, ComplainSchemaType } from "@/schemas/complainSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import { useState } from "react";

const Page = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const { register, handleSubmit , reset} = useForm<ComplainSchemaType>({
    resolver: zodResolver(complainSchema),
    defaultValues: {
      subject: "",
      complain: "",
    },
  });

  const handlesave = async (data: any) => {
    console.log(data);
    try {
      setProcessing(true);
      const res = await axios.post("/api/complain", data );
      if (res.data) {
        toast.success("Complain send sucessfully!");
        reset()
      }
    } catch (error: any) {
      toast.error("Error occurred while sending complain!");
      setProcessing(false);
    }finally{
      setProcessing(false)
    }
  };

  return (
    <div className="w-full h-screen flex gap-y-7 items-center flex-col ">
            <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl text-center mt-10">Submit your complain</h1>

      <div className="w-full flex justify-center items-center">
        <div className="max-w-[500px] w-full flex flex-col space-y-2">
          <form onSubmit={handleSubmit(handlesave)}>
            <div className="space-y-2">
              <label>Subject</label>
              <Input
                placeholder="Enter subject here..."
                {...register("subject")}
              />
            </div>
            <div className="space-y-2">
              <label>Complain</label>
              <Textarea
                placeholder="Type your complaint here..."
                {...register("complain")}
              />
            </div>
            <Button type="submit" className="mt-4">
            {processing ? <LuLoader className="animate-spin"/>: "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
