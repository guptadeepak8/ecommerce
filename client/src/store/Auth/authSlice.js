import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOutUser} from "./authApi";


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
  async (userData,{rejectWithValue}) => {
    try {
      const res = await checkUser(userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error)
    }
      
  }
);

export const signOutUserAsync = createAsyncThunk(
  "user/signOutUser",
  async (userId) => {
      const res = await signOutUser(userId);
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
        state.error=action.payload
      })
      .addCase(signOutUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUser = null;
      })
      .addCase(signOutUserAsync.rejected, (state,action) => {
        state.status = 'failed';
      })
      
  },
});


export const selectloggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
