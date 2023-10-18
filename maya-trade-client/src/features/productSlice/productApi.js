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
      // async onQueryStarted(data, { dispatch, queryFulfilled }) {
      //   try {
      //     const res = await queryFulfilled;
      //     dispatch(getProduct());
      //   } catch (error) {}
      // },
      invalidatesTags: ["Products"],
    }),

    // edit product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
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
  useUpdateProductMutation,
  useRemoveProductMutation,
} = productsApi;
