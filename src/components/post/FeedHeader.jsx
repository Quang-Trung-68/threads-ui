import { Button } from "@/components/Common/ui/button";
import { PATHS } from "@/configs/paths";
import { NavLink } from "react-router";

export default function FeedHeader() {

  return (
    <div className="flex items-center justify-center gap-1 bg-background p-2 text-center text-lg font-bold">
      <NavLink
        to={PATHS.HOME}
        className={({ isActive }) => "flex-1 md:flex-none"}
      >
        {({ isActive }) => (
          <Button
            variant={"ghost"}
            className={`h-auto w-full cursor-pointer rounded-none bg-transparent px-4 py-3 text-[15px] font-bold transition-all hover:bg-transparent md:w-auto ${
              isActive
                ? "border-b-2 border-foreground text-foreground md:border-0"
                : "text-muted-foreground/60 hover:text-foreground"
            }`}
          >
            For you
          </Button>
        )}
      </NavLink>
      <NavLink
        to={PATHS.FOLLOWING}
        className={({ isActive }) => "flex-1 md:flex-none"}
      >
        {({ isActive }) => (
          <Button
            variant={"ghost"}
            className={`h-auto w-full cursor-pointer rounded-none bg-transparent px-4 py-3 text-[15px] font-bold transition-all hover:bg-transparent md:w-auto ${
              isActive
                ? "border-b-2 border-foreground text-foreground md:border-0"
                : "text-muted-foreground/60 hover:text-foreground"
            }`}
          >
            Following
          </Button>
        )}
      </NavLink>
      <NavLink
        to={PATHS.GHOST_POSTS}
        className={({ isActive }) => "hidden md:block"}
      >
        {({ isActive }) => (
          <Button
            variant={"ghost"}
            className={`h-auto cursor-pointer bg-transparent px-4 py-3 text-[15px] font-bold hover:bg-transparent ${
              isActive ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
            }`}
          >
            Ghost posts
          </Button>
        )}
      </NavLink>
    </div>
  );
}
