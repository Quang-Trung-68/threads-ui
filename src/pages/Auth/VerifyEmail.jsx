import { Spinner } from "@/components/Common/ui/spinner";
import { useVerifyEmailMutation } from "@/services/auth";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { toast } from "react-toastify";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("Verifying your email, please wait...");
  const [verifyEmailApi, { isError, isLoading }] = useVerifyEmailMutation();

  const onVerifyEmail = useCallback(
    async function onVerifyEmail() {
      try {
        const response = await verifyEmailApi({ token });
        console.log(response);
        console.log({ token });
        toast.success("Verify your email successfully!");
        setStatus("Verify your email successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Error to verify email, please try again.");
        setStatus("Error to verify email, please try again.");
      }
    },
    [token, verifyEmailApi],
  );

  useEffect(() => {
    try {
      onVerifyEmail();
    } catch (error) {
      console.log(error);
    }
  }, [onVerifyEmail]);

  return (
    <div className="mb-8 flex flex-col items-center justify-between text-center">
      <h1 className="mb-8 text-2xl font-semibold">{status}</h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-sm text-gray-500">Next step</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate("/")}
              className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"} rounded-2xl bg-black px-6 py-4 text-sm text-white hover:text-gray-300`}
              disabled={isLoading}
            >
              Go to threads now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
