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

const LoginActionModal = ({
  titleModal,
  descriptionModal,
  showIconPost,
  open,
  setOpen,
}) => {
  const navigate = useNavigate();
  const handleContinueLogin = () => {
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className={"p-0"}>
      <DialogContent showCloseButton={false} className={"p-0"}>
        <DialogHeader
          className={
            "flex flex-col items-center justify-center gap-0 p-14 pt-12"
          }
        >
          {showIconPost && (
            <div className="mb-5">
              <img src={postIcon} />
            </div>
          )}
          <DialogTitle
            className={"mb-3 w-full text-center text-[2rem] font-extrabold"}
          >
            {titleModal}
          </DialogTitle>
          <DialogDescription
            className={"mb-8 w-[80%] text-center text-[15px] text-[#999]"}
          >
            {descriptionModal}
          </DialogDescription>
          <DialogDescription
            className={
              "flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-300 p-5 hover:border-gray-500 hover:shadow-xl"
            }
          >
            <div>
              <img className="size-11" src={threadsIcon} />
            </div>
            <div
              onClick={handleContinueLogin}
              className="text-[15px] text-[#999]"
            >
              Continue with username or email
            </div>
            <div>
              <ArrowRightIcon className="text-[#999]" />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginActionModal;
