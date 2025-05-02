"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { complainSchema, ComplainSchemaType } from "@/schemas/complainSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import { motion } from "framer-motion";

const Page = () => {
  const [processing, setProcessing] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<ComplainSchemaType>({
    resolver: zodResolver(complainSchema),
    defaultValues: {
      subject: "",
      complain: "",
    },
  });

  const handlesave = async (data: ComplainSchemaType) => {
    try {
      setProcessing(true);
      const res = await axios.post("/api/complain", data);
      if (res.data) {
        toast.success("Complaint sent successfully!");
        reset();
      }
    } catch (error: any) {
      toast.error("Error occurred while sending complaint!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-12">
      <Toaster position="bottom-right" reverseOrder={false} />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center text-red">
        Soumettez votre plainte
        </h1>

        <form onSubmit={handleSubmit(handlesave)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
            sujet
            </label>
            <Input
              placeholder="Entrez le sujet..."
              {...register("subject")}
              className="focus-visible:ring-red"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
            Plainte
            </label>
            <Textarea
              placeholder="Tapez votre plainte.."
              {...register("complain")}
              className="focus-visible:ring-red"
            />
          </div>

          <Button
            type="submit"
            disabled={processing}
            className="w-full bg-red hover:bg-red-500 text-white"
          >
            {processing ? (
              <LuLoader className="animate-spin text-lg" />
            ) : (
              "Envoyer"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Page;
