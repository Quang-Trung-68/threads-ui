import resetPasswordSchema from "@/schemas/resetPasswordSchema";

import {
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";

import { useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useDebouncedField } from "@/hooks/useDebouncedField";
import { Spinner } from "@/components/Common/ui/spinner";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  const navigate = useNavigate();

  const [resetPasswordApi, { isLoading, isSuccess }] =
    useResetPasswordMutation();
  const {
    data: validTokenData,
    isError: isErrorValidToken,
    isLoading: isLoadingValidToken,
    isSuccess: isSuccessValidToken,
  } = useValidateResetTokenQuery({ token });

  useEffect(() => {
    if (validTokenData) {
      if (validTokenData.valid && isSuccessValidToken) {
        setIsValidToken(true);
        setStatus("Please enter your new password");
      } else if (!validTokenData.valid || isErrorValidToken) {
        setIsValidToken(false);
        setStatus(
          "Token is invalid, please try check your email or reset password again!",
        );
      }
    }
  }, [validTokenData, isSuccessValidToken, isErrorValidToken]);

  const onSubmit = async (credentials) => {
    try {
      await resetPasswordApi(credentials);
      setStatus("Reset successfully!");
      navigate("/login", {
        state: {
          message: "Create new password successfully, please login again.",
        },
      });
    } catch (error) {
      toast.error("Error to register, please try again");
      console.log(error);
    }
  };

  // Debounced input
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
        <div className="mb-2 min-h-[80vh] text-center">
          <h1 className="mb-8 text-2xl font-semibold">Reset your password</h1>
          <div className="mb-8 text-sm text-blue-400 italic">{status}</div>
          {isLoadingValidToken && (
            <div className="flex flex-col items-center justify-center gap-4">
              <span>Checking your information...</span>
              <Spinner />
            </div>
          )}
          {isSuccessValidToken && isValidToken && (
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Token */}
                <div className="text-left">
                  <input
                    type="text"
                    hidden
                    {...register("token")}
                    defaultValue={token}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
                  />
                  {errors.token && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.token.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="text-left">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    onChange={(e) => emailChange(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors"
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
                      placeholder="Enter Password"
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
                      placeholder="Confirm your password"
                      {...register("password_confirmation")}
                      onChange={(e) =>
                        passwordConfirmationChange(e.target.value)
                      }
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
                  disabled={isLoading || isSuccess}
                >
                  Reset password
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>

              <div className="mt-2">
                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                >
                  <span className="cursor-pointer font-medium">
                    Back to login
                  </span>
                </button>
              </div>
            </div>
          )}
          {isSuccessValidToken && !isValidToken && (
            <div>
              <div className="mt-2">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full cursor-pointer rounded-2xl bg-black py-3 text-sm text-white hover:text-gray-300"
                >
                  <span className="cursor-pointer font-medium">
                    Back to login
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
