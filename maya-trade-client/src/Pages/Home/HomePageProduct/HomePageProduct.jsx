import React from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { BsArrowRight } from "react-icons/bs";
const HomePageProduct = () => {
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
    <section className="flash bg-[#f6f9fc] mt-10">
      <div className="w-[95%] mx-auto">
        <div className="heading flex justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <button className="">
            See All Products{" "}
            <BsArrowRight className="2xl inline animate-bounce " />
          </button>
        </div>
        <div className=" w-11/12 mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products?.length > 0 &&
              products?.map((product, i) => (
                <ProductCard product={product} key={product?._id} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageProduct;
