import PostCard from "@/components/post/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Common/ui/avatar";
import { Button } from "@/components/Common/ui/button";
import { Spinner } from "@/components/Common/ui/spinner";
import { Instagram, SquareKanban } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.hash.slice(1) || "threads";

  const handleNavigation = (tab) => {
    navigate(`#${tab}`);
  };

  const { username } = useParams();

  const userId = username.slice(1);

  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
        );
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchPosts();
    fetchUserData();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 p-5">
          <div className={"flex flex-row items-center justify-between"}>
            <div>
              <div className="text-2xl font-bold">{userData?.name}</div>
              <div>{userData?.username}</div>
            </div>
            <div>
              <Avatar className={"size-16"}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@dqt_2309"
                />
                <AvatarFallback>QT</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <div>
                <Avatar className={"size-5"}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@dqt_2309"
                  />
                  <AvatarFallback>QT</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-gray-400">2 followers</div>
            </div>
            <div className="flex gap-2">
              <div>
                <SquareKanban />
              </div>
              <div>
                <Instagram />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-stretch">
            <Button
              variant="outline"
              className={"w-full cursor-pointer font-bold hover:bg-transparent"}
            >
              Follow
            </Button>
          </div>
          {/* #hash tab */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => handleNavigation("threads")}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-black bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "threads" ? "text-black" : "border-b-gray-500 text-gray-500"}`}
            >
              Threads
            </Button>
            <Button
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-black bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "replies" ? "text-black" : "border-b-gray-500 text-gray-500"}`}
              onClick={() => handleNavigation("replies")}
            >
              Replies
            </Button>
            <Button
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-black bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "media" ? "text-black" : "border-b-gray-500 text-gray-500"}`}
              onClick={() => handleNavigation("media")}
            >
              Media
            </Button>
            <Button
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-none border-0 border-b-1 border-black bg-transparent p-3 font-semibold hover:bg-transparent ${activeTab === "reposts" ? "text-black" : "border-b-gray-500 text-gray-500"}`}
              onClick={() => handleNavigation("reposts")}
            >
              Reposts
            </Button>
          </div>
          <div>
            {/* Render posts based on active tab */}
            {activeTab === "threads" && (
              <div>
                {loading ? (
                  <div className="flex h-dvh w-dvw items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="flex w-full flex-col gap-4">
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
              <div>
                {loading ? (
                  <div className="flex h-dvh w-dvw items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    No replies yet.
                  </div>
                )}
              </div>
            )}
            {activeTab === "media" && (
              <div>
                {loading ? (
                  <div className="flex h-dvh w-dvw items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    No media yet.
                  </div>
                )}
              </div>
            )}
            {activeTab === "reposts" && (
              <div>
                {loading ? (
                  <div className="flex h-dvh w-dvw items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    No reposts yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
