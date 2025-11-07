import PostItem from "@/components/PostItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentItem from "@/components/Comments/CommentItem";

export default function PostDetail() {
  const { id, userId } = useParams();
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
        throw new error();
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
        throw new error();
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
