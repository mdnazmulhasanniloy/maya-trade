import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../assets/Profile img/user.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../features/authSlice/authApi";

const UserRegister = () => {
  // const [addUser, { isLoading, isSuccess, isError }] = useRegisterMutation();
  const [addUser, { isLoading, isSuccess, isError }] = useRegisterMutation();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(userImg);
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: user?.email },
  });

  const navigate = useNavigate();
  const file = useWatch({ control, name: "img" });

  //data post handling

  useEffect(() => {
    if (isLoading) {
      toast.loading("Posting...", { id: "addProduct" });
    } else if (isSuccess) {
      toast.success("User information added successfully done", {
        id: "addProduct",
      });
      navigate("/");
    }
    if (isError) {
      toast.error("Something Was wrong", { id: "addProduct" });
    }
  }, [isLoading, isSuccess, isError]);

  //image locally loaded functionality
  useEffect(() => {
    if (file?.length) {
      const image = file[0];
      transportFormFileData(image);
    }
  }, [file]);

  const transportFormFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImage(reader?.result);
      };
    } else {
      setProfileImage("");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgHostKey}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData?.success) {
          const userInfo = {
            email: user?.email,
            firstName: data?.firstName,
            lastName: data?.lastName,
            img: imgData.data.url,
            phone: data?.phone,
            role: "buyer",
            address: {
              area: data?.area,
              city: data?.city,
              state: data?.state,
              country: data?.country,
            },
          };
          addUser(userInfo);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div className="w-11/12 md:w-4/5 mx-auto">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="my-20">
        <div className="flex flex-col items-center gap-3">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-accent ring-accent-base-100 ring-accent-2">
              <img src={profileImage} alt="error" />
            </div>
          </div>
          <div className="hover:cursor-pointer relative h-10 w-24 bg-accent overflow-hidden rounded-lg border-accent border-2 text-white hover:bg-white ">
            <label
              title="Click to upload"
              className="cursor-pointer flex items-center justify-center px-3 py-2 bg-accent z-1 hover:cursor-pointer"
            >
              Upload Image
            </label>
            <input
              hidden=""
              className="h-full w-full opacity-0 bg-gray-500 absolute top-0 left-0 hover: cursor-pointer"
              type="file"
              {...register("img", {
                required: "img is required",
              })}
            />
          </div>
        </div>
        <div className="flex items-end justify-start my-5  gap-2">
          <h1 className="text-2xl font-bold text-center ">
            Personal Information
          </h1>
          <div className="h-2 w-2 bg-accent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              {...register("firstName", {
                required: "Please enter enter your first name",
              })}
              className={
                errors.firstName
                  ? "input input-bordered input-error"
                  : "input input-bordered input-accent"
              }
            />
            {errors.firstName && (
              <p className=" text-red-600 mt-3">{errors.firstName.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              {...register("lastName", {
                required: "Please enter enter your last name",
              })}
              className={
                errors.lastName
                  ? "input input-bordered input-error"
                  : "input input-bordered input-accent"
              }
            />
            {errors.lastName && (
              <p className=" text-red-600 mt-3">{errors.lastName.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              readOnly
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Please enter enter your email",
              })}
              className={
                errors.email
                  ? "input input-bordered input-error cursor-not-allowed"
                  : "input input-bordered input-accent cursor-not-allowed"
              }
            />
            {errors.email && (
              <p className=" text-red-600 mt-3">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="phone"
              placeholder="Enter Your Phone Number"
              {...register("phone", {
                required: "Please enter enter your phone number",
              })}
              className={
                errors.phone
                  ? "input input-bordered input-error"
                  : "input input-bordered input-accent"
              }
            />
            {errors.phone && (
              <p className=" text-red-600 mt-3">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-end justify-start mt-20  gap-2">
          <h1 className="text-2xl font-bold text-center ">Address</h1>
          <div className="h-2 w-2 bg-accent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              type="text"
              placeholder="Enter Country Name"
              {...register("country", {
                required: "country name required",
              })}
              className={
                errors?.country
                  ? "input input-bordered input-error"
                  : "input input-bordered input-accent"
              }
            />
            {errors?.country && (
              <p className=" text-red-600 mt-3">{errors?.country?.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">State</span>
            </label>
            <input
              type="text"
              placeholder="Enter State Name"
              {...register("state", {
                required: "state name is required",
              })}
              className={
                errors?.state
                  ? "input input-bordered input-error"
                  : "input input-bordered input-accent"
              }
            />
            {errors?.state && (
              <p className=" text-red-600 mt-3">{errors?.state?.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              placeholder="Enter City Name"
              {...register("city", {
                required: "city name is required",
              })}
              className={
                errors.city
                  ? "input input-bordered input-error"
                  : "input input-bordered input-accent"
              }
            />
            {errors?.city && (
              <p className=" text-red-600 mt-3">{errors?.city?.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Area</span>
            </label>
            <input
              type="text"
              placeholder="Enter Area Name"
              {...register("area", {
                required: "Area name is required",
              })}
              className={
                errors.area
                  ? "input input-bordered input-error"
                  : "input input-bordered input-accent"
              }
            />
            {errors?.area && (
              <p className=" text-red-600 mt-3">{errors?.area?.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-accent px-10 py-4 border-2  bg-accent text-black hover:bg-white  hover:text-accent transition-all duration-500`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
