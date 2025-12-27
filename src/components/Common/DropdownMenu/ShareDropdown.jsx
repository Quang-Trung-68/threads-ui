import { FileCodeIcon, Images, LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { CopyAsImageModal } from "@/components/post/CopyAsImageModal";
import { GetEmbedCodeModal } from "@/components/post/GetEmbedCodeModal";

const ShareDropdown = ({
  id,
  user,
  content,
  updated_at,
  likes_count,
  replies_count,
  reposts_and_quotes_count,
  children,
}) => {
  const handleCopyLink = () => {
    const postLink = `${location.origin}/@${user.username}/post/${id}`;
    copyToClipboard(postLink);
  };

  const handleCopyAsImageModal = () => {
    CopyAsImageModal.open({
      user,
      content,
      updated_at,
      likes_count,
      replies_count,
      reposts_and_quotes_count,
    });
  };

  const handleGetEmbedCodeModal = () => {
    GetEmbedCodeModal.open({
      id,
      user,
      content,
      updated_at,
      likes_count,
      replies_count,
      reposts_and_quotes_count,
    });
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem
              className={
                "w-66 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              showIcon={false}
              onClick={() => handleCopyLink()}
            >
              <span>Copy link</span>
              <span>
                <LinkIcon className="size-5" />
              </span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className={
                "w-66 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              showIcon={false}
              onClick={() => handleCopyAsImageModal()}
            >
              <span>Copy as image</span>
              <span>
                <Images className="size-5" />
              </span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className={
                "w-66 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
              showIcon={false}
              onClick={handleGetEmbedCodeModal}
            >
              <span>Get embed code</span>
              <span>
                <FileCodeIcon className="size-5" />
              </span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ShareDropdown;
