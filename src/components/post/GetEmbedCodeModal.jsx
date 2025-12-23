import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import { Button } from "@/components/Common/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import { formatTime } from "@/utils/formatTime";
import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
  Check as CheckIcon,
  Copy as CopyIcon,
  Download as DownloadIcon,
} from "lucide-react";
import threadsIcon from "@assets/threads-icon.svg";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { truncateTextByWidth } from "@/utils/truncateTextByWidth";

const PreviewInteractionBar = ({
  likes_count,
  replies_count,
  reposts_and_quotes_count,
}) => {
  return (
    <div className="mt-2 flex gap-4">
      <div className="flex items-center gap-1">
        <LikeIcon className="size-4.5" />
        <span className="text-sm">{likes_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <ReplyIcon className="size-4.5" />
        <span className="text-sm">{replies_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <Repeat2Icon className="size-4.5" />
        <span className="text-sm">{reposts_and_quotes_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <SendIcon className="size-4.5" />
      </div>
    </div>
  );
};

const Modal = NiceModal.create(
  ({
    id,
    user,
    content,
    updated_at,
    likes_count,
    replies_count,
    reposts_and_quotes_count,
  }) => {
    const modal = useModal();

    const [isCopying, setIsCopying] = useState(false);
    const [embedCodeUrl, setEmbedCodeUrl] = useState();

    useEffect(() => {
      setEmbedCodeUrl(`
      <iframe src="${location.origin + "/" + user.username + "/post/" + id + "/embed"}"></iframe>`);
    }, [user.username, id]);

    const handleCancel = () => {
      modal.hide();
    };

    const handleCopy = async () => {
      setIsCopying(true);
      copyToClipboard(embedCodeUrl);
      setIsCopying(false);
    };

    return (
      <Dialog open={modal.visible} onOpenChange={handleCancel}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[650px] gap-0 overflow-hidden rounded-3xl border-none bg-[#fafafa] p-1 shadow-2xl"
        >
          <DialogTitle className="sr-only">Get embed code</DialogTitle>

          {/* Preview Area */}
          <div className="relative flex min-h-[400px] w-[500px] items-center justify-between p-4 transition-colors duration-300">
            {/* Card */}
            <div className="w-full rounded-3xl p-2 shadow-sm">
              {/* Header */}
              <div className="mb-3 flex items-center gap-2">
                <UserAvatar user={user} className="size-9 border border-gray-100" />
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-semibold">
                    {user?.username || "username"}
                  </span>
                  <span className="text-gray-300">›</span>
                  <span className="text-gray-400">threads</span>

                  <span className="ml-1 text-gray-400">
                    {updated_at ? formatTime(updated_at) : "3h"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4 text-[15px] leading-relaxed whitespace-pre-wrap">
                {content || "No content provided."}
              </div>

              {/* Footer */}
              <div className="mt-2 flex items-center justify-between">
                <PreviewInteractionBar
                  likes_count={likes_count}
                  replies_count={replies_count}
                  reposts_and_quotes_count={reposts_and_quotes_count}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                {/* Watermark/Logo */}
                <div className="ml-auto flex items-center justify-between gap-2 rounded-2xl bg-gray-100 px-3 py-2 text-[12px] font-semibold">
                  <span>View on Threads</span>
                  <img src={threadsIcon} className="size-6 rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}

          <div className="relative z-10 bg-white p-4">
            <div className="flex items-center justify-stretch gap-2 rounded-2xl bg-gray-100 px-4 py-3">
              {/* Action Buttons */}
              <div className="w-full justify-items-stretch">
                {truncateTextByWidth(embedCodeUrl, 300)}
              </div>

              <Button
                className="h-9 rounded-xl bg-black px-4 text-sm font-semibold text-white hover:bg-gray-800"
                onClick={handleCopy}
                disabled={isCopying}
              >
                <CopyIcon className="mr-2 size-4" />
                {isCopying ? "Copying..." : "Copy"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

export const GetEmbedCodeModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
