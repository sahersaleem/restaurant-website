"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/landingPageComponent/Loader";
import { IUsers } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [userData, setuserData] = useState<IUsers[] | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    get_all_users_from_database();
  }, []);

  const get_all_users_from_database = async () => {
    try {
      setDataLoading(true);
      const res = await axios.get("/api/users");
      console.log(res.data.users);
      setuserData(res.data.users);
      setDataLoading(false);
    } catch (error: any) {
      console.log(
        "error occur while fetching data from databse",
        error.message
      );
    } finally {
      setDataLoading(false);
    }
  };
  const updateUserRole = async (id: string, role: string) => {
    try {
      const data = { id, role };
      console.log(data);
      const res = await axios.put("/api/users", { data });
      toast.success("User updated successfully");

      await get_all_users_from_database();
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error occur while updating user role");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await axios.delete(`/api/users?userId=${userId}`);

      toast.success("User deleted successfully");
     
       await get_all_users_from_database();
      
    } catch (error: any) {
      toast.error("Error occur while deleting user");
    }
  };

  return (
    <div className="w-full h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />
      {dataLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
      {
        <div>
          <h1 className="text-xl lg:text-4xl text-center mt-10 mb-10 underline font-poppins">Utilisatrices</h1>
          {dataLoading && !userData?.length ? (
            <div className="mt-10 w-full flex items-center justify-center">
              <p className="text-3xl text-center mt-40">Users not found!</p>
            </div>
          ) : (
            <table className="w-full  rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4 hidden lg:inline-block">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4 hidden lg:inline-block">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {userData &&
                  userData.map((user: any) => (
                    <tr key={user.id} className="border-t">
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4 hidden lg:inline-block">{user.email}</td>
                      <td className="py-2 px-4">{user.role}</td>
                      <td className="py-2 px-4  gap-2 hidden lg:flex">
                        <select
                          className="border p-1 rounded"
                          onChange={(e) => {
                            updateUserRole(user._id, e.target.value);
                          }}
                          value={user.role}
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                          <option value="owner">Restaurant Owner</option>
                        </select>
                        <Button
                          className=""
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      }
    </div>
  );
};

export default Page;
