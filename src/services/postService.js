import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery(),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Get feed
    getFeed: builder.query({
      query: (params) => ({
        url: `/api/posts/feed`,
        method: "GET",
        params,
      }),

      // tất cả page dùng chung cache
      serializeQueryArgs: ({ queryArgs }) => {
        return `getFeed_${queryArgs.type}`;
      },

      // merge data giữa các page
      merge: (currentCache, response) => {
        // Deduplicate posts based on ID
        const currentIds = new Set(currentCache.data.map((post) => post.id));
        const newPosts = response.data.filter(
          (post) => !currentIds.has(post.id),
        );

        if (response.pagination.current_page === 1) {
          // If page 1, strictly replace the data to support "fresh start" logic
          currentCache.data = response.data;
        } else {
          currentCache.data.push(...newPosts);
        }

        currentCache.pagination = response.pagination;
      },

      // chỉ refetch khi page thay đổi
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ["Post"],
    }),
    getSinglePost: builder.query({
      query: ({ postId }) => ({
        url: `api/posts/${postId}`,
      }),
      transformResponse: (response) => response.data,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/api/posts`,
        method: "POST",
        data,
      }),
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/posts/${id}`,
        method: "POST",
        data: {
          _method: "DELETE",
        },
      }),
    }),
    likePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/posts/${id}/like`,
        method: "POST",
      }),
    }),
    repost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/posts/${id}/repost`,
        method: "POST",
      }),
    }),
    savePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/posts/${id}/save`,
        method: "POST",
      }),
    }),
    muteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/api/users/${userId}/mute`,
        method: "POST",
      }),
    }),
    unmuteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/api/users/${userId}/mute`,
        method: "POST",
        data: {
          _method: "DELETE",
        },
      }),
    }),
    restrictUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/api/users/${userId}/restrict`,
        method: "POST",
      }),
    }),
    hidePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/posts/${id}/hide`,
        method: "POST",
      }),
    }),
    reportPost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/posts/${id}/report`,
        method: "POST",
        data,
      }),
    }),
    blockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/api/users/${userId}/block`,
        method: "POST",
      }),
    }),
    unblockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/api/users/${userId}/block`,
        method: "POST",
        data: {
          _method: "DELETE",
        },
      }),
    }),
    // reply to post
    createReply: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/api/posts/${postId}/reply`,
        method: "POST",
        data,
      }),
    }),
    getReplies: builder.query({
      query: ({ postId }) => ({
        url: `/api/posts/${postId}/replies`,
      }),
    }),
    getPendingReplies: builder.query({
      query: ({ postId }) => ({
        url: `/api/posts/${postId}/pending-replies`,
      }),
    }),
    approveReply: builder.mutation({
      query: ({ postId, replyId }) => ({
        url: `/api/posts/${postId}/replies/${replyId}/approve`,
        method: "POST",
      }),
    }),
    rejectReply: builder.mutation({
      query: ({ postId, replyId }) => ({
        url: `/api/posts/${postId}/replies/${replyId}/reject`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetFeedQuery,
  useGetSinglePostQuery,
  useLikePostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useRepostMutation,
  useSavePostMutation,
  useMuteUserMutation,
  useUnmuteUserMutation,
  useRestrictUserMutation,
  useHidePostMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useReportPostMutation,
  useCreateReplyMutation,
  useGetRepliesQuery,
  useGetPendingRepliesQuery,
  useApproveReplyMutation,
  useRejectReplyMutation,
} = postApi;
