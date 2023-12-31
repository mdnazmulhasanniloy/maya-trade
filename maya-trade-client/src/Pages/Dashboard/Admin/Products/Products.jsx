import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit, BiShowAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import AddProductModal from "./AddProductModal/AddProductModal";
import {
  useGetProductQuery,
  useRemoveProductMutation,
} from "../../../../features/productSlice/productApi";
import toast from "react-hot-toast";
import UpdateProductModal from "./UpdateProductModal/UpdateProductModal";
import Pagination from "../../../Shared/Pagination/Pagination";

const Products = () => {
  const { data, isLoading, isError } = useGetProductQuery();
  const [deleteProduct, removeResult] = useRemoveProductMutation();

  //pagination state
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setData] = useState([]);

  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [searchData, setSearchData] = useState("");
  // console.log(searchData);
  const products = data?.data;
  // console.log(products);

  useEffect(() => {
    if (removeResult?.isLoading) {
      toast.loading("Deleting...", { id: "removeProduct" });
    }
    if (removeResult?.isSuccess) {
      toast.success("Product successfully delete", { id: "removeProduct" });
    }
    if (removeResult?.isError) {
      toast.error("something was wrong product deleting failed", {
        id: "removeProduct",
      });
    }
  }, [removeResult]);

  const handelToDeleteProduct = (_id) => {
    deleteProduct(_id);
  };

  //pagination

  useEffect(() => {
    setData(data?.data);
  }, [data]);

  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(items?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % items?.length;
    console.log(
      `User requested page number ${event?.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className="w-full mt-5">
        <div className="flex items-end justify-start my-5  gap-2">
          <h1 className="text-5xl font-bold text-center ">All Products</h1>
          <div className="h-2 w-2 bg-accent"></div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mt-5">
          <div className="left">
            <div className="flex items-center gap-3">
              <input
                type="search"
                onChange={(e) => setSearchData(e.target.value)}
                placeholder="Search products"
                className="input input-bordered input-accent w-full max-w-xs"
              />

              <FiSettings className="text-3xl hover:text-accent cursor-pointer hover:rotate-90 ease-in-out transition-rotate duration-700" />
              <RiDeleteBin6Line className="text-3xl hover:text-accent cursor-pointer hover:scale-125  transition-scale duration-700" />
              <BsThreeDotsVertical className="text-3xl hover:text-accent cursor-pointer hover:scale-x-125  transition-scale duration-700" />
            </div>
          </div>
          <div className="">
            <button
              onClick={() => setAddProductModal(true)}
              className="btn border-2 border-accent hover:border-accent text-white hover:text-accent bg-accent hover:bg-white transition-all duration-700"
            >
              <span>Add Product</span>
              <AiOutlinePlus className="text-xl font-bold" />
            </button>
          </div>
        </div>

        {/* Tables */}
        <div class="flex flex-col justify-center h-full mx-auto mt-10">
          <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
              <h2 class="font-semibold font-poppins text-gray-800">
                Products :{"  "}
                <span className="text-red-600">{products?.length}</span>
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
                        <div class="font-semibold text-left">Product Name</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Category</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Price</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Discount</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">status</div>
                      </th>

                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-gray-100">
                    {console.log(currentItems)}
                    {currentItems?.length > 0 &&
                      currentItems
                        ?.filter((product) =>
                          product?.title
                            ?.toLocaleLowerCase()
                            .includes(searchData.toLocaleLowerCase())
                        )
                        .map((product, i) => (
                          <tr key={product?._id}>
                            <td class="p-2 whitespace-nowrap">
                              <div class="flex items-center">
                                {products?.findIndex(
                                  (item) => item?._id === product?._id
                                ) + 1}
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {product?.title}
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {product?.category?.categoryName}
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {product?.price}
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {product?.status === "discount" &&
                                product?.discount}
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {product?.status}
                            </td>
                            <td class="p-2 whitespace-nowrap flex gap-2">
                              <div class="mx-auto flex w-[100px] gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handelToDeleteProduct(product?._id)
                                  }
                                  className="px-1 py-1 bg-red-200 rounded-3xl hover:cursor-pointer hover:scale-125 transition-scale duration-500"
                                >
                                  {/* svg */}
                                  <RiDeleteBin6Line className="text-2xl text-red-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => (
                                    setProduct(product),
                                    setEditProductModal(true)
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
        {/* pagination */}

        <div>
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
      </div>

      {addProductModal && (
        <AddProductModal setAddProductModal={setAddProductModal} />
      )}
      {editProductModal && (
        <UpdateProductModal
          setEditProductModal={setEditProductModal}
          product={product}
        />
      )}
    </>
  );
};

export default Products;
