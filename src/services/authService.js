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
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),
    // Verify email
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/verify-email`,
        method: "POST",
        data: credentials,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),

    //Resend Verification email
    resendVerificationEmail: builder.mutation({
      query: () => ({
        url: `/api/auth/resend-verification-email`,
        method: "POST",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: `/api/auth/logout`,
        method: "POST",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),

    // Delete account
    deleteAccount: builder.mutation({
      query: () => ({
        url: `/api/auth/account`,
        method: "POST",
        data: {
          _method: "DELETE",
        },
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/login`,
        method: "POST",
        data: credentials,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),

    // Forgot password
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/forgot-password`,
        method: "POST",
        data: credentials,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: `/api/auth/reset-password`,
        method: "POST",
        data: credentials,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Auth"],
    }),
    // Reset password
    validateResetToken: builder.query({
      query: (params) => ({
        url: `/api/auth/reset-password/validate`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Auth"],
    }),

    // Get me
    getCurrentUser: builder.query({
      query: () => ({
        url: `/api/auth/user`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useResendVerificationEmailMutation,
  useDeleteAccountMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateResetTokenQuery,
  useGetCurrentUserQuery,
} = authApi;
