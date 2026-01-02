import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import { ChevronRight as ArrowRightIcon } from "lucide-react";
import threadsIcon from "@assets/threads-icon.svg";
import postIcon from "@assets/post-icon.svg";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { PATHS } from "@/configs/paths";

const LoginActionModal = NiceModal.create(
  ({ titleModal, descriptionModal, showIconPost }) => {
    const { t } = useTranslation(["common"]);
    const navigate = useNavigate();
    const modal = useModal();

    const handleContinueLogin = () => {
      modal.hide();
      navigate(PATHS.LOGIN);
    };

    return (
      <Dialog open={modal.visible} onOpenChange={modal.hide} className={"p-0"}>
        <DialogContent
          showCloseButton={false}
          className={"bg-background text-foreground p-0 transition-colors"}
        >
          <DialogHeader
            className={
              "flex flex-col items-center justify-center gap-0 p-14 pt-12"
            }
          >
            {showIconPost && (
              <div className="mb-5 filter transition-all dark:opacity-80 dark:invert">
                <img src={postIcon} alt="Post Icon" />
              </div>
            )}
            <DialogTitle
              className={
                "text-foreground mb-3 w-full text-center text-[2rem] font-extrabold"
              }
            >
              {titleModal}
            </DialogTitle>
            <DialogDescription
              className={
                "text-muted-foreground mb-8 w-[80%] text-center text-[15px]"
              }
            >
              {descriptionModal}
            </DialogDescription>
            <DialogDescription asChild>
              <div
                onClick={handleContinueLogin}
                className={
                  "border-border hover:border-muted-foreground flex w-full cursor-pointer items-center justify-between rounded-xl border p-5 transition-all hover:shadow-xl"
                }
              >
                <div>
                  <img
                    className="size-11"
                    src={threadsIcon}
                    alt="Threads Icon"
                  />
                </div>
                <div className="text-muted-foreground text-[15px]">
                  {t("common:continueWithUsernameOrEmail")}
                </div>
                <div>
                  <ArrowRightIcon className="text-muted-foreground" />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  },
);

export default LoginActionModal;
