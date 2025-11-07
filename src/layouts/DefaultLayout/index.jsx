import { Outlet } from "react-router";
import Header from "@components/Header";
import Navigation from "@/components/Navigation";

export default function DefaultLayout() {
  return (
    <div className="relative flex items-start justify-center md:mr-24 md:ml-24">
      <Header />

      <div className="mt-14 max-w-175 min-w-dvw md:sticky md:top-4 md:h-auto md:max-w-160 md:min-w-136 md:overflow-y-auto md:rounded-3xl md:border md:[-ms-overflow-style:none] md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Outlet />
      </div>

      <Navigation />
    </div>
  );
}
