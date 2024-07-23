import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ onClose, imgUrl }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 max-w-5xl mx-auto">
        <div
          className="w-fit ml-auto p-2 rounded-full text-2xl hover:text-red-600 cursor-pointer transition-colors duration-300"
          onClick={() => onClose(false)}
        >
          <CgClose />
        </div>
        <div className="flex justify-center p-4">
          <img
            src={imgUrl}
            className="max-w-full max-h-screen object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;

// import React from "react";
// import { CgClose } from "react-icons/cg";

// const DisplayImage = ({ onClose, imgUrl }) => {
//   return (
//     <div className="fixed bottom-0 right-0 left-0 flex justify-center items-center">
//       <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
//         <div
//           className="w-fit ml-auto p-2 rounded-full text-2xl hover:text-red-600 cursor-pointer"
//           onClick={() => onClose(false)}
//         >
//           <CgClose />
//         </div>

//         <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
//           <img src={imgUrl} className="w-full h-full" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisplayImage;
