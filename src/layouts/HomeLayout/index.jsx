import { Outlet } from "react-router";
import Header from "@components/Layouts/Header";
import Navigation from "@/components/Layouts/Navigation";

export default function HomeLayout() {
  return (
    <div className="relative flex items-start justify-center md:mx-24">
      <Header />

      <div className="mt-14 w-full md:top-4 md:rounded-3xl md:[-ms-overflow-style:none] md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Outlet />
      </div>

      <Navigation />
    </div>
  );
}
