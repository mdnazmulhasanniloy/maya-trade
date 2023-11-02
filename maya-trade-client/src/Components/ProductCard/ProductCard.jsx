import React from "react";
import { FaRegHeart, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="card card-compact w-96 bg-white border border-gray-200 rounded-lg shadow">
      <figure>
        <img src={product?.img} alt="Shoes" />
      </figure>
      {/* <div className="max-h-40 bg-red-300">
        <img className="" src={product?.img} alt="" />
      </div> */}
      <div className="card-body flex flex-col justify-end">
        <h3 className=" font-bold text-lg">{product?.title}</h3>
        <div className="flex items-center mt-2.5 mb-5">
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            5.0
          </span>
        </div>
        <div className="flex justify-between text-[#e94560]">
          <h4>{product?.price}$</h4>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-transparent hover:bg-[#e94560] px-4 py-2 rounded border border-[#03004717] hover:text-white"
          >
            <FaPlus className="text-lg" />
          </button>
        </div>
      </div>
    </div>

    // <div className="card w-96">
    //   <div className="bg-white p-5 relative rounded-md shadow-2xl m-5 group mt-10">
    //     <div className="img">
    //       <span className="absolute top-0 left-0 bg-[#e94560] px-3 py-2 text-white m-3 rounded-3xl">
    //         {product?.discount} % Off
    //       </span>
    //       <figure>
    //         <img src={product?.img} alt="Shoes" />
    //       </figure>
    //       <div className="absolute top-0 right-0 m-3 transition-all duration-700 hidden group-hover:block ">
    //         <label className="bg-[#0f3460] text-white text-sm py-1 px-3 rounded-3xl ">
    //           0
    //         </label>{" "}
    //         <br />
    //         <FaRegHeart className=" text-xl my-3 mx-1" />
    //       </div>
    //     </div>
    //     <div className="product-details">
    //       <h3 className=" font-normal text-lg">{product?.name}</h3>
    //       <div onClick={(e) => console.log(e.target.value)} className="rating">
    //         <input type="radio" name="rating-1" className="mask mask-star" />
    //         <input
    //           type="radio"
    //           name="rating-1"
    //           className="mask mask-star"
    //           defaultChecked
    //         />
    //         <input type="radio" name="rating-1" className="mask mask-star" />
    //         <input type="radio" name="rating-1" className="mask mask-star" />
    //         <input type="radio" name="rating-1" className="mask mask-star" />
    //       </div>
    //       <div className="flex justify-between text-[#e94560]">
    //         <h4>{product?.price}$</h4>
    //         <button
    //           onClick={() => dispatch(addToCart(product))}
    //           className="bg-transparent hover:bg-[#e94560] px-4 py-2 rounded border border-[#03004717] hover:text-white"
    //         >
    //           <FaPlus className="text-lg" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductCard;
