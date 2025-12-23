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

const UserOptionsDropdown = ({ children }) => {
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
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "Auto" },
  ];

  const ThemeSelector = () => (
    <div className="flex items-center justify-around gap-2 p-1.5 w-55">
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
            className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl py-3.5 transition-all ${
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
          <DropdownMenuGroup>
            <DropdownMenuSub className={"rounded-3xl"}>
              <DropdownMenuSubTrigger
                className={
                  "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                }
              >
                Appearance
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
              Report a problem
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              Appearance
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl p-1"}>
                <ThemeSelector />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Insights
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub className={"rounded-3xl"}>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              Feeds
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl"}>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                >
                  For you
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                >
                  Following
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                >
                  Ghost posts
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
            Saved
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Linked
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Report a problem
          </DropdownMenuItem>
          <DropdownMenuSub className={"rounded-3xl"}>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              Account
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl"}>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onSelect={() => navigate(PATHS.USER_SETTINGS)}
                >
                  Change profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onSelect={handleDeleteAccount}
                  disable={isDeleteAccountLoading}
                >
                  <span className="text-red-500">Delete account</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
            onSelect={handleLogout}
            disable={isLogoutLoading}
          >
            <span className="text-red-500">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptionsDropdown;
