import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  checkout,
  decreaseCart,
  getTotals,
  increaseCart,
  removeFromCart,
} from "../../features/cartSlice";

const Checkout = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals(cart));
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem: any) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem: any) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem: any) => {
    dispatch(increaseCart(cartItem));
  };

  const handleCheckout = () => {
    dispatch(checkout(cart));
    navigate("/products");
  };

  return (
    <div>
      <div>
        <div
          className="rounded-lg mx-auto overflow-hidden bg-transparent container xl:px-48"
          style={{ height: "auto" }}
        >
          <div className="grid lg:grid-cols-12 pt-5 gap-4 h-full auto-rows-min">
            <div className="lg:col-span-12">
              <div className="p-3 bg-white shadow-lg w-full rounded-lg">
                <div className="w-full text-center font-semibold">
                  My Shopping Cart
                </div>
              </div>
            </div>
            {cart.cartItems.length === 0 ? (
              <div className="lg:col-span-8 overflow-auto">
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    <div className="grid girds-col-12 gap-4 w-full h-full rounded-lg overflow-auto">
                      <h4 className="text-center mt-12 font-bold text-xl">
                        You have no products in cart
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-8 overflow-auto">
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    <div className="grid girds-col-12 gap-4 w-full h-full rounded-lg overflow-auto">
                      {cart.cartItems.map((cartItem: any, index: number) => (
                        <div
                          key={index}
                          className="w-full flex items-center shadow-lg gap-3 px-2 py-3 bg-white rounded-lg h-44"
                        >
                          <div
                            className="w-1/3 h-full"
                            style={{
                              backgroundImage: `url(${cartItem.imageUrl})`,
                              backgroundSize: "50%",
                              backgroundPosition: "center center",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                          <div className="w-2/3 gap-1 flex flex-col items-start justify-between">
                            <div className="flex items-center justify-between w-full">
                              <h6 className="text-lg font-semibold">
                                {cartItem.productName}
                              </h6>
                              <button
                                className="flex items-center justify-center duration-100 shadow-md gap-2 px-4 py-2 text-md rounded-md text-red-500 hover:text-red-400 shadow-none false"
                                onClick={() => handleRemoveFromCart(cartItem)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                            <div className="mb-2 pr-6">
                              <p className="text-sm text-gray-700 font-light text-left">
                                {cartItem.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between w-full pr-6">
                              <div className="flex items-center justify-between bg-gray-200 rounded-lg px-5 py-1 w-1/3">
                                <button
                                  className="outline-none border-0 bg-transparent text-orange-600"
                                  onClick={() => handleDecreaseCart(cartItem)}
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </button>
                                <div className="text-black font-bold text-lg">
                                  {cartItem.cartQuantity}
                                </div>
                                <button
                                  className="outline-none border-0 bg-transparent text-orange-600"
                                  onClick={() => handleIncreaseCart(cartItem)}
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                              </div>
                              <p className="mb-0 font-bold  text-3xl">
                                $
                                {(
                                  cartItem.cartQuantity * cartItem.price
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <div className="bg-gray-100 px-4 py-2 grid gap-1 gird-cols-12 w-full rounded-lg h-44">
                    <div className="col-span-12">
                      <h6 className="text-lg font-medium">Order Info</h6>
                    </div>
                    <div className="col-span-12 text-lg">
                      <div className="flex items-center justify-between">
                        <p className="font-light text-gray-700">Subtotal:</p>
                        <p className="font-normal">
                          ${(cart.cartTotalAmount - 10).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-light text-gray-700">
                          Shipping Cost:
                        </p>
                        <p className="font-normal">$10</p>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="flex items-center justify-between font-semibold text-3xl">
                        <p className="">Total:</p>
                        <p className="">${cart.cartTotalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12">
                  <button
                    type="submit"
                    className="flex items-center justify-center duration-100 shadow-md gap-2 px-4 py-2 text-md rounded-md bg-blue-500 text-white false w-full "
                    onClick={() => handleCheckout()}
                    style={{
                      cursor:
                        cart.cartItems.length === 0 ? "not-allowed" : "pointer",
                      backgroundColor:
                        cart.cartItems.length === 0 ? "#90b5f0" : "bg-blue-500",
                    }}
                  >
                    Checkout
                  </button>
                </div>
                <div className="col-span-12">
                  <div className="flex items-center justify-center duration-100 shadow-md gap-2 px-4 py-2 text-md rounded-md border border-blue-500 text-blue-500 hover:bg-blue-200 false w-full">
                    <Link to="/">Continue shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
