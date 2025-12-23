import UserAvatar from "@/components/Common/ui/UserAvatar";
import { Button } from "@/components/Common/ui/button";
import { Spinner } from "@/components/Common/ui/spinner";
import {
  Instagram,
  SquareKanban,
  UserPlus,
  Camera,
  PenLine,
} from "lucide-react"; // Added icons
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import { Input } from "@/components/Common/ui/input";

export default function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username: paramUsername } = useParams(); // Get username from URL (expected format: @username)
  const { user: currentUser } = useAuth(); // Get current authenticated user

  const activeTab = location.hash.slice(1) || "threads";

  const handleNavigation = (tab) => {
    navigate(`#${tab}`);
  };

  // Logic to determine if we are viewing the current user's profile
  // Assumes paramUsername starts with '@' e.g. "@dqt_2309"
  // and currentUser.username is "dqt_2309"
  // Handle case where param might not have @ if user typed it manually
  const targetUsername = paramUsername?.startsWith("@")
    ? paramUsername.slice(1)
    : paramUsername;
  const isAuth = currentUser?.username === targetUsername;

  const userId = isAuth ? currentUser.id : location.state?.userId;

  // State
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for "Other User" to ensure page works
  const MOCK_OTHER_USER = {
    name: "Nhu Quynh",
    username: targetUsername || "yoo.glass",
    bio: "yoo.glass", // From image
    avatar: "", // Empty for now, fallback will show
    followers: 6,
    link: "yoo.glass",
  };

  useEffect(() => {
    // Simulate data loading or setting
    setLoading(true);

    if (isAuth && currentUser) {
      // Use current user data
      setUserData(currentUser);
      // setPosts(currentUser.posts || []); // If posts exist in user object
      setPosts([]); // clear posts for now as we removed jsonplaceholder
    } else {
      // Use mock/fallback data for other user
      setUserData(MOCK_OTHER_USER);
      setPosts([]);
    }
    setLoading(false);
  }, [isAuth, currentUser, targetUsername]);

  if (loading) {
    return (
      <div className="flex h-dvh w-dvw items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col bg-background">
        <div className="flex w-full flex-col">
          {/* Sticky Header + Card Top Cap */}
          {/* The entire block is sticky to create the 'Fixed Frame' effect while keeping native scroll */}
          {/* Sticky Header Container */}
          <div className="sticky top-0 z-50 bg-background">
            {/* 1. Header Title Bar */}
            <div className="flex items-center justify-between p-4 text-lg font-bold">
              <div className="w-10"></div>
              <span className="text-[15px] font-bold text-foreground">Profile</span>
              <div className="flex w-10 justify-end">
                <div className="flex bg-transparent hover:bg-transparent">
                  <div className="cursor-pointer rounded-full bg-transparent p-2 transition-all hover:bg-muted">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-foreground pb-2 text-xl font-bold tracking-widest text-foreground">
                      ...
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="relative z-0 flex min-h-screen w-full flex-col bg-background">
            {/* Left Border Line */}
            <div className="bg-border absolute top-0 bottom-0 left-0 z-10 w-px" />
            {/* Right Border Line */}
            <div className="bg-border absolute top-0 right-0 bottom-0 z-10 w-px" />
            <div className="flex flex-col gap-4 p-5">
              {/* Header Section */}
              <div className={"flex flex-row items-center justify-between"}>
                <div>
                  <div className="text-3xl leading-tight font-bold">
                    {userData?.name || "User Name"}
                  </div>
                  <div className="text-base font-normal text-foreground">
                    {userData?.username || "username"}
                  </div>
                </div>
                <div>
                  <UserAvatar 
                    user={{ 
                      username: userData?.username, 
                      avatar_url: userData?.avatar_url || userData?.avatar 
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
                      <span>No followers yet</span>
                    )}
                    {/* If there is a link */}
                    {/* {userData?.link && <span>{userData.link}</span>} */}
                  </div>

                  {/* Social Icons - Shown for both? Images show them for "My Profile", "Other User" shows specific icons too */}
                  <div className="flex gap-4 text-foreground">
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
                    className="w-full cursor-pointer rounded-xl border border-border py-2 text-[15px] text-foreground hover:bg-accent"
                  >
                    Edit profile
                  </Button>
                ) : (
                  // Other User View
                  <>
                    <Button className="flex-1 cursor-pointer rounded-xl bg-foreground py-2 text-[15px] text-background hover:bg-foreground/90">
                      Follow
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 cursor-pointer rounded-xl border border-border py-2 text-[15px] text-foreground hover:bg-accent"
                    >
                      Mention
                    </Button>
                  </>
                )}
              </div>

              {/* #hash tab */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  onClick={() => handleNavigation("threads")}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-foreground bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "threads" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                >
                  Threads
                </Button>
                <Button
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-foreground bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "replies" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                  onClick={() => handleNavigation("replies")}
                >
                  Replies
                </Button>
                <Button
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-foreground bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "media" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                  onClick={() => handleNavigation("media")}
                >
                  Media
                </Button>
                <Button
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-foreground bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "reposts" ? "border-foreground text-foreground" : "border-b-muted text-muted-foreground"}`}
                  onClick={() => handleNavigation("reposts")}
                >
                  Reposts
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
                            avatar_url: userData?.avatar_url || userData?.avatar 
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
                            placeholder={`What's new?`}
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => CreatePostModal.open()}
                        variant="outline"
                        className="cursor-pointer rounded-xl border border-border px-5 font-bold text-foreground hover:bg-accent"
                      >
                        Post
                      </Button>
                    </div>

                    {/* Finish your profile Section */}
                    <div className="mt-2 flex flex-col gap-2 border-t-2 border-gray-200 py-4">
                      <div className="flex items-center justify-between">
                        <h3 className="px-1 text-base font-semibold text-gray-900">
                          Finish your profile
                        </h3>
                        <span className="text-sm text-gray-400">3 left</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 overflow-x-auto pb-2">
                        {/* Card 1 */}
                        <div className="flex min-w-[150px] flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-muted p-4">
                          <div className="rounded-full border border-border bg-background p-3 shadow-sm">
                            <UserPlus className="size-6 text-foreground" />
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-sm font-bold">
                              Follow 10 profiles
                            </span>
                            <span className="text-xs leading-tight text-muted-foreground">
                              Fill your feed with threads that interest you.
                            </span>
                          </div>
                          <Button className="h-8 w-full rounded-xl bg-foreground text-sm font-bold text-background">
                            See profiles
                          </Button>
                        </div>

                        {/* Card 2 */}
                        <div className="flex min-w-[150px] flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-muted p-4">
                          <div className="rounded-full border border-border bg-background p-3 shadow-sm">
                            <Camera className="size-6 text-foreground" />
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-sm font-bold">
                              Add profile photo
                            </span>
                            <span className="text-xs leading-tight text-muted-foreground">
                              Make it easier for people to recognize you.
                            </span>
                          </div>
                          <Button className="h-8 w-full rounded-xl bg-foreground text-sm font-bold text-background">
                            Add
                          </Button>
                        </div>

                        {/* Card 3 */}
                        <div className="flex min-w-[150px] flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-muted p-4">
                          <div className="rounded-full border border-border bg-background p-3 shadow-sm">
                            <PenLine className="size-6 text-foreground" />
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-sm font-bold">Add bio</span>
                            <span className="text-xs leading-tight text-muted-foreground">
                              Introduce yourself and tell people what you're
                              into.
                            </span>
                          </div>
                          <Button className="h-8 w-full rounded-xl bg-foreground text-sm font-bold text-background">
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
                            No threads yet.
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
                        No replies yet.
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
                        No media yet.
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
                        No reposts yet.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
