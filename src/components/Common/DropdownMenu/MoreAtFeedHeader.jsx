import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { MinusCircle, PlusCircle } from "lucide-react";

function MoreAtFeedHeader({ onRemoveColumn, children, canRemove }) {
  const { t } = useTranslation(["common"]);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={"mr-30 w-fit rounded-3xl border-2 p-2"}>
        {onRemoveColumn && canRemove && (
          <DropdownMenuItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onRemoveColumn}
          >
            <span>{t("common:removeColumn")}</span>
            <span className="flex items-center justify-center">
              <MinusCircle className="size-5" />
            </span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className={
            "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
          }
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {}}
        >
          <span>{t("common:createNewFeed")}</span>
          <span className="flex items-center justify-center">
            <PlusCircle className="size-5" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreAtFeedHeader;
