import { registerSchema } from "@/schemas";
import { useRegisterMutation } from "@/services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useDebouncedField } from "@/hooks/useDebouncedField";
import { notifySooner } from "@/utils/notifySooner";
import { useTranslation } from "react-i18next";
import { useTitle } from "react-use";
import { useZodI18n } from "@/hooks/useZodI18n";
import { PATHS } from "@/configs/paths";

export default function Register() {
  const { t } = useTranslation(["auth", "common"]);
  useTitle(t("auth:registerTitle"));
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  useZodI18n(trigger, errors);

  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [registerApi, { isLoading }] = useRegisterMutation();

  const onSubmit = async (credentials) => {
    setStatus("");
    try {
      const response = await registerApi(credentials);
      if (!response.error) {
        setStatus(t("auth:registerSuccess"));
        notifySooner.success(t("auth:registerSuccess"));
      } else {
        if (response.error.status === 422) {
          notifySooner.error(t("auth:duplicateUsernameOrEmail"));
          setStatus(t("auth:duplicateUsernameOrEmail"));
        } else {
          const entries = Object.entries(response.error.data.errors);
          for (const [_, [key, value]] of Object.entries(entries)) {
            notifySooner.error(`${value}`);
            throw new Error(`${value}`);
          }
        }
      }
    } catch (error) {
      notifySooner.error(t("auth:registerError"));
      setStatus(t("auth:registerError"));
      console.log(error);
    }
  };

  // Debounced input
  const usernameChange = useDebouncedField(setValue, "username", 800);
  const emailChange = useDebouncedField(setValue, "email", 800);
  const passwordChange = useDebouncedField(setValue, "password", 800);
  const passwordConfirmationChange = useDebouncedField(
    setValue,
    "password_confirmation",
    800,
  );

  const isButtonDisabled = !isValid || isLoading;

  return (
    <div className="text-foreground relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent">
      {/* Main register container */}
      <div className="z-10 w-full max-w-md">
        <div className="mb-2 text-center">
          <h1 className="mb-6 text-base font-bold">
            {t("auth:registerAccount")}
          </h1>
          <div className="mb-8 text-sm text-blue-500 italic dark:text-blue-400">
            {status}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-4"
          >
            {/* Username */}
            <div className="text-left">
              <input
                type="text"
                placeholder={t("auth:username")}
                {...register("username")}
                autoComplete={"off"}
                onChange={(e) => usernameChange(e.target.value)}
                className="border-border bg-muted focus:ring-ring mx-auto block h-[55px] w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none md:w-[370px]"
              />
              <div className="mx-auto mt-1 min-h-5 w-full text-sm md:w-[370px]">
                <span
                  className={`text-destructive block ${errors.username ? "" : "invisible"}`}
                >
                  {errors.username?.message || "placeholder"}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                placeholder={t("auth:emailPlaceholder")}
                {...register("email")}
                autoComplete={"off"}
                onChange={(e) => emailChange(e.target.value)}
                className="border-border bg-muted focus:ring-ring mx-auto block h-[55px] w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none md:w-[370px]"
              />
              <div className="mx-auto mt-1 min-h-5 w-full text-sm md:w-[370px]">
                <span
                  className={`text-destructive block ${errors.email ? "" : "invisible"}`}
                >
                  {errors.email?.message || "placeholder"}
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="text-left">
              <div className="relative mx-auto w-full md:w-[370px]">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth:passwordPlaceholder")}
                  {...register("password")}
                  autoComplete={"off"}
                  onChange={(e) => passwordChange(e.target.value)}
                  className="border-border bg-muted focus:ring-ring block h-[55px] w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                />
                <span
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <div className="mx-auto mt-1 min-h-5 w-full text-sm md:w-[370px]">
                <span
                  className={`text-destructive block ${errors.password ? "" : "invisible"}`}
                >
                  {errors.password?.message || "placeholder"}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="text-left">
              <div className="relative mx-auto w-full md:w-[370px]">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth:confirmPasswordPlaceholder")}
                  autoComplete={"off"}
                  {...register("password_confirmation")}
                  onChange={(e) => passwordConfirmationChange(e.target.value)}
                  className="border-border bg-muted focus:ring-ring block h-[55px] w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                />
                <span
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <div className="mx-auto mt-1 min-h-5 w-full text-sm md:w-[370px]">
                <span
                  className={`text-destructive block ${errors.password_confirmation ? "" : "invisible"}`}
                >
                  {errors.password_confirmation?.message || "placeholder"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className={`bg-primary text-primary-foreground mx-auto mt-6 block w-full rounded-xl py-3 font-semibold transition-colors hover:opacity-90 disabled:opacity-50 md:w-[370px] ${isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
              disabled={isButtonDisabled}
            >
              {isLoading ? t("common:loading") : t("auth:signUp")}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="bg-border h-px flex-1"></div>
            <span className="text-muted-foreground text-sm">
              {t("auth:or")}
            </span>
            <div className="bg-border h-px flex-1"></div>
          </div>

          <button className="border-border bg-card hover:bg-accent group mx-auto flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors md:w-[370px]">
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
                <div className="cursor-pointer text-sm font-medium">
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

          <div className="mt-2">
            <button
              onClick={() => navigate(PATHS.LOGIN)}
              className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
            >
              {t("auth:alreadyHaveAccount")}{" "}
              <span className="cursor-pointer font-medium">
                {t("auth:signIn")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
