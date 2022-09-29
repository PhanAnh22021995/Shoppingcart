import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../features/productsApi";
import {
  addToCart,
  decreaseCart,
  increaseCart,
} from "../../features/cartSlice";
import Loading from "../../components/Loading";

const listProducts = `http://localhost:4000/api/products`;

const Products = () => {
  const { data }: any = useGetAllProductsQuery(listProducts);
  const [currentProduct, setCurrentProduct] = useState<any>({});
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const loading = useSelector((state: any) => state.products.loading);
  console.log(loading);

  useEffect(() => {
    if (data) {
      setCurrentProduct(data[0]);
    }
  }, [data]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product: any) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product: any) => {
    dispatch(increaseCart(product));
  };

  const handleGetDetail = (productId: number) => {
    const getProduct = data.find((item: any) => item.productId === productId);
    setCurrentProduct(getProduct);
  };
  return (
    <div>
      {loading ? <Loading /> : <></>}
      <div className=" wrapper-products pt-5">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-12 h-full gap-5">
            <div className="col-span-7 h-full">
              <div className="flex flex-col gap-y-3 h-full p-8 shadow-lg bg-white rounded-lg ">
                <div className="h-3/4">
                  <div className="relative h-full">
                    <div
                      className="absolute w-full h-full top-0 left-0"
                      style={{
                        backgroundImage: `url(${currentProduct.imageUrl})`,
                        backgroundSize: "50%",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="h-1/4 grid grid-cols-12">
                  <div className="col-span-12 mb-4">
                    <div className="grid grid-cols-12 w-full">
                      <div className="col-span-10">
                        <h2 className="text-4xl font-normal mb-2 text-left">
                          {currentProduct?.productName}
                        </h2>
                        <p className="text-md font-light text-gray-700 text-left">
                          {currentProduct?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex items-center justify-between mt-5">
                      <div className="w-1/6">
                        <div className="flex items-center justify-between bg-gray-200 rounded-lg px-5 py-1 ">
                          <button
                            className="outline-none border-0 bg-transparent text-orange-600"
                            onClick={() => handleDecreaseCart(currentProduct)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <div className="text-black font-semibold text-lg">
                            {cart.cartTotalQuantity}
                          </div>
                          <button
                            className="outline-none border-0 bg-transparent text-orange-600"
                            onClick={() => handleIncreaseCart(currentProduct)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-8">
                        <p className="mb-0 font-bold  text-3xl">
                          ${currentProduct?.price}
                        </p>
                        <button
                          className="flex items-center justify-center duration-100 shadow-md gap-2 px-6 py-3 text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-400 false gap-4"
                          onClick={() => handleAddToCart(currentProduct)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5 h-full overflow-auto rounded-lg">
              <div className="grid grids-col-12 gap-3 h-auto">
                {data && (
                  <>
                    {data.map((product: any, index: number) => (
                      <div className="col-span-12" key={index}>
                        <div className="flex h-44 gap-3 px-4 py-4 rounded-lg bg-white shadow-lg ">
                          <div className="w-2/6 h-100 mr-3 rounded-lg overflow-hidden">
                            <img
                              src={product.imageUrl}
                              alt=""
                              className="image-right"
                            />
                          </div>
                          <div className="w-4/6 flex flex-col justify-between text-left">
                            <div>
                              <h4
                                className="text-xl cursor-pointer hover:text-blue-500 font-semibold"
                                onClick={() =>
                                  handleGetDetail(product.productId)
                                }
                              >
                                {product.productName}
                              </h4>
                              <p className="text-md font-light text-gray-700">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <h3 className="text-2xl font-semibold">
                                ${product.price}
                              </h3>
                              <button
                                className="flex items-center justify-center duration-100 shadow-md gap-2 px-4 py-2 text-md rounded-md text-blue-500 hover:text-blue-400 shadow-none false "
                                onClick={() =>
                                  handleGetDetail(product.productId)
                                }
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
