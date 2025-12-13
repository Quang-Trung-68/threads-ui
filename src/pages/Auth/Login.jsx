import { loginSchema } from "@/schemas";
import { useLoginMutation } from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

import { useDebouncedField } from "@/hooks/useDebouncedField";

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { state } = useLocation();

  useEffect(() => {
    if (state?.message) toast.success(state.message);
  }, [state]);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginApi, { isError, isLoading }] = useLoginMutation();

  const onSubmit = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      // save response data
      Cookies.set("access_token", response.data.access_token);
      Cookies.set("refresh_token", response.data.refresh_token);
      navigate("/");
      toast.success("Login successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error to login, please try again");
    }
  };

  const onForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  // Debounced input
  const loginChange = useDebouncedField(setValue, "login", 800);
  const passwordChange = useDebouncedField(setValue, "password", 800);

  return (
    <div className="mb-8 text-center">
      <h1 className="mb-8 text-2xl font-semibold">Login to your account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Login */}
        <div className="text-left">
          <input
            type="text"
            placeholder="Email"
            defaultValue={"dt1234@gmail.com"}
            {...register("login")}
            onChange={(e) => loginChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
          />
          {errors.login && (
            <span className="mt-1 block text-sm text-red-500">
              {errors.login.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="text-left">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              onChange={(e) => passwordChange(e.target.value)}
              defaultValue={"12345678"}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
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

        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-black py-3 text-white hover:bg-gray-800"
          disabled={isLoading}
        >
          Log in
        </button>

        <button
          onClick={onForgotPassword}
          className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
        >
          Forgot password?
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      {/* Instagram login */}
      <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 via-pink-500 to-orange-500">
            <svg className="h-4 w-4 text-white" fill="currentColor"></svg>
          </div>
          <div>
            <div className="text-sm font-medium">Continue with Instagram</div>
            <div className="text-sm text-gray-600">dqt_2309</div>
          </div>
        </div>
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="mt-6">
        <button
          onClick={() => navigate("/register")}
          className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
        >
          Don't have an account?{" "}
          <span className="cursor-pointer font-medium">Sign up</span>
        </button>
      </div>
    </div>
  );
}
