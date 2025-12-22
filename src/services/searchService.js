import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: baseQuery(),
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    getFollowSuggestion: builder.query({
      query: ({ refreshKey, ...params }) => ({
        url: `/api/users/suggestions`,
        method: "GET",
        params,
      }),

      // tất cả page dùng chung cache
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.refreshKey) {
          delete newQueryArgs.refreshKey;
        }
        return `getFollowSuggestion_${newQueryArgs.type}_${queryArgs.refreshKey ?? "default"}`;
      },

      // merge data giữa các page
      merge: (currentCache, response) => {
        // Deduplicate searching result based on ID
        const currentIds = new Set(
          currentCache.data.map((search) => search.id),
        );
        const newSearchResults = response.data.filter(
          (search) => !currentIds.has(search.id),
        );

        if (response.pagination.current_page === 1) {
          // If page 1, strictly replace the data to support "fresh start" logic
          currentCache.data = newSearchResults;
        } else {
          currentCache.data.push(...newSearchResults);
        }

        currentCache.pagination = response.pagination;
      },

      // chỉ refetch khi page thay đổi
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ["Search"],
    }),
  }),
});

export const { useGetFollowSuggestionQuery } = searchApi;
