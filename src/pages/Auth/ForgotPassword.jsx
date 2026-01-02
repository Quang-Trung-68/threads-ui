import { useForgotPasswordMutation } from "@/services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { useDebouncedField } from "@/hooks/useDebouncedField";
import forgotPasswordSchema from "@/schemas/forgotPasswordSchema";
import { notifySooner } from "@/utils/notifySooner";
import { useTranslation } from "react-i18next";
import { useTitle } from "react-use";
import { PATHS } from "@/configs/paths";

export default function ForgotPassword() {
  const { t } = useTranslation(["auth", "common"]);
  useTitle(t("auth:forgotPasswordTitle"));
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [forgotPasswordApi, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (credentials) => {
    try {
      const response = await forgotPasswordApi(credentials).unwrap();
      notifySooner.success(t("auth:sendEmailSuccess"));
    } catch (error) {
      console.log(error);
      notifySooner.error(t("auth:sendEmailError"));
    }
  };

  // Debounced input
  const emailChange = useDebouncedField(setValue, "email", 800);

  const isButtonDisabled = !isValid || isLoading;

  return (
    <div className="text-foreground mb-8 text-center">
      <h1 className="mb-4 text-base font-bold">{t("auth:forgotPassword")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="text-left">
          <input
            type="text"
            placeholder={t("auth:email")}
            {...register("email")}
            onChange={(e) => emailChange(e.target.value)}
            className="border-border bg-muted focus:ring-ring mx-auto block h-[55px] w-full rounded-xl border px-4 py-3 focus:ring-1 focus:outline-none md:w-[370px]"
          />
          {errors.email && (
            <div className="mx-auto w-full md:w-[370px]">
              <span className="text-destructive mt-1 block text-sm">
                {errors.email.message}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`bg-primary text-primary-foreground mx-auto block w-full rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50 md:w-[370px] ${isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={isButtonDisabled}
        >
          {isLoading ? t("common:loading") : t("auth:sendVerifiedEmail")}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="bg-border h-px flex-1"></div>
        <span className="text-muted-foreground text-sm">{t("auth:or")}</span>
        <div className="bg-border h-px flex-1"></div>
      </div>

      {/* Instagram login */}
      <button className="border-border bg-card hover:bg-accent mx-auto flex w-full items-center justify-between rounded-xl border px-4 py-3 transition-colors md:w-[370px]">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 via-pink-500 to-orange-500">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium">
              {t("auth:continueWithInstagram")}
            </div>
            <div className="text-muted-foreground text-sm">dqt_2309</div>
          </div>
        </div>
        <svg
          className="text-muted-foreground h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="mt-6">
        <button
          onClick={() => navigate(PATHS.REGISTER)}
          className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
        >
          {t("auth:doNotHaveAccount")}{" "}
          <span className="cursor-pointer font-medium">{t("auth:signUp")}</span>
        </button>
      </div>
    </div>
  );
}
