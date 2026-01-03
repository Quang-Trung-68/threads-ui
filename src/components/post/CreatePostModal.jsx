import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import {
  MapPin,
  AlignLeft,
  MoreHorizontal,
  Copy,
  Grid3x3,
  Images,
  SmilePlus,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/Common/ui/button";
import { useRef, useState, useEffect } from "react";
import ReplyOptionsDropdown from "../Common/DropdownMenu/ReplyOptionsDropdown";
import { useCreatePostMutation } from "@/services/postService";
import { notifySooner } from "@/utils/notifySooner";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import Cookies from "js-cookie";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/Common/ui/scroll-area";
import { useNavigate } from "react-router";

const Modal = NiceModal.create(({ username: propUsername, onSuccess }) => {
  const { t } = useTranslation(["common", "post"]);
  const modal = useModal();
  const { resolvedTheme } = useTheme();
  const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
  const username = userInfo.username || propUsername;
  const avatar_url = userInfo.avatar_url;
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [showTopicInput, setShowTopicInput] = useState(false);

  const [createPostApi, { isLoading: isCreatePostLoading }] =
    useCreatePostMutation();

  const handleCancel = () => {
    modal.hide();
  };
  const [replyQuote, setReplyQuote] = useState("everyone");
  const [reviewApprove, setReviewApprove] = useState(false);

  const navigate = useNavigate();
  const handlePostDetail = (user, id) => {
    navigate(`/@${user.username}/post/${id}`, {
      state: {
        id,
      },
    });
  };

  const handlePost = async () => {
    if (content.trim()) {
      try {
        const createPromise = createPostApi({
          content,
          reply_permission: replyQuote,
          requires_reply_approval: reviewApprove,
        }).unwrap();

        const createPostResponse = await createPromise;
        const { data } = createPostResponse;
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

        setTopic("");
        setContent("");
        setShowTopicInput(false);
        modal.hide();
        onSuccess?.();
      } catch (error) {
        console.error("Create post failed:", error);
      }
    }
  };

  // Upload images
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handlePickImage = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previews]);

    // cho phép chọn lại cùng 1 file
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => {
      const imgToRemove = prev[index];
      if (imgToRemove) {
        URL.revokeObjectURL(imgToRemove.url);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // Select emoji
  const [openEmoji, setOpenEmoji] = useState(false);

  const onEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
    setOpenEmoji(false);
  };

  // Close emoji picker when click outside or modal close
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  useEffect(() => {
    if (!modal.visible) {
      setOpenEmoji(false);
    }
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

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      {/* max-w-lg để kích thước giống mobile/modal nhỏ gọn hơn */}
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="bg-background text-foreground flex max-h-[85vh] max-w-[600px] flex-col gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-xl transition-colors"
      >
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={handleCancel}
            className="text-foreground cursor-pointer text-[16px] transition-colors hover:opacity-70"
          >
            {t("common:cancel")}
          </button>
          <DialogTitle className="text-foreground text-[16px] font-bold">
            {t("post:newThread")}
          </DialogTitle>
          <div className="flex items-center gap-4">
            {/* Icon giống Library/Copy */}
            <button className="text-foreground transition-colors hover:opacity-70">
              <Copy size={22} strokeWidth={2} className="-scale-x-100" />
            </button>
            <button className="text-foreground transition-colors hover:opacity-70">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>

        <div className="bg-border h-[1px] w-full" />

        {/* --- BODY --- */}
        <ScrollArea className="flex-1" style={{ overflowY: "auto" }}>
          <div className="flex px-5 pt-4 pb-2">
            {/* LEFT COLUMN: Avatar & Thread Line */}
            <div className="mr-3 flex flex-col items-center pt-1">
              {/* Main Avatar */}
              <UserAvatar user={{ username, avatar_url }} className="h-9 w-9" />

              {/* The Vertical Thread Line */}
              <div className="bg-border my-2 w-[2px] flex-grow rounded-full" />

              {/* Small Ghost Avatar (for 'Add to thread') */}
              <UserAvatar
                user={{ username, avatar_url }}
                className="h-5 w-5 opacity-50"
              />
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="flex flex-1 flex-col pt-1">
              {/* Username + Topic Placeholder */}
              <div className="mb-1 flex items-center gap-1">
                <span className="text-foreground text-[15px] font-semibold">
                  {username}
                </span>

                {/* Topic Logic */}
                {!showTopicInput ? (
                  <button
                    onClick={() => setShowTopicInput(true)}
                    className="text-muted-foreground flex items-center text-[15px] opacity-60 transition-colors hover:opacity-100"
                  >
                    <span className="ml-1 font-normal">
                      {t("post:addTopic")}
                    </span>
                  </button>
                ) : (
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t("post:addTopic")}
                    className="text-foreground placeholder:text-muted-foreground ml-2 flex-1 bg-transparent text-[15px] outline-none"
                    autoFocus
                  />
                )}
              </div>

              {/* Textarea */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t("common:whatsNew")}
                className="text-foreground placeholder:text-muted-foreground mb-2 w-full resize-none bg-transparent py-1 text-[15px] focus:outline-none"
                rows={1}
                style={{ minHeight: "24px", height: "auto" }}
                onInput={(e) => {
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height =
                    e.currentTarget.scrollHeight + "px";
                }}
              />

              {/* Toolbar Icons */}
              <div className="relative mb-6 flex items-center gap-4">
                <button
                  onClick={handlePickImage}
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  <Images size={20} />
                </button>
                <button className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <div className="border-muted-foreground flex size-5 items-center justify-center rounded border px-1 py-px text-[8px] font-bold">
                    GIF
                  </div>
                </button>
                <button
                  ref={emojiButtonRef}
                  onClick={() => setOpenEmoji((prev) => !prev)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  <SmilePlus size={20} />
                </button>
                <button className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <FileText size={20} />
                </button>
                <button className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <AlignLeft size={20} />
                </button>
                <button className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <MapPin size={20} />
                </button>
                {/* EMOJI PICKER */}
                {openEmoji && (
                  <div
                    ref={emojiPickerRef}
                    style={{
                      position: "absolute",
                      top: "110%",
                      left: "0",
                      zIndex: 1000,
                    }}
                  >
                    <EmojiPicker
                      width={350}
                      height={450}
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

              {/* Preview */}

              <div className="w-full">
                {/* INPUT FILE */}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleChange}
                />

                {/* PREVIEW */}
                <div
                  className="flex w-full flex-wrap"
                  style={{ display: "flex", gap: 8, marginTop: 12 }}
                >
                  {images.map((img, index) => (
                    <div key={index} className="group relative">
                      <img
                        src={img.url}
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-lg border object-cover"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to thread text (Aligned with Ghost Avatar) */}
              <div className="flex items-center pb-2">
                <button className="text-muted-foreground text-[15px] font-normal opacity-60 transition-colors hover:opacity-100">
                  {t("post:addToThread")}
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* --- FOOTER --- */}
        <div className="mt-2 flex items-center justify-between px-5 py-4">
          <ReplyOptionsDropdown
            replyQuote={replyQuote}
            setReplyQuote={setReplyQuote}
            reviewApprove={reviewApprove}
            setReviewApprove={setReviewApprove}
          >
            <button
              className={`flex cursor-pointer items-center gap-2 text-sm font-semibold transition-colors ${reviewApprove ? "text-foreground" : "text-muted-foreground hover:text-foreground"} `}
            >
              <Grid3x3 className="h-4 w-4" />
              <span>{t("post:replyOptions")}</span>
            </button>
          </ReplyOptionsDropdown>

          <Button
            onClick={handlePost}
            disabled={!content.trim() || isCreatePostLoading}
            className={`cursor-pointer rounded-full px-5 py-5 text-[15px] font-semibold transition-all ${
              content.trim()
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "border-border bg-muted text-muted-foreground border"
            } `}
            variant="ghost"
          >
            {t("common:post")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export const CreatePostModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
