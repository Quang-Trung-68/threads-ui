import { Instagram } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { PATHS } from "@/configs/paths";

export default function LoginActonCard() {
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);

  const handleUserLogin = () => {
    navigate(PATHS.LOGIN);
  };

  const handleLoginInstagram = () => {
    return;
  };

  return (
    <div className="flex w-85 items-center justify-center">
      <div className="border-border bg-muted w-full max-w-md rounded-3xl border px-6 py-8 shadow-sm">
        {/* Title */}
        <h1 className="text-foreground mb-3 text-center text-xl font-bold">
          {t("auth:loginOrSignup")}
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground mb-8 text-center">
          {t("auth:loginModalDescription")}
        </p>

        {/* Instagram Login Button */}
        <button
          onClick={handleLoginInstagram}
          className="border-border bg-card hover:bg-accent mb-4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border px-6 py-4 transition-colors"
        >
          <Instagram className="h-6 w-6" strokeWidth={2} />
          <div className="flex flex-col items-start">
            <span className="text-muted-foreground">
              {t("auth:continueWithInstagram")}
            </span>
            <span className="text-foreground font-semibold">dqt_2309</span>
          </div>
        </button>

        {/* Alternative Login Link */}
        <button
          onClick={handleUserLogin}
          className="text-muted-foreground hover:text-foreground w-full cursor-pointer py-3 text-center transition-colors"
        >
          {t("auth:loginWithUsername")}
        </button>
      </div>
    </div>
  );
}
