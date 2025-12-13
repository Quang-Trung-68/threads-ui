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
  Copy, // Icon giống biểu tượng 2 thẻ chồng lên nhau
  Hash, // Icon dấu thăng
} from "lucide-react";
import { Button } from "@/components/Common/ui/button";
import { useState } from "react";

const Modal = NiceModal.create(
  ({ username = "dqt_2309", onPost, onCancel }) => {
    const modal = useModal();
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [showTopicInput, setShowTopicInput] = useState(false);

    const handleCancel = () => {
      onCancel?.();
      modal.hide();
    };

    const handlePost = () => {
      if (content.trim()) {
        onPost?.({ topic, content });
        setTopic("");
        setContent("");
        setShowTopicInput(false);
        modal.hide();
      }
    };

    return (
      <Dialog open={modal.visible} onOpenChange={handleCancel}>
        {/* max-w-lg để kích thước giống mobile/modal nhỏ gọn hơn */}
        <DialogContent
          showCloseButton={false}
          className="max-w-[600px] gap-0 overflow-hidden rounded-2xl border-none bg-white p-0 shadow-xl"
        >
          {/* --- HEADER --- */}
          <div className="flex items-center justify-between px-5 py-4">
            <button
              onClick={handleCancel}
              className="text-[16px] text-black hover:opacity-70"
            >
              Cancel
            </button>
            <DialogTitle className="text-[16px] font-bold text-black">
              New thread
            </DialogTitle>
            <div className="flex items-center gap-4">
              {/* Icon giống Library/Copy */}
              <button className="text-black hover:opacity-70">
                <Copy size={22} strokeWidth={2} className="-scale-x-100" />
              </button>
              <button className="text-black hover:opacity-70">
                <MoreHorizontal size={24} className="text-black" />
              </button>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-100" />

          {/* --- BODY --- */}
          <div className="flex px-5 pt-4 pb-2">
            {/* LEFT COLUMN: Avatar & Thread Line */}
            <div className="mr-3 flex flex-col items-center pt-1">
              {/* Main Avatar */}
              <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-200">
                {/* Placeholder Avatar Icon */}
                <svg
                  className="h-full w-full text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              {/* The Vertical Thread Line */}
              <div className="my-2 w-[2px] flex-grow rounded-full bg-gray-200" />

              {/* Small Ghost Avatar (for 'Add to thread') */}
              <div className="h-5 w-5 overflow-hidden rounded-full bg-gray-200 opacity-50">
                <svg
                  className="h-full w-full text-gray-400"
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
                <span className="text-[15px] font-semibold text-black">
                  {username}
                </span>

                {/* Topic Logic */}
                {!showTopicInput ? (
                  <button
                    onClick={() => setShowTopicInput(true)}
                    className="flex items-center text-[15px] text-gray-400 opacity-60 hover:opacity-100"
                  >
                    {/* Dấu chấm nhỏ ngăn cách nếu muốn, hoặc để trống như ảnh */}
                    {/* <span className="mx-1">•</span> */}
                    <span className="ml-1 font-normal">Add a topic</span>
                  </button>
                ) : (
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Add a topic"
                    className="ml-2 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-gray-400"
                    autoFocus
                  />
                )}
              </div>

              {/* Textarea */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's new?"
                className="mb-2 w-full resize-none bg-transparent py-1 text-[15px] text-black placeholder:text-gray-400 focus:outline-none"
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
                <button className="text-gray-400 transition-colors hover:text-black">
                  <ImageIcon size={20} />
                </button>
                <button className="text-gray-400 transition-colors hover:text-black">
                  {/* Giả lập icon GIF bằng border */}
                  <div className="flex items-center justify-center rounded border border-gray-400 px-1 py-[1px] text-[9px] font-bold">
                    GIF
                  </div>
                </button>
                <button className="text-gray-400 transition-colors hover:text-black">
                  <Hash size={20} />
                </button>
                <button className="text-gray-400 transition-colors hover:text-black">
                  <AlignLeft size={20} />
                </button>
                <button className="text-gray-400 transition-colors hover:text-black">
                  <MapPin size={20} />
                </button>
              </div>

              {/* Add to thread text (Aligned with Ghost Avatar) */}
              <div className="flex items-center pb-2">
                <button className="text-[15px] font-normal text-gray-400 opacity-60 hover:opacity-100">
                  Add to thread
                </button>
              </div>
            </div>
          </div>

          {/* --- FOOTER --- */}
          <div className="mt-2 flex items-center justify-between px-5 py-4">
            <button className="text-[15px] font-normal text-gray-400 hover:text-gray-600">
              Reply options
            </button>

            <Button
              onClick={handlePost}
              disabled={!content.trim()}
              className={`rounded-full px-5 py-5 text-[15px] font-semibold transition-all ${
                content.trim()
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border border-gray-100 bg-gray-100 text-gray-400 hover:bg-gray-100"
              } `}
              variant="ghost" // Dùng ghost để custom style dễ hơn
            >
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

export default Modal;
