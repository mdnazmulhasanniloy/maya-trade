import React, { useState } from "react";
import { BiBorderAll, BiChevronDown } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { ImMenu } from "react-icons/im";
import { NavLink } from "react-router-dom";
import Categories from "../../Home/Categories/Categories";
import "./NavBar.css";
import { useSelector } from "react-redux";

const Navbarsna = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const { email, error, isLoading, isError } = useSelector(
    (state) => state?.auth
  );

  const navLinks = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "All Products",
      path: "/allProducts",
    },
    {
      name: "user Account",
      path: "/user",
    },
    // {
    //   name: "vendor",
    //   path: "/vendor",
    // },
    // {
    //   name: "track my order",
    //   path: "/track",
    // },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <>
      <header className="h-8vh py-4 px-3 flex items-center justify-between  shadow-md">
        <div className="relative">
          <div className="hidden md:flex justify-center items-center px-[30px] py-3 rounded-[5px]  bg-[#f6f9fc]">
            <BiBorderAll className="mr-3 text-2xl" />
            <h4 className="flex text-2xl font-medium ">
              Categories
              <BiChevronDown className="mt-1" />
            </h4>
          </div>
          {/*categories */}
          <div
            className="md:hidden flex justify-center items-center px-[30px] py-3 rounded-[5px]  bg-[#f6f9fc]"
            onClick={() => setOpenCategories(!openCategories)}
          >
            <BiBorderAll className="mr-3 text-2xl" />
            <h4 className="flex text-2xl font-medium ">
              Categories
              <BiChevronDown
                className={`mt-1 transition-all duration-700 ${
                  openCategories ? "-rotate-180" : "rotate-0"
                }`}
              />
            </h4>
          </div>
          <div
            className={`absolute top-20 z-[999] ${
              openCategories ? "left-0" : "-left-[1000px]"
            } transition-all duration-700 ease-in-out`}
          >
            {<Categories />}
          </div>
        </div>

        <div className="">
          {/* desktop device menu  */}
          <div className="hidden md:block">
            <ul className="flex">
              {navLinks.map((navLink, index) => (
                <li key={index} className=" text-base px-3 uppercase">
                  <NavLink
                    to={navLink?.path}
                    className="hover:bg-[#fac3dd] px-3 py-2"
                  >
                    {navLink?.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* mobile nev */}
          <div className="md:hidden">
            {!mobileMenu && (
              <ImMenu
                className="block text-2xl z-[999]"
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                }}
              />
            )}

            <div
              onClick={() => setMobileMenu(false)}
              className={` absolute top-0  h-[100%] w-screen z-[998] 
                               ${mobileMenu ? "left-0" : "-left-[1000px]"} 
                               transition-all duration-500 `}
            ></div>
            <div
              className={`
                  flex justify-between absolute top-0 p-4 sm:p-4 sm:pt-10 w-3/5 h-full bg-white z-[999]
                  ${mobileMenu ? "left-0" : "-left-[1000px]"} 
                  ease-in-out transition-all duration-300 box-shadow`}
            >
              <ul className="mt-5 flex flex-col items-center">
                {navLinks.map((navLink, index) => (
                  <li key={index} className=" text-base px-3 py-3 uppercase">
                    <NavLink
                      to={navLink?.path}
                      className="hover:bg-[#fac3dd] px-3 py-2 nn"
                    >
                      {navLink?.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <GrClose
                className="text-2xl block z-[999]"
                onClick={() => setMobileMenu(false)}
              />
            </div>

            {/* <ul className={`  capitalize absolute `}></ul> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbarsna;
