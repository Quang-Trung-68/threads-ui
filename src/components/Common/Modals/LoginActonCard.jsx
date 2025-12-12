import { Instagram } from "lucide-react";
import { useNavigate } from "react-router";

export default function LoginActonCard() {
  const navigate = useNavigate();
  const handleUserLogin = () => {
    navigate("/login");
  };

  const handleLoginInstagram = () => {
    return;
  };

  return (
    <div className="flex w-85 items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-[#f5f5f5] px-6 py-8 shadow-sm">
        {/* Title */}
        <h1 className="mb-3 text-center text-xl font-bold text-gray-900">
          Log in or sign up for Threads
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-center text-gray-500">
          See what people are talking about and join the conversation.
        </p>

        {/* Instagram Login Button */}
        <button
          onClick={handleLoginInstagram}
          className="mb-4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-gray-300 bg-white px-6 py-4 transition-colors hover:bg-gray-50"
        >
          <Instagram className="h-6 w-6" strokeWidth={2} />
          <div className="flex flex-col items-start">
            <span className="text-gray-600">Continue with Instagram</span>
            <span className="font-semibold text-gray-900">dqt_2309</span>
          </div>
        </button>

        {/* Alternative Login Link */}
        <button
          onClick={handleUserLogin}
          className="w-full cursor-pointer py-3 text-center text-gray-500 transition-colors hover:text-gray-700"
        >
          Log in with username instead
        </button>
      </div>
    </div>
  );
}
