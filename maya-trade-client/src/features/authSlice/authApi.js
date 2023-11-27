// import { useNavigate } from "react-router-dom";
import apiSlice from "./../Api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(getUser(data?.email));
        } catch (error) {}
      },
    }),
  }),
});

export const { useRegisterMutation } = authApi;
