import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import navLinks from "./navlink";
import { FaUserAlt } from "react-icons/fa";

const MobileNav = ({ show, setShow, handelToSignOut }) => {
  const {
    user: { email, img, role },
  } = useSelector((state) => state?.auth);

  return (
    <div className="px-6 h-full">
      <div className="flex flex-col justify-between h-full w-full">
        <div>
          <div className="mt-6 flex w-full items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="w-24">
                  <img
                    className=" h-auto w-24 "
                    src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                id="cross"
                className="text-gray-800"
                onClick={() => setShow(!show)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
            </div>
          </div>
          <Link to="/profile" className="flex justify-center mt-5">
            <div className="ring ring-accent ring-offset-base-100 ring-offset-2 cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
              {img ? (
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={img}
                  alt="logo"
                />
              ) : (
                <FaUserAlt className="text-2xl text-black mx-auto my-auto rounded-full h-10 w-10 object-cover" />
              )}
            </div>
          </Link>
          <ul className="f-m-m">
            {navLinks.map((link) => (
              <li className="text-gray-800 pt-10 cursor-pointer uppercase">
                <NavLink
                  to={link?.path}
                  key={link?.path}
                  className="flex items-center text-black xl:text-base text-base ml-3"
                >
                  {link?.name}
                </NavLink>
              </li>
            ))}

            {email ? (
              <>
                <li className="text-gray-800 pt-10 cursor-pointer uppercase">
                  <NavLink
                    to="/dashboard"
                    className="flex items-center text-black xl:text-base text-base ml-3"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="text-gray-800 pt-10 cursor-pointer uppercase">
                  <button
                    onClick={handelToSignOut}
                    className="flex items-center text-black xl:text-base text-base ml-3"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="text-gray-800 pt-10 cursor-pointer uppercase">
                <NavLink
                  to="/login"
                  className="flex items-center text-black xl:text-base text-base ml-3"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
