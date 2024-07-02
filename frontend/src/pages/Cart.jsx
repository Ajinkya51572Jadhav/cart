import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../common";
import Context from "../context/index";
import { displayCurrency } from "../helpers/displayCurrency";

const Cart = () => {
  const { fetchUserCartCount } = useContext(Context);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      setLoading(true);
      const { data } = await axios.get(Api?.cart?.url, {
        withCredentials: true,
      });

      if (data?.status) {
        setLoading(false);
        setCart(data?.cart);
      } else {
        setLoading(false);
        toast.error(data?.message, {
          autoClose: 3000,
          position: "top-right",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
    }
  }

  async function increaseQuantity(id, quantity) {
    try {
      const payload = {
        _id: id,
        quantity: quantity + 1,
      };
      const { data } = await axios.post(Api?.update_cart_inc?.url, payload, {
        withCredentials: true,
      });

      if (data?.status) {
        fetchCart();
        toast.success(data?.message, {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
        });
      } else {
        toast.error(data?.message, {
          autoClose: 3000,
          position: "top-right",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
    }
  }

  async function decreaseQuantity(id, quantity) {
    try {
      const payload = {
        _id: id,
        quantity: quantity - 1,
      };
      const { data } = await axios.post(Api?.update_cart_dec?.url, payload, {
        withCredentials: true,
      });

      if (data?.status) {
        fetchCart();
        toast.success(data?.message, {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
        });
      } else {
        toast.error(data?.message, {
          autoClose: 3000,
          position: "top-right",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
    }
  }

  async function deleteCartItem(id) {
    try {
      const payload = {
        _id: id,
      };
      const { data } = await axios.post(Api?.delete_cart?.url, payload, {
        withCredentials: true,
      });

      if (data?.status) {
        fetchUserCartCount();
        fetchCart();
        toast.success(data?.message, {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
        });
      } else {
        toast.error(data?.message, {
          autoClose: 3000,
          position: "top-right",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
    }
  }

  const quantityTotal = cart.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = cart.reduce((prev, curr) =>
     prev + curr.quantity * curr.product_id.selling,
    0
  );

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Your Cart</h2> */}
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="w-full lg:w-2/3">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto ">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="w-full bg-gray-100 border-b">
                    <th className="p-4 text-left">Products</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Total</th>
                    <th className="p-4 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item) => (
                    <tr key={item?.product_id?._id} className="border-b">
                      <td className="p-4 flex items-center">
                        <img
                          src={item?.product_id?.productImage[0]}
                          alt={item?.product_id?.productName}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-light text-gray-600">
                            {item?.product_id?.productName}
                          </h3>
                        </div>
                      </td>
                      <td className="p-4">₹{item?.product_id?.price}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              decreaseQuantity(item?._id, item?.quantity)
                            }
                            disabled={item?.quantity === 1}
                            className="bg-gray-200 px-2 py-1 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 bg-gray-100 border-t border-b">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              increaseQuantity(item?._id, item?.quantity)
                            }
                            className="bg-gray-200 px-2 py-1 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        ₹{item?.quantity * item?.product_id?.price}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteCartItem(item?._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3 lg:pl-4 mt-8 lg:mt-0">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{displayCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Quantity</span>
              <span>{quantityTotal}</span>
            </div>
            {/* <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹46.15</span>
            </div> */}
            <div className="border-t mt-2 pt-2">
              <div className="flex justify-between font-bold">
                <span>Grand Total</span>
                <span>{displayCurrency(totalPrice)}</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;