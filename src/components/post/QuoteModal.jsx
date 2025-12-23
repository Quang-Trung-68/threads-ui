import React, { useState } from "react";
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

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="flex h-[90vh] flex-col gap-0 overflow-hidden rounded-2xl bg-white p-0 text-black sm:h-auto sm:max-h-[85vh] sm:max-w-[600px]"
      >
        {/* --- Header --- */}
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-200 px-4 py-3">
          <Button
            variant="ghost"
            className="h-auto cursor-pointer p-1 text-base font-normal text-black hover:bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <DialogTitle className="flex-1 text-center text-base font-bold">
            New thread
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
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="flex gap-3">
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
                  <span>Add a topic</span>
                </button>
              </div>

              {/* Input Text */}
              <div className="mb-3">
                <p className="text-[15px] text-gray-400">
                  Share your thoughts...
                </p>
              </div>

              {/* Action Icons */}
              <div className="mb-4 flex gap-5 text-gray-400">
                <ImageIcon className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <FileText className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <Smile className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <AlignLeft className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <Grid3x3 className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                <MapPin className="h-5 w-5 cursor-pointer hover:text-gray-700" />
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
                  <p className="mb-2">{content}</p>
                  <p className="mb-1">
                    <span className="text-blue-500">Translate</span>
                  </p>
                </div>
              </div>
              {/* End Quoted Post */}

              {/* Add to thread placeholder */}
              <div className="mt-4 text-sm text-gray-400">Add to thread</div>
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
              <span>Reply options</span>
            </button>
          </ReplyOptionsDropdown>

          <Button
            className="cursor-pointer rounded-full bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            onClick={handlePost}
          >
            Post
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
