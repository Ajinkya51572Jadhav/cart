import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../common";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import Role from "./Role";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(Api.allUsers.url, {
        withCredentials: true,
      });
      if (data?.status) {
        setAllUsers(data?.users);
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-yellow-500  text-white">
            <tr>
              <th className="p-4 text-left">Sr.</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Created Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser?.map((elm, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4 text-gray-700">{index + 1}</td>
                <td className="p-4 text-gray-700">{elm?.name}</td>
                <td className="p-4 text-gray-700">{elm?.email}</td>
                <td className="p-4 text-gray-700 capitalize">{elm?.role}</td>
                <td className="p-4 text-gray-700">
                  {new Date(elm?.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    weekday: "long",
                  })}
                </td>
                <td className="p-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600  text-white p-2 rounded-full  transition-colors duration-300"
                    onClick={() => {
                      setUsers(elm);
                      setToggle(true);
                    }}
                    title="Edit User"
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggle && (
        <Role
          users={users}
          onClose={() => setToggle(false)}
          refresh={getAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Api } from "../common";
// import { toast } from "react-toastify";
// import { MdEdit } from "react-icons/md";
// import Role from "./Role";

// const AllUsers = () => {
//   const [allUser, setAllUsers] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const [users, setUsers] = useState([]);

//   console.log("allusrs", allUser);

//   const getAllUsers = async () => {
//     try {
//       const { data } = await axios.get(Api.allUsers.url, {
//         withCredentials: true,
//       });
//       if (data?.status) {
//         setAllUsers(data?.users);
//       }
//     } catch (error) {
//       toast.error(error?.message, {
//         position: "top-right",
//         autoClose: 1000,
//       });
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   return (
//     <div className="bg-gray-50 p-6">
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="p-3 text-left">Sr.</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Created Date</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allUser?.map((elm, index) => (
//               <tr
//                 key={index}
//                 className={`border-b ${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 }`}
//               >
//                 <td className="p-3 text-gray-800">{index + 1}</td>
//                 <td className="p-3 text-gray-800">{elm?.name}</td>
//                 <td className="p-3 text-gray-800">{elm?.email}</td>
//                 <td className="p-3 text-gray-800 capitalize">{elm?.role}</td>
//                 <td className="p-3 text-gray-800">
//                   {new Date(elm?.createdAt).toLocaleDateString("en-US", {
//                     month: "long",
//                     year: "numeric",
//                     weekday: "long",
//                   })}
//                 </td>
//                 <td className="p-3">
//                   <button
//                     className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
//                     onClick={() => {
//                       setUsers(elm);
//                       setToggle(true);
//                     }}
//                   >
//                     <MdEdit />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {toggle && (
//         <Role
//           users={users}
//           onClose={() => setToggle(false)}
//           refresh={getAllUsers}
//         />
//       )}
//     </div>
//   );
// };

// export default AllUsers;

// import React, { useEffect, useState } from 'react'
// import { Api } from '../common';
// import axios from "axios";
// import {toast} from "react-toastify";
// import {MdEdit}  from "react-icons/md";
// import Role from './Role';

// const AllUsers = () => {

//   const [allUser,setAllUsers]=useState([]);
//   const [toggle,setToggle]=useState(false);
//   const [users,setUsers]=useState([]);

//    console.log("allusrs",allUser);

//     const  getAllUsers=async()=>{
//      try {
//       const {data} = await axios.get(Api.allUsers.url,{
//         withCredentials:true
//       });

//       if (data?.status) {
//           setAllUsers(data?.users)
//       };
//      } catch (error) {
//       toast.error(error?.message, {
//         position: "top-right",
//         autoClose: 1000,
//       });
//      }
//      }

//   useEffect(()=>{
//     getAllUsers();
//   },[]);

//   return (
//     <div className='bg-white'>
//           <table className='w-full userTable'>
//             <thead>
//                <th>Sr.</th>
//                <th>Name</th>
//                <th>Email</th>
//                <th>Role</th>
//                <th>Created Date</th>
//                <th>Action</th>
//             </thead>
//             <tbody>
//               {
//                 allUser?.map((elm,index)=>(
//                   <>
//                   <tr key={index} >
//                     <td>{index+1}</td>
//                     <td>{elm?.name}</td>
//                      <td>{elm?.email}</td>
//                     <td>{elm?.role}</td>
//                      <td>{new Date(elm?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', weekday: 'long' })}</td>
//                       <td>
//                         <button className='bg-green-100 p-2 rounded-full'
//                         onClick={()=>{
//                          setUsers(elm);
//                         setToggle(true)
//                         }
//                       }
//                         >
//                             <MdEdit/>
//                         </button>
//                       </td>

//                 {toggle &&
//                   <Role
//                   users={users}
//                   onClose={setToggle}
//                   refresh={getAllUsers}
//                   />
//                 }
//               </tr>
//                   </>
//                 ))
//               }
//             </tbody>
//           </table>
//     </div>
//   )
// }

// export default AllUsers
