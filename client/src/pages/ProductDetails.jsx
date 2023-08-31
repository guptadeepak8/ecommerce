import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetailsAsync,
  selectProductDetails,
} from "../store/productList/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectloggedInUser } from "../store/Auth/authSlice";
import { fetchCartAsync, selectCart } from "../store/Cart/CartSlice";




const defaultReviews = { href: "#", average: 0, totalCount: 0 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {

  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductDetails);
  const user=useSelector(selectloggedInUser)
  const navigate=useNavigate();
  const cart=useSelector(selectCart)

  
  useEffect(() => {
    dispatch(fetchProductDetailsAsync(params.id));
  }, [dispatch, params.id]);
  
 
  const handleClick=()=>{
    if(user){
      const newItem={product:product.id,qty:1,user:user.id}; 
      dispatch(fetchCartAsync(newItem))
    }
    else{
      navigate('/login')
    }
  }

  if (!product) {
    return <div>Loading...</div>; // or show a loading state
  }

  return (
    <div className="bg-white">
      {product ? (
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 >Reviews</h3>
                <div className="flex items-center">
                  <p >{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-10">
                <span className="text-red-500">{
                  product.stock===0?"Sorry product unavaible":(
                    product.stock<5?`hurry up! Only ${product.stock} available`:''
                  )
                  }</span>
                <button
                  type="submit"
                  onClick={handleClick}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
