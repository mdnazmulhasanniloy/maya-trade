import React, { useEffect, useState } from "react";
import { BiEdit, BiShowAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import {
  useGetCategoriesQuery,
  useRemoveCategoryMutation,
} from "../../../../features/categorySlice/categoryApi";
import toast from "react-hot-toast";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";

const Category = () => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [CategoryData, setCategoryData] = useState(null);
  const [deleteCategory, removeResult] = useRemoveCategoryMutation();
  const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery();
  const [searchData, setSearchData] = useState("");
  const categories = data?.data;

  console.log(categories);

  useEffect(() => {
    if (removeResult?.isLoading) {
      toast.loading("Deleting...", { id: "removeCategory" });
    }
    if (removeResult?.isSuccess) {
      toast.success("category successfully delete", { id: "removeCategory" });
    }
    if (removeResult?.isError) {
      toast.success("something was wrong category deleting failed", {
        id: "removeCategory",
      });
    }
  }, [removeResult]);

  const handelToDeleteCategory = (id) => {
    // console.log(id);
    deleteCategory(id);
  };
  return (
    <>
      <div className="w-full mt-5">
        <div className="flex items-end justify-start my-5  gap-2">
          <h1 className="text-5xl font-bold text-center ">All Categories</h1>
          <div className="h-2 w-2 bg-accent"></div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mt-5">
          <div className="left">
            <div className="flex items-center gap-3">
              <input
                type="search"
                onChange={(e) => setSearchData(e.target.value)}
                placeholder="Search Categories"
                className="input input-bordered input-accent w-full max-w-xs"
              />

              <FiSettings className="text-3xl hover:text-accent cursor-pointer hover:rotate-90 ease-in-out transition-rotate duration-700" />
              <RiDeleteBin6Line className="text-3xl hover:text-accent cursor-pointer hover:scale-125  transition-scale duration-700" />
              <BsThreeDotsVertical className="text-3xl hover:text-accent cursor-pointer hover:scale-x-125  transition-scale duration-700" />
            </div>
          </div>
          <div className="">
            <button
              onClick={() => setAddCategoryModal(true)}
              className="btn border-2 border-accent hover:border-accent text-white hover:text-accent bg-accent hover:bg-white transition-all duration-700"
            >
              <span>Add Category</span>
              <AiOutlinePlus className="text-xl font-bold" />
            </button>
          </div>
        </div>

        {/* Tables */}
        <div class="flex flex-col justify-center h-full mx-auto mt-10">
          <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
              <h2 class="font-semibold font-poppins text-gray-800">
                Categories :{"  "}
                <span className="text-red-600">{categories?.length}</span>
              </h2>
            </header>
            <div class="p-3">
              <div class="max-w-[90vw] overflow-x-scroll">
                <table class="table-auto w-full font-poppins font-medium overflow-x-auto">
                  <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">SL No:</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Category Id</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Category Name</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-gray-100">
                    {categories?.length > 0 &&
                      categories
                        ?.filter((category) =>
                          category.name
                            .toLowerCase()
                            .includes(searchData.toLocaleLowerCase())
                        )
                        ?.map((category, i) => (
                          <tr key={category?._id}>
                            <td class="p-2 whitespace-nowrap">
                              <div class="flex items-center">
                                {categories?.findIndex(
                                  (item) => item?._id === category?._id
                                ) + 1}
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {category?._id}
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {category?.name}
                            </td>

                            <td class="p-2 whitespace-nowrap flex gap-2">
                              <div class="mx-auto flex w-[100px] gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handelToDeleteCategory(category?._id)
                                  }
                                  className="px-1 py-1 bg-red-200 rounded-3xl hover:cursor-pointer hover:scale-125 transition-scale duration-500"
                                >
                                  {/* svg */}
                                  <RiDeleteBin6Line className="text-2xl text-red-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => (
                                    setEditCategoryModal(true),
                                    setCategoryData(category)
                                  )}
                                  className="px-1 py-1 bg-green-200 rounded-3xl hover:cursor-pointer hover:scale-125 transition-scale duration-500"
                                >
                                  {/* svg */}
                                  <BiEdit className="text-2xl text-green-600" />
                                </button>
                                <button
                                  type="button"
                                  className="px-1 py-1 bg-green-200 rounded-3xl hover:cursor-pointer hover:scale-125 transition-scale duration-500"
                                >
                                  {/* svg */}
                                  <BiShowAlt className="text-2xl text-green-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Tables */}
      </div>

      {addCategoryModal && (
        <AddCategoryModal setAddCategoryModal={setAddCategoryModal} />
      )}
      {editCategoryModal && CategoryData && (
        <EditCategoryModal
          setEditCategoryModal={setEditCategoryModal}
          CategoryData={CategoryData}
        />
      )}
    </>
  );
};

export default Category;
