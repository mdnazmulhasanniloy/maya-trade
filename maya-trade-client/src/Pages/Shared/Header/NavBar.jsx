import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import navLinks from "./navlink";
import MobileNav from "./MobileNav";
import {
  FiLogOut,
  FiLogIn,
  FiSettings,
  FiHelpCircle,
  FiUser,
} from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { getUser, logout } from "../../../features/authSlice/authSlice";
import { signOut } from "firebase/auth";
import auth from "../../../Firebase/Firebase.config";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  const [product, setProduct] = useState(false);
  const [deliverables, setDeliverables] = useState(false);
  const {
    user: { email, role, img },
  } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  console.log(email);

  const handelToSignOut = () => {
    dispatch(logout());
    signOut(auth)
      .then(() => {
        toast.success("signOut successful", { id: "signOut" });
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    dispatch(getUser(email));
  }, [email]);

  return (
    <>
      {/*  overflow-x-hidden overflow-y-hidden  */}
      <div className="bg-gray-200 h-full w-full relative">
        {/* Code block starts */}
        <nav className="bg-white shadow xl:block hidden">
          <div className="mx-auto container px-6 py-2 xl:py-0">
            <div className="flex items-center justify-between">
              {/* navbar logo */}
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <div className="flex items-center">
                  <img
                    className=" h-auto w-32 "
                    src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
                    alt=""
                  />
                </div>
              </div>
              {/* navbar logo end  */}
              <div className="flex">
                <div className="hidden xl:flex md:mr-6 xl:mr-16">
                  {navLinks.map((link) => (
                    <NavLink
                      to={link?.path}
                      className="flex px-5 uppercase items-center py-6 text-sm leading-5 text-black hover:bg-gray-100 hover:text-accent  focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                    >
                      {link?.name}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/dashboard"
                    className="flex px-5 uppercase items-center py-6 text-sm leading-5 text-black hover:bg-gray-100 hover:text-accent  focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Dashboard
                  </NavLink>
                </div>
                <div className="hidden xl:flex items-center">
                  <div className="relative md:mr-6 my-2">
                    <Link
                      to="/cart"
                      className="relative px-3 py-3 uppercase flex items-center justify-center focus:outline-none bg-gray-100 border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded-full text-gray-600 text-xs"
                    >
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span
                          className={`${"px-2"} absolute -top-5 -right-5 py-1 rounded-full text-xs text-white bg-red-500`}
                        >
                          00{/* {cart?.length} */}
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* {profile section} */}
                  <div className="ml-6 relative">
                    <div
                      className="flex items-center relative"
                      onClick={() => setProfile(!profile)}
                    >
                      {profile && (
                        <ul className="p-2 w-40 border-r bg-white absolute z-[20020] rounded right-0 shadow top-0 mt-16 ">
                          {role && (
                            <>
                              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                <Link
                                  to="/profile"
                                  className="flex items-center"
                                >
                                  <FiUser />
                                  <span className="ml-2">My Profile</span>
                                </Link>
                              </li>

                              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                <Link className="flex items-center">
                                  <FiSettings className="icon icon-tabler icon-tabler-user" />
                                  <span className="ml-2">Account Settings</span>
                                </Link>
                              </li>
                            </>
                          )}
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                            {email ? (
                              <button
                                onClick={handelToSignOut}
                                className="flex items-center"
                              >
                                <FiLogOut className="icon icon-tabler icon-tabler-user" />
                                <span className="ml-2">LogOut</span>
                              </button>
                            ) : (
                              <Link to="/login" className="flex items-center">
                                <FiLogIn className="icon icon-tabler icon-tabler-user" />
                                <span className="ml-2">Sign In</span>
                              </Link>
                            )}
                          </li>
                        </ul>
                      )}
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
                      <div className="ml-2 text-gray-600">
                        <MdKeyboardArrowDown
                          className={`${
                            profile ? "-rotate-180" : "-rotate-30"
                          } text-lg  cursor-pointer ease-in-out transition-rotate duration-500`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <nav className="block md:hidden bg-white border-b border-gray-200 shadow-md z-[2020]">
          <div className="flex items-center font-medium justify-around">
            <div className="z-50 p-5 md:w-auto w-full flex justify-between">
              <img
                src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
                alt="logo"
                className="md:cursor-pointer h-9"
              />
              <div className="flex items-center justify-center gap-5">
                <Link
                  to="/cart"
                  className="relative px-3 py-3 uppercase flex items-center justify-center focus:outline-none bg-gray-100 border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded-full text-gray-600 text-xs"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span
                      className={`${"px-2"} absolute -top-5 -right-5 py-1 rounded-full text-xs text-white bg-red-500`}
                    >
                      00{/* {cart?.length} */}
                    </span>
                  </div>
                </Link>

                <div
                  className={`text-3xl md:hidden transition-all duration-300`}
                  onClick={() => setShow(!show)}
                >
                  <GiHamburgerMenu />
                </div>
              </div>
            </div>
            <div className="md:block hidden">
              <button />
            </div>
            {/* Mobile nav */}
            <div
              className={`
        md:hidden bg-gray-200 z-[20010] fixed w-full top-0 overflow-y-auto bottom-0 py-5 px-5
        duration-500 ${show ? "left-0" : "left-[-100%]"}
        `}
            >
              <div className="px-3 flex justify-between items-center">
                <div className="w-24">
                  <img
                    className=" h-auto w-24 "
                    src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
                    alt=""
                  />
                </div>

                <div
                  className={`text-3xl md:hidden transition-all duration-300 hover:cursor-pointer hover:text-accent`}
                  onClick={() => setShow(!show)}
                >
                  <GrClose />
                </div>
              </div>
              <ul className="mt-10 px-5 flex flex-col gap-5">
                <Link to="/profile" className="flex justify-center mb-4">
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
                {navLinks.map((link) => (
                  <li className="text-gray-800 cursor-pointer uppercase">
                    <NavLink
                      to={link?.path}
                      key={link?.path}
                      className="text-black xl:text-base text-base active:text-[#37cdbe]"
                    >
                      {link?.name}
                    </NavLink>
                  </li>
                ))}

                {email ? (
                  <>
                    <li className="text-gray-800 cursor-pointer uppercase">
                      <NavLink
                        to="/dashboard"
                        className="flex items-center text-black xl:text-base text-base"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="text-gray-800 cursor-pointer uppercase">
                      <button
                        onClick={handelToSignOut}
                        className="flex items-center text-black xl:text-base text-base"
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
        </nav>
      </div>
    </>
  );
};

export default NavBar;
