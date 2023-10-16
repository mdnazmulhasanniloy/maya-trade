import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUser, googleSignIn } from "../../features/authSlice/authSlice";
import toast from "react-hot-toast";
// import {
//   googleSignInInitiate,
//   registerInitiate,
// } from "../Redux/Thunk/FetchUsers";
// import toast from "react-hot-toast";
// import useToken from "../Hooks/useToken";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const { user, error, isLoading, isError } = useSelector(
    (state) => state?.auth
  );
  // const [token] = useToken(currentUser?.email);

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const from = location?.state?.from || "/";

  //check password and confirm password is matched
  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (user?.email) {
      toast.success("You have successfully logged in", { id: "loginUser" });
      navigate("/user-register");
    } else if (isLoading) {
      toast.loading("user Posting please wait...", { id: "loginUser" });
    } else if (isError) {
      toast.error(error, { id: "loginUser" });
    }
  }, [user?.email, isLoading, isError]);

  //register with email and password
  const onSubmit = (data) => {
    dispatch(createUser({ email: data?.email, password: data?.password }));
  };

  // register width google login
  const handelToGoogleLogin = () => {
    dispatch(googleSignIn());
  };

  return (
    <div className="hero mt-20">
      <div className="card flex-shrink-0 w-full max-w-[600px] shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="flex items-end justify-center my-5  gap-2">
            <h1 className="text-5xl font-bold text-center ">Sign Up</h1>
            <div className="h-2 w-2 bg-accent"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", {
                  required:
                    "Please enter a valid email address (the data you entered is not in the right format)",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message:
                      "Please enter a valid email address (Ex. @example.com)",
                  },
                })}
                className={
                  errors.email
                    ? "input input-bordered input-error"
                    : "input input-bordered input-accent"
                }
              />
              {errors.email && (
                <p className=" text-red-600 mt-3">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={passwordToggle ? "text" : "password"}
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "At last provide 6 characters",
                  },
                  pattern: {
                    value:
                      /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                    message:
                      "must include lower, upper, number, and special chars",
                  },
                })}
                className={
                  errors.password
                    ? "input input-bordered input-error"
                    : "input input-bordered input-accent "
                }
              />
            </div>
            <div className=" flex justify-end mr-5 -mt-10 z-0">
              {passwordToggle ? (
                <AiFillEyeInvisible
                  onClick={() => setPasswordToggle(!passwordToggle)}
                  className="text-3xl text-accent cursor-pointer"
                />
              ) : (
                <AiFillEye
                  onClick={() => setPasswordToggle(!passwordToggle)}
                  className="text-3xl text-accent cursor-pointer"
                />
              )}
            </div>
            {errors.password && (
              <p className=" text-red-600 mt-3">{errors.password.message}</p>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type={passwordToggle ? "text" : "password"}
                placeholder="password"
                {...register("confirmPassword")}
                className={
                  errors.password
                    ? "input input-bordered input-error"
                    : "input input-bordered input-accent "
                }
              />
            </div>

            {errors.confirmPassword && (
              <p className=" text-red-600 mt-3">
                {errors.confirmPassword.message}
              </p>
            )}
            <div className="form-control mt-6">
              <button
                disabled={disabled || isLoading}
                type="submit"
                className={
                  "btn bg-accent border-2 hover:bg-white hover:text-accent hover:border-accent transition-all duration-700"
                }
              >
                {loading && <span className="loading loading-spinner"></span>}
                {loading ? "Loading" : "Register"}
              </button>
            </div>
          </form>
          <label className="label ">
            <p href="#" className="text-center text-sm">
              have an account?
              <Link
                to="/login"
                className="label-text-alt link link-hover text-accent text-sm ml-1"
              >
                Login your account
              </Link>
            </p>
          </label>
          <div className="flex my-5">
            <div className="w-32 h-[2px] bg-accent flex-2"></div>
            <p className="text-lg mt-[-15px] flex-1 text-center text-neutral">
              OR
            </p>
            <div className="w-32 h-[2px] flex-2 bg-accent"></div>
          </div>

          <div className="form-control">
            <button
              disabled={isLoading}
              type="button"
              className="btn hover:text-black hover:bg-accent border-2 bg-white text-accent border-accent transition-all duration-700"
              onClick={handelToGoogleLogin}
            >
              {loading && <span className="loading loading-spinner"></span>}
              CONTINUE WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
