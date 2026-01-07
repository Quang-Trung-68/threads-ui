import { Plus } from "lucide-react";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import { Tooltip } from "./Tooltip";
import { useTranslation } from "react-i18next";

export default function AddPostButton() {
  const { t } = useTranslation(["tooltip"]);

  const handleClick = () => {
    CreatePostModal.open({});
  };

  return (
    <div
      onClick={handleClick}
      className="border-border bg-card fixed right-6 bottom-6 z-[70] hidden h-18 w-20 cursor-pointer items-center justify-center rounded-2xl border shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl md:flex"
    >
      <Tooltip label={t("tooltip:create")}>
        <Plus size={28} className="text-foreground" strokeWidth={2.5} />
      </Tooltip>
    </div>
  );
}
