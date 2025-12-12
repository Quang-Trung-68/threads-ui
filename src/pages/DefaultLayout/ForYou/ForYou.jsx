import NavigateInHome from "@/components/Layouts/Navigation/NavigateInHome";
import PostCard from "@/components/post/PostCard";
import { Spinner } from "@/components/Common/ui/spinner";
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
        console.log(error);
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
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  isPermitDetailPost={true}
                  {...post}
                />
              ))}
            </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
