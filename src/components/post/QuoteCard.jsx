import React, { useRef } from "react";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import { CirclePlus as FollowIcon, Plus, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import TimeTooltip from "../Common/TimeTooltip";
import UserHoverCard from "../Common/UserHoverCard";
import useAuth from "@/hooks/useAuth";
import { Tooltip } from "../Common/Tooltip";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";

function QuoteCard({
  user = { username: "username", verified: false },
  id,
  user_id,
  content,
  isPermitDetailPost,
  updated_at,
  onNavigate,
}) {
  const { t } = useTranslation(["post", "common", "auth", "tooltip"]);
  const { user: userAuth } = useAuth();
  const isAuth = userAuth?.id === user_id;

  const { username, verified } = user;

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

  // Auto resize textarea theo content
  const textareaRef = useRef(null);
  useAutoResizeTextarea(textareaRef, content);

  return (
    <div className="border-border flex flex-col rounded-2xl border-2 p-1 drop-shadow-2xl md:p-2">
      <div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <UserAvatar user={user} className="size-9 cursor-pointer" />
              {!isAuth && (
                <div
                  className="border-background bg-foreground text-background hover:bg-foreground/90 absolute -right-1 -bottom-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 transition duration-300 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: follow / unfollow
                  }}
                >
                  <Plus size={12} strokeWidth={3} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="content flex items-start justify-between">
              <div
                className={`flex-1 ${isPermitDetailPost ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-center gap-1">
                  <UserHoverCard {...user}>
                    <div
                      onClick={handleUserProfile}
                      className="text-foreground cursor-pointer font-semibold hover:underline"
                    >
                      {user.username}
                    </div>
                  </UserHoverCard>
                  {verified && (
                    <Tooltip label={t("tooltip:verified")}>
                      <span>
                        <BadgeCheck className="mr-1 size-4 fill-blue-400 text-white" />
                      </span>
                    </Tooltip>
                  )}
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
            </div>

            {/* <div className="overflow-hidden rounded-lg">
                <img src={urlImage} className="size-5" alt={""} />
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
