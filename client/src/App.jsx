
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from "./pages/Cart.jsx";
import ProductList from "./component/ProductList.jsx";
import Checkout from "./pages/Checkout.jsx";
import Protected from "./utils/Protected.jsx";

import CheckUser from "./utils/CheckUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAsync, selectloggedInUser, selectUserCheck } from "./store/Auth/authSlice.js";
import { fetchItemsByIdAsync } from "./store/Cart/CartSlice.js";
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Orders from "./pages/Orders.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import { fetchLoggedInUserAsync } from "./store/User/userSlice.js";
import Logout from "./component/Logout.jsx";
import UserProfile from "./pages/UserProfile.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children:[
      { index: true, element: <ProductList /> },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/order",
        element: <Protected><Orders/></Protected>,
      },
      {
        path: "/checkout",
        element: <Protected><Checkout /></Protected>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails/>,
      },
      {
        path: "/order-success/:id",
        element: <OrderSuccess></OrderSuccess>,
      },
      {
        path: "/user-profile",
        element: <Protected><UserProfile/></Protected>,
      },
    ]
  },
  {
    path: "/login",
    element:<Login />,
  },
  {
    path: "/register",
    element: <CheckUser><Register /></CheckUser>,
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  
  
]);

const App=()=>{

const dispatch=useDispatch();
const user=useSelector(selectloggedInUser)
const userCheck=useSelector(selectUserCheck)
useEffect(()=>{
  dispatch(checkUserAsync())
},[])

useEffect(() => {
 if(user){
  dispatch(fetchItemsByIdAsync())
  dispatch(fetchLoggedInUserAsync());
 }
}, [dispatch,user])

  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
