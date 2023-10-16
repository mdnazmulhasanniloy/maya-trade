import React, { useEffect, useState } from "react";
import {
  FaBolt,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import Slider from "react-slick";
import ProductCard from "../../../Components/ProductCard/ProductCard";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button
        className="absolute top-2/4  right-0 z-30 w-10 h-10
                  bg-[#0f3460] hover:bg-transparent 
                  text-white hover:text-black
                  border-2 border-black rounded-full  
                  flex justify-center items-center 
                  transition-all duration-300"
      >
        <FaLongArrowAltRight />
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button
        className="absolute top-2/4 left-0 z-30 w-10 h-10
                  bg-[#0f3460] hover:bg-transparent 
                  text-white hover:text-black
                   border-2 border-black rounded-full  
                   flex justify-center items-center 
                   transition-all duration-300"
      >
        <FaLongArrowAltLeft />
      </button>
    </div>
  );
};

const FlashDeals = () => {
  const [items, setItems] = useState([]);
  const Data = [
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="flash bg-[#f6f9fc] mt-10">
        <div className="w-[95%] mx-auto">
          <div className="heading flex">
            <FaBolt className="text-[#e94560] m-3" />
            <h1 className="text-3xl font-bold">Flash Deals</h1>
          </div>
          <div className=" w-11/12 mx-auto">
            <Slider {...settings}>
              {Data?.length > 0 &&
                Data?.map((product, i) => (
                  <ProductCard product={product} key={product?._id} />
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlashDeals;
