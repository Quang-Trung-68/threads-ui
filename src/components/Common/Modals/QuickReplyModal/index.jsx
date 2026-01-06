import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import Cookies from "js-cookie";
import { Input } from "@/components/Common/ui/input";
import { Textarea } from "@/components/Common/ui/textarea";
import { ReplyModal } from "@/components/post/ReplyModal";
import {
  Ellipsis as MoreIcon,
  Maximize2 as ExpandIcon,
  ArrowUp as SendReplyIcon,
  ChevronRight,
} from "lucide-react";
import { useCreateReplyMutation } from "@/services/postService";
import { notifySooner } from "@/utils/notifySooner";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../../Tooltip";

const QuickReplyModal = forwardRef(
  ({ id, user, content, updated_at, setIsReplyOpen }, ref) => {
    const { t } = useTranslation(["common", "post", "tooltip"]);
    const [isOpen, setIsOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const textareaRef = useRef(null);
    const [createReplyApi, { isLoading: isCreateReplyLoading }] =
      useCreateReplyMutation();

    const handleInput = (e) => {
      setReplyText(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useImperativeHandle(ref, () => ({
      toggle: () => setIsOpen((prev) => !prev),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const handleReplyModal = () => {
      ReplyModal.open({ id, user, content, updated_at });
    };

    const handleQuickPost = async () => {
      setIsReplyOpen(false);
      setIsOpen(false);
      try {
        const createPromise = createReplyApi({
          postId: id,
          data: {
            content: replyText,
          },
        }).unwrap();

        notifySooner.promise(createPromise, {
          loading: t("common:loading"),
          success: t("common:replied"),
          error: t("common:error"),
        });

        await createPromise;

        setReplyText("");
      } catch (error) {
        console.error("Create reply failed:", error);
        setReplyText("");
      }
    };

    const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
    const usernameAuth = userInfo.username;
    const avatarUrlAuth = userInfo.avatar_url;

    return (
      <>
        {isOpen && (
          <div className={"text-foreground mt-2 border-0 transition-colors"}>
            <div className="flex gap-2">
              <div>
                <UserAvatar
                  user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                  className="size-9"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="content flex justify-between">
                  <div className="flex-1">
                    <div className="username flex items-center gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-semibold">{t("common:you")}</span>
                        <span className={"text-muted-foreground"}>
                          <ChevronRight className="size-4" />
                        </span>
                        <Input
                          type={"text"}
                          className={
                            "text-muted-foreground border-0 bg-transparent p-0 text-[15px] shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          }
                          placeholder={t("post:addTopic")}
                        />
                      </div>
                    </div>

                    <div className="body mt-1 flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <Textarea
                          ref={textareaRef}
                          value={replyText}
                          onChange={handleInput}
                          rows={1}
                          className={
                            "text-foreground min-h-10 w-full resize-none border-0 bg-transparent p-0.5 text-[15px] shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          }
                          placeholder={t("post:replyTo", {
                            username: user?.username || "user",
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2 pl-2">
                        <Tooltip label={t("tooltip:expandComposer")}>
                          <div
                            onClick={handleReplyModal}
                            className="bg-muted text-foreground flex size-8 cursor-pointer items-center justify-center rounded-full shadow-sm transition-all hover:scale-110"
                          >
                            <ExpandIcon className="size-4 stroke-[2.5]" />
                          </div>
                        </Tooltip>
                        {replyText && (
                          <Tooltip label={t("tooltip:reply")}>
                            <div
                              onClick={handleQuickPost}
                              disable={isCreateReplyLoading}
                              className="bg-foreground text-background flex size-8 cursor-pointer items-center justify-center rounded-full shadow-sm transition-all hover:scale-110"
                            >
                              <SendReplyIcon className="size-4 stroke-[2.5]" />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <MoreIcon className="text-muted-foreground hover:text-foreground size-5 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);

export default QuickReplyModal;
