import { useGetSinglePostQuery } from "@/services/postService";
import { formatTime } from "@/utils/formatTime";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import threadsIcon from "@assets/threads-icon.svg";
import UserAvatar from "@/components/Common/ui/UserAvatar";

import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
} from "lucide-react";

const PreviewInteractionBar = ({
  likes_count,
  replies_count,
  reposts_and_quotes_count,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-1">
        <LikeIcon className="size-4.5" />
        <span className="text-sm">{likes_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <ReplyIcon className="size-4.5" />
        <span className="text-sm">{replies_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <Repeat2Icon className="size-4.5" />
        <span className="text-sm">{reposts_and_quotes_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <SendIcon className="size-4.5" />
      </div>
    </div>
  );
};

function Embed() {
  const params = useParams();
  const { postId } = params;
  const {
    data: postData,
    isLoading,
    isError,
    isSuccess,
  } = useGetSinglePostQuery({ postId });
  if (postData) {
    const {
      user,
      updated_at,
      content,
      likes_count,
      replies_count,
      reposts_and_quotes_count,
    } = postData;
    return (
      <div>
        {/* Preview Area */}
        <div className="relative flex items-center justify-between p-2 transition-colors duration-300">
          {/* Card */}
          <div className="w-full rounded-3xl p-4 shadow-sm">
            {/* Header */}
            <div className="mb-3 flex items-center gap-2">
              <UserAvatar user={user} className="size-9 border border-gray-100" />
              <div className="flex items-center gap-1 text-sm">
                <span className="font-semibold">
                  {user?.username || "username"}
                </span>
                <span className="text-gray-300">›</span>
                <span className="text-gray-400">threads</span>
              </div>
              <span className="ml-auto text-gray-400">
                {updated_at ? formatTime(updated_at) : "3h"}
              </span>
            </div>

            {/* Content */}
            <div className="mb-4 text-[15px] leading-relaxed whitespace-pre-wrap">
              {content || "No content provided."}
            </div>

            {/* Footer */}
            <div className="mt-2 flex items-center justify-between">
              <PreviewInteractionBar
                likes_count={likes_count}
                replies_count={replies_count}
                reposts_and_quotes_count={reposts_and_quotes_count}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              {/* Watermark/Logo */}
              <div className="ml-auto flex items-center justify-between gap-2 rounded-2xl bg-gray-100 px-3 py-2 text-[12px] font-semibold">
                <span>View on Threads</span>
                <img src={threadsIcon} className="size-6 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Embed;
