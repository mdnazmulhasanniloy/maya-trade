import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderData from "./SliderData";

const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => <ul className=" absolute m-0 bottom-5">{dots}</ul>,
  };
  console.log(SliderData);
  return (
    <>
      <Slider {...settings}>
        {SliderData.map((value, index) => (
          <div className="box d_flex  p-5" key={index}>
            <div className="md:w-[70%] z-[333] ">
              <h1 className=" text-lg md:font-bold  md:text-2xl lg:text-5xl text-white md:text-black">
                {value.title}
              </h1>
              <p className=" mx-5 text-white md:text-black">{value.desc}</p>
              <button className=" px-10 py-3 rounded-md font-bold text-white bg-[#e94560]">
                Visit Collections
              </button>
            </div>

            <div className="w-[30%] hidden md:block">
              <img src={value.cover} alt="" className="w-full h-full " />
            </div>
            <div className="w-full md:hidden absolute top-0 left-0 z-[111]">
              <img src={value.cover} alt="" className="w-full h-full " />
            </div>
            <div className="w-full h-full md:hidden absolute top-0 left-0 z-[222] bg-[#00000044]"></div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SlideCard;
