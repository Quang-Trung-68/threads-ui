import { Outlet } from "react-router-dom";
import AuthMenu from "@/components/Features/auth/AuthMenu";
import { Menu } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4 text-foreground transition-colors duration-300">
      {/* Appearance Toggle Button */}
      <div className="absolute bottom-4 left-4 z-50 lg:bottom-8 lg:left-8">
        <AuthMenu>
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
            <Menu className="h-5 w-5" />
          </button>
        </AuthMenu>
      </div>

      {/* Decorative Threads logos */}
      <div className="absolute top-8 left-8 flex h-32 w-32 -rotate-12 transform items-center justify-center rounded-full border-8 border-foreground/10 opacity-50 dark:border-foreground/20">
        <span className="rotate-12 transform text-xs font-bold tracking-wider text-muted-foreground">
          THREADS
        </span>
      </div>

      <div className="absolute top-4 right-8 flex h-40 w-40 rotate-12 transform items-center justify-center rounded-full border-8 border-foreground/10 opacity-50 dark:border-foreground/20">
        <span className="-rotate-12 transform text-xs font-bold tracking-wider text-muted-foreground">
          THREADS
        </span>
      </div>

      <div className="absolute bottom-8 left-12 flex h-36 w-36 rotate-45 transform items-center justify-center rounded-full border-8 border-foreground/10 opacity-50 dark:border-foreground/20">
        <span className="-rotate-45 transform text-xs font-bold tracking-wider text-muted-foreground">
          THREADS
        </span>
      </div>

      {/* Main Content Wrapper */}
      <div className="z-10 flex min-h-[90vh] w-full max-w-md flex-col justify-between">
        <div>
          <Outlet />
        </div>

        {/* Footer */}
        <div className="space-x-3 text-center text-xs text-muted-foreground">
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
        <div className="mb-2 text-sm text-muted-foreground">
          Scan to get the app
        </div>
        <div className="group h-32 w-32 border-2 border-border bg-card p-2 transition-colors">
          <div className="flex h-full w-full items-center justify-center bg-foreground">
            <div className="grid grid-cols-8 gap-0.5 p-2">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 ${
                    Math.random() > 0.5 ? "bg-background" : "bg-foreground"
                  } transition-colors duration-150`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
