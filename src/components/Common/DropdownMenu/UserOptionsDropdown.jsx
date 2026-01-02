import { Check, Ghost, Monitor, Moon, Sun } from "lucide-react";
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
} from "../ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import {
  useDeleteAccountMutation,
  useLogoutMutation,
} from "@/services/authService";
import { useNavigate } from "react-router";
import { PATHS } from "@/configs/paths";
import Cookies from "js-cookie";
import { DeleteAccountModal } from "@/components/Features/auth/DeleteAccountModal";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const UserOptionsDropdown = ({ children }) => {

  // i18n for language change
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [deleteAccountApi, { isLoading: isDeleteAccountLoading, isSuccess }] =
    useDeleteAccountMutation();

  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleDeleteUserInfo = () => {
    Cookies.remove("userInfo");
    Cookies.remove("refresh_token");
    Cookies.remove("access_token");
  };

  const handleConfirmDelete = async () => {
    await deleteAccountApi();
    navigate(PATHS.LOGIN);
    handleDeleteUserInfo();
  };

  const handleDeleteAccount = () => {
    DeleteAccountModal.open({
      onDelete: handleConfirmDelete,
    });
  };

  const handleLogout = async () => {
    await logoutApi();
    navigate(PATHS.LOGIN);
    handleDeleteUserInfo();
  };

  const themes = [
    { value: "light", icon: Sun, label: t("common:light") },
    { value: "dark", icon: Moon, label: t("common:dark") },
    { value: "system", icon: Monitor, label: t("common:auto") },
  ];

  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const ThemeSelector = () => (
    <div className="flex w-30 flex-col items-center justify-center gap-2 p-1.5 md:w-55 md:flex-row md:justify-around">
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTheme(value);
            }}
            className={`flex w-full flex-1 flex-row items-center justify-evenly gap-2 rounded-2xl py-3.5 transition-all md:flex-col md:justify-center ${
              isActive
                ? "bg-muted text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/40"
            }`}
          >
            <Icon
              className={`size-6 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`}
            />
            <span
              className={`text-[11px] ${isActive ? "font-bold" : "font-medium"}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );

  if (!user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
          <DropdownMenuGroup>
            <DropdownMenuSub className={"rounded-3xl"}>
              <DropdownMenuSubTrigger
                className={
                  "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                }
              >
                {t("common:appearance")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className={"rounded-3xl p-1"}>
                  <ThemeSelector />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              {t("common:reportAProblem")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
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
              <DropdownMenuSubContent className={"rounded-3xl p-1"}>
                <ThemeSelector className={"w-10"} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub className={"rounded-3xl"}>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              {t("common:language")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl"}>
                <DropdownMenuItem
                  className={`w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold ${language === "en" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/30"}`}
                  onSelect={() => changeLanguage("en")}
                >
                  {t("common:english")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold ${language === "vi" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/30"}`}
                  onSelect={() => changeLanguage("vi")}
                >
                  {t("common:vietnamese")}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            {t("common:insights")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            {t("common:settings")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub className={"rounded-3xl"}>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              {t("common:feeds")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl"}>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onSelect={() => navigate(PATHS.HOME)}
                >
                  {t("common:forYou")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onSelect={() => navigate(PATHS.FOLLOWING)}
                >
                  {t("common:following")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onSelect={() => navigate(PATHS.GHOST_POSTS)}
                >
                  {t("common:ghostPosts")}
                  <DropdownMenuShortcut>
                    <Ghost className="size-5" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            {t("common:saved")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            {t("common:linked")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            {t("common:reportAProblem")}
          </DropdownMenuItem>
          <DropdownMenuSub className={"rounded-3xl"}>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              {t("common:account")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl"}>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onSelect={() => navigate(PATHS.USER_SETTINGS)}
                >
                  {t("common:changeProfile")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onSelect={handleDeleteAccount}
                  disabled={isDeleteAccountLoading}
                >
                  <span className="text-red-500">
                    {t("common:deleteAccount")}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
            onSelect={handleLogout}
            disabled={isLogoutLoading}
          >
            <span className="text-red-500">{t("auth:logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptionsDropdown;
