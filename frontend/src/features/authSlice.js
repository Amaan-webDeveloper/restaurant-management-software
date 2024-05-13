import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin:false,
  status: false,
  userData:null,
  orderData: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.isAdmin = true
      state.status = true;
      state.userData = action.payload;
    },
    login: (state, action) => {
      state.status = true;
    },
    logout: (state) => {
      state.isAdmin=false;
      state.status = false;
      state.userData = null;
    },
    newOrder: (state,action) => {
      state.orderData.push(action.payload);
    },
    removeOrderItem: (state,action) => {
      state.orderData = action.payload.orders.filter((order)=>{
        return order._id != action.payload.id
        
      })
    },
  },
});

export const { login, logout,adminLogin,newOrder,removeOrderItem } = authSlice.actions;

export default authSlice.reducer;
