import { Outlet } from "react-router";
import Navigation from "@/components/Layouts/Navigation";
import LoginActonCard from "@/components/Common/Modals/LoginActonCard";
import useAuth from "@/hooks/useAuth";

export default function DefaultLayout() {
  const { user, isLoading } = useAuth();

  return (
    <div className="relative flex min-h-screen justify-center">
      <div className="flex w-full justify-center gap-3">
        <div className="w-full max-w-160 min-w-0">
          <Outlet />
        </div>
        {!user && !isLoading && (
          <div className="sticky top-15 hidden h-fit w-85 lg:block">
            <LoginActonCard />
          </div>
        )}
      </div>
      {/* Navigation */}
      <div>
        <Navigation />
      </div>
    </div>
  );
}
