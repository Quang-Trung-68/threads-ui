import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import {
  Ellipsis as MoreIcon,
  CirclePlus as FollowIcon,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import InteractionBar from "./InteractionBar";
import QuickReplyModal from "@/components/Common/Modals/QuickReplyModal";
import PostOptionsDropdown from "../Common/DropdownMenu/PostOptionsDropdown";
import { useUnmuteUserMutation } from "@/services/postService";
import { useTranslation } from "react-i18next";
import TimeTooltip from "../Common/TimeTooltip";
import UserHoverCard from "../Common/UserHoverCard";
import useAuth from "@/hooks/useAuth";
import NiceModal from "@ebay/nice-modal-react";
import LoginActionModal from "@/components/Common/Modals/LoginActionModal";
import { PATHS } from "@/configs/paths";
import { Tooltip } from "../Common/Tooltip";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";

function PostCard({
  user,
  id,
  user_id,
  content,
  isPermitDetailPost,
  likes_count,
  replies_count,
  reposts_and_quotes_count,
  updated_at,
  is_liked_by_auth,
  is_reposted_by_auth,
  is_saved_by_auth,
  onDeleteSuccess,
  onNavigate,
  state,
}) {
  const { t } = useTranslation(["post", "common", "auth", "tooltip"]);
  const { user: userAuth } = useAuth();
  const [isMuted, setIsMuted] = useState(false);
  const [isHidePost, setIsHidePost] = useState(false);
  const [isRestrictUser, setIsRestrictUser] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [unmuteApi, { isLoading: isUnmuteLoading }] = useUnmuteUserMutation();
  const username = user.username;

  const navigate = useNavigate();
  const handlePostDetail = () => {
    if (!onNavigate)
      navigate(`/@${user.username}/post/${id}`, {
        state: {
          id,
        },
      });
    else onNavigate("PostDetail", { postId: id, isDeck: true });
  };

  const handleUserProfile = () => {
    if (!onNavigate)
      navigate(`/@${user.username}`, {
        state: {
          userId: user_id,
        },
      });
    else onNavigate("UserProfile", { username, isDeck: true });
  };

  const ReplyModalRef = useRef(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const toggleReplyModal = () => {
    ReplyModalRef.current?.toggle();
    setIsReplyOpen((prev) => !prev);
  };

  const handleMuteSuccess = () => {
    setIsMuted(true);
  };
  const handleHidePostSuccess = () => {
    setIsHidePost(true);
  };

  const handleRestrictUserSuccess = () => {
    setIsRestrictUser(true);
  };

  const handleBlockSuccess = () => {
    setIsBlocked(true);
  };

  const handleDeleteSuccess = () => {
    setIsDeleted(true);
    setTimeout(() => {
      if (!isPermitDetailPost) {
        navigate(PATHS.HOME, { state: { refresh: true } });
      }
    }, 1500);
  };

  const handleUnmute = async () => {
    try {
      await unmuteApi({ userId: user_id }).unwrap();
      setIsMuted(false);
    } catch (error) {
      console.error("Unmute failed:", error);
    }
  };

  const handleRequireAuth = () => {
    NiceModal.show(LoginActionModal, {
      titleModal: t("auth:sayMore"),
      descriptionModal: t("auth:sayMoreDescription"),
      showIconPost: false,
    });
  };

  // Auto resize textarea theo content
  const textareaRef = useRef(null);
  useAutoResizeTextarea(textareaRef, content);

  if (!userAuth)
    return (
      <div className="border-border flex flex-col p-3 md:p-6">
        <div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <UserAvatar user={user} className="size-9 cursor-pointer" />
                <div
                  className="border-background bg-foreground text-background hover:bg-foreground/90 absolute -right-1 -bottom-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 transition duration-300 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: follow / unfollow
                  }}
                >
                  <Plus size={12} strokeWidth={3} />
                </div>
              </div>

              {isReplyOpen && <div className="bg-border w-[3px] flex-1" />}
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <div className="content flex items-start justify-between">
                <div
                  className={`flex-1 ${isPermitDetailPost ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="flex items-center gap-2">
                    <UserHoverCard {...user}>
                      <div
                        onClick={handleRequireAuth}
                        className="text-foreground cursor-pointer font-semibold hover:underline"
                      >
                        {user.username}
                      </div>
                    </UserHoverCard>
                    <div className="text-muted-foreground text-sm">
                      <TimeTooltip dateString={updated_at} />
                    </div>
                  </div>
                  {content && (
                    <textarea
                      ref={textareaRef}
                      readOnly
                      onClick={handleRequireAuth}
                      className="w-full cursor-pointer resize-none overflow-hidden border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={content}
                    ></textarea>
                  )}
                </div>
                <PostOptionsDropdown
                  id={id}
                  userId={user_id}
                  username={user.username}
                  is_saved_by_auth={is_saved_by_auth}
                  onMuteSuccess={handleMuteSuccess}
                  onHidePostSuccess={handleHidePostSuccess}
                  onRestrictUserSuccess={handleRestrictUserSuccess}
                  onBlockSuccess={handleBlockSuccess}
                >
                  <div className="hover:bg-muted flex size-8 items-center justify-center rounded-2xl">
                    <MoreIcon className="text-muted-foreground size-7 cursor-pointer p-1" />
                  </div>
                </PostOptionsDropdown>
              </div>

              {/* <div className="overflow-hidden rounded-lg">
                <img src={urlImage} className="size-5" alt={""} />
              </div> */}

              {/* Interaction Bar */}
              <div>
                <InteractionBar
                  id={id}
                  user={user}
                  content={content}
                  updated_at={updated_at}
                  likes_count={likes_count}
                  replies_count={replies_count}
                  reposts_and_quotes_count={reposts_and_quotes_count}
                  toggleReplyModal={toggleReplyModal}
                  is_liked_by_auth={is_liked_by_auth}
                  is_reposted_by_auth={is_reposted_by_auth}
                />
              </div>
            </div>
          </div>
        </div>

        <QuickReplyModal
          id={id}
          user={user}
          content={content}
          updated_at={updated_at}
          ref={ReplyModalRef}
        />
      </div>
    );

  if (isBlocked) {
    return (
      <div className="bg-muted text-muted-foreground m-3 flex items-center justify-between rounded-2xl border-y p-3 text-sm md:p-6">
        <span>{t("post:youHaveBlocked", { username: user.username })}</span>
      </div>
    );
  } else if (isMuted) {
    return (
      <div className="bg-muted text-muted-foreground m-3 flex items-center justify-between rounded-2xl border-y p-3 text-sm md:p-6">
        <span>{t("post:postsMuted", { username: user.username })}</span>
        <button
          onClick={handleUnmute}
          disabled={isUnmuteLoading}
          className="text-muted-foreground hover:bg-muted cursor-pointer rounded-full border-0 px-4 py-1 disabled:opacity-50"
        >
          {isUnmuteLoading ? t("common:undoing") : t("common:undo")}
        </button>
      </div>
    );
  } else if (isHidePost) {
    return (
      <div className="bg-muted text-muted-foreground m-3 flex items-center justify-between rounded-2xl border-y p-3 text-sm md:p-6">
        <span>{t("post:postHidden")}</span>
      </div>
    );
  } else if (isRestrictUser) {
    return (
      <div className="bg-muted text-muted-foreground m-3 flex items-center justify-between rounded-2xl border-y p-3 text-sm md:p-6">
        <span>{t("post:userRestricted")}</span>
      </div>
    );
  } else if (isDeleted) {
    return (
      <div className="bg-muted text-muted-foreground m-3 flex items-center justify-between rounded-2xl border-y p-3 text-sm md:p-6">
        <span>{t("post:postDeleted")}</span>
      </div>
    );
  }

  return (
    <div className="border-border flex flex-col p-3 md:p-6">
      <div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <UserAvatar user={user} className="size-9 cursor-pointer" />
              <div
                className="border-background bg-foreground text-background hover:bg-foreground/90 absolute -right-1 -bottom-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 transition duration-300 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: follow / unfollow
                }}
              >
                <Plus size={12} strokeWidth={3} />
              </div>
            </div>

            {isReplyOpen && <div className="bg-border w-[3px] flex-1" />}
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="content flex items-start justify-between">
              <div
                className={`flex-1 ${isPermitDetailPost ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-center gap-2">
                  <UserHoverCard {...user}>
                    <div
                      onClick={handleUserProfile}
                      className="text-foreground cursor-pointer font-semibold hover:underline"
                    >
                      {user.username}
                    </div>
                  </UserHoverCard>
                  <div className="text-muted-foreground text-sm">
                    <TimeTooltip dateString={updated_at} />
                  </div>
                </div>
                {content && (
                  <textarea
                    ref={textareaRef}
                    readOnly
                    onClick={handlePostDetail}
                    className="w-full cursor-pointer resize-none overflow-hidden border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={content}
                  ></textarea>
                )}
              </div>
              <PostOptionsDropdown
                id={id}
                userId={user_id}
                username={user.username}
                is_saved_by_auth={is_saved_by_auth}
                onMuteSuccess={handleMuteSuccess}
                onHidePostSuccess={handleHidePostSuccess}
                onRestrictUserSuccess={handleRestrictUserSuccess}
                onBlockSuccess={handleBlockSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              >
                <Tooltip label={t("tooltip:more")}>
                  <div className="hover:bg-muted flex size-8 items-center justify-center rounded-2xl">
                    <MoreIcon className="text-muted-foreground size-7 cursor-pointer p-1" />
                  </div>
                </Tooltip>
              </PostOptionsDropdown>
            </div>

            {/* <div className="overflow-hidden rounded-lg">
                <img src={urlImage} className="size-5" alt={""} />
              </div> */}

            {/* Interaction Bar */}
            <div>
              <InteractionBar
                id={id}
                user={user}
                content={content}
                updated_at={updated_at}
                likes_count={likes_count}
                replies_count={replies_count}
                reposts_and_quotes_count={reposts_and_quotes_count}
                toggleReplyModal={toggleReplyModal}
                is_liked_by_auth={is_liked_by_auth}
                is_reposted_by_auth={is_reposted_by_auth}
              />
            </div>
          </div>
        </div>
      </div>

      <QuickReplyModal
        id={id}
        user={user}
        content={content}
        updated_at={updated_at}
        ref={ReplyModalRef}
      />
    </div>
  );
}

export default PostCard;
