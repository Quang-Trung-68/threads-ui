import React, { useRef } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/Common/ui/avatar";
import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Ellipsis as MoreIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Common/ui/card";

import ReplyModal from "@/components/Common/Modals/ReplyModal";
import InteractionBar from "./InteractionBar";

function PostCard({ user, id, content, isPermitDetailPost }) {
  const navigate = useNavigate();
  const handleToPostDetail = () => {
    // if (isPermitDetailPost) {
    //   navigate(`/@${userId}/post/${id}`);
    // }
  };

  const handleToUserProfile = () => {
    // navigate(`/@${userId}`);
  };

  const urlImage =
    "https://picsum.photos/600/400?random=" + Math.floor(Math.random() * 10);

  const ReplyModalRef = useRef(null);
  const toggleReplyModal = () => {
    ReplyModalRef.current?.toggle();
  };

  return (
    <div className="flex flex-col border-2 p-3 md:p-6">
      <div>
        <div className="flex gap-2">
          <div onClick={handleToUserProfile}>
            <Avatar className="size-9">
              <AvatarImage
                src={
                  "https://i.pravatar.cc/150?img=" +
                  Math.floor(Math.random() * 10)
                }
              />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="content flex justify-between">
              <div
                className={`flex-1 ${isPermitDetailPost ? "cursor-pointer" : "cursor-default"}`}
              >
                <div
                  onClick={handleToUserProfile}
                  className="username flex items-center gap-2"
                >
                  <div className="cursor-pointer font-semibold hover:underline">
                    {user.username}
                  </div>
                  <div className="text-sm text-gray-500">{"10h"}</div>
                </div>
                {content && (
                  <div onClick={handleToPostDetail} className="body mt-1">
                    {content}
                  </div>
                )}
              </div>
              <div>
                <MoreIcon className="size-5 text-gray-500" />
              </div>
            </div>

            {urlImage && (
              <div className="overflow-hidden rounded-lg">
                <img src={urlImage} className="size-5" alt={""} />
              </div>
            )}

            {/* Interaction Bar */}
            <div>
              <InteractionBar toggleReplyModal={toggleReplyModal} />
            </div>
          </div>
        </div>
      </div>

      <ReplyModal ref={ReplyModalRef} />
    </div>
  );
}

export default PostCard;
