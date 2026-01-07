import { Outlet, useLocation } from "react-router-dom";
import Navigation from "@/components/Layouts/Navigation";
import LoginActonCard from "@/components/Common/Modals/LoginActonCard";
import useAuth from "@/hooks/useAuth";
import AddPostButton from "@/components/Common/AddPostButton";
import Header from "@/components/Layouts/Header";

// This layout renders a specific Base Page (passed via props) permanently
// and renders an Outlet for overlays on top.
export default function HomeLayout({ baseComponent: BaseComponent }) {
    const { user, isLoading } = useAuth();

    return (
        <div className="relative flex min-h-screen justify-center">
            {/* Mobile Header */}
            <div className="md:hidden">
                <Header />
            </div>

            <div className="flex w-full justify-center gap-3 pt-14 md:pt-0">
                <div className="z-10 w-full max-w-160 min-w-0">
                    {/* Base Component is ALWAYS rendered */}
                    {BaseComponent && <BaseComponent />}
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

            {user && <AddPostButton />}

            {/* Overlay Outlet - PostDetailOverlay/UserProfileOverlay will render here */}
            <Outlet />
        </div>
    );
}
