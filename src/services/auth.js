import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery(),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Register
    register: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/register`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    // Verify email
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/verify-email`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/login`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Forgot password
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/forgot-password`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/reset-password`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    // Reset password
    validateResetToken: builder.query({
      query: (params) => ({
        url: `/api/auth/reset-password/validate`,
        method: "GET",
        params,
      }),
      providesTags: ["Auth"],
    }),

    // Get me
    getCurrentUser: builder.query({
      query: () => ({
        url: `/api/auth/user`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateResetTokenQuery,
  useGetCurrentUserQuery,
} = authApi;
