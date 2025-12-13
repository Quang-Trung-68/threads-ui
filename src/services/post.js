import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery(),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Register
    register: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/register`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Post"],
    }),
    // Get feed
    getFeed: builder.query({
      query: (params) => ({
        url: `/api/posts/feed`,
        method: "GET",
        params,
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetFeedQuery } = postApi;
