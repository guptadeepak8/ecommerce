import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productList/productSlice';
import authReducer from './Auth/authSlice'
import cartReducer from './Cart/CartSlice'
import orderReducer from './order/orderSlice';

const store = configureStore({
  reducer: {
    auth:authReducer,
    product:productReducer,
    cart:cartReducer,
    order:orderReducer
  },
  
});

export default store;