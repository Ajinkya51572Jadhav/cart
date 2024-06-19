import React, { useEffect, useState } from 'react'
import { Api } from '../common';
import axios from "axios";
import {toast} from "react-toastify";
import {MdEdit}  from "react-icons/md";
import Role from './Role';

const AllUsers = () => {

  const [allUser,setAllUsers]=useState([]);
  const [toggle,setToggle]=useState(false);
  const [users,setUsers]=useState([]);
     
   console.log("allusrs",allUser);

 
    const  getAllUsers=async()=>{
     try {
      const {data} = await axios.get(Api.allUsers.url,{
        withCredentials:true
      });

      if (data?.status) {
          setAllUsers(data?.users)
      };
     } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 1000,
      });
     }
     }

      
  useEffect(()=>{
    getAllUsers();
  },[]);



  return (
    <div className='bg-white'>
          <table className='w-full userTable'>
            <thead>
               <th>Sr.</th>
               <th>Name</th>
               <th>Email</th>
               <th>Role</th>
               <th>Created Date</th>
               <th>Action</th>
            </thead>
            <tbody>
              {
                allUser?.map((elm,index)=>(
                  <>
                  <tr key={index} >
                    <td>{index+1}</td>
                    <td>{elm?.name}</td>
                     <td>{elm?.email}</td>
                    <td>{elm?.role}</td>
                     <td>{new Date(elm?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', weekday: 'long' })}</td>
                      <td>
                        <button className='bg-green-100 p-2 rounded-full' 
                        onClick={()=>{
                         setUsers(elm);
                        setToggle(true)
                        }
                      }
                        >
                            <MdEdit/>
                        </button>
                      </td>
        

                {toggle && 
                  <Role
                  users={users}
                  onClose={setToggle}
                  refresh={getAllUsers}
                  />
                }
              </tr>
                  </>
                ))
              }
            </tbody>
          </table>
    </div>
  )
}

export default AllUsers
