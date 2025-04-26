"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/landingPageComponent/Loader";
import { Trash2Icon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
interface IComplains {
  _id: string;
  subject: string;
  complain: string;
  isResolved: boolean;
}

const ComplainDialogModel = ({
  refreshData,
  ...res
}: IComplains & { refreshData: () => void }) => {








  const handleResolve = async (id: string) => {
    const data = { id, isResolved: true };
    try {
      const res = await axios.put("/api/complain",  data );
      if (res.data) {
        toast.success("Resolved!");
        refreshData();
      }
    } catch (error: any) {
      toast.success("Error occur while resolving complain");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Open</Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>{res.subject}</DialogTitle>
          <DialogDescription>{res.complain}</DialogDescription>
        </DialogHeader>
        <Button
          className="w-[200px]"
          onClick={() => {
            handleResolve(res._id

            );
          }}
        >
          Mark as resolved
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const Page = () => {
  const [complainsData, setComplainsData] = useState<IComplains[] | null>(null);

  const get_complains = async () => {
    try {
      const res = await axios.get("/api/complain");
      setComplainsData(res.data.complains);
      console.log(res.data.complains);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    get_complains();
  }, []);



const deleteCoomplain =  async(id:string) =>{
  try {
    const res = await axios.delete(`/api/complain?id=${id}` , )
    if(res.data){
      toast.success("Complain deleted successfully")
      get_complains()
    }
  } catch (error:any) {
    toast.error("error occurr while deleting complain")
    
  }
}





















  return (
    <div className="w-full h-screen">
        <Toaster position="bottom-right" reverseOrder={false} />
            {!complainsData && (
              <div className="w-full h-screen flex justify-center items-center">
                <Loader />
              </div>
            )}
      <h1 className="text-4xl text-center mt-10">Complaint management</h1>

      <table className="min-w-full text-left bg-white mt-5">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {complainsData &&
            complainsData.map((res, ind) => (
              <tr key={res._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{res._id}</td>
                <td className="px-4 py-2">{res.subject}</td>
                <td className={`px-4 py-2 capitalize ${res.isResolved?"text-green-500" :"text-yellow-500"}`}>
                  {res.isResolved ? "resolved" : "pending"}
                </td>
                <td className="px-4 py-2">
                  <ComplainDialogModel {...res} refreshData={get_complains} />
                </td>
                <td>
                  {" "}
                  <Button onClick={()=>deleteCoomplain(res._id)}>
                    <Trash2Icon />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
