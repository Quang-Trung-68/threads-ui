import CommentItem from "@/components/Features/Comments/CommentItem";
import PostCard from "@/components/post/PostCard";
import {
  useGetRepliesQuery,
  useGetSinglePostQuery,
} from "@/services/postService";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronRight, CircleArrowLeft } from "lucide-react";
import { Spinner } from "@/components/Common/ui/spinner";
import { useNavigate } from "react-router-dom";
import { useTitle } from "react-use";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function PostDetail({ onNavigate, state }) {
  const { t } = useTranslation(["user"]);
  useScrollToTop();

  const params = useParams();
  const postId = params.postId || state?.postId;
  const navigate = useNavigate();

  const { data: post, isLoading: isPostLoading } = useGetSinglePostQuery({
    postId,
  });
  const { data: replies, isLoading: isRepliesLoading } = useGetRepliesQuery({
    postId,
  });

  useTitle(
    post?.content
      ? `${post.content.slice(0, 20)}...`
      : t("common:followingTitle")
  );

  const repliesData = replies?.data;
  const pagination = replies?.pagination;


  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col">
        {/* Sticky Header Container */}
        <div className="bg-background sticky top-0 z-50">
          {/* Header Title Bar */}
          <div className="flex items-center justify-between px-2 py-2 text-lg font-bold">
            <div className="flex w-10 justify-center transition ease-in">
              {window.history.length > 1 && (
                <CircleArrowLeft
                  className="cursor-pointer hover:scale-110"
                  onClick={() =>
                    state?.isDeck ? onNavigate("Home") : navigate(-1)
                  }
                  strokeWidth={1}
                />
              )}
            </div>
            <span className="text-foreground text-[15px] font-bold">
              {t("user:threads")}
            </span>
            <div className="w-10 px-4 py-3"></div>
          </div>

          {/* Visible Border connecting the masks */}
          <div className="bg-border absolute right-5 -bottom-px left-5 z-10 h-0.5" />

          {/* Hanging Masks */}
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

        {/* Main Content */}
        <div className="bg-background relative z-0 flex min-h-screen w-full flex-col">
          {/* Left Border Line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 z-10 w-px" />
          {/* Right Border Line */}
          <div className="bg-border absolute top-0 right-0 bottom-0 z-10 w-px" />

          {/* Post Content */}
          {isPostLoading || isRepliesLoading ? (
            <div className="flex min-h-[50vh] flex-1 items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="px-4 pt-4 pb-2">
                <PostCard isPermitDetailPost={false} {...post} />
                {/* Separator */}
                <div className="bg-border my-2 h-px w-full" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="gap-1 font-semibold">Top</span>
                    <span>
                      <ChevronDown className="size-4 text-gray-400" />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="gap-1 text-gray-400">View activity</span>
                    <span>
                      <ChevronRight className="size-4 text-gray-400" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="bg-border my-2 h-0.5 w-full" />

              {/* Comments */}
              <div className="flex flex-col px-4 pb-4">
                {repliesData.map((comment) => (
                  <div key={comment.id} className="py-2 last:border-0">
                    <CommentItem {...comment} />
                    {/* Separator */}
                    <div className="bg-border my-2 h-px w-full" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
