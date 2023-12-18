import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../../Config";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
  }),
  endpoints: (builder) => ({}),
});

export default apiSlice;
