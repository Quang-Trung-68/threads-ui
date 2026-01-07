import { useLikePostMutation, useRepostMutation } from "@/services/postService";
import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
  MessageSquareQuoteIcon as QuoteIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "../Common/ui/dropdown-menu";

import { QuoteModal } from "./QuoteModal";
import ShareDropdown from "../Common/DropdownMenu/ShareDropdown";
import { notifySooner } from "@/utils/notifySooner";
import { useTranslation } from "react-i18next";
import MotionButton from "../Common/MotionButon";
import useAuth from "@/hooks/useAuth";
import NiceModal from "@ebay/nice-modal-react";
import LoginActionModal from "@/components/Common/Modals/LoginActionModal";
import { Tooltip } from "../Common/Tooltip";

const InteractionBar = ({
  id,
  user,
  content,
  updated_at,
  toggleReplyModal,
  likes_count,
  replies_count,
  reposts_and_quotes_count,
  is_liked_by_auth,
  is_reposted_by_auth,
}) => {
  const { t } = useTranslation(["common", "auth", "tooltip"]);
  const { user: userAuth } = useAuth();

  const [likePostApi, { isLoading: isLoadingLike }] = useLikePostMutation();
  const [repostApi, { isLoading: isLoadingRepost }] = useRepostMutation();
  const [interactionsCount, setInteractionsCount] = useState({
    is_liked_by_auth,
    likes_count,
    replies_count,
    reposts_and_quotes_count,
    is_reposted_by_auth,
  });

  const [isRepostOpen, setIsRepostOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Sync state with props when data is refetched or changes
  useEffect(() => {
    setInteractionsCount((prev) => ({
      ...prev,
      is_liked_by_auth,
      likes_count,
      replies_count,
      reposts_and_quotes_count,
      is_reposted_by_auth,
    }));
  }, [
    is_liked_by_auth,
    likes_count,
    replies_count,
    reposts_and_quotes_count,
    is_reposted_by_auth,
  ]);

  const handleLikeCount = async (e) => {
    e.stopPropagation(); // Prevent card click
    {
      if (isLoadingLike) return; // Prevent spamming

      // Optimistic Update
      const isLiked = interactionsCount.is_liked_by_auth;
      const newIsLiked = !isLiked;
      const newCount = interactionsCount.likes_count + (newIsLiked ? 1 : -1);

      setInteractionsCount({
        ...interactionsCount,
        is_liked_by_auth: newIsLiked,
        likes_count: newCount,
      });

      try {
        const response = await likePostApi({ id });
        if (!response.data.success) {
          // Revert on failure (optional, depending on API behavior, usually throws error or returns success:false)
          setInteractionsCount({
            ...interactionsCount,
            is_liked_by_auth: isLiked,
            likes_count: interactionsCount.likes_count,
          });
        }
      } catch (error) {
        console.error(error);
        // Revert on error
        setInteractionsCount({
          ...interactionsCount,
          is_liked_by_auth: isLiked,
          likes_count: interactionsCount.likes_count,
        });
      }
    }
  };

  const handleRepostCount = async (e) => {
    e.stopPropagation(); // Prevent card click
    if (isLoadingRepost) return; // Prevent spamming

    // Optimistic Update
    const isReposted = interactionsCount.is_reposted_by_auth;
    const newIsReposted = !isReposted;
    const newCount =
      interactionsCount.reposts_and_quotes_count + (newIsReposted ? 1 : -1);

    setInteractionsCount({
      ...interactionsCount,
      is_reposted_by_auth: newIsReposted,
      reposts_and_quotes_count: newCount,
    });

    try {
      const response = await repostApi({ id });
      if (!response.data.success) {
        // Revert on failure (optional, depending on API behavior, usually throws error or returns success:false)
        setInteractionsCount({
          ...interactionsCount,
          is_reposted_by_auth: isReposted,
          reposts_and_quotes_count: interactionsCount.reposts_and_quotes_count,
        });
      }
      notifySooner.success(
        isReposted ? t("common:removed") : t("common:reposted"),
      );
    } catch (error) {
      console.error(error);
      // Revert on error
      setInteractionsCount({
        ...interactionsCount,
        is_reposted_by_auth: isReposted,
        reposts_and_quotes_count: interactionsCount.reposts_and_quotes_count,
      });
    }
  };

  const handleQuote = () => {
    QuoteModal.open({ id, user, content, updated_at });
  };

  const handleRequireAuth = () => {
    NiceModal.show(LoginActionModal, {
      titleModal: t("auth:signUpToInteract"),
      descriptionModal: t("auth:joinThreadsToPost"),
      showIconPost: true,
    });
  };

  if (!userAuth)
    return (
      <>
        <div className="text-muted-foreground flex gap-4">
          <div
            onClick={handleRequireAuth}
            className={`likes_count hover:bg-accent flex cursor-pointer items-center gap-1 rounded-2xl p-1 py-2 ${interactionsCount.is_liked_by_auth
                ? "text-red-500"
                : "hover:bg-accent"
              }`}
          >
            <MotionButton>
              <Tooltip label={t("tooltip:like")}>
                <LikeIcon
                  className={`size-4.5 ${interactionsCount.is_liked_by_auth ? "fill-current" : ""}`}
                />
              </Tooltip>
              <span className="text-sm">{interactionsCount.likes_count}</span>
            </MotionButton>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleRequireAuth();
            }}
            className="replies_count hover:bg-accent flex cursor-pointer items-center gap-1 rounded-2xl p-1 px-2 hover:text-blue-500"
          >
            <MotionButton>
              <Tooltip label={t("tooltip:reply")}>
                <ReplyIcon className="size-4.5" />
              </Tooltip>
              <span className="text-sm">{interactionsCount.replies_count}</span>
            </MotionButton>
          </div>

          <div className="replies_count hover:bg-accent rounded-2xl p-1">
            <DropdownMenu modal={false} onOpenChange={setIsRepostOpen}>
              <DropdownMenuTrigger asChild>
                <span
                  className={`flex cursor-pointer items-center gap-1 rounded-2xl p-1 ${interactionsCount.is_reposted_by_auth
                      ? "text-green-500"
                      : "hover:bg-accent"
                    }`}
                >
                  <Tooltip label={isRepostOpen ? null : t("tooltip:repost")}>
                    <MotionButton>
                      <Repeat2Icon className="size-4.5" />
                      <span className="text-sm">
                        {interactionsCount.reposts_and_quotes_count}
                      </span>
                    </MotionButton>
                  </Tooltip>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"rounded-3xl border-2 p-2"}>
                <DropdownMenuCheckboxItem
                  onClick={handleRequireAuth}
                  className={
                    "flex h-12 w-56 cursor-pointer items-center justify-between rounded-3xl p-0 px-3.5 py-3 text-[15px] font-semibold"
                  }
                >
                  {interactionsCount.is_reposted_by_auth ? (
                    <span className="text-red-500">Remove</span>
                  ) : (
                    <span>Reposts</span>
                  )}
                  <span
                    className={`${interactionsCount.is_reposted_by_auth ? "text-red-500" : ""}`}
                  >
                    <Repeat2Icon className="size-4.5" />
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className={
                    "flex h-12 w-56 cursor-pointer items-center justify-between rounded-3xl p-0 px-3.5 py-3 text-[15px] font-semibold"
                  }
                  onClick={handleRequireAuth}
                >
                  <span>Quote</span>
                  <QuoteIcon className="size-4.5 font-normal" />
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            onClick={handleRequireAuth}
            className="hover:bg-accent flex cursor-pointer items-center gap-1 rounded-2xl p-1 px-2 hover:text-purple-500"
          >
            <MotionButton>
              <ShareDropdown
                id={id}
                user={user}
                content={content}
                updated_at={updated_at}
                likes_count={likes_count}
                replies_count={replies_count}
                reposts_and_quotes_count={reposts_and_quotes_count}
                onOpenChange={setIsShareOpen}
              >
                <Tooltip label={isShareOpen ? null : t("tooltip:share")}>
                  <SendIcon className="size-4.5" />
                </Tooltip>
              </ShareDropdown>
            </MotionButton>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="text-muted-foreground flex gap-4">
        <div
          onClick={handleLikeCount}
          className={`likes_count hover:bg-accent flex cursor-pointer items-center gap-1 rounded-2xl p-1 px-2 ${interactionsCount.is_liked_by_auth
              ? "text-red-500"
              : "hover:bg-accent"
            }`}
        >
          <MotionButton>
            <Tooltip label={t("tooltip:like")}>
              <LikeIcon
                className={`size-4.5 ${interactionsCount.is_liked_by_auth ? "fill-current" : ""}`}
              />
            </Tooltip>
            <span className="text-sm">{interactionsCount.likes_count}</span>
          </MotionButton>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleReplyModal();
          }}
          className="replies_count hover:bg-accent flex cursor-pointer items-center gap-1 rounded-2xl p-1 px-2 hover:text-blue-500"
        >
          <MotionButton>
            <Tooltip label={t("tooltip:reply")}>
              <ReplyIcon className="size-4.5" />
            </Tooltip>
            <span className="text-sm">{interactionsCount.replies_count}</span>
          </MotionButton>
        </div>

        <div className="replies_count hover:bg-accent rounded-2xl p-1">
          <DropdownMenu modal={false} onOpenChange={setIsRepostOpen}>
            <DropdownMenuTrigger asChild>
              <span
                className={`flex cursor-pointer items-center gap-1 rounded-2xl p-1 ${interactionsCount.is_reposted_by_auth
                    ? "text-green-500"
                    : "hover:bg-accent"
                  }`}
              >
                <MotionButton>
                  <Tooltip label={isRepostOpen ? null : t("tooltip:repost")}>
                    <Repeat2Icon className="size-4.5" />
                  </Tooltip>
                  <span className="text-sm">
                    {interactionsCount.reposts_and_quotes_count}
                  </span>
                </MotionButton>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"rounded-3xl border-2 p-2"}>
              <DropdownMenuCheckboxItem
                onClick={handleRepostCount}
                className={
                  "flex h-12 w-56 cursor-pointer items-center justify-between rounded-3xl p-0 px-3.5 py-3 text-[15px] font-semibold"
                }
              >
                {interactionsCount.is_reposted_by_auth ? (
                  <span className="text-red-500">Remove</span>
                ) : (
                  <span>Reposts</span>
                )}
                <span
                  className={`${interactionsCount.is_reposted_by_auth ? "text-red-500" : ""}`}
                >
                  <Repeat2Icon className="size-4.5" />
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className={
                  "flex h-12 w-56 cursor-pointer items-center justify-between rounded-3xl p-0 px-3.5 py-3 text-[15px] font-semibold"
                }
                onClick={handleQuote}
              >
                <span>Quote</span>
                <QuoteIcon className="size-4.5 font-normal" />
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hover:bg-accent flex cursor-pointer items-center gap-1 rounded-2xl p-1 px-2 hover:text-purple-500">
          <MotionButton>
            <ShareDropdown
              id={id}
              user={user}
              content={content}
              updated_at={updated_at}
              likes_count={likes_count}
              replies_count={replies_count}
              reposts_and_quotes_count={reposts_and_quotes_count}
              onOpenChange={setIsShareOpen}
            >
              <Tooltip label={isShareOpen ? null : t("tooltip:share")}>
                <SendIcon className="size-4.5" />
              </Tooltip>
            </ShareDropdown>
          </MotionButton>
        </div>
      </div>
    </>
  );
};

export default InteractionBar;
