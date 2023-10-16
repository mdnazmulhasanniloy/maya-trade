import apiSlice from "../Api/apiSlice";

export const productsApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get products
    getProduct: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    //add product
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} = productsApi;
