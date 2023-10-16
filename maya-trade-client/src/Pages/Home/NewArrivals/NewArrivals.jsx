import React from "react";
import { FaBolt } from "react-icons/fa";

const NewArrivals = () => {
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
    <section className="mt-10">
      <div className="w-[95%] mx-auto">
        <div className="heading flex items-center gap-2">
          <img
            src="https://img.icons8.com/glyph-neue/64/26e07f/new.png"
            alt=""
          />
          <h1 className="text-3xl font-bold">New Arrivals</h1>
        </div>
        <div className=" w-11/12 mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, index) => {
              return (
                <div
                  className="p-3 rounded-tl-2xl rounded-br-2xl bg-white shadow-2xl  hover:bg-[#fac3dd] cursor-pointer hover:shadow-2xl transition-all duration-500"
                  key={index}
                >
                  <div className="img">
                    <img src={product?.img} alt="" />
                  </div>
                  <h4 className="text-md text-black font-bold">
                    {product?.title}
                  </h4>
                  <span>${product?.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
