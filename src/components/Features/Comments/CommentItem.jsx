import UserAvatar from "@/components/Common/ui/UserAvatar";
import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Ellipsis as MoreIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
} from "lucide-react";
import { Card } from "@/components/Common/ui/card";
import ReplyModal from "@/components/Common/Modals/QuickReplyModal";

function CommentItem({ postId, userId, id, name, body, avatar_url }) {
  // const navigate = useNavigate();

  // const handleToUserProfile = () => {
  //   navigate(`/@${userId}`);
  // };

  const username = "user_" + Math.floor(Math.random() * 100);
  const urlImage =
    "https://picsum.photos/600/400?random=" + Math.floor(Math.random() * 10);

  const ReplyModalRef = useRef(null);
  const toggleReplyModal = () => {
    ReplyModalRef.current?.toggle();
  };
  return (
    <Card className="flex flex-col rounded-none border-b p-3 md:p-6">
      <div className="flex gap-2">
        <div>
          <UserAvatar user={{ username, avatar_url }} className="size-9" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="content flex justify-between">
            <div className="flex-1">
              <div className="username flex items-center gap-2">
                <div className="font-semibold">{username}</div>
                <div className="text-sm text-gray-500">{"10h"}</div>
              </div>
              {body && (
                <div className="body mt-1">
                  {name}: {body}
                </div>
              )}
            </div>
            <div>
              <MoreIcon className="size-5 text-gray-500" />
            </div>
          </div>

          {urlImage && (
            <div className="overflow-hidden">
              <img src={urlImage} className="max-h-20 w-auto" alt={""} />
            </div>
          )}

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
        </div>
      </div>
      <ReplyModal ref={ReplyModalRef} />
    </Card>
  );
}

export default CommentItem;
