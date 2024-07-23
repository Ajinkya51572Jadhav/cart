import { useSelector } from "react-redux";
import { FaEnvelope, FaUserShield, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <div className="flex flex-col items-center lg:flex-row lg:items-start">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={user.profile}
            alt="Profile"
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-gray-300 shadow-lg"
          />
        </div>
        {/* User Info */}
        <div className="mt-4 lg:mt-0 lg:ml-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <p className="text-lg text-gray-600 flex items-center mb-2">
            <FaEnvelope className="text-xl text-gray-500 mr-2" />
            {user.email}
          </p>
          <p className="text-lg text-gray-600 flex items-center mb-4">
            <FaUserShield className="text-xl text-gray-500 mr-2" />
            Role: {user.role}
          </p>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Account Details
            </h2>
            <p className="text-lg text-gray-600 flex items-center mb-2">
              <FaCalendarAlt className="text-xl text-gray-500 mr-2" />
              <span className="font-medium">Created At:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-600 flex items-center">
              <FaCalendarAlt className="text-xl text-gray-500 mr-2" />
              <span className="font-medium">Updated At:</span>{" "}
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import { useSelector } from "react-redux";
// import { FaEnvelope, FaUserShield, FaCalendarAlt } from "react-icons/fa";

// const Profile = () => {
//   const user = useSelector((state) => state?.user?.user);
//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <div className="flex items-center space-x-6">
//         <img
//           src={user.profile}
//           alt="Profile"
//           className="w-24 h-24 rounded-full border-4 border-gray-200"
//         />
//         <div>
//           <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
//           <div className="mt-2 flex items-center text-gray-600">
//             <FaEnvelope className="mr-2" />
//             <p>{user.email}</p>
//           </div>
//           <div className="mt-2 flex items-center text-gray-600">
//             <FaUserShield className="mr-2" />
//             <p>Role: {user.role}</p>
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 border-t border-gray-200 pt-6">
//         <h3 className="text-xl font-semibold text-gray-800">Account Details</h3>
//         <div className="mt-4">
//           <div className="flex items-center text-gray-600">
//             <FaCalendarAlt className="mr-2" />
//             <p>
//               <span className="font-semibold">Created At: </span>
//               {new Date(user.createdAt).toLocaleString()}
//             </p>
//           </div>
//           <div className="mt-2 flex items-center text-gray-600">
//             <FaCalendarAlt className="mr-2" />
//             <p>
//               <span className="font-semibold">Updated At: </span>
//               {new Date(user.updatedAt).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
