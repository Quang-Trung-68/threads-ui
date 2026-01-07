import UserAvatar from "@/components/Common/ui/UserAvatar";
import { Button } from "@/components/Common/ui/button";
import { Spinner } from "@/components/Common/ui/spinner";
import {
    Instagram,
    SquareKanban,
    UserPlus,
    Camera,
    PenLine,
    CircleArrowLeft,
} from "lucide-react"; // Added icons
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import { Input } from "@/components/Common/ui/input";
import { useTranslation } from "react-i18next";
import { useFollowUserMutation } from "@/services/authService";
import { notifySooner } from "@/utils/notifySooner";
import { useTitle } from "react-use";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PATHS } from "@/configs/paths";
import { Tooltip } from "@/components/Common/Tooltip";
import MotionButton from "@/components/Common/MotionButon";
import PostCard from "@/components/post/PostCard";

export default function UserProfileOverlay({
    onNavigate,
    state,
}) {
    const { t } = useTranslation(["user", "common", "post", "tooltip"]);
    useScrollToTop();
    const location = useLocation();
    const navigate = useNavigate();

    const params = useParams();

    // Get username from URL (expected format: @username)
    // Since we are using route /:username, params.username will be the username (e.g. @dqt or dqt)
    // Let's assume it might or might not have @
    const paramUsername = params.username || state?.username;

    const { user: currentUser } = useAuth(); // Get current authenticated user

    const [followUserApi] =
        useFollowUserMutation();

    const activeTab = location.hash.slice(1) || "threads";

    const handleNavigation = (tab) => {
        navigate(`#${tab}`);
    };

    // Logic to determine if we are viewing the current user's profile
    const targetUsername = paramUsername?.startsWith("@")
        ? paramUsername.slice(1)
        : paramUsername;
    const isAuth = currentUser?.username === targetUsername;

    const userId = isAuth ? currentUser.id : location.state?.userId;

    const handleFollowUser = async () => {
        try {
            const createPromise = followUserApi({ id: userId });

            notifySooner.promise(createPromise, {
                loading: "Loading...",
                success: "Followed!",
                error: "Errored to fetch...",
            });

            await createPromise;
        } catch (error) {
            console.error("Follow user failed:", error);
        }
    };

    // State
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mock data for "Other User" to ensure page works
    const MOCK_OTHER_USER = {
        name: "name",
        username: targetUsername || "trungdang",
        bio: "trungdang", // From image
        avatar: "", // Empty for now, fallback will show
        followers: 6,
    };

    // Title
    useTitle(t("common:userProfileTitle", { username: targetUsername }));

    useEffect(() => {
        // Simulate data loading or setting
        setLoading(true);

        if (isAuth && currentUser) {
            // Use current user data
            setUserData(currentUser);
            setPosts([]); // clear posts for now
        } else {
            // Use mock/fallback data for other user
            setUserData(MOCK_OTHER_USER);
            setPosts([]);
        }
        setLoading(false);
    }, [isAuth, currentUser, targetUsername]);

    // Prevent body scroll when overlay is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (

        <div className="bg-background fixed inset-0 z-40 flex min-h-screen w-full flex-col overflow-y-auto">
            <div className="mx-auto flex w-full max-w-160 flex-col">
                {/* Sticky Header + Card Top Cap */}
                {/* The entire block is sticky to create the 'Fixed Frame' effect while keeping native scroll */}
                {/* Sticky Header Container */}
                <div className="bg-background sticky top-0 z-50">
                    {/* 1. Header Title Bar */}
                    <div className="flex items-center justify-between px-2 py-2 text-lg font-bold">
                        <MotionButton>
                            <Tooltip label={t("tooltip:back")}>
                                <div className="flex w-10 justify-center">
                                    <CircleArrowLeft
                                        className="cursor-pointer hover:scale-110"
                                        onPointerDown={(e) => e.stopPropagation()}
                                        onClick={handleBack}
                                        strokeWidth={1}
                                    />
                                </div>
                            </Tooltip>
                        </MotionButton>
                        <span className="text-foreground flex items-center justify-center px-4 py-3 text-[15px] font-bold">
                            {t("common:profile")}
                        </span>
                        <div className="w-10 px-4 py-3"></div>
                    </div>

                    {/* Visible Border connecting the masks */}
                    <div className="bg-border absolute right-5 -bottom-px left-5 z-10 h-0.5" />

                    {/* Hanging Masks to create "Rounded Top" effect over scrolling content */}
                    <div className="pointer-events-none absolute top-full left-0 h-6 w-6">
                        <div
                            className="h-full w-full"
                            style={{
                                background:
                                    "radial-gradient(circle at bottom right, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), var(--background) calc(70% + 1px))",
                            }}
                        />
                    </div>
                    <div className="absolute top-full right-6 left-6 h-1 bg-transparent" />
                    <div className="pointer-events-none absolute top-full right-0 h-6 w-6">
                        <div
                            className="h-full w-full"
                            style={{
                                background:
                                    "radial-gradient(circle at bottom left, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), var(--background) calc(70% + 1px))",
                            }}
                        />
                    </div>
                </div>

                {/* Main Content - Flows naturally with window scroll */}
                <div className="bg-background relative z-0 flex min-h-screen w-full flex-col">
                    {/* Left Border Line */}
                    <div className="bg-border absolute top-0 bottom-0 left-0 z-10 w-px" />
                    {/* Right Border Line */}
                    <div className="bg-border absolute top-0 right-0 bottom-0 z-10 w-px" />

                    {loading ? (
                        <div className="flex min-h-[50vh] flex-1 items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 p-5">
                            {/* Header Section */}
                            <div className={"flex flex-row items-center justify-between"}>
                                <div>
                                    <div className="text-3xl leading-tight font-bold">
                                        {userData?.name || "User Name"}
                                    </div>
                                    <div className="text-foreground text-base font-normal">
                                        {userData?.username || "username"}
                                    </div>
                                </div>
                                <div>
                                    <UserAvatar
                                        user={{
                                            username: userData?.username,
                                            avatar_url: userData?.avatar_url || userData?.avatar,
                                        }}
                                        className="size-20"
                                    />
                                </div>
                            </div>

                            {/* Bio / Link / Followers */}
                            <div className="flex flex-col gap-3">
                                {/* If Other User, show bio/link if available (from image logic) */}
                                {!isAuth && userData?.bio && (
                                    <div className="flex flex-row items-center gap-1">
                                        {/* Placeholder for bio icon or text if needed, relying on text for now */}
                                        {/* <span className="text-green-500">🌱</span>Icon from image */}
                                    </div>
                                )}

                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        {userData?.followers ? (
                                            <span>{userData.followers} followers</span>
                                        ) : (
                                            <span>{t("common:noFollowersYet")}</span>
                                        )}
                                        {/* If there is a link */}
                                        {/* {userData?.link && <span>{userData.link}</span>} */}
                                    </div>

                                    {/* Social Icons - Shown for both? Images show them for "My Profile", "Other User" shows specific icons too */}
                                    <div className="text-foreground flex gap-4">
                                        <Instagram className="size-6 cursor-pointer" />
                                        <SquareKanban className="size-6 cursor-pointer" />{" "}
                                        {/* Just using existing icons */}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-stretch gap-3">
                                {isAuth ? (
                                    // My Profile View
                                    <Button
                                        variant="outline"
                                        className="border-border text-foreground hover:bg-accent w-full cursor-pointer rounded-xl border py-2 text-[15px]"
                                        onClick={() => navigate(PATHS.USER_SETTINGS)}
                                    >
                                        {t("user:editProfile")}
                                    </Button>
                                ) : (
                                    // Other User View
                                    <>
                                        <Button
                                            onClick={handleFollowUser}
                                            className="bg-foreground text-background hover:bg-foreground/90 flex-1 cursor-pointer rounded-xl py-2 text-[15px]"
                                        >
                                            {t("common:follow")}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-border text-foreground hover:bg-accent flex-1 cursor-pointer rounded-xl border py-2 text-[15px]"
                                        >
                                            {t("common:mention")}
                                        </Button>
                                    </>
                                )}
                            </div>

                            {/* #hash tab */}
                            <div className="flex items-center justify-between pt-2">
                                <Button
                                    onClick={() => handleNavigation("threads")}
                                    className={`border-foreground flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "threads" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                                >
                                    {t("user:threads")}
                                </Button>
                                <Button
                                    className={`border-foreground flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "replies" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                                    onClick={() => handleNavigation("replies")}
                                >
                                    {t("user:replies")}
                                </Button>
                                <Button
                                    className={`border-foreground flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "media" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                                    onClick={() => handleNavigation("media")}
                                >
                                    {t("user:media")}
                                </Button>
                                <Button
                                    className={`border-foreground flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "reposts" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                                    onClick={() => handleNavigation("reposts")}
                                >
                                    {t("user:reposts")}
                                </Button>
                            </div>

                            <div>
                                {isAuth && (
                                    <>
                                        {/* Create Post Section */}
                                        <div className="flex items-center justify-between py-2 pl-1">
                                            <div className="flex flex-1 items-center gap-3">
                                                <UserAvatar
                                                    user={{
                                                        username: userData?.username,
                                                        avatar_url:
                                                            userData?.avatar_url || userData?.avatar,
                                                    }}
                                                    className="size-9"
                                                />
                                                <div
                                                    onClick={() => CreatePostModal.open()}
                                                    className="flex-1 cursor-pointer"
                                                >
                                                    <Input
                                                        type={"text"}
                                                        className={
                                                            "border-0 p-0.5 text-gray-500 shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                                                        }
                                                        placeholder={t("common:whatsNew")}
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => CreatePostModal.open()}
                                                variant="outline"
                                                className="border-border text-foreground hover:bg-accent cursor-pointer rounded-xl border px-5 font-bold"
                                            >
                                                {t("common:post")}
                                            </Button>
                                        </div>

                                        {/* Finish your profile Section */}
                                        <div className="mt-2 flex flex-col gap-2 border-t-2 border-gray-200 py-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="px-1 text-base font-semibold text-gray-900">
                                                    {t("user:finishProfile")}
                                                </h3>
                                                <span className="text-sm text-gray-400">
                                                    3 {t("user:left")}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 overflow-x-auto pb-2">
                                                {/* Card 1 */}
                                                <div className="border-border bg-muted flex min-w-[150px] flex-col items-center justify-between gap-3 rounded-2xl border p-4">
                                                    <div className="border-border bg-background rounded-full border p-3 shadow-sm">
                                                        <UserPlus className="text-foreground size-6" />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1 text-center">
                                                        <span className="text-sm font-bold">
                                                            Follow 10 profiles
                                                        </span>
                                                        <span className="text-muted-foreground text-xs leading-tight">
                                                            Fill your feed with threads that interest you.
                                                        </span>
                                                    </div>
                                                    <Button className="bg-foreground text-background h-8 w-full rounded-xl text-sm font-bold">
                                                        See profiles
                                                    </Button>
                                                </div>

                                                {/* Card 2 */}
                                                <div className="border-border bg-muted flex min-w-[150px] flex-col items-center justify-between gap-3 rounded-2xl border p-4">
                                                    <div className="border-border bg-background rounded-full border p-3 shadow-sm">
                                                        <Camera className="text-foreground size-6" />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1 text-center">
                                                        <span className="text-sm font-bold">
                                                            Add profile photo
                                                        </span>
                                                        <span className="text-muted-foreground text-xs leading-tight">
                                                            Make it easier for people to recognize you.
                                                        </span>
                                                    </div>
                                                    <Button className="bg-foreground text-background h-8 w-full rounded-xl text-sm font-bold">
                                                        Add
                                                    </Button>
                                                </div>

                                                {/* Card 3 */}
                                                <div className="border-border bg-muted flex min-w-[150px] flex-col items-center justify-between gap-3 rounded-2xl border p-4">
                                                    <div className="border-border bg-background rounded-full border p-3 shadow-sm">
                                                        <PenLine className="text-foreground size-6" />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1 text-center">
                                                        <span className="text-sm font-bold">Add bio</span>
                                                        <span className="text-muted-foreground text-xs leading-tight">
                                                            Introduce yourself and tell people what you're
                                                            into.
                                                        </span>
                                                    </div>
                                                    <Button className="bg-foreground text-background h-8 w-full rounded-xl text-sm font-bold">
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/* Render posts based on active tab */}
                                {activeTab === "threads" && (
                                    <div className="pt-2">
                                        {loading ? (
                                            <div className="flex h-dvh w-dvw items-center justify-center">
                                                <Spinner />
                                            </div>
                                        ) : (
                                            <div className="flex w-full flex-col gap-4">
                                                {/* Show empty state or ghost posts implementation if available */}
                                                {(!posts || posts.length === 0) && (
                                                    <div className="flex items-center justify-center p-8 text-gray-500">
                                                        {t("post:noThreadsYet")}
                                                    </div>
                                                )}
                                                {posts.map((post) => (
                                                    <PostCard
                                                        key={post.id}
                                                        isPermitDetailPost={true}
                                                        {...post}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {activeTab === "replies" && (
                                    <div className="pt-2">
                                        {loading ? (
                                            <div className="flex h-dvh w-dvw items-center justify-center">
                                                <Spinner />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center p-8 text-sm text-gray-500">
                                                {t("post:noRepliesYet")}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {activeTab === "media" && (
                                    <div className="pt-2">
                                        {loading ? (
                                            <div className="flex h-dvh w-dvw items-center justify-center">
                                                <Spinner />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center p-8 text-sm text-gray-500">
                                                {t("post:noMediaYet")}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {activeTab === "reposts" && (
                                    <div className="pt-2">
                                        {loading ? (
                                            <div className="flex h-dvh w-dvw items-center justify-center">
                                                <Spinner />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center p-8 text-sm text-gray-500">
                                                {t("post:noRepostsYet")}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
