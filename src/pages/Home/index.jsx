import { useState } from "react";
import { CircleEllipsis, Grid2X2Plus } from "lucide-react";

import UserAvatar from "@/components/Common/ui/UserAvatar";
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
import { useTranslation } from "react-i18next";

export default function Home({ onNavigate, state }) {
  const { t } = useTranslation(["feed", "common"]);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(() => Date.now());

  const { user } = useAuth();
  const {
    data: postsData,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetFeedQuery({ type: "for_you", page, per_page: 10, refreshKey });

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
    rootMargin: "0px 0px 1000px 0px",
  });

  // Navigation page
  // const handleToForYou = () => {};
  // const handleToFollowing = () => {};
  // const handleToGhostPosts = () => {};

  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col">
        {/* Sticky Header Container */}
        {/* The entire block is sticky to create the 'Fixed Frame' effect while keeping native scroll */}
        <div className="bg-background sticky top-0 z-50">
          {/* Visible Header Navigation */}
          {user ? (
            <FeedHeader />
          ) : (
            <div className="flex items-center justify-between px-2 py-2 text-lg font-bold">
              <div className="w-10 px-4 py-3"></div>
              <div className="flex items-center justify-center gap-4 px-4 py-3">
                <span className="text-foreground text-[15px] font-bold">
                  {t("feed:home")}
                </span>
              </div>
              <div className="flex w-10 justify-center">
                <CircleEllipsis
                  className="cursor-pointer shadow-2xl shadow-gray-400 hover:scale-110"
                  strokeWidth={1.1}
                />
              </div>
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

          {/* Avatar + post button if logged in */}
          {user && (
            <div className="bg-background flex items-center justify-between border-2 p-5">
              <div className="flex flex-1 items-center gap-2">
                <div>
                  <UserAvatar user={user} className={"size-9"} />
                </div>
                <div onClick={onHandlePost} className="flex-1">
                  <Input
                    type={"text"}
                    className={
                      "text-muted-foreground border-0 p-0.5 shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    }
                    placeholder={t("common:whatsNews")}
                  />
                </div>
              </div>
              <div onClick={onHandlePost}>
                <Button
                  variant="outline"
                  className={"cursor-pointer rounded-2xl font-semibold"}
                >
                  {t("common:post")}
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
                title={t("feed:noPostsYet")}
                description={t("feed:postsWillAppearHere")}
              />
            ) : (
              posts.map((post) => (
                <>
                  <PostCard
                    key={post.id}
                    {...post}
                    isPermitDetailPost={true}
                    onDeleteSuccess={handleRefreshFeed}
                    onNavigate={onNavigate}
                    state={state}
                  />
                  {/* Separator */}
                  <div className="bg-border my-2 h-px w-full" />
                </>
              ))
            )}
          </div>
          {isSuccess && hasNextPage && (
            <div ref={sentryRef} className="flex justify-center p-4">
              {isFetching && <Spinner />}
            </div>
          )}
        </div>
      </div>
      <span className="fixed top-[50vh] right-[calc((100%-700px)/2)] size-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-300 text-gray-300 hover:border-black hover:text-black"
        >
          <Grid2X2Plus className="size-4" />
        </Button>
      </span>
    </div>
  );
}
