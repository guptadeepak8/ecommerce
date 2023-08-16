
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from "./pages/Cart.jsx";
import ProductList from "./component/ProductList.jsx";
import Checkout from "./pages/Checkout.jsx";
import Protected from "./utils/Protected.jsx";
import ProductDetails from "./pages/productDetails.jsx";
import CheckUser from "./utils/CheckUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectloggedInUser } from "./store/Auth/authSlice.js";
import { fetchItemsByIdAsync } from "./store/Cart/CartSlice.js";
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Orders from "./pages/Orders.jsx";



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
        element: <Orders/>,
      },
      {
        path: "/checkout",
        element: <Protected><Checkout /></Protected>,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails/>,
      },
      {
        path: "/order-success/:id",
        element: <OrderSuccess></OrderSuccess>,
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
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  
  
]);

const App=()=>{

const dispatch=useDispatch();
const user=useSelector(selectloggedInUser)

useEffect(() => {
 if(user){
  dispatch(fetchItemsByIdAsync(user.id))
 }
}, [dispatch,user])

  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
