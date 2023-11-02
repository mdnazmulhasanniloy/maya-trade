import toast from "react-hot-toast";
import apiSlice from "./../Api/apiSlice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: "/checkout",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          if (!res.data.success) {
            toast.error(res.data.message);
            return;
          }
          window.location.replace(res.data.url);
          console.log("url", res);
        } catch (error) {}
      },
    }),
  }),
});

export const { useCheckoutMutation } = paymentApi;
