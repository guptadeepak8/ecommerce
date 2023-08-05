import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  status:'idle'
}

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
      const res = await checkUser(order);
      return res.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.status = 'failed';
      })
    }
})



 export const selectOrder=(state)=>state.order.orders
 
export default counterSlice.reducer