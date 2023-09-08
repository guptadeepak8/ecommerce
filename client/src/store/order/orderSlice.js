import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrder } from './orderApi';

const initialState = {
  orders: [], 
  currentOrder:null,
  status:'idle'
}

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
      const res = await createOrder(order);
      return res.data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder:(state)=>{
      state.currentOrder=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.orders.push(action.payload);
        state.currentOrder=action.payload
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.status = 'failed';
      })
    }
})


export const {resetOrder}=orderSlice.actions


 export const selectOrder=(state)=>state.order.orders
 export const selectCurrentOrder=(state)=>state.order.currentOrder
 export const selectOrderStatus = (state) => state.order.status;
export default orderSlice.reducer