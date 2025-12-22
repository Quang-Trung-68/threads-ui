import { Button } from "@/components/Common/ui/button";
import { Input } from "@/components/Common/ui/input";
import { useGetFollowSuggestionQuery } from "@/services/searchService";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import FollowSuggestionCard from "@/components/Features/search/FollowSuggestionCard";
import { Spinner } from "@/components/Common/ui/spinner";
import EmptyState from "@/components/Common/EmptyState";

export default function Search() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refreshKey] = useState(() => Date.now());

  const {
    data: followSuggestionsData,
    isLoading,
    isFetching,
    isError,
  } = useGetFollowSuggestionQuery({
    type: "suggestions", // or any type required by API
    page,
    per_page: 10,
    refreshKey,
  });

  const suggestions = followSuggestionsData?.data ?? [];
  const pagination = followSuggestionsData?.pagination;

  const hasNextPage = pagination?.current_page < pagination?.last_page;

  const loadMore = () => {
    if (!isFetching && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 800px 0px",
  });

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[rgb(250,250,250)]">
      <div className="flex w-full flex-col">
        {/* Sticky Header Container */}
        <div className="sticky top-0 z-50 bg-[#FAFAFA]">
          {/* Header Title Bar */}
          <div className="flex items-center justify-center p-4 text-lg font-bold">
            <span className="text-[15px] font-bold text-black">Search</span>
          </div>

          {/* Visible Border connecting the masks */}
          <div className="bg-border absolute right-5 -bottom-px left-5 z-10 h-0.5" />

          {/* Hanging Masks */}
          <div className="pointer-events-none absolute top-full left-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom right, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), #FAFAFA calc(70% + 1px))",
              }}
            />
          </div>
          <div className="absolute top-full right-6 left-6 h-1 bg-transparent" />
          <div className="pointer-events-none absolute top-full right-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom left, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), #FAFAFA calc(70% + 1px))",
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-0 flex min-h-screen w-full flex-col bg-white">
          {/* Left Border Line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 z-10 w-px" />
          {/* Right Border Line */}
          <div className="bg-border absolute top-0 right-0 bottom-0 z-10 w-px" />

          <div className="flex flex-col p-4 px-6">
            {/* Search Bar */}
            <div className="relative mb-2">
              <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search"
                className="h-11 rounded-xl border-0 bg-gray-100 pl-10 text-[15px] focus-visible:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="mt-2 flex flex-col">
              {suggestions.length > 0 && (
                <h3 className="mb-3 text-lg font-semibold text-gray-500">
                  Follow suggestions
                </h3>
              )}
              {isLoading && suggestions.length === 0 ? (
                <div className="flex justify-center p-10">
                  <Spinner size="lg" />
                </div>
              ) : suggestions.length === 0 && !isFetching ? (
                <EmptyState
                  title="No suggestions found"
                  description="Try searching for something else."
                />
              ) : (
                <div className="flex flex-col divide-y divide-gray-100">
                  {suggestions.map((user) => (
                    <FollowSuggestionCard key={user.id} {...user} />
                  ))}
                </div>
              )}
            </div>

            {hasNextPage && (
              <div ref={sentryRef} className="flex justify-center p-4">
                {isFetching && <Spinner />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

