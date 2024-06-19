import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { displayCurrency } from "../../src/helpers/displayCurrency";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../common";

const AdminProductCard = ({ data, refresh }) => {
  console.log("datas", data);
  const [close, onClose] = useState(false);

  async function handleProductDelete(Id) {
    console.log("log", Id);
    try {
      const payload = {
        product_id: Id,
      };

      const { data } = await axios.post(Api.product_delete_admin.url, payload, {
        withCredentials: true,
      });

      if (data?.status) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        refresh();
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
        <img src={data?.productImage[0]} alt={data?.productName} className="m-auto object-fill h-full"  />

        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>

        <div>
          <p>{displayCurrency(data?.selling)}</p>

          <div className="w-fit bg-red-500 ml-auto p-2 rounded-full hover:text-white cursor-pointer">
            <MdModeEditOutline onClick={() => onClose(true)} />
          </div>
        </div>

        {close && (
          <AdminEditProduct
            onClose={() => onClose(false)}
            dataDe={data}
            refresh={refresh}
          />
        )}

        <button onClick={() => handleProductDelete(data._id)}>Delete</button>
      </div>
    </div>
  );
};

export default AdminProductCard;
