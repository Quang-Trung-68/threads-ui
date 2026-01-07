import React, { useRef, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { useQuotePostMutation } from "@/services/postService";
import { notifySooner } from "@/utils/notifySooner";
import { useNavigate } from "react-router";

const Modal = NiceModal.create(({ user, content, id: postId, updated_at }) => {
  const { t } = useTranslation(["common", "post"]);
  const [quotePostApi, { isLoading: isQuotePostLoading }] =
    useQuotePostMutation();
  const modal = useModal();
  const { resolvedTheme } = useTheme();

  const handleCancel = () => {
    modal.hide();
  };

  const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
  const usernameAuth = userInfo.username;
  const avatarUrlAuth = userInfo.avatar_url;
  const { username } = user;

  const [replyQuote, setReplyQuote] = useState("everyone");
  const [reviewApprove, setReviewApprove] = useState(false);
  const [textQuote, setTextQuote] = useState("");

  const textareaContentRef = useRef(null);
  useAutoResizeTextarea(textareaContentRef, content);

  const navigate = useNavigate();
  const handlePostDetail = (user, id) => {
    navigate(`/@${user.username}/post/${id}`, {
      state: {
        id,
      },
    });
  };

  const handlePost = async () => {
    if (content.trim() && content.length <= 500) {
      try {
        const createPromise = quotePostApi({
          postId,
          data: {
            content: textQuote,
            reply_permission: replyQuote,
            requires_reply_approval: reviewApprove,
          },
        }).unwrap();

        const quotePostResponse = await createPromise;
        const { data } = quotePostResponse;
        const { id, user } = data;

        notifySooner.promise(createPromise, {
          loading: t("common:loading"),
          error: t("common:error"),
          success: () => ({
            message: t("post:postCreated"),
            action: {
              label: t("post:view"),
              onClick: () => handlePostDetail(user, id),
            },
          }),
        });
        setTextQuote("");
        modal.hide();
      } catch (error) {
        console.error("Quote post failed:", error);
      }
    }
  };

  // Select emoji
  const [openEmoji, setOpenEmoji] = useState(false);

  const onEmojiClick = (emojiData) => {
    setTextQuote((prev) => prev + emojiData.emoji);
    setOpenEmoji(false);
  };

  // Close emoji picker when click outside or modal close
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  React.useEffect(() => {
    if (!modal.visible) {
      setOpenEmoji(false);
    }
    setTextQuote("");
  }, [modal.visible]);

  React.useEffect(() => {
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

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="bg-background text-foreground flex max-h-[85vh] w-full max-w-[600px] flex-col gap-0 overflow-hidden rounded-2xl p-0 shadow-xl"
      >
        {/* --- Header --- */}
        <DialogHeader className="border-border flex flex-row items-center justify-between space-y-0 border-b px-4 py-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-transparent h-auto cursor-pointer p-1 text-base font-normal"
            onClick={handleCancel}
          >
            {t("common:cancel")}
          </Button>
          <DialogTitle className="flex-1 text-center text-base font-bold">
            {t("post:newThread")}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent h-auto cursor-pointer p-0"
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DialogHeader>

        {/* --- Body (Scrollable) --- */}
        <ScrollArea className="flex-1">
          <div className="flex gap-3 px-4 py-4">
            {/* Cột trái: Avatar + Đường kẻ nối */}
            <div className="flex shrink-0 flex-col items-center">
              <UserAvatar
                user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                className="h-10 w-10"
              />

              {/* Đường kẻ dọc (Thread Line) */}
              <div
                className="bg-border my-2 w-0.5 flex-1"
                style={{ minHeight: "60px" }}
              ></div>

              <UserAvatar
                user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                className="h-6 w-6 opacity-40"
              />
            </div>

            {/* Cột phải: Nội dung chính */}
            <div className="flex-1 pb-1">
              {/* User Info */}
              <div className="mb-2 flex items-center gap-1">
                <span className="text-[15px] font-semibold">
                  {usernameAuth}
                </span>
              </div>

              {/* Input Text */}
              <div className="mb-3">
                <textarea
                  value={textQuote}
                  onChange={(e) => setTextQuote(e.target.value)}
                  placeholder={t("post:shareYourThoughts")}
                  className="text-foreground placeholder:text-muted-foreground max-h-[200px] min-h-[100px] w-full resize-none bg-transparent py-1 text-[15px] focus:outline-none"
                />
              </div>

              {/* Action Icons */}
              <div className="text-muted-foreground relative mb-4 flex gap-5">
                <ImageIcon className="hover:text-foreground h-5 w-5 cursor-pointer" />
                <FileText className="hover:text-foreground h-5 w-5 cursor-pointer" />
                <button
                  ref={emojiButtonRef}
                  onClick={() => setOpenEmoji((prev) => !prev)}
                  className="hover:text-foreground cursor-pointer transition-colors"
                >
                  <SmilePlus className="h-5 w-5" />
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
                      top: "-400%",
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

              {/* --- Quoted Post (Embedded Content) --- */}
              <div className="border-border rounded-2xl border p-3">
                {/* Quoted Header */}
                <div className="mb-2 flex items-center gap-2">
                  <UserAvatar
                    user={{
                      username: user?.username,
                      avatar_url: user?.avatar_url || user?.avatar,
                    }}
                    className="h-6 w-6"
                  />
                  <span className="text-sm font-semibold">{username}</span>
                  <span className="text-muted-foreground text-sm">
                    {formatTime(updated_at)}
                  </span>
                </div>

                {/* Quoted Text */}
                <div className="text-sm leading-relaxed">
                  <textarea
                    ref={textareaContentRef}
                    readOnly
                    value={content}
                    className="text-foreground min-h-28 w-full resize-none border-0 bg-transparent p-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  ></textarea>
                </div>
              </div>
              {/* End Quoted Post */}

              {/* Add to thread placeholder */}
              <div className="text-muted-foreground mt-4 text-sm">
                {t("post:addToThread")}
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
              className={`flex cursor-pointer items-center gap-2 font-semibold ${reviewApprove ? "text-foreground" : "text-muted-foreground"} `}
            >
              <Grid3x3 className="h-4 w-4" />
              <span>{t("post:replyOptions")}</span>
            </button>
          </ReplyOptionsDropdown>

          <Button
            className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer rounded-full px-6 py-2 text-sm font-semibold"
            onClick={handlePost}
            disabled={
              isQuotePostLoading ||
              textQuote.trim() === "" ||
              textQuote.length > 500
            }
          >
            {t("common:post")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export const QuoteModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
