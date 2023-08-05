import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart, deleteItems, fetchItemsById, updateCart } from "./cartApi";


const initialState = {
  items: [],
  status: "idle",
};

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (items) => {
    const res = await addCart(items);
    return res.data;
  }
);
export const fetchItemsByIdAsync = createAsyncThunk(
  "cart/fetchItemsById",
  async (userId) => {
    const res = await fetchItemsById(userId);
    return res.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (item) => {
    const res = await updateCart(item);
    return res.data;
  }
);
export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async (item) => {
    const res = await deleteItems(item);
    return res.data;
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    // for fetching cart
      .addCase(fetchCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.items.push(action.payload);
      })
      .addCase(fetchCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchItemsByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByIdAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.items=action.payload;
      })
      .addCase(fetchItemsByIdAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "success";
        const Index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[Index]=action.payload;
      })
      .addCase(updateCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      
      .addCase(deleteCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "success";
        const filter=state.items.filter(item=>item.id !== action.payload.id)
        state.items=filter;
      })
      .addCase(deleteCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      
  },
});

export const selectCart = (state) => state.cart.items;

export default cartSlice.reducer;
