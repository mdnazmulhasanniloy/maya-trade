import React from "react";
import underConstruction from "../../assets/UnderConstruction/underConstruction.svg";
const UnderConstruction = () => {
  return (
    <div className="w-[80vw]  h-[90vh] mx-auto grid grid-cols-1 items-center md:grid-cols-1 lg:grid-cols-2">
      <div className="font-poppins font-semibold w-full flex justify-center">
        <div className="flex flex-col items-start justify-center ">
          <div className="flex flex-col pt-12">
            <h2 className="text-[36px] md:text-[50px] text-[#4BA25D]">
              We are
            </h2>
            <h2 className="text-[36px] md:text-[50px] text-[#4BA25D]">
              Under maintenance
            </h2>
          </div>
          <div className="font-normal text-[24px] flex flex-col">
            <p>We are improving our website.</p>
            <p>we”ll return shortly,</p>
            <p>with a new cool features!</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <img src={underConstruction} alt="" />
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
