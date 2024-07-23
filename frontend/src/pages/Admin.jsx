import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCircleUser, FaCartShopping } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user?.role === "user") {
      return navigate("/login");
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-white w-64 p-6 customShadow hidden md:flex flex-col">
        <div className="h-32 flex justify-center items-center flex-col mb-6">
          <div className="text-5xl cursor-pointer relative flex justify-center mb-2">
            {user?.profile ? (
              <img
                src={user?.profile}
                title={user?.name}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name || ""}</p>
          <p className="text-sm text-gray-500">{user?.role || ""}</p>
        </div>

        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin/allusers"
            className="px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            All Users
          </NavLink>
          <NavLink
            to="/admin/allproducts"
            className="px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Products
          </NavLink>
        </nav>
      </aside>

      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;

// import React,{useEffect} from 'react';
// import { useSelector,useDispatch } from "react-redux";
// import { FaRegCircleUser, FaCartShopping } from 'react-icons/fa6';
// import { NavLink ,Outlet  ,useNavigate } from 'react-router-dom';

// const Admin = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state?.user?.user);

//   useEffect(()=>{
//     if(user?.role=="user"){
//       return navigate("/login");
//     }
//   },[user,dispatch]);

//   return (
//     <div className='min-h-[calc(100vh-120px)]  md:flex hidden'>
//         <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
//             <div  className='h-32 flex justify-center items-center flex-col'>
//                 <div className='text-5xl cursor-pointer relative flex justify-center'>
//                 {
//               user?.profile ? (
//                 <>
//                 <img src={user?.profile} title={user?.name} className='w-20 h-20 rounded-full' alt={user?.name} />
//                  </>
//               ) : (
//                 <FaRegCircleUser />
//               )
//             }
//                 </div>
//                 <p className=' capitalize text-lg font-semibold'>{user?.name ||  ""}</p>
//                 <p className='text-sm'>{user?.role ||  ""}</p>
//             </div>

//             <div>
//                 <nav className='grid p-4'>
//                     <NavLink to={"/admin/allusers"}   className="px-2 py-1 hover:bg-slate-100">All Users</NavLink>
//                     <NavLink to={"/admin/allproducts"} className="px-2 py-1 hover:bg-slate-100" >product</NavLink>

//                 </nav>
//             </div>

//         </aside>

//         <main className='w-full h-full p-2'>
//           <Outlet/>
//         </main>
//     </div>
//   )
// }

// export default Admin
