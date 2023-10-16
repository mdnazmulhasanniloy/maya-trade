import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addToCart,
  quantityMinus,
  removeFromCart,
} from "../../features/cart/cartSlice";

const CartCard = ({ product, price }) => {
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     setTotalPrice(totalPrice + product?.price * product?.quantity);
  //   }, [totalPrice, setTotalPrice, product]);

  return (
    <div className="bg-white flex justify-between">
      <div className="flex">
        <img src={product?.img} className="h-36" alt="" />
        <div className="py-4 flex flex-col justify-between">
          <h1 className="text-xl font-bold">{product?.title}</h1>
          <p className="text-lg">
            {product?.price} * {product?.quantity}
            <span className="text-[#e94560] ml-5">
              {product?.price * product?.quantity}
            </span>
          </p>
        </div>
      </div>

      <div className="py-4 pr-2 flex flex-col justify-between">
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(removeFromCart(product))}
            className="bg-transparent hover:bg-[#e94560] px-4 py-2 rounded border border-[#03004717] hover:text-white"
          >
            <FaPlus className="text-lg rotate-45" />
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-transparent hover:bg-[#e94560] px-4 py-2 rounded border border-[#03004717] hover:text-white"
          >
            <FaPlus className="text-lg" />
          </button>
          <button
            onClick={() => dispatch(quantityMinus(product))}
            className="bg-transparent hover:bg-[#e94560] px-4 py-2 rounded border border-[#03004717] hover:text-white"
          >
            <FaMinus className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
