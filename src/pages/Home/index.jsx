import NavigateInHome from "@/components/Navigation/NavigateInHome";
import PostLists from "@/components/Posts/PostLists";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
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
      <div className="flex flex-col items-center justify-center">
        <div>
          <NavigateInHome />
        </div>
        {loading ? (
          <div className="flex h-dvh w-dvw items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <PostLists isPermitDetailPost={true} posts={posts} />
          </div>
        )}
      </div>
    </>
  );
}
