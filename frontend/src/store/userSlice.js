
import {createSlice} from "@reduxjs/toolkit";

 
  const initialState  = {
    user:null,
    count:0,
  }

  export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails :(state,action)=>{
              state.user = action.payload
        },
        setUserCount:(state,action)=>{
            state.count = action.payload
        }
    } 
  });

     export const {setUserDetails,setUserCount} = UserSlice.actions;

     export default UserSlice.reducer; 