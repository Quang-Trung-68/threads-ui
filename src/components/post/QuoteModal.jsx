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

const Modal = NiceModal.create(({ user, content, updated_at }) => {
  const { t } = useTranslation(["common", "post"]);
  const modal = useModal();
  const { resolvedTheme } = useTheme();

  const handleCancel = () => {
    modal.hide();
  };

  const handlePost = () => {
    modal.hide();
  };

  const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
  const usernameAuth = userInfo.username;
  const avatarUrlAuth = userInfo.avatar_url;
  const { username } = user;

  const [replyQuote, setReplyQuote] = useState("anyone");
  const [reviewApprove, setReviewApprove] = useState(false);
  const [textQuote, setTextQuote] = useState("");

  const textareaContentRef = useRef(null);
  useAutoResizeTextarea(textareaContentRef, content);

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
        className="flex max-h-[85vh] w-full max-w-[600px] flex-col gap-0 overflow-hidden rounded-2xl bg-white p-0 text-black shadow-xl"
      >
        {/* --- Header --- */}
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-200 px-4 py-3">
          <Button
            variant="ghost"
            className="h-auto cursor-pointer p-1 text-base font-normal text-black hover:bg-transparent"
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
            className="h-auto cursor-pointer p-0 hover:bg-transparent"
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
                className="my-2 w-0.5 flex-1 bg-gray-300"
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
                <ChevronRight className="h-3.5 w-3.5" />
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600">
                  <span>{t("post:addTopic")}</span>
                </button>
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
              <div className="relative mb-4 flex gap-5 text-gray-400">
                <ImageIcon className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <FileText className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <button
                  ref={emojiButtonRef}
                  onClick={() => setOpenEmoji((prev) => !prev)}
                  className="cursor-pointer transition-colors hover:text-gray-700"
                >
                  <SmilePlus className="h-5 w-5" />
                </button>
                <AlignLeft className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <Grid3x3 className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <MapPin className="h-5 w-5 cursor-pointer hover:text-gray-700" />

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
              <div className="rounded-2xl border border-gray-300 bg-white p-3">
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
                  {/* <ChevronRight className="h-3 w-3 text-gray-400" />
                  <span className="text-sm font-semibold">Nuôi Em</span> */}
                  <span className="text-sm text-gray-400">
                    {formatTime(updated_at)}
                  </span>
                </div>

                {/* Quoted Text */}
                <div className="text-sm leading-relaxed text-gray-800">
                  <textarea
                    ref={textareaContentRef}
                    readOnly
                    value={content}
                    className="min-h-28 w-full resize-none border-0 bg-transparent p-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  ></textarea>
                  <p className="mb-1">
                    <span className="text-blue-500">
                      {t("common:translate")}
                    </span>
                  </p>
                </div>
              </div>
              {/* End Quoted Post */}

              {/* Add to thread placeholder */}
              <div className="mt-4 text-sm text-gray-400">
                {t("post:addToThread")}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* --- Footer --- */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <ReplyOptionsDropdown
            replyQuote={replyQuote}
            setReplyQuote={setReplyQuote}
            reviewApprove={reviewApprove}
            setReviewApprove={setReviewApprove}
          >
            <button
              className={`flex cursor-pointer items-center gap-2 font-semibold ${reviewApprove ? "text-gray-900" : "text-gray-400"} `}
            >
              <Grid3x3 className="h-4 w-4" />
              <span>{t("post:replyOptions")}</span>
            </button>
          </ReplyOptionsDropdown>

          <Button
            className="cursor-pointer rounded-full bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            onClick={handlePost}
            // disabled={isCreateQuoteLoading || textQuote.trim() === "" || textQuote.length > 500}
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
