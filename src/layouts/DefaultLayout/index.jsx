import { Outlet } from "react-router";
import Navigation from "@/components/Layouts/Navigation";
import LoginActonCard from "@/components/Common/Modals/LoginActonCard";

export default function DefaultLayout() {
  return (
    <div className="relative flex justify-center min-h-screen">
      <div className="flex w-full justify-center gap-3">
        <div className="w-full max-w-160 min-w-0">
          <Outlet />
        </div>
        <div className="hidden lg:block w-85 h-fit sticky top-15">
          <LoginActonCard />
        </div>
      </div>
      <div>
        <Navigation />
      </div>
    </div>
  );
}
