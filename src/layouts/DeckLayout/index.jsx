import { Outlet } from "react-router";
import Navigation from "@/components/Layouts/Navigation";

export default function DeckLayout() {
  return (
    <div className="relative flex items-start justify-center px-10 md:ml-14">
      <div className="z-10 w-full md:top-4 md:rounded-3xl md:[-ms-overflow-style:none] md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Outlet />
      </div>

      <div>
        <Navigation />
      </div>
    </div>
  );
}
