import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import { Button } from "@/components/Common/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/Common/ui/avatar";
import { formatTime } from "@/utils/formatTime";
import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
  Check as CheckIcon,
  ChevronDown,
  Copy as CopyIcon,
  Download as DownloadIcon,
} from "lucide-react";
import { toPng, toBlob } from "html-to-image";
import threadsIcon from "@assets/threads-icon.svg";
import { notifySooner } from "@/utils/notifySooner";

// Mock Interaction Bar specifically for the image preview
// eslint-disable-next-line react-refresh/only-export-components
const PreviewInteractionBar = ({
  likes_count,
  replies_count,
  reposts_and_quotes_count,
  showMetrics,
  currentBg,
}) => {
  return (
    <div className="mt-2 flex gap-4" style={{ color: currentBg.color }}>
      <div className="flex items-center gap-1">
        <LikeIcon className="size-4.5" />
        {showMetrics && <span className="text-sm">{likes_count}</span>}
      </div>
      <div className="flex items-center gap-1">
        <ReplyIcon className="size-4.5" />
        {showMetrics && <span className="text-sm">{replies_count}</span>}
      </div>
      <div className="flex items-center gap-1">
        <Repeat2Icon className="size-4.5" />
        {showMetrics && (
          <span className="text-sm">{reposts_and_quotes_count}</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <SendIcon className="size-4.5" />
      </div>
    </div>
  );
};

const BACKGROUND_OPTIONS = [
  { id: "white", color: "#000", background: "#fff" },
  { id: "black", color: "#fff", background: "#000" },
  { id: "blue", color: "#fff", background: "#3b82f6" },
];

const Modal = NiceModal.create(
  ({
    user,
    content,
    updated_at,
    likes_count,
    replies_count,
    reposts_and_quotes_count,
  }) => {
    const modal = useModal();
    const [selectedBg, setSelectedBg] = useState("white");
    const [showMetrics, setShowMetrics] = useState(true);

    const previewRef = useRef(null);
    const [isCopying, setIsCopying] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleCancel = () => {
      modal.hide();
    };

    const handleCopy = async () => {
      if (!previewRef.current) return;
      setIsCopying(true);

      try {
        const blob = await toBlob(previewRef.current, {
          cacheBust: true,
          style: { transform: "scale(1)" }, // Prevent scaling issues
        });

        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          notifySooner.success("Image copied to clipboard!");
        }
      } catch (error) {
        console.error("Failed to copy image:", error);
        notifySooner.error("Failed to copy image.");
      } finally {
        setIsCopying(false);
      }
    };

    const handleDownload = async () => {
      if (!previewRef.current) return;
      setIsDownloading(true);

      try {
        const dataUrl = await toPng(previewRef.current, {
          cacheBust: true,
          style: { transform: "scale(1)" },
        });

        const link = document.createElement("a");
        link.download = `threads-post-${updated_at}.png`;
        link.href = dataUrl;
        link.click();
        notifySooner.success("Image downloaded!");
      } catch (error) {
        console.error("Failed to download image:", error);
        notifySooner.error("Failed to download image.");
      } finally {
        setIsDownloading(false);
      }
    };

    const currentBg =
      BACKGROUND_OPTIONS.find((opt) => opt.id === selectedBg) ||
      BACKGROUND_OPTIONS[0];

    return (
      <Dialog open={modal.visible} onOpenChange={handleCancel}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[650px] gap-0 overflow-hidden rounded-3xl border-none bg-[#fafafa] p-0 shadow-2xl"
        >
          <DialogTitle className="sr-only">Copy as image</DialogTitle>

          {/* Preview Area */}
          <div
            ref={previewRef}
            className="relative flex min-h-[400px] items-center justify-center p-8 transition-colors duration-300"
            style={{
              background: currentBg.background,
              color: currentBg.color,
              border: currentBg.color,
            }}
          >
            {/* Card */}
            <div className="w-full rounded-3xl p-6 shadow-sm">
              {/* Header */}
              <div className="mb-3 flex items-center gap-2">
                <Avatar className="size-9 border border-gray-100">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>{user?.username?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-semibold">
                    {user?.username || "username"}
                  </span>
                  <span className="text-gray-300">›</span>
                  <span className="text-gray-400">threads</span>
                  {showMetrics && (
                    <span className="ml-1 text-gray-400">
                      {updated_at ? formatTime(updated_at) : "3h"}
                    </span>
                  )}
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
                  showMetrics={showMetrics}
                  currentBg={currentBg}
                />

                {/* Watermark/Logo */}
                <div className="ml-auto">
                  <img src={threadsIcon} className="size-8 rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          {/* Background Selector */}
          <div className="relative z-10 flex items-center justify-between bg-white px-4">
            <div className="flex gap-2 rounded-full bg-gray-100 p-1">
              {BACKGROUND_OPTIONS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBg(bg.id)}
                  className={`size-6 rounded-full border-2 transition-all ${bg.id === selectedBg ? "scale-110 border-black" : "border-transparent hover:scale-110"} ${bg.border || ""}`}
                  style={{ background: bg.background }}
                  aria-label={`Select background ${bg.id}`}
                />
              ))}
            </div>
          </div>
          <div className="relative z-10 flex items-center justify-between bg-white p-4">
            <div className="flex items-center gap-4">
              {/* Show Metrics Toggle */}
              <div
                className="flex cursor-pointer items-center gap-2 select-none"
                onClick={() => setShowMetrics(!showMetrics)}
              >
                <div
                  className={`flex size-6 items-center justify-center rounded-full transition-colors ${showMetrics ? "bg-black text-white" : "bg-gray-200 text-transparent"}`}
                >
                  <CheckIcon size={20} strokeWidth={4} />
                </div>
                <span>Show metrics</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Size Dropdown (Static for now) */}
              <Button
                variant="outline"
                className="h-9 rounded-xl border-gray-200 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Auto <ChevronDown className="ml-2 size-4 text-gray-400" />
              </Button>

              {/* Action Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-xl border-gray-200"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <DownloadIcon className="size-4.5" />
              </Button>

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

export const CopyAsImageModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
