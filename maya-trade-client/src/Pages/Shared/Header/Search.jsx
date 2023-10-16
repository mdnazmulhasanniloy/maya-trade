import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { getUser, logout } from "../../../features/authSlice/authSlice";
import auth from "../../../Firebase/Firebase.config";
import { signOut } from "firebase/auth";

const Search = () => {
  const cart = useSelector((state) => state.cart.carts);
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const handelToSignOut = () => {
    dispatch(logout());
    signOut(auth)
      .then(() => {
        toast.success("signOut successful", { id: "signOut" });
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    dispatch(getUser(user?.email));
  }, [user?.email]);

  return (
    <>
      <section className="py-[20px] search px-2">
        <div className="w-full m-auto  items-center justify-between hidden md:flex">
          <div className="logo flex justify-start">
            <img
              className=" h-auto w-auto "
              src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
              alt=""
            />
          </div>
          <div className="w-4/5">
            <div className="relative w-full flex border-2 border-[#0000001a] rounded-md mt-3">
              <input
                type="search"
                placeholder="Search By Category"
                className="input input-bordered w-full"
              />
              <div className="absolute top-0 right-0 border-l-2 border-[#0000001a] p-4">
                <BsSearch className="text-lg" />
              </div>
            </div>
          </div>

          <div className=" w-1/5 flex gap-5 justify-center">
            <div className="dropdown dropdown-end">
              <Link
                to="/cart"
                className="btn btn-ghost btn-circle bg-gray-300 hover:bg-[#fac3dd] relative"
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
                    className={`${
                      cart?.length > 10 ? "px-1" : "px-2"
                    } absolute -top-5 -right-5 py-1 rounded-full text-xs text-white bg-red-500`}
                  >
                    {cart?.length}
                  </span>
                </div>
              </Link>
            </div>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle bg-gray-300 hover:bg-[#fac3dd]"
              >
                {user?.img ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user?.img} alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <FaUserAlt className="text-2xl text-black mx-auto my-auto" />
                  </div>
                )}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-slate-200 rounded-box w-52 shadow-2xl"
              >
                <li>
                  <Link className="justify-between">
                    Profile
                    <span className="badge text-accent">New</span>
                  </Link>
                </li>
                <li>
                  <Link>Settings</Link>
                </li>
                <li>
                  {user?.email ? (
                    <button onClick={handelToSignOut}>Logout</button>
                  ) : (
                    <NavLink to="/login">Login</NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* mobile view */}
      <section className="w-[95%] mx-auto md:hidden block">
        <div className="w-full flex justify-between items-center">
          <img
            className="h-8"
            src="https://i.ibb.co/hcJZZmj/Screenshot-2.png"
            alt=""
          />

          <div className="flex gap-3 items-center">
            <div className="dropdown dropdown-end">
              <Link
                to="/cart"
                className="btn btn-ghost btn-circle bg-gray-300 hover:bg-[#fac3dd] relative"
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
                    className={`${
                      cart?.length > 10 ? "px-1" : "px-2"
                    } absolute -top-5 -right-5 py-1 rounded-full text-xs text-white bg-red-500`}
                  >
                    {cart?.length}
                  </span>
                </div>
              </Link>
            </div>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle bg-gray-300 hover:bg-[#fac3dd]"
              >
                {user?.img ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user?.img} alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <FaUserAlt className="text-2xl text-black mx-auto my-auto" />
                  </div>
                )}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-slate-200 rounded-box w-52 shadow-2xl"
              >
                <li>
                  <Link className="justify-between">
                    Profile
                    <span className="badge text-accent">New</span>
                  </Link>
                </li>
                <li>
                  <Link>Settings</Link>
                </li>
                <li>
                  {user?.email ? (
                    <button onClick={handelToSignOut}>Logout</button>
                  ) : (
                    <NavLink to="/login">Login</NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative w-full flex border-2 border-[#0000001a] rounded-md mt-3">
          <input
            type="search"
            placeholder="Search By Category"
            className="input input-bordered w-full"
          />
          <div className="absolute top-0 right-0 border-l-2 border-[#0000001a] p-4">
            <BsSearch className="text-lg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
