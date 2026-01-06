import UserAvatar from "@/components/Common/ui/UserAvatar";
import { BadgeCheck, Ellipsis as MoreIcon, Plus } from "lucide-react";
import ReplyModal from "@/components/Common/Modals/QuickReplyModal";
import { useRef, useState } from "react";
import InteractionBar from "@/components/post/InteractionBar";
import TimeTooltip from "@/components/Common/TimeTooltip";
import UserHoverCard from "@/components/Common/UserHoverCard";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/Common/Tooltip";

function CommentItem({
  user,
  user_id,
  content,
  id,
  updated_at,
  likes_count,
  replies_count,
  reposts_and_quotes_count,
  is_liked_by_auth,
  is_reposted_by_auth,
}) {
  const { t } = useTranslation(["tooltip"]);

  const navigate = useNavigate();
  const { user: userAuth } = useAuth();
  const isAuth = userAuth.id === user_id;
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const ReplyModalRef = useRef(null);

  const toggleReplyModal = () => {
    ReplyModalRef.current?.toggle();
  };

  const handleUserProfile = () => {
    navigate(`/@${user.username}`, {
      state: {
        userId: user_id,
      },
    });
  };

  return (
    <div className="flex flex-col p-3 md:p-6">
      <div className="flex gap-2">
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

          {isReplyOpen && <div className="bg-border w-[3px] flex-1" />}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="content flex justify-between">
            <div className="flex-1">
              <div className="username flex items-center gap-1">
                <UserHoverCard {...user}>
                  <div
                    onClick={handleUserProfile}
                    className="text-foreground cursor-pointer font-semibold hover:underline"
                  >
                    {user.username}
                  </div>
                </UserHoverCard>
                <Tooltip label={t("tooltip:verified")}>
                  <span>
                    <BadgeCheck className="mr-1 size-4 fill-blue-400 text-white" />
                  </span>
                </Tooltip>
                <div className="text-muted-foreground text-sm">
                  <TimeTooltip dateString={updated_at} />
                </div>
              </div>
              {content && <div className="body mt-1">{content}</div>}
            </div>
            <div>
              <MoreIcon className="size-5 text-gray-500" />
            </div>
          </div>

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
      <ReplyModal ref={ReplyModalRef} />
    </div>
  );
}

export default CommentItem;
