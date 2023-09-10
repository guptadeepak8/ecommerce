import React from "react";
import {  useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAsync, selectCart, selectCartStatus, updateCartAsync } from "../store/Cart/CartSlice";



const Cart = () => {
  const [open, setOpen] = useState(true);
  const items=useSelector(selectCart)
  const dispatch=useDispatch(); 
  const status=useSelector(selectCartStatus)
  const totalAmount=items && items.reduce((amount,item)=>item.product.price*item.qty+amount,0)

  const handleQuantity = (item, quantity) => {
    dispatch(updateCartAsync({ id: item.id, qty:quantity }));
  };

  const handleRemove=(itemId)=>{
    dispatch(deleteCartAsync(itemId))
  }

  if(status=="loading"){
    return (
      <>
      <h3>loading...</h3>
      </>
    )
  }

  return (
    <>
    <div className="mx-auto mt-10 max-w-5xl px-2 sm:px-6 lg:px-8">
      <span className="text-3xl ">Your Cart</span>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        {items && items.length===0 ?(
          <h3>no items</h3>
        ):
        (
          <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items && items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.product.href}>{item.product.name}</a>
                      </h3>
                      <p className="ml-4">${item.product.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mr-5 mb-10 text-xl font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <div className="flex">
                  <button
                    onClick={()=>{
                      if (item.qty > 1) {
                      handleQuantity(item, item.qty - 1); // Update the cart quantity
                    }}}
                    type="button"
                    className=" text-3xl text-indigo-600 hover:text-indigo-500 "
                  >
                    -
                  </button>
                  <span className="mx-2 text-3xl">{item.qty}</span>
                  <button
                    onClick={()=>handleQuantity(item, item.qty + 1)}
                    type="button"
                    className="font-medium text-3xl text-indigo-600 hover:text-indigo-500"
                  >
                    +
                  </button>
                  </div>
                    </div>

                    <div className="flex">
                      <button
                      onClick={()=>handleRemove(item.id)}
                        type="button"
                        className="font-medium  text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                   
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
          <p>${totalAmount}.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link to="/checkout"
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
