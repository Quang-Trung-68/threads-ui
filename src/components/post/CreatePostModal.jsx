import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import {
  Image as ImageIcon,
  MapPin,
  AlignLeft,
  MoreHorizontal,
  Copy,
  Hash,
  Grid3x3,
} from "lucide-react";
import { Button } from "@/components/Common/ui/button";
import { useState } from "react";
import ReplyOptionsDropdown from "../Common/DropdownMenu/ReplyOptionsDropdown";
import { useCreatePostMutation } from "@/services/postService";
import { notifySooner } from "@/utils/notifySooner";

const Modal = NiceModal.create(({ username = "dqt_2309", onSuccess }) => {
  const modal = useModal();
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
  const handlePost = async () => {
    if (content.trim()) {
      try {
        const createPromise = createPostApi({
          content,
          reply_permission: replyQuote,
        }).unwrap();

        notifySooner.promise(createPromise, {
          loading: "Loading...",
          success: "Saved!",
          error: "Errored to fetch...",
        });

        await createPromise;

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

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      {/* max-w-lg để kích thước giống mobile/modal nhỏ gọn hơn */}
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="bg-background text-foreground max-w-[600px] gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-xl transition-colors"
      >
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={handleCancel}
            className="text-foreground cursor-pointer text-[16px] transition-colors hover:opacity-70"
          >
            Cancel
          </button>
          <DialogTitle className="text-foreground text-[16px] font-bold">
            New thread
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
        <div className="flex px-5 pt-4 pb-2">
          {/* LEFT COLUMN: Avatar & Thread Line */}
          <div className="mr-3 flex flex-col items-center pt-1">
            {/* Main Avatar */}
            <div className="bg-muted h-9 w-9 overflow-hidden rounded-full">
              {/* Placeholder Avatar Icon */}
              <svg
                className="text-muted-foreground h-full w-full"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>

            {/* The Vertical Thread Line */}
            <div className="bg-border my-2 w-[2px] flex-grow rounded-full" />

            {/* Small Ghost Avatar (for 'Add to thread') */}
            <div className="bg-muted h-5 w-5 overflow-hidden rounded-full opacity-50">
              <svg
                className="text-muted-foreground h-full w-full"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
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
                  <span className="ml-1 font-normal">Add a topic</span>
                </button>
              ) : (
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Add a topic"
                  className="text-foreground placeholder:text-muted-foreground ml-2 flex-1 bg-transparent text-[15px] outline-none"
                  autoFocus
                />
              )}
            </div>

            {/* Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's new?"
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
            <div className="mb-6 flex items-center gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <ImageIcon size={20} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                {/* Giả lập icon GIF bằng border */}
                <div className="border-muted-foreground flex items-center justify-center rounded border px-1 py-[1px] text-[9px] font-bold">
                  GIF
                </div>
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Hash size={20} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <AlignLeft size={20} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MapPin size={20} />
              </button>
            </div>

            {/* Add to thread text (Aligned with Ghost Avatar) */}
            <div className="flex items-center pb-2">
              <button className="text-muted-foreground text-[15px] font-normal opacity-60 transition-colors hover:opacity-100">
                Add to thread
              </button>
            </div>
          </div>
        </div>

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
              <span>Reply options</span>
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
            Post
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
