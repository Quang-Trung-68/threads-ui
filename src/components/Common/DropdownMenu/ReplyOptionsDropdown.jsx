import { Check, ToggleLeft, ToggleRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";

const ReplyOptionsDropdown = ({
  children,
  replyQuote,
  setReplyQuote,
  reviewApprove,
  setReviewApprove,
}) => {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit p-2">
          <DropdownMenuLabel className={"text-[13px] text-gray-500"}>
            Who can reply and quote
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={replyQuote}
            onValueChange={setReplyQuote}
          >
            <DropdownMenuRadioItem
              className={
                "w-66 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              checkedIcon={Check}
              value="everyone"
            >
              Everyone
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className={
                "w-66 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              checkedIcon={Check}
              value="followers"
            >
              Your followers
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className={
                "w-66 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              checkedIcon={Check}
              value="following"
            >
              Profiles you follow
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className={
                "w-66 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              checkedIcon={Check}
              value="mentions"
            >
              Profiles you mention
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={reviewApprove}
            className={
              "flex w-66 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
            onCheckedChange={setReviewApprove}
            onSelect={(e) => e.preventDefault()}
          >
            <span>Review and approve replies</span>
            <span className="flex items-center justify-center">
              <Switch
                checked={reviewApprove}
                onCheckedChange={setReviewApprove}
                className={"scale-125"}
              />
            </span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ReplyOptionsDropdown;
