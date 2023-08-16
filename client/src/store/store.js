import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productList/productSlice';
import authReducer from './Auth/authSlice'
import cartReducer from './Cart/CartSlice'
import orderReducer from './order/orderSlice';
import userReducer from './User/userSlice'

const store = configureStore({
  reducer: {
    auth:authReducer,
    product:productReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducer,
  },
  
});

export default store;