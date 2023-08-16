import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectloggedInUser } from "../store/Auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrders,
} from "../store/User/userSlice";

const Orders = () => {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(orders);
      dispatch(fetchLoggedInUserOrdersAsync(user.id));
    }
  }, []);

  return (
    <>
      {!user && <Navigate to="/login" replace={true} />}
      <div>
        <h3 className="text-3xl mx-3 my-2">Your All Orders</h3>
        {orders.map((order) => {
          return (
            <div key={order.id}>
              <div className="mx-auto mt-8 max-w-5xl px-2 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-grey-900">Order no:-{order.id}</h2>
                <h4 className="text-xl font-bold tracking-tight text-grey-900 ">Order status:-<span className="text-red-900">{order.status}</span></h4>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  {order.length === 0 ? (
                    <h3>no products order</h3>
                  ) : (
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {order.products.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.thumbnail}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.title}</a>
                                  </h3>
                                  <p className="ml-4">${product.price}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty:{product.qty}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.totalAmount}.00</p>
                  </div>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Orders;
