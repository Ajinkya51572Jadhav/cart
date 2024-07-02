import Logo from './Logo';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser, FaCartShopping } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Api } from '../common';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserCount, setUserDetails } from '../store/userSlice';
import React, { useState } from 'react';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const count = useSelector((state)=>state?.user?.count);

  console.log("user", user);
  console.log("count",count);

  const [menuDisplay, setMenuDisplay] = useState(false);
 



  const logOut = async () => {
    try {

      const { data } = await axios.get(Api.logout.url, {
        withCredentials: true,
      });

      if (data?.status) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 1000,
        });

        dispatch(setUserDetails(null));
        dispatch(setUserCount(0));

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



       const handleSearch=(e)=>{
        let val = e.target.value;
           
        if(val){
           navigate(`/search?query=${val}`);  
        }
      };





  return (
    <header className='h-16 shadow-md bg-white  fixed w-full z-40'  >
      <div className='container mx-auto h-full flex  items-center px-4 justify-between'>
        <div className=''>
          <NavLink to={"/"}>
            <Logo
              w={90}
              h={50}
            />
          </NavLink>
        </div>
{/* hidden */}
        <div className=' lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm pl-2'>
          <input type='search' placeholder='Search Product Here...' onChange={(e)=>handleSearch(e)} className='w-full outline-none' />
          <div className='text-lg min-w-[50px]  h-8 bg-red-600 flex items-center  justify-center  rounded-r-full text-white '>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative group flex justify-center'>
            
            {user?._id && (
            
            <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay((pre) => !pre)}>
              {
                user?.profile ? (
                  <img src={user?.profile} title={user?.name} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )
              }
            </div>
            )}
            {
              menuDisplay && (
                <div className='absolute  bg-white bottom-0 top-11 h-fit p-4  shadow-lg rounded '>
                  { /*  hidden  group-hover:block */}
                  <nav>
                    
                    {
                      user?.role == "admin" && (
                        <NavLink to={"/admin"} className="whitespace-nowrap hover:bg-slate-50 p-2 group:hover:block">Admin Panel</NavLink>
                      )
                  }
                      <NavLink to={"/profile"} className="whitespace-nowrap hover:bg-slate-50 p-2 group:hover:block">profile</NavLink>
                  
                  </nav>
                </div>
              )
            }


          </div>

          <NavLink to={"/cart"} className='text-2xl relative'>
            <span><FaCartShopping /></span>
            <div className='bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
             <p className='text-xs'>{count || 0}</p>
            </div>
          </NavLink>

          <div>
            {
              user?._id ? (
                <NavLink to={"/login"} onClick={logOut} className='px-3 py-1 bg-red-600 rounded-full hover:bg-red-700'>logout</NavLink>
              ) : (
                <NavLink to={"/login"} className='px-3 py-1 bg-red-600 rounded-full hover:bg-red-700'>Login</NavLink>
              )
            }
          </div>

        </div>
      </div>
    </header>
  )
}


