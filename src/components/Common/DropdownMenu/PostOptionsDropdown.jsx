import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useState } from "react";
import {
  BookmarkCheck,
  BookmarkX,
  ChevronRight,
  Eye,
  EyeOff,
  FilePenLine,
  Link,
  MessageCircleWarning,
  SquareChartGantt,
  Trash,
  UserLock,
  UserRoundMinus,
  UserRoundX,
} from "lucide-react";
import {
  useHidePostMutation,
  useMuteUserMutation,
  useRestrictUserMutation,
  useSavePostMutation,
  useBlockUserMutation,
  useReportPostMutation,
  useDeletePostMutation,
} from "@/services/postService";
import { BlockUserModal } from "@/components/post/BlockUserModal";
import { ReportPostModal } from "@/components/post/ReportPostModal";
import { notifySooner } from "@/utils/notifySooner";
import useAuth from "@/hooks/useAuth";
import { copyToClipboard } from "@/utils/copyToClipboard";

const PostOptionsDropdown = ({
  id,
  userId,
  username,
  is_saved_by_auth,
  children,
  onMuteSuccess,
  onHidePostSuccess,
  onRestrictUserSuccess,
  onBlockSuccess,
  onDeleteSuccess,
}) => {
  const [isSaved, setIsSaved] = useState(is_saved_by_auth);
  const [isInterested, setIsInterested] = useState(false);

  const { user } = useAuth();
  const isAuth = userId === user?.id || false;

  const [saveApi, { isLoading: isSaveLoading }] = useSavePostMutation();
  const [muteApi, { isLoading: isMuteLoading }] = useMuteUserMutation();
  const [hidePostApi, { isLoading: isHidePostLoading }] = useHidePostMutation();
  const [restrictUserApi, { isLoading: isRestrictUserLoading }] =
    useRestrictUserMutation();
  const [blockApi, { isLoading: isBlockLoading }] = useBlockUserMutation();
  const [reportApi, { isLoading: isReportLoading }] = useReportPostMutation();
  const [deletePostApi, { isLoading: isDeletePostLoading }] =
    useDeletePostMutation();

  const handleToggleSave = async () => {
    const previousState = isSaved;
    setIsSaved(!isSaved);
    try {
      await saveApi({ id }).unwrap();
    } catch (error) {
      setIsSaved(previousState);
    }
  };

  const handleMute = async () => {
    try {
      await muteApi({ userId }).unwrap();
      onMuteSuccess?.();
    } catch (error) {
      console.error("Mute failed:", error);
    }
  };

  const handleHidePost = async () => {
    try {
      await hidePostApi({ id }).unwrap();
      onHidePostSuccess?.();
    } catch (error) {
      console.error("Hide post failed:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const deletePromise = deletePostApi({ id }).unwrap();
      notifySooner.promise(deletePromise, {
        success: "Deleted",
      });
      await deletePromise;
      onDeleteSuccess?.();
    } catch (error) {
      console.error("Delete post failed:", error);
    }
  };

  const handleRestrictUser = async () => {
    try {
      await restrictUserApi({ userId }).unwrap();
      onRestrictUserSuccess?.();
    } catch (error) {
      console.error("Restrict user failed:", error);
    }
  };

  const handleBlockAction = async () => {
    try {
      await blockApi({ userId }).unwrap();
      onBlockSuccess?.();
    } catch (error) {
      console.error("Block failed:", error);
    }
  };

  const handleOpenBlockModal = () => {
    BlockUserModal.open({
      username,
      onBlock: handleBlockAction,
    });
  };

  const handleReportAction = async (data) => {
    try {
      await reportApi({ id, data }).unwrap();
    } catch (error) {
      console.error("Report failed:", error);
      const { data } = error;
      notifySooner.error(data.message);
    }
  };

  const handleOpenReportModal = () => {
    ReportPostModal.open({
      postId: id,
      onReport: handleReportAction,
    });
  };

  const handleCopyLink = () => {
    const postLink = `${location.origin}/@${username}/post/${id}`;
    copyToClipboard(postLink);
  };

  if (!isAuth)
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
            <DropdownMenuCheckboxItem
              checked={isSaved}
              className={
                "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              onCheckedChange={handleToggleSave}
              disabled={isSaveLoading}
            >
              <span>{!isSaved ? "Save" : "Unsave"}</span>
              <span className="flex items-center justify-center">
                {!isSaved ? (
                  <BookmarkCheck className="size-5" />
                ) : (
                  <BookmarkX className="size-5" />
                )}
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={isInterested}
              className={
                "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              onCheckedChange={handleHidePost}
              disabled={isHidePostLoading}
            >
              <span>Not interested</span>
              <span className="flex items-center justify-center">
                {!isInterested ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              className={
                "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              onSelect={handleMute}
              disabled={isMuteLoading}
            >
              <span>Mute</span>
              <span className="flex items-center justify-center">
                <UserRoundMinus className="size-5" />
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className={
                "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              onSelect={handleRestrictUser}
              disabled={isRestrictUserLoading}
            >
              <span>Restrict</span>
              <span className="flex items-center justify-center">
                <UserRoundX className="size-5" />
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className={
                "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              onSelect={handleOpenBlockModal}
              disabled={isBlockLoading}
            >
              <span className="text-red-500">Block</span>
              <span className="flex items-center justify-center">
                <UserLock className="size-5 text-red-500" />
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className={
                "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              onSelect={handleOpenReportModal}
              disabled={isReportLoading}
            >
              <span className="text-red-500">Report</span>
              <span className="flex items-center justify-center text-red-500">
                <MessageCircleWarning className="size-5" />
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              className={
                "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              onSelect={handleCopyLink}
            >
              <span>Copy link</span>
              <span className="flex items-center justify-center">
                <Link className="size-5" />
              </span>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span>Insights</span>
            <span className="flex items-center justify-center">
              <SquareChartGantt className="size-5" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={isSaved}
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
            onCheckedChange={handleToggleSave}
            disabled={isSaveLoading}
          >
            <span>{!isSaved ? "Save" : "Unsave"}</span>
            <span className="flex items-center justify-center">
              {!isSaved ? (
                <BookmarkCheck className="size-5" />
              ) : (
                <BookmarkX className="size-5" />
              )}
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span>Reply options</span>
            <span className="flex items-center justify-center">
              <ChevronRight className="size-5 text-gray-400" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span>Edit</span>
            <span className="flex items-center justify-center">
              <FilePenLine className="size-5" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onSelect={handleDeletePost}
            disabled={isDeletePostLoading}
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span className="text-red-500">Delete</span>
            <span className="flex items-center justify-center">
              <Trash className="size-5 text-red-500" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
            onSelect={handleCopyLink}
          >
            <span>Copy link</span>
            <span className="flex items-center justify-center">
              <Link className="size-5" />
            </span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PostOptionsDropdown;
