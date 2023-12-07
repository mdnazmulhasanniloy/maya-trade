import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetOrderByTranIdQuery } from "../../../../features/orderSlice/orderApi";

const PaymentSuccess = () => {
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  const location = useLocation();
  const path = location?.pathname?.split("/");
  const tranId = path[path?.length - 1];

  const { data, isLoading, isSuccess, isError, error } =
    useGetOrderByTranIdQuery(tranId);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Order is Loading...", { id: "order" });
    }
    if (isSuccess) {
      toast.success("Order Load successful", { id: "order" });
    }
    if (isError) {
      toast.error(error?.data?.message, {
        id: "order",
      });
    }
  }, [isLoading, isSuccess, isError, data]);

  if (!data?.data) {
    return <h1>No Order</h1>;
  }

  const order = data?.data;
  console.log(order);

  // order?.products?.map((product) => console.log(product?.product?.title));
  // console.log("location", data.data);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-[20030] outline-none focus:outline-none h-100 mx-4">
        <div
          tabindex="-1"
          className="relative p-4 w-full max-w-md h-full md:h-auto"
        >
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <Link
              to="/chart"
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="successModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </Link>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <div className="mb-20">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Payment successful.
              </p>

              <div className="mt-3 mb-5">
                <div className="flex items-start">
                  <h1 className="text-start font-bold">TransitionId:</h1>
                  <p className="text-red-400 text-start text-sm ml-3">
                    {order?.transitionId}
                  </p>
                </div>
                <div className="flex items-start">
                  <h1 className="text-start font-bold">Price:</h1>
                  <p className="text-red-400 text-start text-sm ml-3">
                    {order?.Price}
                  </p>
                </div>
                <div className="flex items-start mb-5">
                  <h1 className="text-start font-bold">Products:</h1>
                  <p className="text-start  font-semibold  ml-3 mt-3">
                    <ol>
                      {order?.products?.map((product, index) => (
                        <li>
                          <strong className="mr-2">{index + 1}.</strong>{" "}
                          {product?.product?.title}
                        </li>
                      ))}
                    </ol>
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard/dashboard/my-orders"
                className="px-3 py-2 mr-3 border-2 rounded-md border-accent bg-accent text-white hover:bg-white hover:text-accent transition-all duration-500"
              >
                Show Orders
              </Link>
              <Link
                to="/"
                className="px-3 py-2 border-2 rounded-md border-accent bg-white text-accent hover:bg-accent hover:text-white transition-all duration-500"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0  z-[20020] bg-black"></div>
    </>
  );
};

export default PaymentSuccess;
