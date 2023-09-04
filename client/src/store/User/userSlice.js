import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllOrders, fetchLoggedInUser, updateUser } from './userApi';

const initialState = {
  userInfo:null,
  status:'idle'
}

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
      const res = await fetchAllOrders();
      return res.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
      const res = await updateUser(userData);
      return res.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
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
        state.userInfo.orders=action.payload
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload ;
      })
      .addCase(updateUserAsync.rejected, (state,action) => {
        state.status = 'failed';
      })
      .addCase(fetchLoggedInUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload ;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state,action) => {
        state.status = 'failed';
      })
    }
})



 export const selectUserOrders=(state)=>state.user.userInfo.orders;
 export const selectUserInfo = (state) => state.user.userInfo;
 export const selectUserInfoStatus = (state) => state.user.status;
export default userSlice.reducer