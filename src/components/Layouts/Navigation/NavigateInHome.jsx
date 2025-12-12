import { Button } from "@/components/Common/ui/button";
import { NavLink, useLocation } from "react-router-dom";

export default function NavigateInHome() {
  const location = useLocation();

  const isForYouActive = location.pathname === "/for_you";
  const isFollowingActive = location.pathname === "/following";

  return (
    <div className="flex items-center justify-center md:hidden">
      <Button
        asChild
        variant="ghost"
        className={`h-12 w-68 flex-1 cursor-pointer rounded-t-none rounded-b-none border-b-2 transition-all ${
          isForYouActive
            ? "border-black text-black"
            : "border-transparent text-[#b8b8b8]"
        }`}
      >
        <NavLink to="/for_you">For you</NavLink>
      </Button>

      <Button
        asChild
        variant="ghost"
        className={`h-12 w-68 flex-1 cursor-pointer rounded-t-none rounded-b-none border-b-2 transition-all ${
          isFollowingActive
            ? "border-black text-black"
            : "border-transparent text-[#b8b8b8]"
        }`}
      >
        <NavLink to="/following">Following</NavLink>
      </Button>
    </div>
  );
}
