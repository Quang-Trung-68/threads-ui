import { Outlet } from "react-router-dom";
import AuthMenu from "@/components/Features/auth/AuthMenu";
import { Menu } from "lucide-react";
import authBg from "@/assets/threads-auth-bg.png";
import QRCode from "react-qr-code";



export default function AuthLayout() {
  return (
    <div className="bg-background text-foreground relative flex min-h-screen items-center justify-center overflow-hidden p-4 transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute top-0 left-0 flex w-full justify-center overflow-hidden">
        <img
          src={authBg}
          alt="Threads Auth Background"
          className="w-[120%] max-w-none -translate-y-[30%] object-cover opacity-100 dark:opacity-80"
        />
      </div>

      {/* Appearance Toggle Button */}
      <div className="absolute bottom-4 left-4 z-50 lg:bottom-8 lg:left-8">
        <AuthMenu>
          <button className="border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border shadow-sm transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </AuthMenu>
      </div>

      {/* Main Content Wrapper */}
      <div className="z-10 flex min-h-[90vh] w-full max-w-md flex-col justify-between">
        <div className="mt-24">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="text-muted-foreground space-x-3 text-center text-xs">
          <span>© 2026</span>
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
      <div className="fixed right-10 bottom-10 hidden cursor-pointer duration-300 hover:scale-110 lg:block">
        <div className="text-muted-foreground mb-2 text-center text-sm font-semibold">
          Scan to get the app
        </div>
        <div className="border-border origin-bottom-right overflow-hidden rounded-xl border-2 bg-white p-4 shadow-lg transition-transform">
          <QRCode
            value="https://threads.net"
            size={150}
            bgColor="#FFFFFF"
            fgColor="#000000"
            className="h-auto w-auto max-w-[150px]"
            viewBox={`0 0 150 150`}
          />
        </div>
      </div>
    </div>
  );
}
