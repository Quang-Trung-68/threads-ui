import { Check, Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "../../Common/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const AuthMenu = ({ children }) => {
  const { theme, setTheme } = useTheme();

  const { t } = useTranslation(["common"]);

  const ThemeItem = ({ value, label, icon: Icon }) => (
    <DropdownMenuItem
      className={
        "w-40 cursor-pointer rounded-xl px-3 py-3.5 text-[15px] font-semibold"
      }
      onClick={() => setTheme(value)}
    >
      {label}
      <DropdownMenuShortcut className="flex items-center gap-2">
        {theme === value && <Check className="text-primary size-4" />}
        <Icon className="size-5" />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          "bg-card text-foreground w-fit cursor-pointer rounded-3xl border-2 p-2 shadow-xl"
        }
      >
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              {t("common:appearance")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className={"bg-card text-foreground rounded-3xl border-2 p-2"}
              >
                <ThemeItem
                  className={"cursor-pointer"}
                  value="light"
                  label="Light"
                  icon={Sun}
                />
                <ThemeItem
                  className={"cursor-pointer"}
                  value="dark"
                  label="Dark"
                  icon={Moon}
                />
                <ThemeItem
                  className={"cursor-pointer"}
                  value="system"
                  label="Auto"
                  icon={Monitor}
                />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            {t("common:reportAProblem")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthMenu;
