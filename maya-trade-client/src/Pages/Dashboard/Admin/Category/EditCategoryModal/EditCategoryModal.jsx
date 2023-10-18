import React, { useEffect, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import moment from "moment";
import toast from "react-hot-toast";
import { useUpdateCategoryMutation } from "../../../../../features/categorySlice/categoryApi";

const EditCategoryModal = ({ setEditCategoryModal, CategoryData }) => {
  const [updateCategory, updateResult] = useUpdateCategoryMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: { name: CategoryData?.name },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateResult?.isLoading) {
      toast.loading("Please wait...", { id: "Category" });
    } else if (updateResult?.isSuccess) {
      setEditCategoryModal(false);
      toast.success("Category is successfully updated", { id: "Category" });
    } else if (updateResult?.isError) {
      toast.error("Something was wrong ", { id: "Category" });
    }
  }, [updateResult]);

  const onSubmit = async (data) => {
    setLoading(true);

    if (data?.img?.length) {
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
            const categoryUpdateData = {
              name: data?.name,
              img: imgData.data.url,
            };
            console.log("hello", categoryUpdateData);
            updateCategory({ id: CategoryData?._id, data: categoryUpdateData });
            setLoading(false);
            return;
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
          return;
        });
    } else {
      const categoryUpdateData = {
        name: data?.name,
      };
      console.log(categoryUpdateData);
      updateCategory({ id: CategoryData?._id, data: categoryUpdateData });
      return;
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-[20030] outline-none focus:outline-none h-100 mx-4">
        <div
          className="relative w-full h-[400px] sm:w-[500px] md:w-[750px] lg:w-[900px]  
        overflow-y-scroll overflow-hidden py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl"
        >
          <div className="px-2 pt-2 flex w-full justify-between">
            <div className="flex items-end justify-center my-5  gap-2">
              <h1 className="text-2xl font-bold text-center ">Add Category</h1>
              <div className="h-2 w-2 bg-accent"></div>
            </div>
            <button
              onClick={() => setEditCategoryModal(false)}
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
                {/* Category name field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Category Name"
                    {...register("name", {
                      required: "Category Name is required",
                      maxLength: {
                        value: 30,
                        message:
                          "Please enter a Category Name less than 30 characters",
                      },
                    })}
                    className={`input input-bordered w-full ${
                      errors.name ? "input-error" : "input-accent"
                    }
                    `}
                  />
                  {errors.name && (
                    <p className=" text-red-600 mt-3">{errors.name.message}</p>
                  )}
                </div>
                {/* Category name field end */}
                {/* Category image field start */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category Image</span>
                  </label>
                  <input
                    type="file"
                    {...register("img")}
                    className={`file-input file-input-bordered ${
                      errors.img ? "file-input-error" : "file-input-accent"
                    }
                    `}
                  />
                  {errors.img && (
                    <p className=" text-red-600 mt-3">{errors.img.message}</p>
                  )}
                </div>
                {/* Category image field end */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10"></div>
              </div>
              <button
                type="submit"
                disabled={updateResult?.isLoading || loading}
                className="btn btn-accent"
              >
                {(updateResult?.isLoading || loading) && (
                  <span className="loading loading-spinner"></span>
                )}
                {updateResult?.isLoading || loading ? "Loading..." : "Submit"}
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

export default EditCategoryModal;
