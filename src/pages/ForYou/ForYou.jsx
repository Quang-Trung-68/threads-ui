import NavigateInHome from "@/components/Navigation/NavigateInHome";
import PostLists from "@/components/Posts/PostLists";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";

export default function ForYou() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
        throw new error();
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <div>
          <NavigateInHome />
        </div>
        <div>
          {loading ? (
            <div className="flex h-dvh w-dvw items-center justify-center gap-4">
              <Spinner />
            </div>
          ) : (
            <div>
              <PostLists isPermitDetailPost={true} posts={posts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
