import { Button } from "@/components/Common/ui/button";
import { PATHS } from "@/configs/paths";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, CircleEllipsis, CirclePlus } from "lucide-react";
import MoreAtFeedHeader from "../Common/DropdownMenu/MoreAtFeedHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../Common/ui/dropdown-menu";
import { CreatePostModal } from "./CreatePostModal";

export default function FeedHeader({
  idColumn,
  type,
  onNavigate,
  onRemoveColumn,
  canRemove,
  state,
}) {
  const { t } = useTranslation(["feed", "common"]);

  const handleCreatePost = () => {
    CreatePostModal.open();
  };

  return (
    <div className="flex items-center justify-between px-2 py-2 text-lg font-bold">
      <div className="w-10 px-4 py-3"></div>
      <div className="flex items-center justify-center gap-1">
        {!onRemoveColumn ? (
          <>
            <NavLink
              to={PATHS.HOME}
              className={({ isActive }) => "flex-1 md:flex-none"}
            >
              {({ isActive }) => (
                <Button
                  variant={"ghost"}
                  className={`h-auto w-full cursor-pointer rounded-none bg-transparent px-4 py-3 text-[15px] font-bold transition-all hover:bg-transparent md:w-auto ${
                    isActive
                      ? "border-foreground text-foreground border-b-2 md:border-0"
                      : "text-muted-foreground/60 hover:text-foreground"
                  }`}
                >
                  {t("feed:forYou")}
                </Button>
              )}
            </NavLink>
            <NavLink
              to={PATHS.FOLLOWING}
              className={({ isActive }) => "flex-1 md:flex-none"}
            >
              {({ isActive }) => (
                <Button
                  variant={"ghost"}
                  className={`h-auto w-full cursor-pointer rounded-none bg-transparent px-4 py-3 text-[15px] font-bold transition-all hover:bg-transparent md:w-auto ${
                    isActive
                      ? "border-foreground text-foreground border-b-2 md:border-0"
                      : "text-muted-foreground/60 hover:text-foreground"
                  }`}
                >
                  {t("feed:following")}
                </Button>
              )}
            </NavLink>
            <NavLink
              to={PATHS.GHOST_POSTS}
              className={({ isActive }) => "hidden md:block"}
            >
              {({ isActive }) => (
                <Button
                  variant={"ghost"}
                  className={`h-auto cursor-pointer bg-transparent px-4 py-3 text-[15px] font-bold hover:bg-transparent ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/60 hover:text-foreground"
                  }`}
                >
                  {t("feed:ghostPosts")}
                </Button>
              )}
            </NavLink>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={
                    "cursor-pointer px-4 py-6 text-[15px] font-semibold"
                  }
                  variant="ghost"
                >
                  <span> Threads</span>
                  <span className="cursor-pointer hover:scale-110">
                    <ChevronDown className="size-5 cursor-pointer rounded-full border border-gray-300 shadow-2xl" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl">
                <DropdownMenuLabel
                  className={
                    "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-xl font-bold"
                  }
                >
                  {t("common:feeds")}
                  <DropdownMenuShortcut>
                    <CirclePlus
                      onPointerDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={handleCreatePost}
                      className="text-foreground size-5 cursor-pointer hover:scale-110"
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem
                    onPointerDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={() => {
                      onNavigate("Home");
                    }}
                    value="For you"
                    checkedIcon={Check}
                    className={
                      "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                    }
                  >
                    {t("common:forYou")}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    onPointerDown={(e) => e.stopPropagation()}
                    value="Following"
                    checkedIcon={Check}
                    className={
                      "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                    }
                    onClick={() => {
                      onNavigate("Following");
                    }}
                  >
                    {t("common:following")}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    onPointerDown={(e) => e.stopPropagation()}
                    value="Ghost posts"
                    checkedIcon={Check}
                    className={
                      "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                    }
                    onClick={() => {
                      onNavigate("GhostPosts");
                    }}
                  >
                    {t("common:ghostPosts")}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
      <MoreAtFeedHeader
        onRemoveColumn={onRemoveColumn}
        canRemove={canRemove}
        idColumn={idColumn}
      >
        <div className="flex w-10 justify-center">
          <CircleEllipsis
            className="cursor-pointer shadow-2xl shadow-gray-400 hover:scale-110"
            strokeWidth={1.1}
          />
        </div>
      </MoreAtFeedHeader>
    </div>
  );
}
