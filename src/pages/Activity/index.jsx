import MoreAtFeedHeader from "@/components/Common/DropdownMenu/MoreAtFeedHeader";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import { Button } from "@/components/Common/ui/button";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Heart, UserPlus, Zap, CircleEllipsis } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTitle } from "react-use";

export default function Activity({
  dragHandleProps,
  onRemoveColumn,
  canRemove,
}) {
  const { t } = useTranslation(["common"]);
  useScrollToTop();
  // Title
  useTitle(t("common:activityTitle"));

  const [loading, setLoading] = useState(false);

  // Mock Data
  const activities = [
    {
      id: 1,
      type: "like",
      user: {
        username: "johndoe",
        avatar: "https://github.com/shadcn.png",
      },
      content: t("common:likedYourPost"),
      time: "2m",
      message: "Great photo!",
    },
    {
      id: 2,
      type: "follow",
      user: {
        username: "janedoe",
        avatar: "https://github.com/shadcn.png",
      },
      content: t("common:startedFollowingYou"),
      time: "1h",
    },
    {
      id: 3,
      type: "reply",
      user: {
        username: "mike_smith",
        avatar: "https://github.com/shadcn.png",
      },
      content: t("common:repliedToYourThread"),
      time: "3h",
      message: "I totally agree with this point.",
    },
    {
      id: 4,
      type: "mention",
      user: {
        username: "sarah_j",
        avatar: "https://github.com/shadcn.png",
      },
      content: t("common:mentionedYou"),
      time: "5h",
      message: "Check out this project @dqt_2309",
    },
    {
      id: 5,
      type: "like",
      user: {
        username: "alex_w",
        avatar: "https://github.com/shadcn.png",
      },
      content: t("common:likedYourReply"),
      time: "1d",
      message: "Thanks for the help!",
    },
  ];

  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col">
        {/* Sticky Header Container */}
        <div className="bg-background sticky top-0 z-50">
          {/* Header Title Bar */}
          <div
            // Props de drag and drop
            {...dragHandleProps?.attributes}
            {...dragHandleProps?.listeners}
            className="hidden cursor-grab items-center justify-between px-2 py-2 text-lg font-bold active:cursor-grabbing md:flex"
          >
            <div className="w-10 px-4 py-3"></div>
            <span className="text-foreground flex items-center justify-center px-4 py-3 text-[15px] font-bold">
              {t("common:activity")}
            </span>
            <MoreAtFeedHeader
              canRemove={canRemove}
              onRemoveColumn={onRemoveColumn}
            >
              <div className="flex w-10 justify-center">
                <CircleEllipsis
                  className="cursor-pointer shadow-2xl shadow-gray-400 hover:scale-110"
                  strokeWidth={1.1}
                />
              </div>
            </MoreAtFeedHeader>
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

          <div className="flex flex-col">
            {activities.map((item) => (
              <div
                key={item.id}
                className="border-border hover:bg-accent flex items-start justify-between border-b p-4 transition-colors last:border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <UserAvatar
                      user={{
                        username: item.user.username,
                        avatar_url: item.user.avatar,
                      }}
                      className="border-border size-10 border"
                    />
                    {/* Icon Badge */}
                    <div
                      className={`border-background absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 text-white ${
                        item.type === "like"
                          ? "bg-pink-500"
                          : item.type === "follow"
                            ? "bg-purple-500"
                            : item.type === "reply"
                              ? "bg-blue-500"
                              : "bg-green-500"
                      }`}
                    >
                      {item.type === "like" && (
                        <Heart className="h-3 w-3 fill-current" />
                      )}
                      {item.type === "follow" && (
                        <UserPlus className="h-3 w-3" />
                      )}
                      {item.type === "reply" && (
                        <Zap className="h-3 w-3 fill-current" />
                      )}
                      {item.type === "mention" && (
                        <span className="text-[10px] font-bold">@</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="text-sm">
                      <span className="text-foreground font-semibold">
                        {item.user.username}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {item.content}
                      </span>
                      <span className="text-muted-foreground/60 ml-2 text-xs">
                        {item.time}
                      </span>
                    </div>
                    {item.message && (
                      <div className="text-muted-foreground line-clamp-2 text-sm">
                        {item.message}
                      </div>
                    )}
                  </div>
                </div>

                {item.type === "follow" ? (
                  <Button
                    variant="outline"
                    className="text-foreground border-border hover:bg-accent h-8 rounded-lg px-4 text-xs font-semibold"
                  >
                    {t("common:follow")}
                  </Button>
                ) : null}
              </div>
            ))}

            {/* Load More Placeholder */}
            <div className="text-muted-foreground p-4 text-center text-sm">
              {t("common:endOfActivity")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
