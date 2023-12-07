import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyImg from "../../assets/EmptyCart/EmptyCart.jpg";
import CartCard from "../../Components/CartCard/CartCard";
import { useCheckoutMutation } from "../../features/payment/paymentApi";
import { setCartFormLocalStorage } from "../../features/cart/cartSlice";

const Cart = () => {
  const carts = useSelector((state) => state?.cart?.carts);
  const dispatch = useDispatch();
  const {
    user: { _id },
  } = useSelector((state) => state?.auth);
  const [checkout, { isLoading, isSuccess, isError }] = useCheckoutMutation();
  const [price, setPrice] = useState({
    subtotalPrice: 0,
    totalPrice: 0,
    deliveryFee: 250, // Initialize deliveryFee here
  });

  useEffect(() => {
    const localstorage = localStorage.getItem("cart");
    if (localstorage) {
      const products = JSON.parse(localstorage);
      dispatch(setCartFormLocalStorage([...products]));
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    const subTotal = carts.reduce((total, cartItem) => {
      let discount = 1;
      if (cartItem?.discount > 0) {
        discount = (100 - cartItem?.discount) / 100;
      }
      return total + cartItem?.price * discount * cartItem?.quantity;
    }, 0);

    const totalPrice = subTotal + price.deliveryFee; // Calculate totalPrice here

    setPrice({
      ...price,
      subtotalPrice: subTotal,
      totalPrice, // Update totalPrice
    });
  }, [carts, price?.deliveryFee, setPrice]); // Include only carts and price.deliveryFee as dependencies

  // Check if the cart is empty correctly
  if (!carts?.length > 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center mt-10">
        <img src={emptyImg} className="w-96" alt="" />
        <h1 className="text-xl text-center text-cyan-500">Opps!!</h1>
        <h1 className="text-lg text-center">Your shopping cart is empty!</h1>
      </div>
    );
  }

  const handelToCheckout = async () => {
    localStorage.setItem("cart", JSON.stringify(carts));
    let ProductInfo = [];
    const product = await carts?.map((product) =>
      ProductInfo.push({ product: product?._id, quantity: product?.quantity })
    );
    const paymentInfo = { ProductInfo, userId: _id, price: price?.totalPrice };
    console.log("paymentInfo", paymentInfo);
    checkout(paymentInfo);
  };

  return (
    <section className="min-h-[100vh] bg-[#d7e3f0] pt-10">
      <div className="w-full flex flex-col md:flex-row gap-5">
        {/* cart details  */}
        <div className="w-full md:w-[70%]">
          <div className="w-11/12 mx-auto">
            <div className="w-full grid grid-cols-1 gap-10">
              {carts?.map((product) => (
                <CartCard key={product?._id} product={product} />
              ))}
            </div>
          </div>
        </div>
        {/* cart price summary  */}
        <div className="w-full md:w-[30%]">
          <div className="w-[70%] mx-auto bg-white p-3">
            <h1 className="text-xl font-bold text-[#e94560] border-b border-gray-300 pb-3">
              Cart Summary
            </h1>
            <div className="flex justify-between items-center mt-3">
              <h1 className="text-lg">Sub Total Price</h1>
              <h1 className="text-xl font-semibold text-black">
                {price?.subtotalPrice}
              </h1>
            </div>
            <div className="flex justify-between items-center mt-3">
              <h1 className="text-lg">Delivery Fee</h1>
              <h1 className="text-xl font-semibold text-black">
                {price?.deliveryFee}
              </h1>
            </div>
            <div className="flex justify-between items-center mt-3">
              <h1 className="text-lg">Total Price</h1>
              <h1 className="text-xl font-bold text-[#e94560]">
                {price?.totalPrice}
              </h1>
            </div>
            <div className="flex justify-end mt-5">
              <button
                disabled={isLoading}
                onClick={handelToCheckout}
                className="px-4 py-2 flex items-center justify-between rounded-lg border-2 border-[#e94560] text-white bg-[#e94560] hover:text-[#e94560] hover:bg-white transition-all duration-500"
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
