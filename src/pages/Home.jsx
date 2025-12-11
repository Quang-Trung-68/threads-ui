import { useEffect, useState } from "react";

import NavigateInHome from "@/components/Navigation/NavigateInHome";
import PostLists from "@/components/Posts/PostLists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Instagram } from "lucide-react";


function CallToLoginCard() {
  return (
    <div className="flex w-85 items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-[#f5f5f5] px-6 py-8 shadow-sm">
        {/* Title */}
        <h1 className="mb-3 text-center text-xl font-bold text-gray-900">
          Log in or sign up for Threads
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-center text-gray-500">
          See what people are talking about and join the conversation.
        </p>

        {/* Instagram Login Button */}
        <button className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-4 transition-colors hover:bg-gray-50">
          <Instagram className="h-6 w-6" strokeWidth={2} />
          <div className="flex flex-col items-start">
            <span className="text-gray-600">Continue with Instagram</span>
            <span className="font-semibold text-gray-900">dqt_2309</span>
          </div>
        </button>

        {/* Alternative Login Link */}
        <button className="w-full py-3 text-center text-gray-500 transition-colors hover:text-gray-700">
          Log in with username instead
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { firstName, lastName } = user;
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

  return (
    <div className="relative flex min-h-screen">
      <div>
        {/* Sticky Header Container */}
        <div className="sticky top-0 z-50">
          {/* Visible Header */}
          <div className="flex items-center justify-center bg-[#FAFAFA] p-4 text-lg font-bold">
            Home
          </div>

          {/* Visible Border connecting the masks */}
          <div className="bg-border absolute right-5 bottom-0 left-5 z-10 h-px" />

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
        <div className="relative z-0 flex min-h-screen gap-1 overflow-hidden bg-white">
          <PostLists isPermitDetailPost={true} posts={posts} />
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
