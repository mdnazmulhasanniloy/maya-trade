import React from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { FaGift } from "react-icons/fa";

const BigDiscount = () => {
  const products = [
    {
      _id: 1,
      discount: 50,
      img: "./images/flash/flash-1.png",
      title: "Shoes",
      price: 100,
    },
    {
      _id: 2,
      discount: 40,
      img: "./images/flash/flash-2.png",
      title: "Watch",
      price: 20,
    },
    {
      _id: 3,
      discount: 40,
      img: "./images/flash/flash-3.png",
      title: "Smart Mobile Black",
      price: 200,
    },
    {
      _id: 4,
      discount: 40,
      img: "./images/flash/flash-4.png",
      title: "Smart Watch Black",
      price: 50,
    },
    {
      _id: 5,
      discount: 50,
      img: "./images/flash/flash-1.png",
      title: "Shoes",
      price: 100,
    },
    {
      _id: 6,
      discount: 50,
      img: "./images/flash/flash-3.png",
      title: "Shoes",
      price: 100,
    },
  ];

  return (
    <section className="mt-20">
      <div className="w-[95%] mx-auto">
        <div className="heading flex items-center gap-2">
          <FaGift className="text-2xl text-[#e94560] m-3" />
          <h1 className="text-3xl font-bold">Big Discount</h1>
        </div>
        <div className=" w-11/12 mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {products.map((product, index) => (
              <div
                key={product?._id}
                className="max-w-45 p-3 shadow-2xl bg-white hover:cursor-pointer group"
              >
                <img
                  src={product?.img}
                  alt=""
                  className="ease-in-out duration-300 group-hover:-translate-y-2 group-hover:hover:scale-11"
                />
                <h4 className="text-md text-black font-bold">
                  {product?.title}
                </h4>
                <span>${product?.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigDiscount;
