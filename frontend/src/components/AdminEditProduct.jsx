import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { Api } from "../common";
import { toast } from "react-toastify";
import productCategory from "../../src/components/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imgTobase64 } from "../helpers/imgTobase64";
import UploadImage from "../helpers/UploadImage";
import { MdDelete } from "react-icons/md";
import DisplayImage from "../components/DisplayImage";

const AdminEditProduct = ({ onClose, dataDe ,refresh}) => {
  console.log("Datas", dataDe);

  const [data, setData] = useState({
    // ...dataDe, 
    _id: dataDe?._id,
    productName: dataDe.productName || "",
    brnadName: dataDe?.brnadName || "",
    category: dataDe?.category || "",
    productImage: dataDe?.productImage || [],
    description: dataDe?.description || "",
    price: dataDe?.price || "",
    selling: dataDe?.selling || "",
  });

  const [openfullScreen, setOpenFullScreen] = useState(false);
  const [showfullScreen, setShowFullScreen] = useState();

  function handleOnChange(e) {
    setData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleData(e) {
    e.preventDefault();

    const payload = data;
    console.log("data payload ", payload);

    try {
      const { data } = await axios.post(Api.product_edit_admin.url, payload, {
        withCredentials: true,
      });

      if (data?.status) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 1000,
        });
        refresh();
        onClose();
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
  }

  async function handleProductUpload(e) {
    console.log("file", e.target.files);
    const file = e.target.files[0];

    const cloudImage = await UploadImage(file);
    console.log("cldImg", cloudImage);
    setData((pre) => {
      return {
        ...pre,
        productImage: [...pre.productImage, cloudImage?.url],
      };
    });
  }

  function handleDeleteProfile(indexArr) {
    const delPro = data.productImage.filter((elm, index) => indexArr !== index);
    setData({ ...data, productImage: delPro });
  }

  return (
    <div className="fixed w-full h-full bg-slate-100 bg-opacity-35  top-20 left-0 right-0 bottom-0  flex justify-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Products</h2>
          <div
            className="w-fit ml-auto text-2xl   hover:text-red-600 cursor-pointer"
            onClick={() => onClose()}
          >
            <CgClose />
          </div>
        </div>

        <form
          onSubmit={handleData}
          className="grid p-4  overflow-auto h-full pb-4"
        >
          <lable htmlFor="productName">Product Name : </lable>
          <input
            type="text"
            name="productName"
            value={data?.productName}
            onChange={handleOnChange}
            id={"productName"}
            placeholder="Product Name"
            className="p-2 bg-slate-100 border rounded"
          />

          <lable htmlFor="brnadName">brnad Name : </lable>
          <input
            type="text"
            name="brnadName"
            value={data?.brnadName}
            onChange={handleOnChange}
            id={"brnadName"}
            placeholder="Brand Name"
            className="p-2 bg-slate-100 border rounded"
          />

          <lable htmlFor="category">Category</lable>
          <select
            name="category"
            value={data?.category}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            {productCategory &&
              productCategory?.map((cate) => {
                return (
                  <>
                    <option key={cate?.id} value={cate?.value}>
                      {cate?.label}
                    </option>
                  </>
                );
              })}
          </select>

          <lable htmlFor="productImage" className="mt-3">
            Product Image :{" "}
          </lable>
          <div className="p-2 bg-slate-100  rounded h-32 w-full flex justify-center items-center cursor-pointer">
            <lable htmlFor="uploadImageInput" className=" border-dashed">
              <div className="text-slate-500   flex justify-center   items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image </p>
                <input
                  type="file"
                  id="uploadImageInput"
                  onChange={handleProductUpload}
                  className="opacity-10"
                />
              </div>
            </lable>
          </div>

          <div className="gap-3">
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 mt-2">
                {data?.productImage.map((elm, index) => {
                  return (
                    <div className="relative cursor-pointer rounded-md">
                      <div
                        className="absolute cursor-pointer 
                       bottom-0 right-0 p-1 text-white bg-red-600 rounded-full
                       group-hover:block z-10
                       
                    "
                      >
                        <MdDelete onClick={() => handleDeleteProfile(index)} />
                      </div>

                      <img
                        src={elm || ""}
                        alt={elm}
                        width={80}
                        height={80}
                        className="p-2 bg-slate-100 border"
                        onClick={() => {
                          setOpenFullScreen(true);
                          setShowFullScreen(elm);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                Please Upload product Image
              </p>
            )}
          </div>

          <lable htmlFor="price" className="mt-3">
            price :{" "}
          </lable>
          <input
            type="number"
            name="price"
            value={data?.price}
            onChange={handleOnChange}
            id={"price"}
            placeholder="Price"
            className="p-2 bg-slate-100 border rounded"
          />

          <lable htmlFor="selling">selling : </lable>
          <input
            type="number"
            name="selling"
            value={data?.selling}
            onChange={handleOnChange}
            id={"selling"}
            placeholder="Selling"
            className="p-2 bg-slate-100 border rounded"
          />

          <lable htmlFor="description" className="mt-3">
            description :{" "}
          </lable>
          <textarea
            rows={3}
            name="description"
            value={data?.description}
            onChange={handleOnChange}
            id={"description"}
            placeholder="Description"
            className="p-2 h-28 bg-slate-100 border rounded resize-none border-dashed "
          />

          <button
            type="submit"
            className="px-3 py-2 bg-red-600 text-white 
         mb-10 hover:bg-red-700 mt-5
        "
          >
            upload
          </button>
        </form>
      </div>
      {openfullScreen && (
        <DisplayImage onClose={setOpenFullScreen} imgUrl={showfullScreen} />
      )}
    </div>
  );
};

export default AdminEditProduct;
