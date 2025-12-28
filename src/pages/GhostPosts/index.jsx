import { useState } from "react";
import { CircleEllipsis } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import PostCard from "@/components/post/PostCard";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useGetFeedQuery } from "@/services/postService";
import { Spinner } from "@/components/Common/ui/spinner";
import FeedHeader from "@/components/post/FeedHeader";
import EmptyState from "@/components/Common/EmptyState";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";
import { useTranslation } from "react-i18next";
import { useTitle } from "react-use";

export default function GhostPosts({
  dragHandleProps,
  onNavigate,
  onRemoveColumn,
  canRemove,
  type,
}) {
  // Title
  useTitle("Ghost posts");

  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(() => Date.now());
  const { t } = useTranslation(["feed"]);

  const { user } = useAuth();
  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useGetFeedQuery({ type: "ghost", page, per_page: 10, refreshKey });

  const posts = postsData?.data ?? [];
  const pagination = postsData?.pagination;

  const hasNextPage = pagination?.current_page < pagination?.last_page;

  const loadMore = () => {
    if (!isFetching && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefreshFeed = () => {
    setRefreshKey(Date.now());
    setPage(1);
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 800px 0px",
  });

  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col">
        {/* Sticky Header Container */}
        <div
          // Props de drag and drop
          {...dragHandleProps?.attributes}
          {...dragHandleProps?.listeners}
          className="bg-background sticky top-0 z-50 cursor-grab active:cursor-grabbing"
        >
          {/* Visible Header Navigation */}
          {user ? (
            <FeedHeader
              type={type}
              canRemove={canRemove}
              onRemoveColumn={onRemoveColumn}
              onNavigate={onNavigate}
            />
          ) : (
            <div className="flex items-center justify-between px-2 py-2 text-lg font-bold">
              <div className="w-10 px-4 py-3"></div>
              <div className="flex items-center justify-center gap-4 px-4 py-3">
                <span className="text-foreground text-[15px] font-bold">
                  {t("feed:ghostPosts")}
                </span>
              </div>
              <MoreAtFeedHeader canRemove={canRemove}>
                <div className="flex w-10 justify-center">
                  <CircleEllipsis
                    className="cursor-pointer shadow-2xl shadow-gray-400 hover:scale-110"
                    strokeWidth={1.1}
                  />
                </div>
              </MoreAtFeedHeader>
            </div>
          )}

          {/* Visible Border connecting the masks */}
          <div className="bg-border absolute right-5 -bottom-px left-5 z-10 h-0.5" />

          {/* Hanging Masks to create "Rounded Top" effect over scrolling content */}
          <div className="pointer-events-none absolute top-full left-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom right, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), var(--background) calc(70% + 1px))",
              }}
            />
          </div>
          <div className="absolute top-full right-6 left-6 h-1 bg-transparent" />
          <div className="pointer-events-none absolute top-full right-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom left, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), var(--background) calc(70% + 1px))",
              }}
            />
          </div>
        </div>

        {/* Main Content - Flows naturally with window scroll */}
        <div className="bg-background relative z-0 flex min-h-screen w-full flex-col">
          {/* Left Border Line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 z-10 w-px" />
          {/* Right Border Line */}
          <div className="bg-border absolute top-0 right-0 bottom-0 z-10 w-px" />

          <div className="relative flex flex-col">
            {isLoading && posts.length === 0 ? (
              Array.from({ length: 5 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))
            ) : posts.length === 0 ? (
              <EmptyState
                title={t("feed:noGhostPostsYet")}
                description={t("feed:ghostPostsWillAppearHere")}
              />
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  isPermitDetailPost={true}
                  onDeleteSuccess={handleRefreshFeed}
                />
              ))
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
  );
}
