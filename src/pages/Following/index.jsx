import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/Common/ui/avatar";
import { Input } from "@/components/Common/ui/input";
import { Button } from "@/components/Common/ui/button";
import useAuth from "@/hooks/useAuth";
import PostCard from "@/components/post/PostCard";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useGetFeedQuery } from "@/services/postService";
import { Spinner } from "@/components/Common/ui/spinner";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import FeedHeader from "@/components/post/FeedHeader";
import EmptyState from "@/components/Common/EmptyState";

import PostCardSkeleton from "@/components/post/PostCardSkeleton";

export default function Following() {
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(() => Date.now());

  const { user } = useAuth();
  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useGetFeedQuery({ type: "following", page, per_page: 10, refreshKey });

  const onHandlePost = () => {
    CreatePostModal.open({ onSuccess: handleRefreshFeed });
  };

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
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      <div className="flex w-full flex-col">
        {/* Sticky Header Container */}
        {/* The entire block is sticky to create the 'Fixed Frame' effect while keeping native scroll */}
        <div className="sticky top-0 z-50 bg-background">
          {/* Visible Header Navigation */}
          {user ? (
            <FeedHeader />
          ) : (
            <div className="flex items-center justify-center gap-4 bg-background p-4 text-lg font-bold">
              <span className="text-[15px] font-bold text-foreground">Home</span>
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
        <div className="relative z-0 flex min-h-screen w-full flex-col bg-background">
          {/* Left Border Line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 z-10 w-px" />
          {/* Right Border Line */}
          <div className="bg-border absolute top-0 bottom-0 right-0 z-10 w-px" />

          {/* Avatar + post button if logged in */}
          {user && (
            <div className="flex items-center justify-between border-2 bg-background p-5">
              <div className="flex flex-1 items-center gap-2">
                <div>
                  <Avatar className={"size-9"}>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@dqt_2309"
                    />
                    <AvatarFallback>QT</AvatarFallback>
                  </Avatar>
                </div>
                <div onClick={onHandlePost} className="flex-1">
                  <Input
                    type={"text"}
                    className={
                      "border-0 p-0.5 text-muted-foreground shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    }
                    placeholder={`What's news ?`}
                  />
                </div>
              </div>
              <div onClick={onHandlePost}>
                <Button
                  variant="outline"
                  className={"cursor-pointer rounded-2xl font-semibold"}
                >
                  Post
                </Button>
              </div>
            </div>
          )}

          <div className="relative flex flex-col">
            {isLoading && posts.length === 0 ? (
              Array.from({ length: 5 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))
            ) : posts.length === 0 ? (
              <EmptyState
                title="No following posts yet"
                description="Follow people to see their posts in this feed. Keep track of what matters to you."
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
