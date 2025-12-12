import { registerSchema } from "@/schemas";
import { useRegisterMutation } from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useDebouncedField } from "@/hooks/useDebouncedField";
// dt1234@gmail.com 12345678
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
        toast.success(
          "Register successfully, please check your email to verify your account!",
        );
      } else {
        const entries = Object.entries(response.error.data.errors);
        for (const [_, [key, value]] of Object.entries(entries)) {
          toast.error(`${value}`);
        }
      }
    } catch (error) {
      toast.error("Error to register, please try again");
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent">
      {/* Main register container */}
      <div className="z-10 w-full max-w-md">
        <div className="mb-2 text-center">
          <h1 className="mb-8 text-2xl font-semibold">Register an account</h1>
          <div className="mb-8 text-sm text-blue-400 italic">{status}</div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div className="text-left">
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                onChange={(e) => usernameChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
              />
              {errors.username && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                placeholder="example@fullstack.edu.vn"
                {...register("email")}
                onChange={(e) => emailChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
              />
              {errors.email && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="text-left">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="12345678"
                  {...register("password")}
                  onChange={(e) => passwordChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.password && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="text-left">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="12345678"
                  {...register("password_confirmation")}
                  onChange={(e) => passwordConfirmationChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.password_confirmation && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 w-full cursor-pointer rounded-xl bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800"
              disabled={isLoading}
            >
              Sign up
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                <svg
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="cursor-pointer text-sm font-medium">
                  Continue with Instagram
                </div>
                <div className="text-sm text-gray-600">dqt_2309</div>
              </div>
            </div>
            <svg
              className="h-5 w-5 text-gray-400"
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
              className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
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
