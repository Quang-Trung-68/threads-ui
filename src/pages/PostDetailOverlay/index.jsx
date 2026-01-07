import CommentItem from "@/components/Features/Comments/CommentItem";
import React, { useState, useEffect } from "react";
import PostCard from "@/components/post/PostCard";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {
    useGetRepliesQuery,
    useGetSinglePostQuery,
} from "@/services/postService";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronRight, CircleArrowLeft } from "lucide-react";
import { Spinner } from "@/components/Common/ui/spinner";
import { useTitle } from "react-use";
import { Tooltip } from "@/components/Common/Tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/Common/ui/dropdown-menu";
import MotionButton from "@/components/Common/MotionButon";

export default function PostDetailOverlay() {
    const { t } = useTranslation(["user", "tooltip", "common"]);
    const params = useParams();
    const postId = params.postId;
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("top");

    const { data: post, isLoading: isPostLoading } = useGetSinglePostQuery({
        postId,
    });
    const {
        data: replies,
        isLoading: isRepliesLoading,
        isFetching: isRepliesFetching,
        isSuccess: isRepliesSuccess,
    } = useGetRepliesQuery({
        postId,
        page,
        per_page: 10,
    });

    const pagination = replies?.pagination;
    const hasNextPage = pagination?.current_page < pagination?.last_page;

    const loadMore = () => {
        if (hasNextPage && !isRepliesFetching) {
            setPage((prev) => prev + 1);
        }
    };

    const [sentryRef] = useInfiniteScroll({
        loading: isRepliesFetching,
        hasNextPage,
        onLoadMore: loadMore,
        rootMargin: "0px 0px 800px 0px",
    });

    useTitle(
        post?.content
            ? `${post.content.slice(0, 20)}...`
            : t("common:followingTitle"),
    );

    // Prevent body scroll when overlay is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const repliesData = replies?.data || [];

    return (
        <div className="bg-background fixed inset-0 z-40 flex min-h-screen w-full flex-col overflow-y-auto">
            <div className="mx-auto flex w-full max-w-160 flex-col">
                {/* Sticky Header Container */}
                <div className="bg-background sticky top-0 z-50">
                    {/* Header Title Bar */}
                    <div className="flex items-center justify-between px-2 py-2 text-lg font-bold">
                        <MotionButton>
                            <Tooltip label={t("tooltip:back")}>
                                <div className="flex w-10 justify-center">
                                    {window.history.length > 1 && (
                                        <CircleArrowLeft
                                            className="cursor-pointer hover:scale-110"
                                            onClick={handleBack}
                                            strokeWidth={1}
                                        />
                                    )}
                                </div>
                            </Tooltip>
                        </MotionButton>
                        <span className="text-foreground px-4 py-3 text-[15px] font-bold">
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
                            <Spinner />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <div className="px-4 pt-4 pb-2">
                                <PostCard isPermitDetailPost={false} {...post} />
                                {/* Separator */}
                                <div className="bg-border my-2 h-px w-full" />
                                <div className="flex items-center justify-between">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex cursor-pointer items-center outline-none">
                                            <span className="gap-1 font-semibold">
                                                {sortBy === "top" ? t("post:top") : t("post:recent")}
                                            </span>
                                            <span>
                                                <ChevronDown className="size-4 text-gray-400" />
                                            </span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-fit rounded-3xl" align="start">
                                            <DropdownMenuItem
                                                className={
                                                    "w-full rounded-3xl px-3 py-3.5 text-[15px] font-semibold"
                                                }
                                                onClick={() => setSortBy("top")}>
                                                {t("post:top")}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className={
                                                    "w-full rounded-3xl px-3 py-3.5 text-[15px] font-semibold"
                                                }
                                                onClick={() => setSortBy("recent")}>
                                                {t("post:recent")}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <div className="flex cursor-pointer items-center">
                                        <span className="gap-1 text-gray-400">{t("post:viewActivity")}</span>
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

                            {/* Infinite Scroll Sentinel */}
                            {isRepliesSuccess && hasNextPage && (
                                <div ref={sentryRef} className="flex justify-center p-4">
                                    {isRepliesFetching && <Spinner />}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
