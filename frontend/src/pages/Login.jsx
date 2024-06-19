import React, { useContext, useState } from "react";
import LoginIcon from "../assest/assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api } from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const [showPassword, setShowPassword] = useState(false);
  const [handleData, setHandleData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setHandleData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!handleData?.email || !handleData?.password) {
        return toast.error("Please Enter InputData 😗", {
          position: "top-right",
          autoClose: 1000,
        });
      }

      const { data } = await axios.post(Api.signin.url, handleData, {
        withCredentials: true,
      });

      if (data?.status) {
        toast.success(data?.message, { 
          position: "top-right",
          autoClose: 1000,
        });
         fetchUserDetails();
        navigate("/");
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

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 mx-auto">
            <img src={LoginIcon} alt="profile" title="profile" />
          </div>

          <form className="pt-6 flex  flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label> Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  placeholder="Enter Email "
                  name="email"
                  value={handleData?.email}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label> Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password "
                  name="password"
                  value={handleData?.password}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none  bg-transparent"
                />
                <div className="cursor-pointer text-xl">
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <NavLink
                to={"/forgotpassword"}
                className={
                  "block w-fit ml-auto hover:underline hover:text-red-600 p-y"
                }
              >
                forget password
              </NavLink>
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 w-full px-6 py-2 text-white  max-w-[150px]  cursor-pointer rounded-full hover:scale-105 transition-all mx-auto block mt-6"
            >
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have Account ?{" "}
            <NavLink
              to={"/signup"}
              className={" text-red-600  hover:text-red-700 hover:underline"}
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
