import { Button } from "@/components/Common/ui/button";
import UserAvatar from "./ui/UserAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import useAuth from "@/hooks/useAuth";
import { BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

function UserHoverCard({
  id,
  name,
  username,
  verified,
  avatar_url,
  follow_count = 0,
  isFollowing = false,
  onFollow,
  children,
}) {
  const { t } = useTranslation("common");
  const { user: userAuth } = useAuth();
  const isAuth = userAuth?.id === id;

  return (
    <HoverCard delay={500}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 rounded-2xl p-6">
        <div className="space-y-4">
          {/* Top info */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <div className="text-lg leading-none font-semibold">{name}</div>
              <div className="text-muted-foreground text-sm">@{username}</div>

              <div className="text-muted-foreground pt-2 text-sm">
                {follow_count} {t("common:followers")}
              </div>
            </div>

            <div className="relative">
              {/* Avatar */}
              <UserAvatar
                className={"size-15"}
                username={username}
                avatar_url={avatar_url}
              />
              {verified && (
                <span className="absolute -bottom-0.5 -left-0.5">
                  <BadgeCheck className="size-5 fill-blue-400 text-white" />
                </span>
              )}
            </div>
          </div>

          {/* Follow button */}
          {!isAuth && (
            <Button
              className="h-9 w-full rounded-full text-sm font-semibold"
              variant={isFollowing ? "secondary" : "default"}
              onClick={(e) => {
                e.stopPropagation();
                onFollow?.();
              }}
            >
              {isFollowing ? t("common:following") : t("common:follow")}
            </Button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default UserHoverCard;
