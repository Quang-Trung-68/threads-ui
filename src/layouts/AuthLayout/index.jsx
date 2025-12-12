// AuthLayout.jsx
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-4">
      {/* Decorative Threads logos */}
      <div className="absolute top-8 left-8 flex h-32 w-32 -rotate-12 transform items-center justify-center rounded-full border-8 border-black">
        <span className="rotate-12 transform text-xs font-bold tracking-wider">
          THREADS
        </span>
      </div>

      <div className="absolute top-4 right-8 flex h-40 w-40 rotate-12 transform items-center justify-center rounded-full border-8 border-black">
        <span className="-rotate-12 transform text-xs font-bold tracking-wider">
          THREADS
        </span>
      </div>

      <div className="absolute bottom-8 left-12 flex h-36 w-36 rotate-45 transform items-center justify-center rounded-full border-8 border-black">
        <span className="-rotate-45 transform text-xs font-bold tracking-wider">
          THREADS
        </span>
      </div>

      {/* Main Content Wrapper */}
      <div className="z-10 flex min-h-[90vh] w-full max-w-md flex-col justify-between">
        <div>
          <Outlet />
        </div>

        {/* Footer moved here */}
        <div className="space-x-3 text-center text-xs text-gray-500">
          <span>© 2025</span>
          <a href="#" className="hover:underline">
            Threads Terms
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookies Policy
          </a>
          <a href="#" className="hover:underline">
            Report a problem
          </a>
        </div>
      </div>

      {/* QR Code section */}
      <div className="absolute right-8 bottom-8 hidden text-center lg:block">
        <div className="mb-2 text-sm text-gray-600">Scan to get the app</div>
        <div className="h-32 w-32 border-2 border-black bg-white p-2">
          <div className="flex h-full w-full items-center justify-center bg-black">
            <div className="grid grid-cols-8 gap-0.5 p-2">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 ${
                    Math.random() > 0.5 ? "bg-white" : "bg-black"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
