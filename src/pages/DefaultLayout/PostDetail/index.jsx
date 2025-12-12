import CommentItem from "@/components/Features/Comments/CommentItem";
import PostItem from "@/components/post/PostCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/" + id,
        );
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/" + id + "/comments",
        );

        if (!response.ok) throw new Error("Failed to fetch comments");

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    fetchComments();
  }, []);

  return (
    <>
      <div>
        <PostItem isPermitDetailPost={false} {...post} />
      </div>
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
    </>
  );
}
