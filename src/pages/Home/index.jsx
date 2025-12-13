import { useEffect, useState } from "react";

import NavigateInHome from "@/components/Layouts/Navigation/NavigateInHome";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/Common/ui/avatar";
import { Input } from "@/components/Common/ui/input";
import { Button } from "@/components/Common/ui/button";
import useAuth from "@/hooks/useAuth";
import { Instagram } from "lucide-react";
import PostCard from "@/components/post/PostCard";
import { useGetFeedQuery } from "@/services/post";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetFeedQuery({ type: "for_you", page: 1, per_page: 10 });
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
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
    setLoading(true);
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="relative flex min-h-screen w-full">
      <div className="w-full">
        {/* Sticky Header Container */}
        <div className="sticky top-0 z-50">
          {/* Visible Header */}
          <div className="flex items-center justify-center bg-[#FAFAFA] p-4 text-lg font-bold">
            Home
          </div>

          {/* Visible Border connecting the masks */}
          <div className="bg-border absolute right-5 -bottom-px left-5 z-10 h-0.5" />

          {/* Hanging Masks to create "Rounded Top" effect over scrolling content */}
          <div className="pointer-events-none absolute top-full left-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom right, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), #FAFAFA calc(70% + 1px))",
              }}
            />
          </div>
          <div className="absolute top-full right-6 left-6 h-1 bg-[#FAFAFA]" />
          <div className="pointer-events-none absolute top-full right-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom left, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), #FAFAFA calc(70% + 1px))",
              }}
            />
          </div>
        </div>

        {/* Main Content - Flows naturally with window scroll */}
        <div className="relative z-0 flex min-h-screen w-full flex-col bg-white">
          {posts &&
            posts.map((post) => (
              <PostCard {...post} isPermitDetailPost={true} />
            ))}
        </div>
      </div>
    </div>
  );
}

{
  /* Avatar + post button if logged in */
}
{
  /* <div className="flex items-center justify-between border-b bg-white p-5">
<div className="flex flex-1 items-center gap-2">
<div>
  <Avatar className={"size-9"}>
    <AvatarImage
      src="https://github.com/shadcn.png"
      alt="@dqt_2309"
    />
    <AvatarFallback>QT</AvatarFallback>
  </Avatar>
</div>
<div className="flex-1">
  <Input
    type={"text"}
    className={
      "border-0 p-0.5 text-gray-500 shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
    }
    placeholder={`Hi ${firstName} ${lastName}, What's news ?`}
  />
</div>
</div>
<div>
<Button
  variant="ghost"
  className={
    "cursor-pointer rounded-3xl bg-black font-semibold text-white hover:bg-gray-800"
  }
>
  Post
</Button>
</div>
</div> */
}
