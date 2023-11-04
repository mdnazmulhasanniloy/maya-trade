import React, { useEffect, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { useAddProductMutation } from "../../../../../features/productSlice/productApi";
import { useGetCategoriesQuery } from "../../../../../features/categorySlice/categoryApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";

const AddProductModal = ({ setAddProductModal }) => {
  const [addProduct, { isLoading, isSuccess, isError }] =
    useAddProductMutation();
  const { data } = useGetCategoriesQuery();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [discountField, setDiscountField] = useState(false);
  const categories = data?.data;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      discount: 0,
    },
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...", { id: "product" });
    } else if (isSuccess) {
      setAddProductModal(false);
      toast.success("Product is successfully added", { id: "product" });
    } else if (isError) {
      toast.error("Something was wrong ", { id: "product" });
    }
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "category") {
        categories?.forEach((each) => {
          if (each?._id === value?.category) {
            setCategory({
              category_id: each?._id,
              categoryName: each?.name,
            });
            return;
          }
        });
      }
      if (name === "status") {
        if (value.status === "discount") {
          setDiscountField(true);
          return;
        } else {
          setDiscountField(false);
          return;
        }
      }
    });
    return () => subscription.unsubscribe();
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data?.img[0];
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
          const productData = {
            title: data?.title,
            img: imgData.data.url,
            category: category,
            price: parseInt(data?.price),
            discount: parseInt(data?.discount),
            description: data?.description,
            status: data?.status,
          };
          addProduct(productData);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-[20030] outline-none focus:outline-none h-100 mx-4">
        <div
          className="relative w-full h-[600px] sm:w-[500px] md:w-[750px] lg:w-[900px]  
        overflow-y-scroll  overflow-hidden py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl"
        >
          <div className="px-2 pt-2 flex w-full justify-between">
            <div className="flex items-end justify-center my-5  gap-2">
              <h1 className="text-2xl font-bold text-center ">Add Product</h1>
              <div className="h-2 w-2 bg-accent"></div>
            </div>
            <button
              onClick={() => setAddProductModal(false)}
              className="hover:rotate-90 transition-all duration-500"
            >
              <BsXCircleFill color="red" size={25} />
            </button>
          </div>
          {/* Content */}
          <div className="px-2 w-full mx-auto my-6">
            {/* form */}
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Product name field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    {...register("title", {
                      required: "Product Name is required",
                      maxLength: {
                        value: 30,
                        message:
                          "Please enter a Product Name less than 30 characters",
                      },
                    })}
                    className={`input input-bordered w-full ${
                      errors.title ? "input-error" : "input-accent"
                    }
                    `}
                  />
                  {errors.title && (
                    <p className=" text-red-600 mt-3">{errors.title.message}</p>
                  )}
                </div>
                {/* Product name field end */}
                {/* Product image field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <input
                    type="file"
                    {...register("img", {
                      required: "Product image is required",
                    })}
                    className={`file-input file-input-bordered ${
                      errors.img ? "file-input-error" : "file-input-accent"
                    }
                    `}
                  />
                  {errors.img && (
                    <p className=" text-red-600 mt-3">{errors.img.message}</p>
                  )}
                </div>
                {/* Product image field end */}
                {/* category field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    {...register("category", {
                      required: "Product Name is required",
                    })}
                    className={`select w-full ${
                      errors?.category ? "select-error" : "select-accent"
                    }`}
                  >
                    {categories?.map((each) => (
                      <option key={each?._id} value={each?._id}>
                        {each?.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className=" text-red-600 mt-3">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                {/* category field end */}
                {/* price field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product price"
                    {...register("price", {
                      required: "Price filed is required",
                      pattern: {
                        value: /^\d+(\.\d{0,2})?$/,
                        message: "Please enter number type value",
                      },
                    })}
                    className={
                      errors.price
                        ? "input input-bordered input-error"
                        : "input input-bordered input-accent"
                    }
                  />
                  {errors.price && (
                    <p className=" text-red-600 mt-3">{errors.price.message}</p>
                  )}
                </div>
                {/* price field end */}
                {/* status field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    {...register("status", {
                      required: "Product status is required",
                    })}
                    className={`select w-full ${
                      errors?.status ? "select-error" : "select-accent"
                    }`}
                  >
                    <option selected>in-stock</option>
                    <option>out-of-stock</option>
                    <option>discount</option>
                  </select>

                  {errors.status && (
                    <p className=" text-red-600 mt-3">
                      {errors.status.message}
                    </p>
                  )}
                </div>
                {/* status field end */}
                {/* discount field start */}
                {discountField && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Discount</span>
                    </label>
                    <input
                      type="text"
                      placeholder="enter Discount discount percentage"
                      {...register("discount", {
                        pattern: {
                          value: /^\d+(\.\d{0,2})?$/,
                          message: "Please enter number type value",
                        },
                      })}
                      className={
                        errors.discount
                          ? "input input-bordered input-error"
                          : "input input-bordered input-accent"
                      }
                    />
                    {errors.discount && (
                      <p className=" text-red-600 mt-3">
                        {errors.discount.message}
                      </p>
                    )}
                  </div>
                )}
                {/* discount field end */}
                {/* description field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    placeholder="Enter Description"
                    {...register("description", {
                      required: "description",
                    })}
                    className={`textarea ${
                      errors?.description ? "textarea-error" : "textarea-accent"
                    }`}
                  />
                  {errors.description && (
                    <p className=" text-red-600 mt-3">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                {/* description field end */}
              </div>
              <button
                type="submit"
                disabled={isLoading || loading}
                className="my-10 btn btn-accent"
              >
                {(isLoading || loading) && (
                  <span className="loading loading-spinner"></span>
                )}
                {isLoading || loading ? "Loading..." : "Submit"}
              </button>
            </form>
            {/* Form */}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0  z-[20020] bg-black"></div>
    </>
  );
};

export default AddProductModal;
