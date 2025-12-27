import { Outlet } from "react-router";
import Header from "@components/Layouts/Header";
import Navigation from "@/components/Layouts/Navigation";

export default function DeckLayout() {
  return (
    <div className="relative flex items-start justify-center px-10 md:ml-14">
      {/* <Header /> */}

      <div className="w-full md:top-4 md:rounded-3xl md:[-ms-overflow-style:none] md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Outlet />
      </div>

      <Navigation />
    </div>
  );
}
