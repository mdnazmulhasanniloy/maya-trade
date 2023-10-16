import React from "react";
import { FaRegHeart, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="box">
      <div className="bg-white p-5 relative rounded-md shadow-2xl m-5 group mt-10">
        <div className="img">
          <span className="absolute top-0 left-0 bg-[#e94560] px-3 py-2 text-white m-3 rounded-3xl">
            {product?.discount} % Off
          </span>
          <img src={product?.img} alt="" />
          <div className="absolute top-0 right-0 m-3 transition-all duration-700 hidden group-hover:block ">
            <label className="bg-[#0f3460] text-white text-sm py-1 px-3 rounded-3xl ">
              0
            </label>{" "}
            <br />
            <FaRegHeart className=" text-xl my-3 mx-1" />
          </div>
        </div>
        <div className="product-details">
          <h3 className=" font-normal text-lg">{product?.name}</h3>
          <div className="rating">
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
              defaultChecked
            />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
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
    </div>
  );
};

export default ProductCard;
