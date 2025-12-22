import { registerSchema } from "@/schemas";
import { useRegisterMutation } from "@/services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { useNavigate } from "react-router";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useDebouncedField } from "@/hooks/useDebouncedField";
import { notifySooner } from "@/utils/notifySooner";
//
export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [registerApi, { isError, isLoading }] = useRegisterMutation();

  const onSubmit = async (credentials) => {
    try {
      const response = await registerApi(credentials);
      if (!response.error) {
        Cookies.set("access_token", response.data.access_token);
        Cookies.set("refresh_token", response.data.refresh_token);
        setStatus(
          "Register successfully, please check your email to verify your account!",
        );
        notifySooner.success(
          "Register successfully, please check your email to verify your account!",
        );
      } else {
        const entries = Object.entries(response.error.data.errors);
        for (const [_, [key, value]] of Object.entries(entries)) {
          notifySooner.error(`${value}`);
        }
      }
    } catch (error) {
      notifySooner.error("Error to register, please try again");
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

  return (
    <div className="text-foreground relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent">
      {/* Main register container */}
      <div className="z-10 w-full max-w-md">
        <div className="mb-2 text-center">
          <h1 className="mb-8 text-2xl font-semibold">Register an account</h1>
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
                placeholder="Username"
                {...register("username")}
                autoComplete={"off"}
                onChange={(e) => usernameChange(e.target.value)}
                className="border-border bg-muted focus:ring-ring w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
              />
              {errors.username && (
                <span className="text-destructive mt-1 block text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                autoComplete={"off"}
                onChange={(e) => emailChange(e.target.value)}
                className="border-border bg-muted focus:ring-ring w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
              />
              {errors.email && (
                <span className="text-destructive mt-1 block text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="text-left">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password")}
                  autoComplete={"off"}
                  onChange={(e) => passwordChange(e.target.value)}
                  className="border-border bg-muted focus:ring-ring w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                />
                <span
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.password && (
                <span className="text-destructive mt-1 block text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="text-left">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  autoComplete={"off"}
                  {...register("password_confirmation")}
                  onChange={(e) => passwordConfirmationChange(e.target.value)}
                  className="border-border bg-muted focus:ring-ring w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                />
                <span
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.password_confirmation && (
                <span className="text-destructive mt-1 block text-sm">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground mt-6 w-full cursor-pointer rounded-xl py-3 font-semibold transition-colors hover:opacity-90 disabled:opacity-50"
              disabled={isLoading}
            >
              Sign up
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="bg-border h-px flex-1"></div>
            <span className="text-muted-foreground text-sm">or</span>
            <div className="bg-border h-px flex-1"></div>
          </div>

          <button className="border-border bg-card hover:bg-accent group flex w-full items-center justify-between rounded-xl border px-4 py-3 transition-colors">
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
                  Continue with Instagram
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
              onClick={() => navigate("/login")}
              className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
            >
              <span className="cursor-pointer font-medium">
                Already have an account? Log in
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
