import { Outlet } from "react-router-dom";
import './App.css';
import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { Footer } from './components/Footer';
import { Api } from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails ,setUserCount} from "./store/userSlice";

   

function App() {
  const dispatch = useDispatch();

  async function fetchUserDetails() {
    try {
      const { data } = await axios.get(Api.user.url,{
        withCredentials: true
      });
  
      if (data?.status){
        dispatch(setUserDetails(data?.user));
      }else{
        toast.error(data?.message);
      }  
    } catch (error) {
        toast.error(error.message,{
          autoClose:true,
          position:"top-right"
        })
    }
  };


  async function fetchUserCartCount() {

    try {
      
      const { data } = await axios.get(Api.countAdded.url,{
        withCredentials:true
      });
      console.log("countdata",data);
  
      if (data?.status){
        dispatch(setUserCount(data?.count));
      }else{
        toast.error(data?.message);
      };


    } catch (error) {
      toast.error(error.message,{
        autoClose:true,
        position:"top-right"
      })
    }
   
  }

  useEffect(() => {
    fetchUserCartCount();
  }, []);


  useEffect(() => {
    fetchUserDetails();  
  }, []);


  return (
    < > 
      <Context.Provider value={{ fetchUserDetails , fetchUserCartCount }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>

  );
}

export default App;
