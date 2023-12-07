import apiSlice from "../Api/apiSlice";

const OrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderByTranId: builder.query({
      query: (tranId) => `/payment/success/${tranId}`,
    }),
  }),
});
// import apiSlice from "../Api/apiSlice";

// const orderApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getOrderByTranId: builder.query({
//       query: (tranId) =>,
//     }),
//   }),
// });

export const { useGetOrderByTranIdQuery } = OrderApi;
