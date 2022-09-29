import React, { FC } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";

export const menuleft = [
  {
    label: "Home",
    to: "/home",
  },
  {
    label: "Products",
    to: "/products",
  },
  {
    label: "Reviews",
    to: "/reviews",
  },
];

const App: FC<{}> = () => {
  const { cartTotalQuantity } = useSelector((state: any) => state.cart);
  return (
    <>
      <div className="bg-white shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-8 w-1/3">
              {menuleft.map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className="text-gray-500 hover:text-black relative"
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="w-1/3">
              <h2 className="text-2xl text-blue-500 font-bold text-center">
                Beauty.bd
              </h2>
            </div>
            <div className="w-1/3">
              <div className="flex items-center justify-end">
                <div className="rounded-full relative flex items-center justify-center text-2xl w-10 h-10 text-blue-500 cursor-pointer">
                  <Link to="/checkout">
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                </div>
                <div
                  className="h-6 w-6
        rounded-full absolute top-2 text-xs bg-red-500 text-white flex items-center justify-center"
                >
                  {cartTotalQuantity}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center">
        <Outlet />
      </div>
    </>
  );
};

export default App;
