import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchBrands, fetchCategories, fetchProductDetails, fetchProductsByFilters } from "./productApi";

const initialState = {
  products: [],
  category:[],
  brands:[],
  productDetails:null,
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    try {
      const res = await fetchAllProducts();
    return res.data;
    } catch (error) {
        console.log(error);
    }
    
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({filter,sort}) => {
    const res = await fetchProductsByFilters(filter,sort);
    return res.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const res = await fetchCategories();
    return res.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchbrands",
  async () => {
    const res = await fetchBrands();
    return res.data;
  }
);
export const fetchProductDetailsAsync = createAsyncThunk(
  "product/fetchProductDetails",
  async (id) => {
    const res = await fetchProductDetails(id);
    return res.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // for fetching products
      .addCase(fetchAllProductsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      //for filtering products
      .addCase(fetchProductsByFilterAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.rejected, (state) => {
        state.status = 'failed';
      })
      //for fetching categories
      .addCase(fetchCategoriesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.category = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      //for fetching brands
      .addCase(fetchBrandsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      //for fetching product Details
      .addCase(fetchProductDetailsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetailsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetailsAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});


export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.category;
export const selectBrands = (state) => state.product.brands;
export const selectProductDetails = (state) => state.product.productDetails;

export default productSlice.reducer;
