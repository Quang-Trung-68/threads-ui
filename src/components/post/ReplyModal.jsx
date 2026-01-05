import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import { Button } from "@/components/Common/ui/button";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import { ScrollArea } from "@/components/Common/ui/scroll-area";
import {
  MoreHorizontal,
  Image as ImageIcon,
  FileText,
  MapPin,
  SmilePlus,
  AlignLeft,
  ChevronRight,
  Grid3x3,
} from "lucide-react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Cookies from "js-cookie";
import { formatTime } from "@/utils/formatTime";
import ReplyOptionsDropdown from "../Common/DropdownMenu/ReplyOptionsDropdown";
import { useCreateReplyMutation } from "@/services/postService";
import { notifySooner } from "@/utils/notifySooner";
import { useTranslation } from "react-i18next";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { Textarea } from "../Common/ui/textarea";

const Modal = NiceModal.create(({ id, user, content, updated_at }) => {
  const { t } = useTranslation(["common", "post"]);
  const modal = useModal();

  const [createReplyApi, { isCreateReplyLoading }] = useCreateReplyMutation();

  const handleCancel = () => {
    modal.hide();
  };

  const handlePost = async () => {
    if (replyText.trim()) {
      try {
        const createPromise = createReplyApi({
          postId: id,
          data: {
            content: replyText,
            reply_permission: replyQuote,
            requires_reply_approval: reviewApprove,
          },
        }).unwrap();

        notifySooner.promise(createPromise, {
          loading: t("common:loading"),
          success: t("common:replied"),
          error: t("common:error"),
        });

        await createPromise;

        setReplyText("");
        modal.hide();
      } catch (error) {
        console.error("Create reply failed:", error);
      }
      modal.hide();
    }
  };

  const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
  const usernameAuth = userInfo.username;
  const avatarUrlAuth = userInfo.avatar_url;
  const { username } = user;

  const [replyQuote, setReplyQuote] = useState("everyone");
  const [reviewApprove, setReviewApprove] = useState(false);

  const [replyText, setReplyText] = useState("");
  const textareaRef = useRef(null);

  // Select emoji
  const { resolvedTheme } = useTheme();
  const [openEmoji, setOpenEmoji] = useState(false);

  const onEmojiClick = (emojiData) => {
    setReplyText((prev) => prev + emojiData.emoji);
    setOpenEmoji(false);
  };

  // Close emoji picker when click outside or modal close
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  useEffect(() => {
    if (!modal.visible) {
      setOpenEmoji(false);
    }
    setReplyText("");
  }, [modal.visible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openEmoji &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setOpenEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEmoji]);

  const textareaContentRef = useRef(null);
  useAutoResizeTextarea(textareaContentRef, content, modal.visible);

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="bg-background text-foreground flex max-h-[85vh] w-full max-w-[600px] flex-col gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-xl transition-colors"
      >
        {/* --- Header --- */}
        <DialogHeader className="border-border flex flex-row items-center justify-between space-y-0 border-b px-4 py-3">
          <Button
            variant="ghost"
            className="text-foreground h-auto cursor-pointer p-1 text-base font-normal hover:bg-transparent"
            onClick={handleCancel}
          >
            {t("common:cancel")}
          </Button>
          <DialogTitle className="flex-1 text-center text-base font-bold">
            {t("common:reply")}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0 hover:bg-transparent"
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DialogHeader>

        {/* --- Body (Scrollable) --- */}
        <ScrollArea className="flex-1" style={{ overflowY: "auto" }}>
          <div className="flex gap-3 px-4 py-4">
            {/* Cột trái: Avatar + Đường kẻ nối */}
            <div className="flex shrink-0 flex-col items-center">
              <UserAvatar
                user={{
                  username: user?.username,
                  avatar_url: user?.avatar_url || user?.avatar,
                }}
                className="h-10 w-10"
              />

              {/* Đường kẻ dọc (Thread Line) - dài hơn */}
              <div className="bg-border/50 my-2 w-0.5 flex-1"></div>

              <UserAvatar
                user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                className="h-7 w-7 opacity-50"
              />
            </div>

            {/* Cột phải: Nội dung chính */}
            <div className="flex-1 pb-1">
              {/* Original Post Header */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[15px] font-semibold">{username}</span>
                <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-muted-foreground text-sm font-semibold">
                  Topic
                </span>
                <span className="text-muted-foreground text-sm">
                  {formatTime(updated_at)}
                </span>
              </div>

              {/* Original Post Content */}
              <div className="mb-3">
                <textarea
                  ref={textareaContentRef}
                  readOnly
                  value={content}
                  className="min-h-30 w-full resize-none border-0 bg-transparent p-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                ></textarea>
              </div>

              {/* Reply Section */}
              <div className="mt-6">
                {/* Reply User Info */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[15px] font-semibold">
                    {usernameAuth}
                  </span>
                  <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
                  <button className="text-muted-foreground hover:text-foreground text-sm">
                    {t("post:addTopic")}
                  </button>
                </div>

                {/* Reply Text Placeholder */}
                <div className="mb-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    ref={textareaRef}
                    className="text-foreground placeholder:text-muted-foreground mb-2 max-h-20 min-h-15 w-full resize-none bg-transparent py-1 text-[15px] focus:outline-none"
                    placeholder={t("post:replyTo", {
                      username: user?.username || "user",
                    })}
                  />
                </div>

                {/* Action Icons */}
                <div className="text-muted-foreground relative flex gap-5">
                  <ImageIcon className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <FileText className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <button
                    ref={emojiButtonRef}
                    onClick={() => setOpenEmoji((prev) => !prev)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    <SmilePlus size={20} />
                  </button>
                  <AlignLeft className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <Grid3x3 className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <MapPin className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  {/* EMOJI PICKER */}
                  {openEmoji && (
                    <div
                      ref={emojiPickerRef}
                      style={{
                        position: "absolute",
                        top: "-1300%",
                        right: "5%",
                        zIndex: 1000,
                      }}
                    >
                      <EmojiPicker
                        width={300}
                        height={350}
                        onEmojiClick={onEmojiClick}
                        autoFocusSearch={false}
                        onEmojiStyle="native"
                        theme={
                          resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Add to thread placeholder */}
              <div className="mt-6 flex items-center gap-2">
                <UserAvatar
                  user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                  className="h-7 w-7 opacity-50"
                />
                <span className="text-muted-foreground text-sm">
                  {t("post:addToThread")}
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* --- Footer --- */}
        <div className="border-border flex items-center justify-between border-t px-4 py-3">
          <ReplyOptionsDropdown
            replyQuote={replyQuote}
            setReplyQuote={setReplyQuote}
            reviewApprove={reviewApprove}
            setReviewApprove={setReviewApprove}
          >
            <button
              className={`flex cursor-pointer items-center gap-2 text-sm font-semibold transition-colors ${reviewApprove ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3x3 className="h-4 w-4" />
              <span>{t("post:replyOptions")}</span>
            </button>
          </ReplyOptionsDropdown>

          <Button
            className="bg-primary text-primary-foreground cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition-colors hover:opacity-90"
            onClick={handlePost}
            disabled={isCreateReplyLoading || replyText.trim() === "" || replyText.length > 500}
          >
            {t("common:post")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export const ReplyModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
