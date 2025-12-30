import { useNavigate } from "react-router";
import { Mail, LogOut, RefreshCw } from "lucide-react";
import { PATHS } from "@/configs/paths";
import useAuth from "@/hooks/useAuth";
import { notifySooner } from "@/utils/notifySooner";
import {
  useLogoutMutation,
  useResendVerificationEmailMutation,
} from "@/services/authService";
import { useTranslation } from "react-i18next";
import { useTitle } from "react-use";

export default function RequireVerifiedEmail() {
  const { t } = useTranslation(["auth"]);
  useTitle(t("auth:requireVerifiedEmailTitle"));
  const navigate = useNavigate();
  const { user } = useAuth();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [resendApi, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      navigate(PATHS.LOGIN);
    } catch (error) {
      console.log(error);
      notifySooner.error(t("auth:logoutFailed"));
    }
  };

  const handleResendEmail = async () => {
    try {
      await resendApi().unwrap();
      notifySooner.success(t("auth:verificationEmailSent"));
    } catch (error) {
      console.log(error);
      notifySooner.error(t("auth:resendFailed"));
    }
  };

  return (
    <div className="text-foreground flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <Mail className="text-primary h-10 w-10" />
      </div>

      <h1 className="mb-4 text-3xl font-bold tracking-tight">
        {t("auth:verifyYourEmail")}
      </h1>

      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        {t("auth:verificationLinkSent")}{" "}
        <span className="text-foreground font-semibold">
          {user?.email || "your email"}
        </span>
        . {t("auth:verifyToAccessFeatures")}
      </p>

      <div className="flex w-full flex-col gap-3">
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="bg-primary text-primary-foreground flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isResending ? <RefreshCw className="h-5 w-5 animate-spin" /> : null}
          {t("auth:resendVerificationEmail")}
        </button>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="border-border bg-background text-foreground hover:bg-accent flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border py-3.5 font-semibold transition-all disabled:opacity-50"
        >
          <LogOut className="h-5 w-5" />
          {t("auth:logout")}
        </button>
      </div>
    </div>
  );
}
