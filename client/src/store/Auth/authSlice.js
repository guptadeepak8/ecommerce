import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, updateUser } from "./authApi";


const initialState = {
  loggedInUser:null,
  status: "idle",
  error:null
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    try {
      
      const res = await createUser(userData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (userData) => {
      const res = await checkUser(userData);
      return res.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
      const res = await updateUser(userData);
      return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // for login user
      .addCase(createUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUser = action.payload ;
        console.log(action.payload);
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(checkUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUser = action.payload ;
      })
      .addCase(checkUserAsync.rejected, (state,action) => {
        state.status = 'failed';
        state.error=action.error
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUser = action.payload ;
      })
      .addCase(updateUserAsync.rejected, (state,action) => {
        state.status = 'failed';
      })
      
  },
});


export const selectloggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
