import React, { useEffect } from "react";
import Categories from "./Categories/Categories";
import Slide from "./Slider/Slide";
import FlashDeals from "./FlashDeals/FlashDeals";
import NewArrivals from "./NewArrivals/NewArrivals";
import BigDiscount from "./BigDiscount/BigDiscount";
import HomePageProduct from "./HomePageProduct/HomePageProduct";
import { useRegisterMutation } from "../../features/authSlice/authApi";

const Home = () => {
  const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();

  // const handelhello = () => {
  //   register("mdnazmulhasanniloy323@gmail.com");
  // };

  useEffect(() => {
    console.log(
      "isLoading:",
      isLoading,
      "isSuccess:",
      isSuccess,
      "isError:",
      isError
    );
  }, [isLoading, isSuccess, isError]);
  return (
    <section className=" mt-12 mb-96">
      <div className=" max-w-[90%] m-0 flex justify-between">
        <div className="hidden md:block">
          <Categories />
        </div>
        <div className="homeSlider w-screen md:w-[77%]">
          <Slide />
        </div>
      </div>
      <div className="bg-[#f6f9fc]">
        <FlashDeals />
        <NewArrivals />
        <BigDiscount />
        <HomePageProduct />

        {/* <button onClick={handelhello}>Hello</button> */}
      </div>
    </section>
  );
};

export default Home;
