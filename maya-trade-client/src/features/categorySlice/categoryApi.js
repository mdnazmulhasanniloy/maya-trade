import apiSlice from "../Api/apiSlice";

const categoryApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: () => "/categories",
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
      query: (data) => ({
        url: `/category/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    // delete category
    removeCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
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
