import React, { useState } from "react";
import LoginIcon from "../assest/assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { imgTobase64 } from "../helpers/imgTobase64";
import { Api } from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [handleData, setHandleData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profile: "",
  });

  const handleChange = (e) => {
    setHandleData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const imgPic = await imgTobase64(file);
    setHandleData((pre) => ({
      ...pre,
      profile: imgPic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleData?.password === handleData?.confirmpassword) {
      const { name, email, password, profile } = handleData;

      try {
        const { data } = await axios.post(Api.signup.url, {
          name,
          email,
          password,
          profile,
        });

        if (data?.status) {
          toast.success(data?.message, {
            position: "top-right",
            autoClose: 1000,
          });
          navigate("/login");
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
    } else {
      toast.error("Password is not matched", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-6 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src={handleData?.profile ? handleData?.profile : LoginIcon}
            alt="profile"
            title="profile"
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <p className="text-gray-500 mt-2">Upload Profile</p>
          <input
            type="file"
            onChange={handleImage}
            className="cursor-pointer mt-2"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={handleData?.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={handleData?.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={handleData?.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmpassword"
                value={handleData?.confirmpassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <NavLink to={"/login"} className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default SignUp;

// import React, { useState } from "react";
// import LoginIcon from "../assest/assest/signin.gif";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import { imgTobase64 } from "../helpers/imgTobase64";
// import { Api } from "../common";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [handleData, setHandleData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//     profile: "",
//   });
//   const handleChange = (e) => {
//     setHandleData((pre) => ({
//       ...pre,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImage = async (e) => {
//     const file = e.target.files[0];
//     const imgPic = await imgTobase64(file);
//     setHandleData((pre) => ({
//       ...pre,
//       profile: imgPic,
//     }));
//     console.log(imgPic);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (handleData?.password === handleData?.confirmpassword) {
//       const { name, email, password, profile } = handleData;

//       try {
//         const { data } = await axios.post(Api.signup.url, {
//           name,
//           email,
//           password,
//           profile,
//         });

//         if (data?.status) {
//           toast.success(data?.message, {
//             position: "top-right",
//             autoClose: 1000,
//           });
//           navigate("/login");
//         } else {
//           toast.error(data?.message, {
//             position: "top-right",
//             autoClose: 1000,
//           });
//         }
//       } catch (error) {
//         toast.error(error?.message, {
//           position: "top-right",
//           autoClose: 1000,
//         });
//       }
//     } else {
//       toast.error("Password is Not Matched", {
//         position: "top-right",
//         autoClose: 1000,
//       });
//     }

//     console.log("handleData", handleData);
//   };

//   return (
//     <section id="login">
//       <div className="mx-auto container p-4">
//         <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto ">
//           <div class="flex flex-col items-center">
//             <div class="w-20 h-20 mx-auto">
//               <img
//                 src={handleData?.profile ? handleData?.profile : LoginIcon}
//                 alt="profile"
//                 title="profile"
//                 class="rounded-full cursor-pointer"
//               />
//               <form className="-mt-12">
//                 <input
//                   type="file"
//                   onChange={handleImage}
//                   className="cursor-pointer"
//                 />
//               </form>
//             </div>
//             <div class="text-xs py-1 text-center">Upload Profile</div>
//           </div>

//           <form className="pt-6 flex  flex-col gap-2" onSubmit={handleSubmit}>
//             <div className="grid">
//               <label> Name : </label>
//               <div className="bg-slate-200 p-2">
//                 <input
//                   type="text"
//                   placeholder="Enter Name "
//                   name="name"
//                   value={handleData?.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full h-full outline-none bg-transparent"
//                 />
//               </div>
//             </div>

//             <div className="grid">
//               <label> Email : </label>
//               <div className="bg-slate-200 p-2">
//                 <input
//                   type="email"
//                   placeholder="Enter Email "
//                   name="email"
//                   value={handleData?.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full h-full outline-none bg-transparent"
//                 />
//               </div>
//             </div>

//             <div>
//               <label> Password : </label>
//               <div className="bg-slate-200 p-2 flex">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter Password "
//                   name="password"
//                   value={handleData?.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full h-full outline-none  bg-transparent"
//                 />
//                 <div className="cursor-pointer text-xl">
//                   <span onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label> Confirm Password : </label>
//               <div className="bg-slate-200 p-2 flex">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Enter Password "
//                   name="confirmpassword"
//                   value={handleData?.confirmpassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full h-full outline-none  bg-transparent"
//                 />
//                 <div className="cursor-pointer text-xl">
//                   <span
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="bg-red-600 hover:bg-red-700 w-full px-6 py-2 text-white  max-w-[150px]  cursor-pointer rounded-full hover:scale-105 transition-all mx-auto block mt-6"
//             >
//               Register
//             </button>
//           </form>
//           <p className="my-1">
//             Already have Account ?{" "}
//             <NavLink
//               to={"/login"}
//               className={" text-red-600  hover:text-red-700 hover:underline"}
//             >
//               Login
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignUp;
