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
  Smile,
  AlignLeft,
  ChevronRight,
  Grid3x3,
} from "lucide-react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Cookies from "js-cookie";
import { formatTime } from "@/utils/formatTime";
import ReplyOptionsDropdown from "../Common/DropdownMenu/ReplyOptionsDropdown";
import { Textarea } from "../Common/ui/textarea";

const Modal = NiceModal.create(({ user, content, updated_at }) => {
  const modal = useModal();

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

  const [replyText, setReplyText] = useState("");
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setReplyText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="flex h-[90vh] flex-col gap-0 overflow-hidden rounded-2xl bg-background p-0 text-foreground sm:h-auto sm:max-h-[85vh] sm:max-w-[600px] transition-colors"
      >
        {/* --- Header --- */}
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border px-4 py-3">
          <Button
            variant="ghost"
            className="h-auto cursor-pointer p-1 text-base font-normal text-foreground hover:bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <DialogTitle className="flex-1 text-center text-base font-bold">
            Reply
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-auto cursor-pointer p-0 text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DialogHeader>

        {/* --- Body (Scrollable) --- */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="flex gap-3">
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
              <div className="my-2 w-0.5 flex-1 bg-border/50"></div>

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
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">
                  工程師日常
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatTime(updated_at)}
                </span>
              </div>

              {/* Original Post Content */}
              <div className="mb-3">
                <p className="mb-2 text-[15px] leading-relaxed text-foreground">
                  {content}
                </p>
              </div>

              {/* Reply Section */}
              <div className="mt-6">
                {/* Reply User Info */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[15px] font-semibold">
                    {usernameAuth}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Add a topic
                  </button>
                </div>

                {/* Reply Text Placeholder */}
                <div className="mb-3">
                  <Textarea
                    ref={textareaRef}
                    value={replyText}
                    onChange={handleInput}
                    rows={1}
                    className={
                      "min-h-10 w-full resize-none border-0 p-0.5 text-foreground bg-transparent shadow-none focus-visible:ring-0 focus-visible:outline-none"
                    }
                    placeholder={`Reply to ${username}...`}
                  />
                </div>

                {/* Action Icons */}
                <div className="flex gap-5 text-muted-foreground">
                  <ImageIcon className="h-5 w-5 cursor-pointer hover:text-foreground" />
                  <FileText className="h-5 w-5 cursor-pointer hover:text-foreground" />
                  <Smile className="h-5 w-5 cursor-pointer hover:text-foreground" />
                  <AlignLeft className="h-5 w-5 cursor-pointer hover:text-foreground" />
                  <Grid3x3 className="h-5 w-5 cursor-pointer hover:text-foreground" />
                  <MapPin className="h-5 w-5 cursor-pointer hover:text-foreground" />
                </div>
              </div>

              {/* Add to thread placeholder */}
              <div className="mt-6 flex items-center gap-2">
                <UserAvatar
                  user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                  className="h-7 w-7 opacity-50"
                />
                <span className="text-sm text-muted-foreground">
                  Add to thread
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* --- Footer --- */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
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
              <span>Reply options</span>
            </button>
          </ReplyOptionsDropdown>

          <Button
            className="cursor-pointer rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-colors"
            onClick={handlePost}
          >
            Post
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
