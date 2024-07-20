import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { Api } from "../common";
import { toast } from "react-toastify";

const Role = ({ users, onClose, refresh }) => {
  const { _id, name, email, role } = users;
  console.log("users", users);

  const [userRole, setUserRole] = useState(role);
  console.log("userRole", userRole);
  // hgjhfdgjdfjg
  const roleCheck = {
    admin: "admin",
    user: "user",
  };

  const updateUser = async () => {
    try {
      const payload = {
        id: _id,
        name,
        email,
        role: userRole,
      };

      const { data } = await axios.post(Api.updateAdmin.url, payload, {
        withCredentials: true,
      });

      if (data?.status) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 1000,
        });

        onClose(false);
        refresh();
      } else {
        toast.error(data?.message, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleChnage = () => {};

  return (
    <div className="fixed  top-0 bottom-0 left-0  right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50 ">
      <div className="mx-auto bg-white  shadow-md p-4 w-full max-w-sm">
        <button
          className="block ml-auto rounded-full bg-red-400 p-2"
          onClick={() => onClose(false)}
        >
          <IoMdClose />
        </button>

        <h1>Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email} </p>

        <div className="flex items-center justify-between">
          <p>Role : {userRole} </p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value={roleCheck?.admin}>Admin</option>
            <option value={roleCheck?.user}>User</option>
          </select>
        </div>

        <button
          className="w-fit mx-auto block border py-1 px-3 rounded-full bg-red-500 hover:bg-red-600"
          onClick={updateUser}
        >
          Chnage Role
        </button>
      </div>
    </div>
  );
};

export default Role;
