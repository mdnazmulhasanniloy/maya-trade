import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

const Head = () => {
  return (
    <>
      <section className="bg-[hsl(213,73%,22%)] py-[10px] text-white">
        <div className=" max-w-[90%] mx-auto md:flex md:justify-between md:items-center">
          <div className="flex justify-between">
            <div className="flex justify-center items-center">
              <BsTelephoneFill className="mr-[10px] text-5" />
              <label className="mr-3 text-[10px]">+880 1518-963455</label>
            </div>
            <div className="flex justify-center items-center">
              <FaEnvelope className="mr-[10px] text-5" />
              <label className="mr-3 text-[10px]">mdnazmul@gmail.com</label>
            </div>
          </div>

          <div className="md:flex hidden">
            <label className="mr-[30px] text-[13px]">Theme FAQ's</label>
            <label className="mr-[30px] text-[13px]">Need Helps</label>
            <span>
              <img
                className="max-w-[25px]"
                src="https://em-content.zobj.net/thumbs/120/google/350/flag-bangladesh_1f1e7-1f1e9.png"
                alt=""
              />
            </span>
            <label className="mr-[30px] text-[13px]">EN</label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
