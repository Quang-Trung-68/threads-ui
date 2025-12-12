import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Ellipsis as MoreIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
} from "lucide-react";

const InteractionBar = ({ toggleReplyModal }) => {
  return (
    <>
      <div className="interaction flex gap-4 text-gray-600">
        <div className="flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 hover:text-red-500">
          <LikeIcon className="size-4.5" />
          <span className="text-sm">{22}</span>
        </div>

        <div
          onClick={toggleReplyModal}
          className="flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 hover:text-blue-500"
        >
          <ReplyIcon className="size-4.5" />
          <span className="text-sm">{3}</span>
        </div>

        <div className="flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 hover:text-green-500">
          <Repeat2Icon className="size-4.5" />
          <span className="text-sm">{2}</span>
        </div>

        <div className="flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 hover:text-purple-500">
          <SendIcon className="size-4.5" />
          <span className="text-sm">{10}</span>
        </div>
      </div>
    </>
  );
};

export default InteractionBar;
