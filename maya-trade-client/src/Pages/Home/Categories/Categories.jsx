import React from "react";

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Fashion",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Electronic",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Home & Garden",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Gifts",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Music",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Health & Beauty",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Pets",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Baby Toys",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Groceries",
    },
  ];
  return (
    <section className="shadow-lg py-3 gird grid-cols-1 gap-4 bg-white">
      {data?.map((value, index) => (
        <div
          className="box flex items-center transition-all duration-300 px-5 hover:bg-[#ffe1ef] cursor-pointer"
          key={index}
        >
          <img
            className=" w-8 h-8 mt-3 object-contain"
            src={value?.cateImg}
            alt=""
          />
          <span className=" mx-5 my-3 capitalize">{value?.cateName}</span>
        </div>
      ))}
    </section>
  );
};

export default Categories;
