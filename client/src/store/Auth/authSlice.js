import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, createUser, signOutUser,checkUser} from "./authApi";


const initialState = {
  loggedInUserToken:null,
  status: "idle",
  error:null,
  userCheck:false
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
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData,{rejectWithValue}) => {
    try {
      const res = await loginUser(userData);
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error)
    }
      
  }
);
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async () => {
    try {
      const res = await checkUser();
      return res.data;
    } catch (error) {
      console.log(error);
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
        state.loggedInUserToken = action.payload ;
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUserToken = action.payload ;
      })
      .addCase(loginUserAsync.rejected, (state,action) => {
        state.status = 'failed';
        state.error=action.payload
      })
      .addCase(checkUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUserToken = action.payload ;
        state.userCheck = true;
      })
      .addCase(checkUserAsync.rejected, (state,action) => {
        state.status = 'failed';
        state.userCheck = true;
      })
      .addCase(signOutUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUserToken = null;
      })
      .addCase(signOutUserAsync.rejected, (state,action) => {
        state.status = 'failed';
      })
      
  },
});


export const selectloggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserCheck = (state) => state.auth.userCheck;

export default authSlice.reducer;
