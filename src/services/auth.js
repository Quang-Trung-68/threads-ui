import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Register
    register: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/register`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    // Verify email
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/verify-email`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/login`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Forgot password
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/forgot-password`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/reset-password`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Get me
    getCurrentUser: builder.query({
      query: () => ({
        url: `/api/auth/user`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
} = authApi;
