import apiSlice from "../Api/apiSlice";

const categoryApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: () => "/category",
      providesTags: ["categories"],
    }),

    //add category
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    // update category
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    // delete category
    removeCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
