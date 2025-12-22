import React, { useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/Common/ui/avatar";
import { Ellipsis as MoreIcon, CirclePlus as FollowIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import InteractionBar from "./InteractionBar";
import { formatTime } from "@/utils/formatTime";
import QuickReplyModal from "@/components/Common/Modals/QuickReplyModal";
import PostOptionsDropdown from "../Common/DropdownMenu/PostOptionsDropdown";
import { useUnmuteUserMutation } from "@/services/postService";

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
}) {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isHidePost, setIsHidePost] = useState(false);
  const [isRestrictUser, setIsRestrictUser] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [unmuteApi, { isLoading: isUnmuteLoading }] = useUnmuteUserMutation();

  const handleToPostDetail = () => {};

  const handleUserProfile = () => {
    navigate(`/@${user.username}`, {
      state: {
        userId: user_id,
      },
    });
  };

  const urlImage =
    "https://picsum.photos/600/400?random=" + Math.floor(Math.random() * 10);

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

  const handleUnmute = async () => {
    try {
      await unmuteApi({ userId: user_id }).unwrap();
      setIsMuted(false);
    } catch (error) {
      console.error("Unmute failed:", error);
    }
  };

  if (isBlocked) {
    return (
      <div className="m-3 flex items-center justify-between rounded-2xl border-y bg-gray-100 p-3 text-sm text-gray-500 md:p-6">
        <span>You have blocked {user.username}.</span>
      </div>
    );
  } else if (isMuted) {
    return (
      <div className="m-3 flex items-center justify-between rounded-2xl border-y bg-gray-100 p-3 text-sm text-gray-500 md:p-6">
        <span>
          Posts from {user.username} are muted. You can manage who you mute in
          settings on the mobile app.
        </span>
        <button
          onClick={handleUnmute}
          disabled={isUnmuteLoading}
          className="cursor-pointer rounded-full border-0 px-4 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          {isUnmuteLoading ? "Undoing..." : "Undo"}
        </button>
      </div>
    );
  } else if (isHidePost) {
    return (
      <div className="m-3 flex items-center justify-between rounded-2xl border-y bg-gray-100 p-3 text-sm text-gray-500 md:p-6">
        <span>This post has been hidden.</span>
      </div>
    );
  } else if (isRestrictUser) {
    return (
      <div className="m-3 flex items-center justify-between rounded-2xl border-y bg-gray-100 p-3 text-sm text-gray-500 md:p-6">
        <span>This user has been restricted.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-y p-3 md:p-6">
      <div>
        <div className="flex gap-2">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Avatar className="size-9 cursor-pointer">
                <AvatarImage
                  src={
                    "https://i.pravatar.cc/150?img=" +
                    Math.floor(Math.random() * 10)
                  }
                />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <div
                className="absolute -right-1 -bottom-1 flex cursor-pointer items-center justify-center rounded-full border-2 border-white bg-black p-[2px] text-white hover:bg-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement follow/unfollow logic
                }}
              >
                <FollowIcon size={10} strokeWidth={4} />
              </div>
            </div>

            {isReplyOpen && <div className="w-[3px] flex-1 bg-gray-200" />}
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="content flex items-start justify-between">
              <div
                className={`flex-1 ${isPermitDetailPost ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    onClick={handleUserProfile}
                    className="cursor-pointer font-semibold hover:underline"
                  >
                    {user.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatTime(updated_at)}
                  </div>
                </div>
                {content && (
                  <div onClick={handleToPostDetail} className="body mt-1">
                    {content}
                  </div>
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
                <div className="flex size-8 items-center justify-center rounded-2xl hover:bg-gray-100">
                  <MoreIcon className="size-7 cursor-pointer p-1 text-gray-500" />
                </div>
              </PostOptionsDropdown>
            </div>

            {urlImage && (
              <div className="overflow-hidden rounded-lg">
                <img src={urlImage} className="size-5" alt={""} />
              </div>
            )}

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
        user={user}
        content={content}
        updated_at={updated_at}
        ref={ReplyModalRef}
      />
    </div>
  );
}

export default PostCard;
