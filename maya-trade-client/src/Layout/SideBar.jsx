import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
// import "./DashboardNav.css";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import AdminNavLinks from "../Pages/Shared/Header/DashboardNav/AdminNavLink";
import { logout } from "../features/authSlice/authSlice";
import { signOut } from "firebase/auth";
import auth from "../Firebase/Firebase.config";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = AdminNavLinks;
  const dispatch = useDispatch();

  const handelToSignOut = () => {
    dispatch(logout());
    signOut(auth)
      .then(() => {
        toast.success("signOut successful", { id: "signOut" });
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <Disclosure
      as="nav"
      className="bg-gray-300 border-r border-gray-200 hidden md:block"
    >
      <Disclosure.Button className="absolute z-[20010] top-0 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:text-accent  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
        <GiHamburgerMenu
          className="block md:hidden h-6 w-6 hover:cursor-pointer"
          aria-hidden="true"
        />
      </Disclosure.Button>
      <img
        className=" h-auto w-32 absolute z-[20010] top-0 left-4 inline-flex items-center justify-center rounded-md p-2"
        src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
        alt=""
      />

      <div className=" p-6 w-1/2 h-screen bg-white z-[20020] fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
        <div className="flex flex-col justify-start item-center">
          <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
            <div className="flex items-center">
              <img
                className=" h-auto w-32 "
                src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
                alt=""
              />
            </div>
          </div>
          <div className=" my-4 border-b border-gray-100 pb-4">
            {navLinks.map((link) => (
              <NavLink
                to={link?.path}
                key={link?.path}
                className="flex mb-2 justify-start items-center gap-4 pl-5 text-black hover:text-white hover:bg-accent p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                {link?.icon}
                <h3 className="text-base font-semibold ">{link?.name}</h3>
              </NavLink>
            ))}
          </div>
          {/* {/* setting  } */}
          <div className=" mt-4 border-b border-gray-100 pb-4">
            <NavLink
              to="dashboard/settings"
              className="flex mb-2 justify-start items-center gap-4 pl-5 text-black hover:text-white hover:bg-accent p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
            >
              <MdOutlineSettings className="text-2xl" />
              <h3 className="text-base">Settings</h3>
            </NavLink>

            <NavLink
              to="/"
              className="flex mb-2 justify-start items-center gap-4 pl-5 text-black hover:text-white hover:bg-accent p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
            >
              <FaHome className="text-2xl" />
              <h3 className="text-base">Go To Home</h3>
            </NavLink>
          </div>
          {/* logout  */}
          <div className=" mb-4">
            <div
              onClick={handelToSignOut}
              className="flex mb-2 justify-start items-center gap-4 pl-5 text-black hover:text-white hover:bg-accent p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
            >
              <MdOutlineLogout className="text-2xl" />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default SideBar;
