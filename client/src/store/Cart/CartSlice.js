import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart, deleteItems, fetchItemsById, resetCart, updateCart } from "./cartApi";


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
  async () => {
    const res = await fetchItemsById();
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
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async () => {
    const res = await resetCart();
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
       const updatedItem = action.payload;
       state.items = state.items.map((item) =>
       item.id === updatedItem.id ? updatedItem : item
  );
      })
      .addCase(updateCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      
      .addCase(deleteCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "success";
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(deleteCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(resetCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.items=[];
      })
      .addCase(resetCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      
  },
});

export const selectCart = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export default cartSlice.reducer;
