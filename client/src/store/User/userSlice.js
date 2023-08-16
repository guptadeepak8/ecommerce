import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllOrders } from './userApi';

const initialState = {
  userOrders:[],
  status:'idle'
}

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "userOrder/fetchLoggedInUserOrders",
  async (userId) => {
      const res = await fetchAllOrders(userId);
      return res.data;
  }
);

export const userSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.userOrders=action.payload
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state) => {
        state.status = 'failed';
      })
    }
})



 export const selectUserOrders=(state)=>state.user.userOrders


export default userSlice.reducer