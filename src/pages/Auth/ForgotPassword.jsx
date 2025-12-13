import { useForgotPasswordMutation } from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { useDebouncedField } from "@/hooks/useDebouncedField";
import forgotPasswordSchema from "@/schemas/forgotPasswordSchema";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [forgotPasswordApi, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (credentials) => {
    try {
      const response = await forgotPasswordApi(credentials);
      console.log(response);
      //   navigate("/");
      toast.success("Send a email successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error to send a verified email, please try again");
    }
  };

  // Debounced input
  const emailChange = useDebouncedField(setValue, "email", 800);

  return (
    <div className="mb-8 text-center">
      <h1 className="mb-8 text-2xl font-semibold">Login to your account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Login */}
        <div className="text-left">
          <input
            type="text"
            placeholder="Email..."
            defaultValue={"dt1234@gmail.com"}
            {...register("email")}
            onChange={(e) => emailChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
          />
          {errors.login && (
            <span className="mt-1 block text-sm text-red-500">
              {errors.login.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-black py-3 text-white hover:bg-gray-800"
          disabled={isLoading}
        >
          Send a verified email
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
